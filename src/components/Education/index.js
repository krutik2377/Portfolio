import React from 'react';
import styled from 'styled-components';
import { education } from '../../data/constants';
import EducationCard from '../Cards/EducationCard';
import SectionHeader from '../shared/SectionHeader';
import ScrollReveal from '../shared/ScrollReveal';
import { sectionDescriptions } from '../../styles/tokens';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
`;

const Grid = styled.div`
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Education = () => {
  return (
    <Container id="education">
      <SectionHeader
        title="My"
        highlight="Education"
        description={sectionDescriptions.education}
      />
      <Grid>
        {education.map((item) => (
          <ScrollReveal key={item.id}>
            <EducationCard education={item} />
          </ScrollReveal>
        ))}
      </Grid>
    </Container>
  );
};

export default Education;
