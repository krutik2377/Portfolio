import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { Snackbar, Alert } from '@mui/material';
import { Bio } from '../../data/constants';
import SectionHeader from '../shared/SectionHeader';
import { sectionDescriptions } from '../../styles/tokens';
import { GitHub, LinkedIn, Email, LocationOn, Phone } from '@mui/icons-material';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
`;

const Layout = styled.div`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 32px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 28px;
  border-radius: 20px;
  border: 1px solid rgba(144, 238, 144, 0.2);
  background: ${({ theme }) => theme.card};
`;

const InfoTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

const InfoText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
`;

const InfoItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  font-size: 15px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.2s ease;

  svg {
    color: ${({ theme }) => theme.accent};
  }

  &:hover {
    border-color: rgba(144, 238, 144, 0.4);
    background: rgba(144, 238, 144, 0.06);
  }
`;

const InfoStatic = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 15px;
  padding: 12px 16px;

  svg {
    color: ${({ theme }) => theme.accent};
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 28px;
  border-radius: 20px;
  border: 1px solid rgba(144, 238, 144, 0.2);
  background: ${({ theme }) => theme.card};
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
`;

const Input = styled.input`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
  }
`;

const TextArea = styled.textarea`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  resize: vertical;
  min-height: 120px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
  }
`;

const SubmitButton = styled.button`
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  color: #111;
  background: linear-gradient(135deg, #98fb98, #32cd32);
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs
      .sendForm('service_ssvo6c4', 'template_nb2lobe', form.current, 'eyIQzIvDSlKAgSPrg')
      .then(() => {
        setOpen(true);
        form.current.reset();
      })
      .catch((error) => console.log(error.text))
      .finally(() => setSending(false));
  };

  return (
    <Container id="contact">
      <SectionHeader
        title="Get In"
        highlight="Touch"
        description={sectionDescriptions.contact}
      />

      <Layout>
        <InfoPanel>
          <InfoTitle>Let's connect</InfoTitle>
          <InfoText>
            Open to lead developer and AI engineering roles, consulting, and
            collaboration on enterprise AI platforms.
          </InfoText>
          <InfoItem href={`mailto:${Bio.email}`}>
            <Email /> {Bio.email}
          </InfoItem>
          {Bio.phone && (
            <InfoItem href={`tel:${Bio.phone.replace(/[^\d+]/g, '')}`}>
              <Phone /> {Bio.phone}
            </InfoItem>
          )}
          <InfoItem href={Bio.linkedin} target="_blank" rel="noreferrer">
            <LinkedIn /> LinkedIn Profile
          </InfoItem>
          <InfoItem href={Bio.github} target="_blank" rel="noreferrer">
            <GitHub /> GitHub Profile
          </InfoItem>
          <InfoStatic>
            <LocationOn /> Montreal, Canada (Remote)
          </InfoStatic>
        </InfoPanel>

        <ContactForm ref={form} onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="from_name">Name</Label>
            <Input id="from_name" name="from_name" placeholder="Your name" required />
          </Field>
          <Field>
            <Label htmlFor="from_email">Email</Label>
            <Input id="from_email" name="from_email" type="email" placeholder="you@email.com" required />
          </Field>
          <Field>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" placeholder="What's this about?" required />
          </Field>
          <Field>
            <Label htmlFor="message">Message</Label>
            <TextArea id="message" name="message" placeholder="Your message..." required />
          </Field>
          <SubmitButton type="submit" disabled={sending}>
            {sending ? 'Sending...' : 'Send Message'}
          </SubmitButton>
        </ContactForm>
      </Layout>

      <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
        <Alert severity="success" variant="filled">
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
