import React from 'react';
import styled from 'styled-components';
import ExperienceCard from '../Cards/ExperienceCard';
import { experiences } from '../../data/constants';
import SectionHeader from '../shared/SectionHeader';
import ScrollReveal from '../shared/ScrollReveal';
import { sectionDescriptions } from '../../styles/tokens';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
`;

const Wrapper = styled.div`
  width: min(960px, 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const Timeline = styled.div`
  width: min(760px, 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  padding-left: 36px;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    left: 11px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: linear-gradient(180deg, #90ee90, rgba(144, 238, 144, 0.1));
  }
`;

const TimelineItem = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 36px;

  &:last-child {
    padding-bottom: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: -31px;
    top: 24px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.accent};
    box-shadow: 0 0 12px rgba(144, 238, 144, 0.5);
    border: 2px solid ${({ theme }) => theme.bg};
  }
`;

const Experience = () => {
  return (
    <Container id="experience">
      <SectionHeader
        title="Work"
        highlight="Experience"
        description={sectionDescriptions.experience}
      />
      <Wrapper>
        <Timeline>
          {experiences.map((experience) => (
            <TimelineItem key={experience.id}>
              <ScrollReveal>
                <ExperienceCard experience={experience} />
              </ScrollReveal>
            </TimelineItem>
          ))}
        </Timeline>
      </Wrapper>
    </Container>
  );
};

export default Experience;
