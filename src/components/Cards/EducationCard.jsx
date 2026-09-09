import React, { useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  border: 1px solid rgba(144, 238, 144, 0.25);
  background: ${({ theme }) => theme.card};
  box-shadow: rgba(23, 92, 230, 0.12) 0px 8px 32px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
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
  border-radius: 12px;
  background: #fff;
  padding: 4px;
  flex-shrink: 0;
`;

const Body = styled.div`
  flex: 1;
`;

const Name = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Degree = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 4px;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Grade = styled.span`
  color: ${({ theme }) => theme.accent};
  font-weight: 600;
`;

const Highlights = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 12px;
  padding: 5px 12px;
  border-radius: 999px;
  color: ${({ theme }) => theme.accent};
  background: rgba(144, 238, 144, 0.1);
  border: 1px solid rgba(144, 238, 144, 0.2);
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.65;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
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
`;

const EducationCard = ({ education }) => {
  const [expanded, setExpanded] = useState(false);
  const shortDesc = education.desc?.slice(0, 160);

  return (
    <Card>
      <Top>
        <Image src={education.img} alt={education.school} />
        <Body>
          <Name>{education.school}</Name>
          <Degree>{education.degree}</Degree>
          <Meta>
            <span>{education.date}</span>
            <Grade>{education.grade}</Grade>
          </Meta>
        </Body>
      </Top>

      {education.highlights && (
        <Highlights>
          {education.highlights.map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </Highlights>
      )}

      <Description>
        {expanded ? education.desc : `${shortDesc}${education.desc?.length > 160 ? '...' : ''}`}
      </Description>

      {education.desc?.length > 160 && (
        <ExpandButton type="button" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less' : 'Read more'}
        </ExpandButton>
      )}
    </Card>
  );
};

export default EducationCard;
