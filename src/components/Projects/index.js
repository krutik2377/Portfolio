import React, { useState, useMemo } from 'react';
import {
  Container,
  Wrapper,
  ToggleButtonGroup,
  ToggleButton,
  CardContainer,
  BentoGrid,
  FeaturedSection,
  FeaturedLabel,
} from './ProjectsStyle';
import ProjectCard from '../Cards/ProjectCards';
import { projects } from '../../data/constants';
import SectionHeader from '../shared/SectionHeader';
import ScrollReveal from '../shared/ScrollReveal';
import { sectionDescriptions } from '../../styles/tokens';

const FILTERS = [
  { key: 'featured', label: 'Featured' },
  { key: 'ai', label: 'AI & ML' },
  { key: 'full-stack', label: 'Full-Stack' },
  { key: 'archive', label: 'Archive' },
];

const getCategory = (project) => {
  if (project.archive) return 'archive';
  if (project.category === 'Artificial Intelligence' || project.featured) return 'ai';
  return 'full-stack';
};

const Projects = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState('featured');

  const filtered = useMemo(() => {
    if (toggle === 'featured') return projects.filter((p) => p.featured);
    return projects.filter((p) => getCategory(p) === toggle);
  }, [toggle]);

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <Container id="projects">
      <Wrapper>
        <SectionHeader
          title="Featured"
          highlight="Projects"
          description={sectionDescriptions.projects}
        />

        <ToggleButtonGroup>
          {FILTERS.map(({ key, label }) => (
            <ToggleButton
              key={key}
              type="button"
              $active={toggle === key}
              onClick={() => setToggle(key)}
            >
              {label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {toggle === 'featured' && (
          <FeaturedSection>
            <FeaturedLabel>Flagship Work</FeaturedLabel>
            <BentoGrid>
              {featuredProjects.map((project, index) => (
                <ScrollReveal key={project.id} contents>
                  <ProjectCard
                    project={project}
                    setOpenModal={setOpenModal}
                    featured
                    large={index === 0}
                  />
                </ScrollReveal>
              ))}
            </BentoGrid>
          </FeaturedSection>
        )}

        {toggle !== 'featured' && (
          <CardContainer>
            {filtered.map((project) => (
              <ScrollReveal key={project.id} contents>
                <ProjectCard project={project} setOpenModal={setOpenModal} />
              </ScrollReveal>
            ))}
          </CardContainer>
        )}

        {filtered.length === 0 && toggle !== 'featured' && (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>No projects in this category.</p>
        )}
      </Wrapper>
    </Container>
  );
};

export default Projects;
