import { Link as LinkR } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

export const Nav = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 14px 20px 0;
  pointer-events: none;

  @media (max-width: 900px) {
    padding: 12px 14px 0;
  }
`;

export const NavIsland = styled.div`
  pointer-events: auto;
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  padding: ${({ $scrolled }) => ($scrolled ? '8px 10px 8px 14px' : '10px 12px 10px 16px')};
  border-radius: ${({ $scrolled }) => ($scrolled ? '16px' : '22px')};
  background: ${({ theme, $scrolled }) =>
    $scrolled ? `${theme.card_light}e6` : `${theme.card_light}b3`};
  backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid rgba(144, 238, 144, 0.22);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    ${({ $scrolled }) => ($scrolled ? '0 0 48px rgba(144, 238, 144, 0.1)' : 'none')};
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(144, 238, 144, 0.45),
      rgba(144, 238, 144, 0.05) 40%,
      rgba(50, 205, 50, 0.35)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0.7;
  }
`;

export const NavbarContainer = styled.div`
  display: contents;
`;

export const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  z-index: 1;
`;

export const LogoMark = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 13px;
  color: #111;
  background: linear-gradient(135deg, #98fb98, #32cd32);
  box-shadow: 0 0 24px rgba(144, 238, 144, 0.35);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 14px;
    border: 1px solid rgba(144, 238, 144, 0.35);
    animation: ${shimmer} 3s ease-in-out infinite;
  }
`;

export const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.15;

  @media (max-width: 640px) {
    display: none;
  }
`;

export const Span = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
`;

export const RoleHint = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.accent};
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const NavPill = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 4px;
  margin: 0 auto;
  max-width: 100%;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.28);
  border: 1px solid rgba(255, 255, 255, 0.06);
  overflow-x: auto;
  scrollbar-width: none;
  z-index: 1;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const NavItems = styled.ul`
  display: contents;
  list-style: none;
`;

export const NavLink = styled.a`
  padding: 8px 13px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 600;
  white-space: nowrap;
  text-decoration: none;
  letter-spacing: 0.01em;
  color: ${({ theme, $active }) => ($active ? '#111' : theme.text_secondary)};
  background: ${({ $active, theme }) =>
    $active
      ? `linear-gradient(135deg, ${theme.accent} 0%, #32cd32 100%)`
      : 'transparent'};
  box-shadow: ${({ $active }) =>
    $active ? '0 4px 16px rgba(144, 238, 144, 0.35)' : 'none'};
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    color: ${({ $active, theme }) => ($active ? '#111' : theme.accent)};
    background: ${({ $active, theme }) =>
      $active ? undefined : 'rgba(144, 238, 144, 0.1)'};
    transform: ${({ $active }) => ($active ? 'none' : 'translateY(-1px)')};
  }
`;

export const GitHubButton = styled.a`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  color: #111;
  background: linear-gradient(135deg, rgba(144, 238, 144, 0.9), rgba(50, 205, 50, 0.85));
  box-shadow: 0 4px 20px rgba(144, 238, 144, 0.25);
  transition: all 0.25s ease;
  z-index: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(144, 238, 144, 0.4);
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const ThemeToggle = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid rgba(144, 238, 144, 0.25);
  background: rgba(255, 255, 255, 0.04);
  color: ${({ theme }) => theme.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
  z-index: 1;

  &:hover {
    background: rgba(144, 238, 144, 0.12);
    transform: rotate(15deg) scale(1.05);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MobileIcon = styled.button`
  display: none;
  background: rgba(144, 238, 144, 0.1);
  border: 1px solid rgba(144, 238, 144, 0.25);
  border-radius: 12px;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.accent};
  font-size: 1.1rem;
  margin-left: auto;
  z-index: 1;

  @media (max-width: 900px) {
    display: flex;
  }
`;

export const MobileMenu = styled.div`
  pointer-events: auto;
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  background: ${({ theme }) => theme.card_light}f2;
  backdrop-filter: blur(24px);
  border-radius: 18px;
  border: 1px solid rgba(144, 238, 144, 0.2);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  animation: slideDown 0.25s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const MobileLink = styled.a`
  padding: 12px 16px;
  border-radius: 12px;
  color: ${({ theme, $active }) => ($active ? '#111' : theme.text_primary)};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  font-size: 15px;
  text-decoration: none;
  background: ${({ $active, theme }) =>
    $active ? `linear-gradient(135deg, ${theme.accent}, #32cd32)` : 'transparent'};
  transition: background 0.2s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? undefined : 'rgba(144, 238, 144, 0.08)'};
  }
`;

export const MobileActions = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: 4px;
`;
