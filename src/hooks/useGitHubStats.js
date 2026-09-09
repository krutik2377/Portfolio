import { useEffect, useState } from 'react';
import { Bio, githubHiddenRepoPatterns } from '../data/constants';

const isHiddenRepo = (repoFullName) =>
  githubHiddenRepoPatterns.some((pattern) => pattern.test(repoFullName || ''));

const CACHE_KEY = 'github-stats-cache-v6';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

const USERNAME = Bio.github.split('/').pop();
const CONTRIB_API = `https://github-contributions-api.jogruber.de/v4/${USERNAME}`;

const readCache = () => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > CACHE_TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
};

const writeCache = (data) => {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
  } catch {
    /* ignore quota errors */
  }
};

const sumContributions = (contributions) =>
  (contributions || []).reduce((sum, d) => sum + (d.count || 0), 0);

const fetchContributionsForYear = async (yearKey) => {
  const res = await fetch(`${CONTRIB_API}?y=${yearKey}`);
  if (!res.ok) return { contributions: [], total: 0 };
  const data = await res.json();
  const contributions = data.contributions || [];
  const totalFromApi = data.total?.[yearKey] ?? data.total?.lastYear;
  const total = totalFromApi ?? sumContributions(contributions);
  return { contributions, total };
};

const fetchAllContributionYears = async (accountCreatedYear) => {
  const currentYear = new Date().getFullYear();
  const startYear = Math.max(2015, accountCreatedYear || 2020);
  const calendarYears = [];
  for (let y = startYear; y <= currentYear; y += 1) calendarYears.push(String(y));

  const yearKeys = ['last', ...calendarYears];
  const results = await Promise.all(
    yearKeys.map(async (key) => {
      const { contributions, total } = await fetchContributionsForYear(key);
      return { key, contributions, total };
    })
  );

  const contributionsByYear = {};
  const yearTotals = {};

  results.forEach(({ key, contributions, total }) => {
    contributionsByYear[key] = contributions;
    yearTotals[key] = total;
  });

  return { contributionsByYear, yearTotals, availableYears: yearKeys };
};

const calcStreaks = (contributions) => {
  if (!contributions?.length) return { current: 0, longest: 0, activeDays: 0 };

  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));
  const activeDays = sorted.filter((d) => d.count > 0).length;

  let longest = 0;
  let current = 0;
  let run = 0;

  sorted.forEach((day) => {
    if (day.count > 0) {
      run += 1;
      longest = Math.max(longest, run);
    } else {
      run = 0;
    }
  });

  const map = Object.fromEntries(sorted.map((d) => [d.date, d.count]));
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  let cursor = null;
  if (map[today] > 0) cursor = new Date();
  else if (map[yesterday] > 0) cursor = new Date(Date.now() - 86400000);

  if (cursor) {
    while (true) {
      const key = cursor.toISOString().slice(0, 10);
      if (map[key] > 0) {
        current += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
  }

  return { current, longest, activeDays };
};

const categorizeEvents = (events) => {
  const counts = { commits: 0, pullRequests: 0, issues: 0, reviews: 0, other: 0 };

  events.forEach((event) => {
    switch (event.type) {
      case 'PushEvent':
        counts.commits += event.payload?.commits?.length || 1;
        break;
      case 'PullRequestEvent':
        counts.pullRequests += 1;
        break;
      case 'IssuesEvent':
        counts.issues += 1;
        break;
      case 'PullRequestReviewEvent':
        counts.reviews += 1;
        break;
      default:
        counts.other += 1;
    }
  });

  const total = counts.commits + counts.pullRequests + counts.issues + counts.reviews || 1;

  return [
    { label: 'Commits', value: counts.commits, pct: Math.round((counts.commits / total) * 100) },
    { label: 'Pull requests', value: counts.pullRequests, pct: Math.round((counts.pullRequests / total) * 100) },
    { label: 'Issues', value: counts.issues, pct: Math.round((counts.issues / total) * 100) },
    { label: 'Code review', value: counts.reviews, pct: Math.round((counts.reviews / total) * 100) },
  ];
};

const aggregateLanguages = (repos) => {
  const totals = {};
  repos.forEach((repo) => {
    if (repo.language) {
      totals[repo.language] = (totals[repo.language] || 0) + 1;
    }
  });

  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));
};

const loadAuthenticatedStats = async () => {
  try {
    const base = process.env.PUBLIC_URL || '';
    const res = await fetch(`${base}/github-stats.json`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.source !== 'authenticated' || !data.contributionsByYear) return null;
    return data;
  } catch {
    return null;
  }
};

