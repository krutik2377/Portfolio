import React from 'react';
import styled from 'styled-components';
import ScrollReveal from './ScrollReveal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  font-size: 42px;
  text-align: center;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  letter-spacing: -0.02em;

  span {
    color: ${({ theme }) => theme.accent};
  }

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 640px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Divider = styled.div`
  width: 64px;
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(90deg, ${({ theme }) => theme.accent}, transparent);
  margin-top: 4px;
`;

const SectionHeader = ({ title, highlight, description }) => (
  <ScrollReveal>
    <Wrapper>
      <Title>
        {title} {highlight && <span>{highlight}</span>}
      </Title>
      {description && <Desc>{description}</Desc>}
      <Divider />
    </Wrapper>
  </ScrollReveal>
);

export default SectionHeader;
