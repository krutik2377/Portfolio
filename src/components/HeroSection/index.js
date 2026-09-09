import React from 'react';
import HeroBgAnimation from '../HeroBgAnimation';
import {
  HeroContainer,
  PhotoWrapper,
  HeroBg,
  HeroLeftContainer,
  Img,
  HeroRightContainer,
  HeroInnerContainer,
  TextLoop,
  Title,
  Tagline,
  Span,
  SubTitle,
  ResumeButton,
  StatsRow,
  StatCard,
  CTAGroup,
  SecondaryButton,
} from './HeroStyle';
import HeroImg from '../../images/HeroImage.jpg';
import Typewriter from 'typewriter-effect';
import { Bio, heroStats } from '../../data/constants';

const HeroSection = () => {
  return (
    <div id="about">
      <HeroContainer>
        <HeroInnerContainer>
          <HeroLeftContainer>
            <PhotoWrapper>
              <HeroBg>
                <HeroBgAnimation />
              </HeroBg>
              <Img src={HeroImg} alt="Krutik Gevariya" />
            </PhotoWrapper>
          </HeroLeftContainer>

          <HeroRightContainer>
            <Title>
              Hi, I am <br /> {Bio.name}
            </Title>
            {Bio.tagline && <Tagline>{Bio.tagline}</Tagline>}
            <TextLoop>
              I am a
              <Span>
                <Typewriter
                  options={{
                    strings: Bio.roles,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Span>
            </TextLoop>
            <SubTitle>{Bio.description}</SubTitle>

            <StatsRow>
              {heroStats.map((stat) => (
                <StatCard key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </StatCard>
              ))}
            </StatsRow>

            <CTAGroup>
              <ResumeButton href={Bio.resume} target="_blank" rel="noreferrer">
                View Resume
              </ResumeButton>
              <SecondaryButton href="#projects">See AI Projects</SecondaryButton>
            </CTAGroup>
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  );
};

export default HeroSection;
