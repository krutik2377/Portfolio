import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { skills } from '../../data/constants'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 40px 20px 80px;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  gap: 32px;
`

export const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`

export const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 640px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const SkillsLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 28px;
  margin-top: 8px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`

const CategoryNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: sticky;
  top: 100px;
  align-self: start;

  @media (max-width: 900px) {
    position: static;
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 8px;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 14px 18px;
  border-radius: 14px;
  border: 1px solid ${({ $active }) => ($active ? '#90EE90' : 'transparent')};
  background: ${({ $active, theme }) =>
    $active
      ? 'linear-gradient(135deg, rgba(144, 238, 144, 0.14) 0%, rgba(50, 205, 50, 0.06) 100%)'
      : theme.card};
  color: ${({ $active, theme }) => ($active ? '#90EE90' : theme.text_primary)};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  text-align: left;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${({ $active }) =>
    $active ? '0 0 20px rgba(144, 238, 144, 0.12)' : 'none'};

  &:hover {
    border-color: rgba(144, 238, 144, 0.5);
    transform: translateX(4px);
  }

  @media (max-width: 900px) {
    width: auto;
    min-width: max-content;
    white-space: nowrap;
    &:hover {
      transform: translateY(-2px);
    }
  }
`

const CategoryCount = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ $active }) =>
    $active ? 'rgba(144, 238, 144, 0.2)' : 'rgba(255, 255, 255, 0.06)'};
  color: ${({ $active, theme }) => ($active ? '#90EE90' : theme.text_secondary)};
`

const SkillPanel = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid rgba(144, 238, 144, 0.25);
  border-radius: 20px;
  padding: 32px;
  min-height: 320px;
  position: relative;
  overflow: hidden;
  box-shadow: rgba(23, 92, 230, 0.12) 0px 8px 32px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #90EE90, #32CD32, transparent);
  }

  @media (max-width: 768px) {
    padding: 24px 18px;
    min-height: 280px;
  }
`

const PanelHeader = styled.div`
  margin-bottom: 28px;
  animation: ${fadeIn} 0.4s ease;
`

const PanelTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 8px 0;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`

const PanelSubtitle = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
  line-height: 1.5;
`

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
  animation: ${fadeIn} 0.45s ease 0.05s both;

  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }
`

const SkillChip = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  font-weight: 500;
  cursor: default;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(144, 238, 144, 0.6);
    background: rgba(144, 238, 144, 0.08);
    box-shadow: 0 10px 28px rgba(144, 238, 144, 0.12);
  }

  @media (max-width: 500px) {
    padding: 12px 14px;
    font-size: 13px;
  }
`

const SkillImage = styled.img`
  width: 26px;
  height: 26px;
  object-fit: contain;
  flex-shrink: 0;
  border-radius: 6px;
`

const categoryDescriptions = {
  'Programming Languages': 'Core languages used across AI platforms, backend services, and full-stack applications.',
  'AI & Agentic Systems': 'Designing and deploying intelligent systems, copilots, and automated decision pipelines.',
  'AI Frameworks & Libraries': 'Frameworks and tooling for building production-grade AI and agentic workflows.',
  'Backend & Frameworks': 'Scalable server-side architecture, APIs, and modern web application frameworks.',
  'Databases': 'Data storage and caching layers for high-performance, cloud-native applications.',
  'Cloud & DevOps': 'Containerization, orchestration, and CI/CD pipelines for reliable deployments.',
  'Tools': 'Day-to-day development, collaboration, and workflow tooling.',
}

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeCategory = skills[activeIndex]

  return (
    <Container id="skills">
      <Wrapper>
        <Title>Skills</Title>
        <Desc>
          A focused toolkit spanning AI engineering, full-stack development, and cloud-native delivery.
        </Desc>

        <SkillsLayout>
          <CategoryNav>
            {skills.map((category, index) => (
              <CategoryButton
                key={category.title}
                $active={activeIndex === index}
                onClick={() => setActiveIndex(index)}
                type="button"
              >
                {category.title}
                <CategoryCount $active={activeIndex === index}>
                  {category.skills.length}
                </CategoryCount>
              </CategoryButton>
            ))}
          </CategoryNav>

          <SkillPanel key={activeCategory.title}>
            <PanelHeader>
              <PanelTitle>{activeCategory.title}</PanelTitle>
              <PanelSubtitle>
                {categoryDescriptions[activeCategory.title]}
              </PanelSubtitle>
            </PanelHeader>

            <SkillGrid>
              {activeCategory.skills.map((item) => (
                <SkillChip key={item.name}>
                  <SkillImage src={item.image} alt={item.name} />
                  {item.name}
                </SkillChip>
              ))}
            </SkillGrid>
          </SkillPanel>
        </SkillsLayout>
      </Wrapper>
    </Container>
  )
}

export default Skills
