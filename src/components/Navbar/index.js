import React from 'react';
import {
  Nav,
  NavIsland,
  NavLink,
  NavLogo,
  NavPill,
  GitHubButton,
  ButtonContainer,
  MobileIcon,
  MobileMenu,
  MobileLink,
  MobileActions,
  ThemeToggle,
  LogoMark,
  BrandText,
  Span,
  RoleHint,
} from './NavbarStyledComponent';
import { FaBars, FaGithub } from 'react-icons/fa';
import { Bio, navSections } from '../../data/constants';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { DarkMode, LightMode } from '@mui/icons-material';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const activeSection = useScrollSpy(navSections.map((s) => s.id));

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <Nav>
      <NavIsland $scrolled={scrolled}>
        <NavLogo to="/" onClick={closeMenu}>
          <LogoMark>KG</LogoMark>
          <BrandText>
            <Span>Krutik</Span>
            <RoleHint>AI Engineer</RoleHint>
          </BrandText>
        </NavLogo>

        <NavPill aria-label="Main navigation">
          {navSections.map(({ id, label }) => (
            <NavLink
              key={id}
              href={`#${id}`}
              $active={activeSection === id}
            >
              {label}
            </NavLink>
          ))}
        </NavPill>

        <ButtonContainer>
          <ThemeToggle
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            type="button"
          >
            {darkMode ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
          </ThemeToggle>
          <GitHubButton href={Bio.github} target="_blank" rel="noreferrer">
            <FaGithub size={14} />
            GitHub
          </GitHubButton>
        </ButtonContainer>

        <MobileIcon
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          type="button"
        >
          <FaBars />
        </MobileIcon>

        {isOpen && (
          <MobileMenu>
            {navSections.map(({ id, label }) => (
              <MobileLink
                key={id}
                href={`#${id}`}
                $active={activeSection === id}
                onClick={closeMenu}
              >
                {label}
              </MobileLink>
            ))}
            <MobileActions>
              <ThemeToggle
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle theme"
                type="button"
              >
                {darkMode ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
              </ThemeToggle>
              <GitHubButton
                style={{ display: 'flex', flex: 1, justifyContent: 'center' }}
                href={Bio.github}
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub size={14} />
                GitHub
              </GitHubButton>
            </MobileActions>
          </MobileMenu>
        )}
      </NavIsland>
    </Nav>
  );
};

export default Navbar;
