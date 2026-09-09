import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import SectionHeader from '../shared/SectionHeader';
import VoCClassifier from '../VoCClassifier';
import AgentWorkflow from '../AgentWorkflow';
import ScrollReveal from '../shared/ScrollReveal';
import { agentWorkflowSteps } from '../../data/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
`;

const Wrapper = styled.div`
  width: min(1100px, 100%);
  margin: 0 auto;
`;

const ConnectionBanner = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 20px 0 0;
  padding: 12px 18px;
  border-radius: 14px;
  border: 1px dashed rgba(144, 238, 144, 0.35);
  background: rgba(144, 238, 144, 0.06);
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;

  strong {
    color: ${({ theme }) => theme.accent};
  }
`;

const TabRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 24px 0 20px;
  justify-content: center;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid
    ${({ $active, theme }) => ($active ? theme.accent : 'rgba(144, 238, 144, 0.25)')};
  background: ${({ $active }) =>
    $active ? 'rgba(144, 238, 144, 0.15)' : 'rgba(255, 255, 255, 0.03)'};
  color: ${({ $active, theme }) => ($active ? theme.accent : theme.text_secondary)};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accent};
  }
`;

const DemoCard = styled.div`
  padding: 28px;
  border-radius: 20px;
  border: 1px solid rgba(144, 238, 144, 0.2);
  background: ${({ theme }) => theme.card};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  min-height: 420px;
`;

const DemoLabel = styled.p`
  margin: 0 0 16px;
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
`;

const TABS = [
  {
    key: 'voc',
    label: 'VoC Classifier',
    description:
      'Step 1 — Paste customer feedback. The classifier runs the Insight Agent logic (sentiment, themes, suggested action). Then trace it through the full orchestrated pipeline.',
  },
  {
    key: 'agents',
    label: 'Agent Workflow',
    description:
      'Step 2 — See how CrewAI orchestration routes your VoC input through Router → Orchestration → Insight → Report agents. Analyze feedback first, then click “Run through pipeline”.',
  },
];

const vocPipelineIndices = agentWorkflowSteps
  .map((step, index) => (step.vocPipeline ? index : null))
  .filter((index) => index !== null);

const AIPlayground = () => {
  const [tab, setTab] = useState('voc');
  const [vocPayload, setVocPayload] = useState(null);
  const [runPipeline, setRunPipeline] = useState(false);
  const active = TABS.find((t) => t.key === tab);

  const handleRunPipeline = useCallback((payload) => {
    setVocPayload(payload);
    setRunPipeline(true);
    setTab('agents');
  }, []);

  const handlePipelineComplete = useCallback(() => {
    setRunPipeline(false);
  }, []);

  return (
    <Container id="playground">
      <Wrapper>
        <SectionHeader
          title="AI"
          highlight="Playground"
          description="Two connected demos — the VoC Classifier runs Insight Agent logic, then flows through the CrewAI orchestration pipeline."
        />

        <ConnectionBanner>
          <strong>Connected flow:</strong> VoC Classifier (Insight Agent) → Orchestration → Report Agent
        </ConnectionBanner>

        <TabRow>
          {TABS.map((t) => (
            <Tab key={t.key} type="button" $active={tab === t.key} onClick={() => setTab(t.key)}>
              {t.label}
            </Tab>
          ))}
        </TabRow>

        <DemoLabel>{active.description}</DemoLabel>

        <ScrollReveal>
          <DemoCard>
            {tab === 'voc' ? (
              <VoCClassifier onRunPipeline={handleRunPipeline} />
            ) : (
              <AgentWorkflow
                vocPayload={vocPayload}
                runPipeline={runPipeline}
                pipelineSteps={vocPipelineIndices}
                onPipelineComplete={handlePipelineComplete}
              />
            )}
          </DemoCard>
        </ScrollReveal>
      </Wrapper>
    </Container>
  );
};

export default AIPlayground;
