import React from 'react';
import styled from 'styled-components';
import { GitHub } from '@mui/icons-material';

const Card = styled.article`
  width: 100%;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(144, 238, 144, 0.15);
  transition: all 0.3s ease;
  grid-column: ${({ $large }) => ($large ? 'span 2' : 'span 1')};
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 48px rgba(144, 238, 144, 0.12);
    border-color: rgba(144, 238, 144, 0.4);
  }

  @media (max-width: 960px) {
    grid-column: span 1;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  height: ${({ $featured }) => ($featured ? '220px' : '180px')};
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: ${({ theme }) => theme.bgLight};
`;

const FeaturedBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.accent};
  color: #111;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const Tag = styled.span`
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  color: ${({ theme }) => theme.accent};
  background: rgba(144, 238, 144, 0.1);
  border: 1px solid rgba(144, 238, 144, 0.2);
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

const Date = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
  padding-top: 8px;
`;

const ActionBtn = styled.a`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  background: rgba(144, 238, 144, 0.12);
  color: ${({ theme }) => theme.accent};
  border: 1px solid rgba(144, 238, 144, 0.25);

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: #111;
  }
`;

const ViewBtn = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accent};
  }
`;

const ProjectCards = ({ project, setOpenModal, featured = false, large = false }) => {
  const handleView = (e) => {
    e.stopPropagation();
    setOpenModal({ state: true, project });
  };

  const handleCardClick = () => {
    setOpenModal({ state: true, project });
  };

  return (
    <Card $large={large} onClick={handleCardClick}>
      <ImageWrap $featured={large}>
        <Image src={project.image} alt={project.title} loading="lazy" />
        {(featured || project.featured) && <FeaturedBadge>Featured</FeaturedBadge>}
      </ImageWrap>
      <Content>
        <Tags>
          {project.tags?.slice(0, 4).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
        <Title>{project.title}</Title>
        <Date>{project.date}</Date>
        <Description>{project.description}</Description>
        <Actions onClick={(e) => e.stopPropagation()}>
          <ActionBtn href={project.github} target="_blank" rel="noreferrer">
            <GitHub fontSize="small" /> Code
          </ActionBtn>
          <ViewBtn type="button" onClick={handleView}>
            Details
          </ViewBtn>
        </Actions>
      </Content>
    </Card>
  );
};

export default ProjectCards;
