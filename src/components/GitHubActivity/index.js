import React from 'react';
import styled from 'styled-components';
import ContributionHeatmap from './ContributionHeatmap';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import SectionHeader from '../shared/SectionHeader';
import ScrollReveal from '../shared/ScrollReveal';
import { useGitHubStats } from '../../hooks/useGitHubStats';
import { Bio } from '../../data/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
`;

const Wrapper = styled.div`
  width: min(1100px, 100%);
  margin: 0 auto;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 24px 0;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  padding: 18px 20px;
  border-radius: 16px;
  border: 1px solid rgba(144, 238, 144, 0.2);
  background: ${({ theme }) => theme.card};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StatValue = styled.span`
  font-size: 28px;
  font-weight: 800;
  color: ${({ theme }) => theme.accent};
  line-height: 1.1;
`;

const StatLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  padding: 24px;
  border-radius: 20px;
  border: 1px solid rgba(144, 238, 144, 0.2);
  background: ${({ theme }) => theme.card};
`;

const CardTitle = styled.h3`
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const YearRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const YearButton = styled.button`
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.accent : 'rgba(144, 238, 144, 0.25)')};
  background: ${({ $active }) =>
    $active ? 'rgba(144, 238, 144, 0.15)' : 'rgba(255, 255, 255, 0.03)'};
  color: ${({ $active, theme }) => ($active ? theme.accent : theme.text_secondary)};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accent};
  }
`;

const Disclaimer = styled.p`
  margin: 0 0 20px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(144, 238, 144, 0.2);
  background: rgba(144, 238, 144, 0.06);
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;

  strong {
    color: ${({ theme }) => theme.accent};
  }
`;

const BreakdownChart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
`;

const Diamond = styled.svg`
  width: 200px;
  height: 200px;
`;

const BreakdownRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const BreakdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BreakdownBar = styled.div`
  flex: 1;
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
`;

const BreakdownFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #32cd32, #90ee90);
  width: ${({ $pct }) => $pct}%;
  transition: width 0.6s ease;
`;

const BreakdownLabel = styled.span`
  font-size: 12px;
  min-width: 90px;
  color: ${({ theme }) => theme.text_secondary};
`;

const BreakdownPct = styled.span`
  font-size: 12px;
  font-weight: 700;
  min-width: 36px;
  text-align: right;
  color: ${({ theme }) => theme.accent};
`;

const LanguageRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const LangPill = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 999px;
  color: ${({ theme }) => theme.text_primary};
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const ActivityText = styled.p`
  font-size: 14px;
  line-height: 1.65;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0 0 16px;

  strong {
    color: ${({ theme }) => theme.accent};
  }
`;

const RepoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RepoLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 12px;
  text-decoration: none;
  border: 1px solid rgba(144, 238, 144, 0.15);
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(144, 238, 144, 0.4);
    transform: translateX(4px);
  }
`;

const RepoName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const RepoMeta = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GitHubLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 12px 20px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  color: #111;
  background: linear-gradient(135deg, #98fb98, #32cd32);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Loading = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  padding: 40px;
`;

const ErrorText = styled.p`
  text-align: center;
  color: #ff6b6b;
  padding: 20px;
`;

const ActivityDiamond = ({ breakdown }) => {
  if (!breakdown?.length) return null;

  const cx = 100;
  const cy = 100;
  const maxR = 70;

  const points = breakdown.map((item, i) => {
    const angle = (Math.PI * 2 * i) / breakdown.length - Math.PI / 2;
    const r = (item.pct / 100) * maxR;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      label: item.label,
      pct: item.pct,
      lx: cx + (maxR + 18) * Math.cos(angle),
      ly: cy + (maxR + 18) * Math.sin(angle),
    };
  });

  const poly = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <BreakdownChart>
      <Diamond viewBox="0 0 200 200">
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <polygon
            key={scale}
            points={breakdown
              .map((_, i) => {
                const angle = (Math.PI * 2 * i) / breakdown.length - Math.PI / 2;
                const r = maxR * scale;
                return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
              })
              .join(' ')}
            fill="none"
            stroke="rgba(144,238,144,0.12)"
            strokeWidth="1"
          />
        ))}
        <polygon points={poly} fill="rgba(144,238,144,0.2)" stroke="#90EE90" strokeWidth="2" />
        {points.map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r="4" fill="#90EE90" />
            <text
              x={p.lx}
              y={p.ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#888"
              fontSize="9"
            >
              {p.pct}%
            </text>
          </g>
        ))}
      </Diamond>
    </BreakdownChart>
  );
};

const formatYearLabel = (key) => (key === 'last' ? 'Last 12 mo' : key);

