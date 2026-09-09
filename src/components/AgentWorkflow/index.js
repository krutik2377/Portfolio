import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { agentWorkflowSteps } from '../../data/constants';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
`;

const PipelineNotice = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(144, 238, 144, 0.3);
  background: rgba(144, 238, 144, 0.08);
  font-size: 13px;
  line-height: 1.55;
  color: ${({ theme }) => theme.text_secondary};

  strong {
    color: ${({ theme }) => theme.accent};
  }
`;

const Flow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StepButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: ${({ $compact }) => ($compact ? '88px' : '100px')};
  padding: 12px 10px;
  border-radius: 14px;
  border: 1px solid
    ${({ $active, $vocPath, theme }) => {
      if ($active) return theme.accent;
      if ($vocPath) return 'rgba(144, 238, 144, 0.35)';
      return 'rgba(144, 238, 144, 0.15)';
    }};
  background: ${({ $active, $vocPath }) => {
    if ($active) return 'rgba(144, 238, 144, 0.15)';
    if ($vocPath) return 'rgba(144, 238, 144, 0.05)';
    return 'rgba(255, 255, 255, 0.02)';
  }};
  color: ${({ theme, $vocPath }) => ($vocPath ? theme.text_primary : theme.text_secondary)};
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${({ $active }) => ($active ? '0 0 20px rgba(144, 238, 144, 0.2)' : 'none')};
  opacity: ${({ $vocPath }) => ($vocPath === false ? 0.55 : 1)};

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.accent};
    opacity: 1;
  }
`;

const StepIcon = styled.span`
  font-size: 20px;
`;

const StepName = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-align: center;
  line-height: 1.3;
`;

const VocBadge = styled.span`
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.accent};
  padding: 2px 6px;
  border-radius: 999px;
  background: rgba(144, 238, 144, 0.12);
`;

const Arrow = styled.span`
  color: ${({ theme, $vocPath }) => ($vocPath ? theme.accent : 'rgba(144, 238, 144, 0.3)')};
  font-size: 16px;
  opacity: 0.8;
  user-select: none;

  @media (max-width: 640px) {
    display: none;
  }
`;

const DetailCard = styled.div`
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(144, 238, 144, 0.2);
  background: rgba(255, 255, 255, 0.03);
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const DetailTitle = styled.h4`
  margin: 0 0 8px;
  font-size: 18px;
  color: ${({ theme }) => theme.accent};
`;

const DetailDesc = styled.p`
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.65;
  color: ${({ theme }) => theme.text_secondary};
`;

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tech = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  color: ${({ theme }) => theme.text_primary};
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const ProgressBar = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 4px;
`;

const ProgressDot = styled.div`
  flex: 1;
  height: 4px;
  border-radius: 999px;
  background: ${({ $filled, theme }) =>
    $filled ? theme.accent : 'rgba(255, 255, 255, 0.08)'};
  transition: background 0.3s ease;
`;

const VocOutput = styled.div`
  margin-top: 16px;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid rgba(144, 238, 144, 0.25);
  background: rgba(144, 238, 144, 0.06);

  h5 {
    margin: 0 0 10px;
    font-size: 13px;
    color: ${({ theme }) => theme.accent};
  }

  p {
    margin: 0 0 6px;
    font-size: 13px;
    color: ${({ theme }) => theme.text_primary};
  }
`;

const AgentWorkflow = ({
  vocPayload,
  runPipeline,
  pipelineSteps = [],
  onPipelineComplete,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const step = agentWorkflowSteps[activeStep];

  useEffect(() => {
    if (!runPipeline || !pipelineSteps.length) return undefined;

    let i = 0;
    setActiveStep(pipelineSteps[0]);

    const interval = setInterval(() => {
      i += 1;
      if (i < pipelineSteps.length) {
        setActiveStep(pipelineSteps[i]);
      } else {
        clearInterval(interval);
        onPipelineComplete?.();
      }
    }, 900);

    return () => clearInterval(interval);
  }, [runPipeline, pipelineSteps, onPipelineComplete]);

  const insightStepIndex = agentWorkflowSteps.findIndex((s) => s.vocClassifierStep);
  const showVocOutput = vocPayload && activeStep === insightStepIndex;

  return (
    <Panel>
      {vocPayload && (
        <PipelineNotice>
          <strong>VoC pipeline active</strong> — animating your feedback through{' '}
          {pipelineSteps.map((idx) => agentWorkflowSteps[idx].name).join(' → ')}.
          The classifier results below come from the <strong>Insight Agent</strong> step.
        </PipelineNotice>
      )}

      <Flow>
        {agentWorkflowSteps.map((s, index) => {
          const isOnVocPath = s.vocPipeline;
          const nextOnVocPath = agentWorkflowSteps[index + 1]?.vocPipeline;

          return (
            <React.Fragment key={s.id}>
              <StepButton
                type="button"
                $active={activeStep === index}
                $vocPath={isOnVocPath}
                $compact={agentWorkflowSteps.length > 5}
                onClick={() => setActiveStep(index)}
                aria-pressed={activeStep === index}
              >
                <StepIcon>{s.icon}</StepIcon>
                <StepName>{s.name}</StepName>
                {s.vocClassifierStep && <VocBadge>VoC Demo</VocBadge>}
                {s.name === 'Orchestration' && <VocBadge>CrewAI</VocBadge>}
              </StepButton>
              {index < agentWorkflowSteps.length - 1 && (
                <Arrow $vocPath={isOnVocPath && nextOnVocPath}>→</Arrow>
              )}
            </React.Fragment>
          );
        })}
      </Flow>

      <ProgressBar>
        {agentWorkflowSteps.map((s, i) => (
          <ProgressDot key={s.id} $filled={i <= activeStep} />
        ))}
      </ProgressBar>

      <DetailCard>
        <DetailTitle>
          Step {activeStep + 1}: {step.name}
        </DetailTitle>
        <DetailDesc>{step.description}</DetailDesc>
        <TechRow>
          {step.tech.map((t) => (
            <Tech key={t}>{t}</Tech>
          ))}
        </TechRow>

        {showVocOutput && (
          <VocOutput>
            <h5>Insight Agent output (from VoC Classifier)</h5>
            <p>
              <strong>Sentiment:</strong>{' '}
              {vocPayload.sentiment.charAt(0).toUpperCase() + vocPayload.sentiment.slice(1)} (
              {vocPayload.confidence}% confidence)
            </p>
            <p>
              <strong>Themes:</strong> {vocPayload.themes.join(', ')}
            </p>
            <p>
              <strong>Suggested action:</strong> {vocPayload.suggestedAction}
            </p>
          </VocOutput>
        )}
      </DetailCard>
    </Panel>
  );
};

export default AgentWorkflow;
