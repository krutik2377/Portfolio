import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Reveal = styled.div`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '28px')});
  transition: opacity 0.65s ease, transform 0.65s ease;
  transition-delay: ${({ $delay }) => $delay || '0ms'};
  display: ${({ $contents }) => ($contents ? 'contents' : 'block')};
`;

const ScrollReveal = ({ children, delay = 0, className, contents = false }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Reveal ref={ref} $visible={visible} $delay={`${delay}ms`} $contents={contents} className={className}>
      {children}
    </Reveal>
  );
};

export default ScrollReveal;
