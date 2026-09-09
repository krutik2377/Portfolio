import React, { useMemo } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  overflow-x: auto;
  padding-bottom: 8px;
`;

const Grid = styled.div`
  display: flex;
  gap: 3px;
`;

const WeekCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Cell = styled.div`
  width: 11px;
  height: 11px;
  border-radius: 2px;
  background: ${({ $level }) =>
    ['#1a1f2e', '#0e4429', '#006d32', '#26a641', '#90EE90'][$level] || '#1a1f2e'};
  cursor: default;
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 12px;
  font-size: 11px;
  color: ${({ theme }) => theme.text_secondary};
`;

const groupByWeeks = (contributions) => {
  if (!contributions?.length) return [];

  const sorted = [...contributions].sort((a, b) => a.date.localeCompare(b.date));
  const start = new Date(sorted[0].date);
  const end = new Date(sorted[sorted.length - 1].date);
  const map = Object.fromEntries(sorted.map((d) => [d.date, d]));

  const weeks = [];
  const cursor = new Date(start);
  cursor.setDate(cursor.getDate() - cursor.getDay());

  while (cursor <= end) {
    const week = [];
    for (let i = 0; i < 7; i += 1) {
      const key = cursor.toISOString().slice(0, 10);
      const entry = map[key];
      week.push({
        date: key,
        count: entry?.count || 0,
        level: entry?.level ?? (entry?.count ? Math.min(4, Math.ceil(entry.count / 3)) : 0),
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
};

const ContributionHeatmap = ({ contributions }) => {
  const weeks = useMemo(() => groupByWeeks(contributions), [contributions]);

  return (
    <Wrap>
      <Grid role="img" aria-label="GitHub contribution heatmap">
        {weeks.map((week) => (
          <WeekCol key={week[0]?.date}>
            {week.map((day) => (
              <Cell
                key={day.date}
                $level={Math.min(4, day.level)}
                title={`${day.count} contributions on ${day.date}`}
              />
            ))}
          </WeekCol>
        ))}
      </Grid>
      <Legend>
        Less
        {[0, 1, 2, 3, 4].map((level) => (
          <Cell key={level} $level={level} style={{ width: 10, height: 10 }} />
        ))}
        More
      </Legend>
    </Wrap>
  );
};

export default ContributionHeatmap;
