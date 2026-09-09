import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js';
import Navbar from "./components/Navbar";
import './App.css';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Publications from "./components/Publications";
import ProjectDetails from "./components/ProjectDetails";
import TechMarquee from "./components/shared/TechMarquee";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import AIPlayground from "./components/AIPlayground";
import GitHubActivity from "./components/GitHubActivity";
import CaseStudyPage from "./components/CaseStudy";
import styled from "styled-components";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  color: ${({ theme }) => theme.text_primary};
`;

const SectionWrap = styled.div`
  width: 100%;
  background: transparent;
`;

function HomePage({ darkMode, setDarkMode, openModal, setOpenModal }) {
  return (
    <Body>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <HeroSection />
      <SectionWrap>
        <Publications />
      </SectionWrap>
      <TechMarquee />
      <SectionWrap>
        <AIPlayground />
      </SectionWrap>
      <SectionWrap>
        <Experience />
      </SectionWrap>
      <Projects openModal={openModal} setOpenModal={setOpenModal} />
      <SectionWrap>
        <GitHubActivity />
      </SectionWrap>
      <SectionWrap>
        <Skills />
      </SectionWrap>
      <Education />
      <SectionWrap>
        <Contact />
      </SectionWrap>
      <Footer />
      {openModal.state && (
        <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </Body>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const theme = darkMode ? darkTheme : lightTheme;

  useEffect(() => {
    document.body.style.backgroundColor = theme.bg;
    document.documentElement.style.backgroundColor = theme.bg;
  }, [theme.bg]);

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                />
              }
            />
            <Route
              path="/case-study/:slug"
              element={
                <Body>
                  <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                  <CaseStudyPage />
                  <Footer />
                </Body>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
