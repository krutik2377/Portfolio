import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { skills } from '../../data/constants';
import SectionHeader from '../shared/SectionHeader';
import { sectionDescriptions } from '../../styles/tokens';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const SkillsLayout = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 28px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: sticky;
  top: 96px;
  align-self: start;

  @media (max-width: 900px) {
    position: static;
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 8px;
  }
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid ${({ $active }) => ($active ? 'rgba(144,238,144,0.5)' : 'transparent')};
  background: ${({ $active, theme }) =>
    $active ? 'rgba(144, 238, 144, 0.12)' : theme.card};
  color: ${({ $active, theme }) => ($active ? theme.accent : theme.text_primary)};
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    border-color: rgba(144, 238, 144, 0.4);
  }
`;

const Count = styled.span`
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(144, 238, 144, 0.15);
  color: ${({ theme }) => theme.accent};
`;

const SkillPanel = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid rgba(144, 238, 144, 0.2);
  border-radius: 20px;
  padding: 28px;
  min-height: 300px;
  animation: ${fadeIn} 0.4s ease;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const PanelTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 8px;
`;

const PanelDesc = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0 0 24px;
  line-height: 1.5;
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 12px;
`;

const AllGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

const CategoryBlock = styled.div`
  padding: 16px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);

  h4 {
    font-size: 14px;
    color: ${({ theme }) => theme.accent};
    margin: 0 0 12px;
  }
`;

const SkillChip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 13px;
  color: ${({ theme }) => theme.text_primary};
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(144, 238, 144, 0.4);
    transform: translateY(-2px);
  }

  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
  }
`;

const MiniChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const MiniChip = styled.span`
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  color: ${({ theme }) => theme.text_secondary};
`;

const categoryDescriptions = {
  'Programming Languages': 'Core languages used across AI platforms, backend services, and full-stack applications.',
  'AI & Agentic Systems': 'Designing and deploying intelligent systems, copilots, and automated decision pipelines.',
  'AI Frameworks & Libraries': 'Frameworks and tooling for building production-grade AI and agentic workflows.',
  'Backend & Frameworks': 'Scalable server-side architecture, APIs, and modern web application frameworks.',
  Databases: 'Data storage and caching layers for high-performance, cloud-native applications.',
  'Cloud & DevOps': 'Containerization, orchestration, and CI/CD pipelines for reliable deployments.',
  Tools: 'Day-to-day development, collaboration, and workflow tooling.',
  'All Skills': 'Complete overview of technologies and capabilities across all domains.',
};

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const isAllView = activeIndex === -1;
  const activeCategory = isAllView ? null : skills[activeIndex];

  return (
    <Container id="skills">
      <Wrapper>
        <SectionHeader
          title="Technical"
          highlight="Skills"
          description={sectionDescriptions.skills}
        />

        <SkillsLayout>
          <CategoryNav>
            <CategoryButton $active={isAllView} onClick={() => setActiveIndex(-1)} type="button">
              All Skills
              <Count>{skills.reduce((n, c) => n + c.skills.length, 0)}</Count>
            </CategoryButton>
            {skills.map((category, index) => (
              <CategoryButton
                key={category.title}
                $active={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                {category.title}
                <Count>{category.skills.length}</Count>
              </CategoryButton>
            ))}
          </CategoryNav>

          <SkillPanel key={isAllView ? 'all' : activeCategory.title}>
            <PanelTitle>{isAllView ? 'All Skills' : activeCategory.title}</PanelTitle>
            <PanelDesc>
              {categoryDescriptions[isAllView ? 'All Skills' : activeCategory.title]}
            </PanelDesc>

            {isAllView ? (
              <AllGrid>
                {skills.map((category) => (
                  <CategoryBlock key={category.title}>
                    <h4>{category.title}</h4>
                    <MiniChips>
                      {category.skills.map((item) => (
                        <MiniChip key={item.name}>{item.name}</MiniChip>
                      ))}
                    </MiniChips>
                  </CategoryBlock>
                ))}
              </AllGrid>
            ) : (
              <SkillGrid>
                {activeCategory.skills.map((item) => (
                  <SkillChip key={item.name}>
                    <img src={item.image} alt="" />
                    {item.name}
                  </SkillChip>
                ))}
              </SkillGrid>
            )}
          </SkillPanel>
        </SkillsLayout>
      </Wrapper>
    </Container>
  );
};

export default Skills;