const GitHubActivity = () => {
  const {
    loading,
    error,
    contributions,
    totalContributions,
    streaks,
    activityBreakdown,
    topRepos,
    languages,
    stats,
    activitySummary,
    availableYears,
    selectedYear,
    yearTotals,
    selectYear,
    includesPrivate,
    statsSource,
  } = useGitHubStats();

  const activityLine = (() => {
    if (!activitySummary?.totalRecentRepos) return null;

    const { enterpriseRecentCount, publicRecentCount } = activitySummary;

    if (enterpriseRecentCount > 0 && publicRecentCount > 0) {
      return `Recently active across ${enterpriseRecentCount} enterprise ${
        enterpriseRecentCount === 1 ? 'repository' : 'repositories'
      } and ${publicRecentCount} open-source ${
        publicRecentCount === 1 ? 'project' : 'projects'
      }.`;
    }

    if (enterpriseRecentCount > 0) {
      return `Recently active across ${enterpriseRecentCount} enterprise ${
        enterpriseRecentCount === 1 ? 'repository' : 'repositories'
      }.`;
    }

    return `Recently active across ${publicRecentCount} open-source ${
      publicRecentCount === 1 ? 'project' : 'projects'
    }.`;
  })();

  return (
    <Container id="github">
      <Wrapper>
        <SectionHeader
          title="GitHub"
          highlight="Activity"
          description="Public contribution history with year-by-year heatmaps — switch years to explore past activity."
        />

        <Disclaimer>
          {statsSource === 'authenticated' ? (
            <>
              <strong>Includes private contributions.</strong> Stats are fetched securely via GitHub
              Actions using your account token. Repository names from enterprise work are not displayed.
            </>
          ) : (
            <>
              <strong>Public contributions only.</strong> Run the GitHub Actions workflow with{' '}
              <code>GH_CONTRIBUTIONS_TOKEN</code> to include private/enterprise activity.
            </>
          )}
        </Disclaimer>

        {loading && <Loading>Loading GitHub activity…</Loading>}
        {error && <ErrorText>{error}</ErrorText>}

        {!loading && !error && (
          <>
            <StatsGrid>
              <StatCard>
                <StatValue>{totalContributions}</StatValue>
                <StatLabel>
                  {selectedYear === 'last' ? 'Contributions (12 mo)' : `Contributions (${selectedYear})`}
                </StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{streaks.current}</StatValue>
                <StatLabel>Current Streak (days)</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{streaks.longest}</StatValue>
                <StatLabel>Longest Streak</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{streaks.activeDays}</StatValue>
                <StatLabel>Active Days</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{stats.totalStars || 0}</StatValue>
                <StatLabel>Total Stars</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{stats.totalForks || 0}</StatValue>
                <StatLabel>Total Forks</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{stats.publicRepos || 0}</StatValue>
                <StatLabel>Public Repos</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{stats.lifetimePublicTotal || 0}</StatValue>
                <StatLabel>Lifetime Public</StatLabel>
              </StatCard>
            </StatsGrid>

            <ScrollReveal>
              <MainGrid>
                <Card>
                  <CardTitle>
                    {totalContributions} public contribution{totalContributions === 1 ? '' : 's'}
                    {selectedYear === 'last' ? ' in the last 12 months' : ` in ${selectedYear}`}
                  </CardTitle>

                  {availableYears?.length > 0 && (
                    <YearRow>
                      {[...availableYears].reverse().map((yearKey) => (
                        <YearButton
                          key={yearKey}
                          type="button"
                          $active={selectedYear === yearKey}
                          onClick={() => selectYear(yearKey)}
                        >
                          {formatYearLabel(yearKey)}
                          {yearTotals[yearKey] != null ? ` · ${yearTotals[yearKey]}` : ''}
                        </YearButton>
                      ))}
                    </YearRow>
                  )}

                  <ContributionHeatmap contributions={contributions} />

                  {activityLine && <ActivityText>{activityLine}</ActivityText>}

                  {languages?.length > 0 && (
                    <>
                      <CardTitle>Top Languages</CardTitle>
                      <LanguageRow>
                        {languages.map((lang) => (
                          <LangPill key={lang.name}>
                            {lang.name} · {lang.count} repos
                          </LangPill>
                        ))}
                      </LanguageRow>
                    </>
                  )}
                </Card>

                <Card>
                  <CardTitle>Activity Overview</CardTitle>
                  <ActivityDiamond breakdown={activityBreakdown} />
                  <BreakdownRow>
                    {activityBreakdown.map((item) => (
                      <BreakdownItem key={item.label}>
                        <BreakdownLabel>{item.label}</BreakdownLabel>
                        <BreakdownBar>
                          <BreakdownFill $pct={item.pct} />
                        </BreakdownBar>
                        <BreakdownPct>{item.pct}%</BreakdownPct>
                      </BreakdownItem>
                    ))}
                  </BreakdownRow>
                </Card>
              </MainGrid>
            </ScrollReveal>

            {topRepos?.length > 0 && (
              <ScrollReveal>
                <Card style={{ marginTop: 20 }}>
                  <CardTitle>Top Repositories</CardTitle>
                  <RepoList>
                    {topRepos.map((repo) => (
                      <RepoLink
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <RepoName>{repo.name}</RepoName>
                        <RepoMeta>
                          {repo.language && <span>{repo.language}</span>}
                          <FaStar size={11} /> {repo.stargazers_count}
                          <FaCodeBranch size={11} /> {repo.forks_count}
                        </RepoMeta>
                      </RepoLink>
                    ))}
                  </RepoList>
                </Card>
              </ScrollReveal>
            )}

            <div style={{ textAlign: 'center' }}>
              <GitHubLink href={Bio.github} target="_blank" rel="noreferrer">
                <FaGithub size={18} /> View Full Profile on GitHub
              </GitHubLink>
            </div>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default GitHubActivity;
