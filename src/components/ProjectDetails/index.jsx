import { CloseRounded, GitHub, LinkedIn, MenuBook } from '@mui/icons-material';
import { Modal } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 16px;
  z-index: 2000;
`;

const Wrapper = styled.div`
  max-width: 820px;
  width: 100%;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_primary};
  padding: 28px;
  position: relative;
  border: 1px solid rgba(144, 238, 144, 0.2);
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.06);
  border: none;
  border-radius: 10px;
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(144, 238, 144, 0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  max-height: 360px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  margin: 0 0 8px;
`;

const Date = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 16px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  font-size: 12px;
  padding: 5px 12px;
  border-radius: 999px;
  color: ${({ theme }) => theme.accent};
  background: rgba(144, 238, 144, 0.1);
  border: 1px solid rgba(144, 238, 144, 0.2);
`;

const Desc = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0 0 24px;
`;

const Label = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px;
`;

const Members = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 24px;
`;

const Member = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MemberName = styled.span`
  font-size: 14px;
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.a`
  flex: 1;
  text-align: center;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  background: ${({ theme }) => theme.accent};
  color: #111;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const CaseStudyButton = styled(Link)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: center;
  padding: 14px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1.5px solid ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.accent};
  background: transparent;

  &:hover {
    background: rgba(144, 238, 144, 0.1);
    transform: translateY(-2px);
  }
`;

const ProjectDetails = ({ openModal, setOpenModal }) => {
  const project = openModal?.project;
  if (!project) return null;

  return (
    <Modal open onClose={() => setOpenModal({ state: false, project: null })}>
      <Container onClick={() => setOpenModal({ state: false, project: null })}>
        <Wrapper onClick={(e) => e.stopPropagation()}>
          <CloseBtn
            type="button"
            aria-label="Close"
            onClick={() => setOpenModal({ state: false, project: null })}
          >
            <CloseRounded />
          </CloseBtn>
          <Image src={project.image} alt={project.title} />
          <Title>{project.title}</Title>
          <Date>{project.date}</Date>
          <Tags>
            {project.tags?.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
          <Desc>{project.description}</Desc>
          {project.member && (
            <>
              <Label>Team Members</Label>
              <Members>
                {project.member.map((member) => (
                  <Member key={member.name}>
                    <MemberName>{member.name}</MemberName>
                    <a href={member.github} target="_blank" rel="noreferrer" aria-label={`${member.name} GitHub`}>
                      <GitHub fontSize="small" />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} LinkedIn`}>
                      <LinkedIn fontSize="small" />
                    </a>
                  </Member>
                ))}
              </Members>
            </>
          )}
          <ButtonGroup>
            {project.caseStudySlug && (
              <CaseStudyButton
                to={`/case-study/${project.caseStudySlug}`}
                onClick={() => setOpenModal({ state: false, project: null })}
              >
                <MenuBook fontSize="small" /> Case Study
              </CaseStudyButton>
            )}
            {project.github && (
              <Button href={project.github} target="_blank" rel="noreferrer">
                View Source Code
              </Button>
            )}
          </ButtonGroup>
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default ProjectDetails;
