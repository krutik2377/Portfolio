import React from 'react';
import styled, { keyframes } from 'styled-components';
import { techMarquee } from '../../data/constants';

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 28px 0;
  mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 35s linear infinite;
  gap: 48px;
  align-items: center;

  &:hover {
    animation-play-state: paused;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid rgba(144, 238, 144, 0.2);
  background: rgba(255, 255, 255, 0.03);
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;

  img {
    width: 22px;
    height: 22px;
    object-fit: contain;
  }
`;

const TechMarquee = () => {
  const items = [...techMarquee, ...techMarquee];

  return (
    <Wrapper aria-hidden="true">
      <Track>
        {items.map((item, i) => (
          <Item key={`${item.name}-${i}`}>
            <img src={item.image} alt="" />
            {item.name}
          </Item>
        ))}
      </Track>
    </Wrapper>
  );
};

export default TechMarquee;
