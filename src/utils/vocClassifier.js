const THEME_KEYWORDS = {
  Billing: ['bill', 'billing', 'charge', 'charged', 'payment', 'pay', 'refund', 'invoice', 'price', 'cost', 'subscription', 'fee', 'overcharged'],
  Support: ['support', 'help', 'agent', 'wait', 'waiting', 'response', 'ticket', 'service', 'representative', 'callback', 'hold'],
  Product: ['feature', 'bug', 'broken', 'crash', 'app', 'software', 'update', 'version', 'glitch', 'error', 'slow', 'performance'],
  Delivery: ['shipping', 'delivery', 'deliver', 'late', 'arrived', 'package', 'order', 'tracking', 'shipment'],
  Account: ['login', 'password', 'account', 'access', 'sign in', 'signin', 'locked', 'verify', 'authentication'],
  Onboarding: ['setup', 'onboard', 'tutorial', 'guide', 'getting started', 'confusing', 'learn'],
};

const POSITIVE = [
  'great', 'love', 'excellent', 'amazing', 'thank', 'thanks', 'happy', 'good', 'wonderful',
  'fantastic', 'perfect', 'awesome', 'helpful', 'satisfied', 'recommend', 'impressed', 'best',
  'quick', 'easy', 'smooth', 'resolved', 'appreciate',
];

const NEGATIVE = [
  'terrible', 'awful', 'hate', 'worst', 'angry', 'frustrated', 'broken', 'never', 'bad', 'poor',
  'disappointed', 'horrible', 'useless', 'unacceptable', 'ridiculous', 'furious', 'slow', 'failed',
  'problem', 'issue', 'complaint', 'unhappy', 'disaster', 'nightmare', 'still waiting', 'no response',
];

const ACTIONS = {
  'negative-Billing': 'Escalate to billing team within 4 hours. Review charges and initiate refund workflow if validated.',
  'negative-Support': 'Assign to senior support agent. Target first response within 30 minutes and proactive status update.',
  'negative-Product': 'Log as P1 defect, notify product owner, and send workaround steps to the customer within 2 hours.',
  'negative-Delivery': 'Trigger logistics investigation and offer expedited reship or compensation if SLA was missed.',
  'negative-Account': 'Route to identity & access team. Enable secure account recovery and MFA reset assistance.',
  'negative-Onboarding': 'Schedule guided onboarding session and share updated documentation / video walkthrough.',
  'negative-default': 'Open high-priority ticket, acknowledge within 15 minutes, and assign dedicated owner for follow-up.',
  'neutral-Billing': 'Send billing FAQ and offer live chat with a billing specialist for clarification.',
  'neutral-Support': 'Provide self-service resources and offer optional callback if issue persists.',
  'neutral-Product': 'Capture feature request or bug details and share expected timeline from product roadmap.',
  'neutral-default': 'Acknowledge feedback, categorize for VoC analytics, and schedule routine follow-up.',
  'positive-default': 'Send thank-you response, request optional review, and tag for testimonial / success story pipeline.',
};

const normalize = (text) => text.toLowerCase().replace(/[^\w\s']/g, ' ');

const countMatches = (text, words) =>
  words.reduce((count, word) => (text.includes(word) ? count + 1 : count), 0);

export const classifyFeedback = (rawText) => {
  const text = normalize(rawText.trim());

  if (!text) {
    return {
      sentiment: 'neutral',
      sentimentScore: 0,
      confidence: 0,
      themes: [],
      primaryTheme: null,
      suggestedAction: 'Paste customer feedback above to run the VoC classifier demo.',
      highlights: [],
    };
  }

  const posScore = countMatches(text, POSITIVE);
  const negScore = countMatches(text, NEGATIVE);

  let sentiment = 'neutral';
  if (posScore > negScore && posScore > 0) sentiment = 'positive';
  if (negScore > posScore && negScore > 0) sentiment = 'negative';
  if (negScore > 0 && posScore > 0 && Math.abs(posScore - negScore) <= 1) sentiment = 'neutral';

  const sentimentScore = Math.min(100, Math.round(((posScore - negScore + 3) / 6) * 100));

  const themeScores = Object.entries(THEME_KEYWORDS)
    .map(([theme, keywords]) => ({
      theme,
      score: countMatches(text, keywords),
      matched: keywords.filter((k) => text.includes(k)),
    }))
    .filter((t) => t.score > 0)
    .sort((a, b) => b.score - a.score);

  const themes = themeScores.map((t) => t.theme);
  const primaryTheme = themes[0] || null;

  const actionKey =
    sentiment === 'positive'
      ? 'positive-default'
      : `${sentiment}-${primaryTheme || 'default'}`;

  const suggestedAction = ACTIONS[actionKey] || ACTIONS[`${sentiment}-default`] || ACTIONS['neutral-default'];

  const confidence = Math.min(
    98,
    55 + themeScores.length * 8 + Math.max(posScore, negScore) * 6
  );

  const highlights = themeScores
    .flatMap((t) => t.matched)
    .slice(0, 5);

  return {
    sentiment,
    sentimentScore,
    confidence,
    themes: themes.length ? themes : ['General'],
    primaryTheme: primaryTheme || 'General',
    suggestedAction,
    highlights,
    posScore,
    negScore,
  };
};

export const SAMPLE_FEEDBACK = [
  {
    label: 'Billing complaint',
    text: 'I was charged twice on my invoice this month and nobody from support has responded to my ticket for 3 days. This is unacceptable.',
  },
  {
    label: 'Product praise',
    text: 'Love the new dashboard update — setup was easy and the app feels much faster. Thank you for the excellent work!',
  },
  {
    label: 'Support frustration',
    text: 'Been on hold for 45 minutes trying to reset my account password. The login keeps failing and I need access urgently.',
  },
];
