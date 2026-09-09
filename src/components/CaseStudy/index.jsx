import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowBack, GitHub } from '@mui/icons-material';
import { caseStudies } from '../../data/constants';

const Page = styled.div`
  min-height: 100vh;
  padding: 100px 20px 60px;
  background: ${({ theme }) => theme.bg};
`;

const Inner = styled.div`
  max-width: 860px;
  margin: 0 auto;
`;

const BackLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: none;
  color: ${({ theme }) => theme.accent};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 24px;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const Hero = styled.div`
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 38px;
  font-weight: 800;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 8px;
  letter-spacing: -0.02em;

  @media (max-width: 640px) {
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0 0 16px;
  line-height: 1.6;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`;

const MetaPill = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 999px;
  color: ${({ theme }) => theme.accent};
  background: rgba(144, 238, 144, 0.1);
  border: 1px solid rgba(144, 238, 144, 0.25);
`;

const Section = styled.section`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.accent};
  margin: 0 0 12px;
`;

const SectionBody = styled.p`
  font-size: 15px;
  line-height: 1.75;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.75;
  font-size: 15px;

  li {
    margin-bottom: 8px;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Metric = styled.div`
  padding: 16px;
  border-radius: 14px;
  border: 1px solid rgba(144, 238, 144, 0.2);
  background: ${({ theme }) => theme.card};
  text-align: center;

  strong {
    display: block;
    font-size: 24px;
    color: ${({ theme }) => theme.accent};
    margin-bottom: 4px;
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const Placeholder = styled.div`
  padding: 32px;
  border-radius: 16px;
  border: 2px dashed rgba(144, 238, 144, 0.3);
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 15px;
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
`;

const ActionBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  color: #111;
  background: linear-gradient(135deg, #98fb98, #32cd32);
`;

const CaseStudyPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const study = caseStudies.find((c) => c.slug === slug);

  if (!study) {
    return (
      <Page>
        <Inner>
          <BackLink type="button" onClick={() => navigate('/')}>
            <ArrowBack fontSize="small" /> Back to portfolio
          </BackLink>
          <Title>Case study not found</Title>
          <Subtitle>This case study hasn&apos;t been published yet.</Subtitle>
          <Link to="/" style={{ color: '#90EE90' }}>
            Return home
          </Link>
        </Inner>
      </Page>
    );
  }

  return (
    <Page>
      <Inner>
        <BackLink type="button" onClick={() => navigate(-1)}>
          <ArrowBack fontSize="small" /> Back
        </BackLink>

        <Hero>
          <Title>{study.title}</Title>
          <Subtitle>{study.subtitle}</Subtitle>
          <Meta>
            {study.role && <MetaPill>{study.role}</MetaPill>}
            {study.date && <MetaPill>{study.date}</MetaPill>}
            {study.tags?.map((tag) => (
              <MetaPill key={tag}>{tag}</MetaPill>
            ))}
          </Meta>
        </Hero>

        {study.placeholder ? (
          <Placeholder>
            This case study template is ready — pick a project and we&apos;ll fill in the
            problem, architecture, metrics, and lessons learned.
          </Placeholder>
        ) : (
          <>
            {study.problem && (
              <Section>
                <SectionTitle>Problem</SectionTitle>
                <SectionBody>{study.problem}</SectionBody>
              </Section>
            )}

            {study.solution && (
              <Section>
                <SectionTitle>Solution</SectionTitle>
                <SectionBody>{study.solution}</SectionBody>
              </Section>
            )}

            {study.architecture && (
              <Section>
                <SectionTitle>Architecture</SectionTitle>
                <SectionBody>{study.architecture}</SectionBody>
              </Section>
            )}

            {study.metrics?.length > 0 && (
              <Section>
                <SectionTitle>Results</SectionTitle>
                <MetricsGrid>
                  {study.metrics.map((m) => (
                    <Metric key={m.label}>
                      <strong>{m.value}</strong>
                      <span>{m.label}</span>
                    </Metric>
                  ))}
                </MetricsGrid>
              </Section>
            )}

            {study.learnings?.length > 0 && (
              <Section>
                <SectionTitle>What I Learned</SectionTitle>
                <List>
                  {study.learnings.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </List>
              </Section>
            )}
          </>
        )}

        {study.github && (
          <Actions>
            <ActionBtn href={study.github} target="_blank" rel="noreferrer">
              <GitHub fontSize="small" /> View Source
            </ActionBtn>
          </Actions>
        )}
      </Inner>
    </Page>
  );
};

export default CaseStudyPage;
