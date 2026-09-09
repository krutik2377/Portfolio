import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: all 0.3s ease;
  border: 1px solid rgba(144, 238, 144, 0.25);
  background: ${({ theme }) => theme.card};
  box-shadow: rgba(23, 92, 230, 0.12) 0px 8px 32px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(144, 238, 144, 0.12);
  }
`;

const Top = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
`;

const Image = styled.img`
  height: 52px;
  width: 52px;
  object-fit: contain;
  background: #000;
  border-radius: 12px;
  padding: 4px;
  flex-shrink: 0;
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

const Role = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Company = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 2px;
`;

const Date = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 4px;
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const Badge = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  color: ${({ theme }) => theme.accent};
  background: rgba(144, 238, 144, 0.12);
  border: 1px solid rgba(144, 238, 144, 0.25);
`;

const BulletList = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  line-height: 1.65;

  li {
    margin-bottom: 6px;
  }
`;

const Skills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const Skill = styled.span`
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 8px;
  color: ${({ theme }) => theme.text_primary};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const ExpandButton = styled.button`
  align-self: flex-start;
  background: none;
  border: none;
  color: ${({ theme }) => theme.accent};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const parseBullets = (desc) =>
  desc
    .split('•')
    .map((s) => s.trim())
    .filter(Boolean);

const ExperienceCard = ({ experience }) => {
  const [expanded, setExpanded] = useState(false);
  const bullets = parseBullets(experience.desc || '');
  const visibleBullets = expanded ? bullets : bullets.slice(0, 2);

  return (
    <Card>
      <Top>
        <Image src={experience.img} alt={experience.company} />
        <Body>
          <Role>{experience.role}</Role>
          <Company>{experience.company}</Company>
          <Date>{experience.date}</Date>
          {experience.badges && (
            <BadgeRow>
              {experience.badges.map((badge) => (
                <Badge key={badge}>{badge}</Badge>
              ))}
            </BadgeRow>
          )}
        </Body>
      </Top>

      {bullets.length > 0 && (
        <>
          <BulletList>
            {visibleBullets.map((bullet) => (
              <li key={bullet.slice(0, 40)}>{bullet}</li>
            ))}
          </BulletList>
          {bullets.length > 2 && (
            <ExpandButton type="button" onClick={() => setExpanded(!expanded)}>
              {expanded ? 'Show less' : `Show ${bullets.length - 2} more`}
            </ExpandButton>
          )}
        </>
      )}

      {experience.skills && (
        <Skills>
          {experience.skills.map((skill) => (
            <Skill key={skill}>{skill}</Skill>
          ))}
        </Skills>
      )}
    </Card>
  );
};

export default ExperienceCard;
