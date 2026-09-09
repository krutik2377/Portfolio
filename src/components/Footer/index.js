import styled from 'styled-components';
import { GitHub, LinkedIn, Email, Phone, KeyboardArrowUp } from '@mui/icons-material';
import { Bio, navSections } from '../../data/constants';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 48px 20px 32px;
  border-top: 1px solid rgba(144, 238, 144, 0.15);
  background: ${({ theme }) => theme.card_light};
`;

const FooterWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Logo = styled.div`
  font-weight: 800;
  font-size: 22px;
  color: ${({ theme }) => theme.accent};
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 16px;
`;

const SocialLink = styled.a`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.accent};
  border: 1px solid rgba(144, 238, 144, 0.25);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(144, 238, 144, 0.12);
    transform: translateY(-2px);
  }
`;

const Meta = styled.div`
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
`;

const BackToTop = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid rgba(144, 238, 144, 0.3);
  background: transparent;
  color: ${({ theme }) => theme.accent};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(144, 238, 144, 0.1);
  }
`;

function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo>{Bio.name}</Logo>
        <Nav>
          {navSections.map(({ id, label }) => (
            <NavLink key={id} href={`#${id}`}>
              {label}
            </NavLink>
          ))}
        </Nav>
        <SocialRow>
          <SocialLink href={Bio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedIn />
          </SocialLink>
          <SocialLink href={Bio.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHub />
          </SocialLink>
          <SocialLink href={`mailto:${Bio.email}`} aria-label="Email">
            <Email />
          </SocialLink>
          <SocialLink href={`tel:${Bio.phone?.replace(/[^\d+]/g, '')}`} aria-label="Phone">
            <Phone />
          </SocialLink>
        </SocialRow>
        <BackToTop type="button" onClick={scrollTop}>
          Back to top <KeyboardArrowUp fontSize="small" />
        </BackToTop>
        <Meta>
          © {new Date().getFullYear()} {Bio.name}. Built with React & styled-components.
        </Meta>
      </FooterWrapper>
    </FooterContainer>
  );
}

export default Footer;
