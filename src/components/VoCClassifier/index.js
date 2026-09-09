import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { classifyFeedback, SAMPLE_FEEDBACK } from '../../utils/vocClassifier';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid rgba(144, 238, 144, 0.25);
  background: rgba(0, 0, 0, 0.25);
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 3px rgba(144, 238, 144, 0.12);
  }

  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const SampleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SampleChip = styled.button`
  border: 1px solid rgba(144, 238, 144, 0.25);
  background: rgba(144, 238, 144, 0.08);
  color: ${({ theme }) => theme.accent};
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(144, 238, 144, 0.16);
    transform: translateY(-1px);
  }
`;

const AnalyzeButton = styled.button`
  align-self: flex-start;
  border: none;
  border-radius: 12px;
  padding: 12px 22px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  color: #111;
  background: linear-gradient(135deg, #98fb98, #32cd32);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(144, 238, 144, 0.25);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  border-radius: 16px;
  border: 1px solid rgba(144, 238, 144, 0.2);
  background: rgba(255, 255, 255, 0.03);
  animation: fadeIn 0.35s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ResultRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text_secondary};
`;

const SentimentBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  color: ${({ $sentiment }) =>
    $sentiment === 'positive' ? '#111' : $sentiment === 'negative' ? '#fff' : '#111'};
  background: ${({ $sentiment }) =>
    $sentiment === 'positive'
      ? 'linear-gradient(135deg, #98fb98, #32cd32)'
      : $sentiment === 'negative'
      ? 'linear-gradient(135deg, #ff6b6b, #c0392b)'
      : 'linear-gradient(135deg, #ffd93d, #f39c12)'};
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ThemeTag = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 999px;
  color: ${({ theme }) => theme.accent};
  background: rgba(144, 238, 144, 0.1);
  border: 1px solid rgba(144, 238, 144, 0.25);
`;

const ActionBox = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.65;
  color: ${({ theme }) => theme.text_primary};
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(144, 238, 144, 0.06);
  border-left: 3px solid ${({ theme }) => theme.accent};
`;

const Meta = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
`;

const PipelineButton = styled.button`
  align-self: flex-start;
  border: 1.5px solid ${({ theme }) => theme.accent};
  border-radius: 12px;
  padding: 12px 22px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ theme }) => theme.accent};
  background: rgba(144, 238, 144, 0.08);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(144, 238, 144, 0.16);
    transform: translateY(-2px);
  }
`;

const ConnectionNote = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.55;
  color: ${({ theme }) => theme.text_secondary};
  padding-top: 4px;
  border-top: 1px solid rgba(144, 238, 144, 0.12);
`;

const VoCClassifier = ({ onRunPipeline }) => {
  const [input, setInput] = useState('');
  const [analyzed, setAnalyzed] = useState(false);

  const result = useMemo(() => {
    if (!analyzed) return null;
    return classifyFeedback(input);
  }, [input, analyzed]);

  const handleAnalyze = () => setAnalyzed(true);

  return (
    <Panel>
      <TextArea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setAnalyzed(false);
        }}
        placeholder="Paste customer feedback here… e.g. billing issues, support delays, product bugs"
      />

      <SampleRow>
        {SAMPLE_FEEDBACK.map((sample) => (
          <SampleChip
            key={sample.label}
            type="button"
            onClick={() => {
              setInput(sample.text);
              setAnalyzed(true);
            }}
          >
            {sample.label}
          </SampleChip>
        ))}
      </SampleRow>

      <AnalyzeButton type="button" onClick={handleAnalyze} disabled={!input.trim()}>
        Analyze Feedback
      </AnalyzeButton>

      {result && (
        <Results>
          <ResultRow>
            <Label>Sentiment</Label>
            <SentimentBadge $sentiment={result.sentiment}>
              {result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}
              <Meta>({result.confidence}% confidence)</Meta>
            </SentimentBadge>
          </ResultRow>

          <ResultRow>
            <Label>Theme Tags</Label>
            <TagRow>
              {result.themes.map((theme) => (
                <ThemeTag key={theme}>{theme}</ThemeTag>
              ))}
            </TagRow>
          </ResultRow>

          <ResultRow>
            <Label>Suggested Action</Label>
            <ActionBox>{result.suggestedAction}</ActionBox>
          </ResultRow>

          {result.highlights.length > 0 && (
            <Meta>Detected signals: {result.highlights.join(', ')}</Meta>
          )}

          <ConnectionNote>
            This analysis runs <strong>Insight Agent</strong> logic. In production, CrewAI{' '}
            <strong>orchestration</strong> routes it through Router → Orchestration → Insight →
            Report agents.
          </ConnectionNote>

          {onRunPipeline && (
            <PipelineButton type="button" onClick={() => onRunPipeline(result)}>
              Run through agent pipeline →
            </PipelineButton>
          )}
        </Results>
      )}
    </Panel>
  );
};

export default VoCClassifier;
