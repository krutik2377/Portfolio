import styled, { keyframes } from "styled-components";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const HeroContainer = styled.div`
  background: transparent;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 100px 30px 60px;
  z-index: 1;

  @media (max-width: 960px) {
    padding: 90px 16px 40px;
  }
`;

export const PhotoWrapper = styled.div`
  position: relative;
  width: min(360px, 78vw);
  height: min(360px, 78vw);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media (max-width: 640px) {
    width: min(260px, 72vw);
    height: min(260px, 72vw);
  }
`;

export const HeroBg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 115%;
  height: 115%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  opacity: 0.65;
  z-index: 0;
`;

export const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  gap: 48px;

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 32px;
  }
`;

export const HeroLeftContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeUp} 0.7s ease both;

  @media (max-width: 960px) {
    order: 2;
    width: 100%;
  }
`;

export const HeroRightContainer = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;

  @media (max-width: 960px) {
    order: 1;
    align-items: center;
  }
`;

export const Img = styled.img`
  position: relative;
  z-index: 1;
  width: 88%;
  height: 88%;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.accent};
  box-shadow: 0 0 40px rgba(144, 238, 144, 0.2);
`;

export const Title = styled.h1`
  font-weight: 800;
  font-size: 52px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 1.15;
  letter-spacing: -0.03em;
  animation: ${fadeUp} 0.7s ease 0.1s both;

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 640px) {
    font-size: 38px;
  }
`;

export const Tagline = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.accent};
  margin: 0;
  animation: ${fadeUp} 0.7s ease 0.15s both;

  @media (max-width: 960px) {
    text-align: center;
  }
`;

export const TextLoop = styled.div`
  font-weight: 600;
  font-size: 30px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.text_primary};
  animation: ${fadeUp} 0.7s ease 0.2s both;

  @media (max-width: 960px) {
    justify-content: center;
  }

  @media (max-width: 640px) {
    font-size: 22px;
  }
`;

export const Span = styled.span`
  color: ${({ theme }) => theme.accent};
`;

export const SubTitle = styled.p`
  font-size: 17px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_secondary};
  width: 100%;
  max-width: 920px;
  animation: ${fadeUp} 0.7s ease 0.3s both;

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 640px) {
    font-size: 15px;
  }
`;

export const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  animation: ${fadeUp} 0.7s ease 0.35s both;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

export const StatCard = styled.div`
  padding: 12px 20px;
  border-radius: 14px;
  border: 1px solid rgba(144, 238, 144, 0.2);
  background: rgba(255, 255, 255, 0.03);
  min-width: 120px;

  strong {
    display: block;
    font-size: 22px;
    color: ${({ theme }) => theme.accent};
    font-weight: 700;
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.text_secondary};
  }
`;

export const CTAGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  animation: ${fadeUp} 0.7s ease 0.4s both;

  @media (max-width: 960px) {
    justify-content: center;
  }
`;

export const ResumeButton = styled.a`
  text-decoration: none;
  padding: 14px 28px;
  color: #111;
  border-radius: 14px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  background: linear-gradient(135deg, #98fb98, #32cd32);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(144, 238, 144, 0.35);
  }
`;

export const SecondaryButton = styled.a`
  text-decoration: none;
  padding: 14px 28px;
  color: ${({ theme }) => theme.accent};
  border-radius: 14px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  border: 1.5px solid ${({ theme }) => theme.accent};
  transition: all 0.2s ease;

  &:hover {
    background: rgba(144, 238, 144, 0.1);
    transform: translateY(-2px);
  }
`;
