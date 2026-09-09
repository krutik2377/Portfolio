/**
 * Fetches authenticated GitHub contribution stats (public + private counts).
 * Usage: GH_CONTRIBUTIONS_TOKEN=xxx node scripts/fetch-github-stats.mjs
 * Or put GH_CONTRIBUTIONS_TOKEN in .env (gitignored)
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const OUT_PATH = join(root, 'public', 'github-stats.json');

const loadEnvFile = () => {
  const envPath = join(root, '.env');
  if (!existsSync(envPath)) return;
  readFileSync(envPath, 'utf8')
    .split('\n')
    .forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eq = trimmed.indexOf('=');
      if (eq === -1) return;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
      if (key && !process.env[key]) process.env[key] = value;
    });
};

loadEnvFile();

const TOKEN = process.env.GH_CONTRIBUTIONS_TOKEN;
const USERNAME = 'krutik2377';
const PUBLIC_CONTRIB_API = `https://github-contributions-api.jogruber.de/v4/${USERNAME}`;
if (!TOKEN) {
  console.error('Missing GH_CONTRIBUTIONS_TOKEN. Add it to .env or GitHub Actions secrets.');
  process.exit(1);
}

const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const graphql = async (query, variables = {}) => {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`GraphQL HTTP ${res.status}: ${await res.text()}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }
  return json.data;
};

const CALENDAR_QUERY = `
  query ($from: DateTime!, $to: DateTime!) {
    viewer {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const flattenCalendar = (weeks) => {
  const contributions = [];
  weeks?.forEach((week) => {
    week.contributionDays?.forEach((day) => {
      contributions.push({
        date: day.date,
        count: day.contributionCount,
        level: LEVEL_MAP[day.contributionLevel] ?? 0,
      });
    });
  });
  return contributions;
};

const fetchRange = async (from, to) => {
  const data = await graphql(CALENDAR_QUERY, { from, to });
  const calendar = data.viewer.contributionsCollection.contributionCalendar;
  return {
    total: calendar.totalContributions,
    contributions: flattenCalendar(calendar.weeks),
  };
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ACTIVITY_QUERY = `
  query ($from: DateTime!, $to: DateTime!) {
    viewer {
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
      }
    }
  }
`;

const buildActivityBreakdown = (collection) => {
  const commits = collection.totalCommitContributions ?? 0;
  const issues = collection.totalIssueContributions ?? 0;
  const pullRequests = collection.totalPullRequestContributions ?? 0;
  const reviews = collection.totalPullRequestReviewContributions ?? 0;
  const total = commits + issues + pullRequests + reviews || 1;

  return [
    { label: 'Commits', value: commits, pct: Math.round((commits / total) * 100) },
    { label: 'Pull requests', value: pullRequests, pct: Math.round((pullRequests / total) * 100) },
    { label: 'Issues', value: issues, pct: Math.round((issues / total) * 100) },
    { label: 'Code review', value: reviews, pct: Math.round((reviews / total) * 100) },
  ];
};

const fetchActivityBreakdown = async (from, to) => {
  const data = await graphql(ACTIVITY_QUERY, { from, to });
  return buildActivityBreakdown(data.viewer.contributionsCollection);
};

const main = async () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2020;
  const contributionsByYear = {};
  const yearTotals = {};
  const availableYears = ['last'];

  // Rolling last 12 months
  const lastFrom = new Date();
  lastFrom.setFullYear(lastFrom.getFullYear() - 1);
  const lastTo = new Date().toISOString();
  const lastFromIso = lastFrom.toISOString();
  const last = await fetchRange(lastFromIso, lastTo);
  contributionsByYear.last = last.contributions;
  yearTotals.last = last.total;

  const activityBreakdown = await fetchActivityBreakdown(lastFromIso, lastTo);
  console.log(
    `Activity: ${activityBreakdown.map((a) => `${a.label} ${a.pct}%`).join(' | ')}`
  );

  await sleep(500);

  for (let year = startYear; year <= currentYear; year += 1) {
    const from = `${year}-01-01T00:00:00Z`;
    const to = `${year}-12-31T23:59:59Z`;
    const result = await fetchRange(from, to);
    contributionsByYear[String(year)] = result.contributions;
    yearTotals[String(year)] = result.total;
    availableYears.push(String(year));
    await sleep(400);
  }

  // Compare with public-only API to detect if token includes private contributions
  let includesPrivate = false;
  try {
    const pubRes = await fetch(`${PUBLIC_CONTRIB_API}?y=last`);
    if (pubRes.ok) {
      const pubData = await pubRes.json();
      const publicTotal = pubData.total?.lastYear ?? 0;
      includesPrivate = yearTotals.last > publicTotal;
      if (!includesPrivate) {
        console.warn(
          '\n⚠️  Token returned the same counts as public API — private contributions NOT included.\n' +
            '   Use a Classic PAT with read:user scope (not fine-grained Profile only).\n' +
            '   Also enable: GitHub Settings → Profile → Include private contributions.\n'
        );
      } else {
        console.log(`✓ Private contributions detected (${yearTotals.last} vs ${publicTotal} public)`);
      }
    }
  } catch {
    includesPrivate = true;
  }

  const payload = {
    source: 'authenticated',
    includesPrivate,
    fetchedAt: new Date().toISOString(),
    contributionsByYear,
    yearTotals,
    availableYears,
    activityBreakdown,
  };

  mkdirSync(join(root, 'public'), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(payload, null, 2));
  console.log(`Wrote ${OUT_PATH}`);
  console.log(`Last 12 mo: ${yearTotals.last} | ${currentYear}: ${yearTotals[currentYear]}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