const fetchAllRepos = async () => {
  const repos = [];
  let page = 1;

  while (page <= 5) {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&page=${page}&sort=updated`
    );
    if (!res.ok) break;
    const batch = await res.json();
    if (!batch.length) break;
    repos.push(...batch);
    page += 1;
  }

  return repos;
};

export const useGitHubStats = () => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    contributionsByYear: {},
    yearTotals: {},
    availableYears: [],
    selectedYear: 'last',
    contributions: [],
    totalContributions: 0,
    streaks: { current: 0, longest: 0, activeDays: 0 },
    activityBreakdown: [],
    topRepos: [],
    languages: [],
    stats: {},
    recentRepos: [],
    activitySummary: null,
    statsSource: 'public',
  });

  const selectYear = (yearKey) => {
    setState((prev) => {
      const contributions = prev.contributionsByYear[yearKey] || [];
      const totalContributions = prev.yearTotals[yearKey] ?? sumContributions(contributions);
      return {
        ...prev,
        selectedYear: yearKey,
        contributions,
        totalContributions,
        streaks: calcStreaks(contributions),
      };
    });
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const authStatsFirst = await loadAuthenticatedStats();

        if (!authStatsFirst) {
          const cached = readCache();
          if (cached) {
            setState({ ...cached, loading: false });
            return;
          }
        }

        const userRes = await fetch(`https://api.github.com/users/${USERNAME}`);
        if (!userRes.ok) throw new Error('Could not load GitHub profile');
        const user = await userRes.json();

        const accountYear = new Date(user.created_at).getFullYear();

        const [authStats, eventsRes, repos] = await Promise.all([
          Promise.resolve(authStatsFirst),
          fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=100`),
          fetchAllRepos(),
        ]);

        let contributionsByYear;
        let yearTotals;
        let availableYears;
        let statsSource = 'public';

        if (authStats) {
          contributionsByYear = authStats.contributionsByYear;
          yearTotals = authStats.yearTotals;
          availableYears = authStats.availableYears;
          statsSource = 'authenticated';
        } else {
          const contribBundle = await fetchAllContributionYears(accountYear);
          contributionsByYear = contribBundle.contributionsByYear;
          yearTotals = contribBundle.yearTotals;
          availableYears = contribBundle.availableYears;
        }

        const events = eventsRes.ok ? await eventsRes.json() : [];

        const defaultYear = 'last';
        const contributions = contributionsByYear[defaultYear] || [];
        const totalContributions = yearTotals[defaultYear] ?? sumContributions(contributions);
        const streaks = calcStreaks(contributions);
        const activityBreakdown =
          authStats?.activityBreakdown?.length
            ? authStats.activityBreakdown
            : categorizeEvents(events);

        const publicRepos = repos.filter(
          (repo) => !isHiddenRepo(repo.full_name || `${repo.owner?.login}/${repo.name}`)
        );

        const totalStars = publicRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
        const totalForks = publicRepos.reduce((sum, r) => sum + (r.forks_count || 0), 0);
        const languages = aggregateLanguages(publicRepos);

        const weeksActive = Math.max(1, Math.round(streaks.activeDays / 7));
        const avgPerWeek = Math.round(totalContributions / weeksActive);

        const topRepos = [...publicRepos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);

        const recentRepos = [...publicRepos]
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
          .slice(0, 5);

        const recentRepoNames = [
          ...new Set(events.filter((e) => e.repo?.name).map((e) => e.repo.name)),
        ];

        const enterpriseRecentCount = recentRepoNames.filter(isHiddenRepo).length;
        const publicRecentCount = recentRepoNames.filter((name) => !isHiddenRepo(name)).length;

        const activitySummary = {
          enterpriseRecentCount,
          publicRecentCount,
          totalRecentRepos: recentRepoNames.length,
        };

        const lifetimePublicTotal = Object.entries(yearTotals)
          .filter(([key]) => key !== 'last')
          .reduce((sum, [, count]) => sum + (count || 0), 0);

        const data = {
          loading: false,
          error: null,
          contributionsByYear,
          yearTotals,
          availableYears,
          selectedYear: defaultYear,
          contributions,
          totalContributions,
          streaks,
          activityBreakdown,
          topRepos,
          languages,
          recentRepos,
          activitySummary,
          statsSource,
          stats: {
            publicRepos: user.public_repos,
            followers: user.followers,
            following: user.following,
            totalStars,
            totalForks,
            avgPerWeek,
            accountCreated: user.created_at,
            lifetimePublicTotal,
          },
        };

        if (!cancelled) {
          writeCache(data);
          setState(data);
        }
      } catch (err) {
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: err.message || 'Failed to load GitHub data',
          }));
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { ...state, selectYear };
};
