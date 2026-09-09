import React from 'react';
import styled, { keyframes } from 'styled-components';
import { OpenInNew, AutoStories } from '@mui/icons-material';
import { publications } from '../../data/constants';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 32px;
`;

const NewsBar = styled.div`
  width: 100%;
  max-width: 1280px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(144, 238, 144, 0.25);
  background: ${({ theme }) => theme.card};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
`;

const NewsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: linear-gradient(90deg, rgba(144, 238, 144, 0.15), transparent);
  border-bottom: 1px solid rgba(144, 238, 144, 0.15);
`;

const LiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #111;
  background: linear-gradient(135deg, #90ee90, #32cd32);
  white-space: nowrap;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #111;
    animation: ${pulse} 1.5s ease infinite;
  }
`;

const NewsLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  align-items: center;
  gap: 6px;
`;

const TickerWrap = styled.div`
  overflow: hidden;
  padding: 14px 0;
  mask-image: linear-gradient(90deg, transparent, black 5%, black 95%, transparent);
`;

const TickerTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 40s linear infinite;
  gap: 48px;
  padding: 0 24px;

  &:hover {
    animation-play-state: paused;
  }
`;

const TickerItem = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  white-space: nowrap;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const TickerDate = styled.span`
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  color: ${({ theme }) => theme.accent};
  background: rgba(144, 238, 144, 0.12);
  border: 1px solid rgba(144, 238, 144, 0.2);
`;

const Publications = () => {
  const tickerItems = [...publications, ...publications];

  return (
    <Container id="publications">
      <NewsBar>
        <NewsHeader>
          <LiveBadge>Latest</LiveBadge>
          <NewsLabel>
            <AutoStories sx={{ fontSize: 16 }} />
            Publications & Technical Writing
          </NewsLabel>
        </NewsHeader>
        <TickerWrap aria-label="Latest publications">
          <TickerTrack>
            {tickerItems.map((pub, i) => (
              <TickerItem
                key={`${pub.id}-${i}`}
                href={pub.url}
                target="_blank"
                rel="noreferrer"
              >
                <TickerDate>{pub.date}</TickerDate>
                {pub.title}
                <OpenInNew sx={{ fontSize: 14, opacity: 0.6 }} />
              </TickerItem>
            ))}
          </TickerTrack>
        </TickerWrap>
      </NewsBar>
    </Container>
  );
};

export default Publications;
