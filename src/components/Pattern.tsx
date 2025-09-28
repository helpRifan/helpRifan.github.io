import React from "react";
import styled from "styled-components";

const Pattern: React.FC = () => {
  return (
    <StyledWrapper aria-hidden>
      <div className="matrix-container">
        {Array.from({ length: 5 }).map((_, row) => (
          <div className="matrix-pattern" key={`row-${row}`}>
            {Array.from({ length: 40 }).map((_, col) => {
              const left = Math.floor(Math.random() * 1000);
              const delay = -(2 + Math.random() * 6); // slower negative delay
              const duration = 6 + Math.random() * 8; // 6s - 14s
              return (
                <div
                  className="matrix-column"
                  key={`col-${row}-${col}`}
                  style={{
                    // @ts-expect-error: CSS variables
                    "--left": `${left}px`,
                    
                    "--delay": `${delay}s`,
                   
                    "--duration": `${duration}s`,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  .matrix-container {
    position: relative;
    width: 100%;
    height: 100%;
    background: transparent;
    display: flex;
    overflow: hidden;
  }

  .matrix-pattern {
    position: relative;
    width: 1000px;
    height: 100%;
    flex-shrink: 0;
  }

  .matrix-column {
    position: absolute;
    top: -100%;
    width: 20px;
    height: 100%;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
    left: var(--left);
    animation: fall linear infinite;
    animation-delay: var(--delay);
    animation-duration: var(--duration);
    white-space: nowrap;
  }

  .matrix-column::before {
    content: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      to bottom,
      #110a19 0%,
      #4c1d95 5%,
      /* purple gradient */
      #a78bfa 10%,
      #7c3aed 20%,
      #8b5cf6 30%,
      #7c3aed 40%,
      #7c3aed 50%,
      #5b21b6 60%,
      #4c1d95 70%,
      #110a19 80%,
      rgba(17, 10, 25, 1) 90%,
      transparent 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    writing-mode: vertical-lr;
    letter-spacing: 1px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* per-column positioning is randomized via CSS variables set inline */

  .matrix-column:nth-child(odd)::before {
    content: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン123456789";
  }

  .matrix-column:nth-child(even)::before {
    content: "ガギグゲゴザジズゼRifanゾダヂヅデドバビブベボパピプペポヴァィゥェォャュョッABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  .matrix-column:nth-child(3n)::before {
    content: "アカサタナハマヤラワイキシチニヒミリウクスツヌrifanフムユルエケセテネヘメレオコソトノホモヨロヲン0987654321";
  }

  .matrix-column:nth-child(4n)::before {
    content: "ンヲロヨモホノトソコオレメヘネテセケエルユムフヌツスreeefanクウリミヒニチシキイワラヤマハナタサカア";
  }

  .matrix-column:nth-child(5n)::before {
    content: "ガザダバパギジヂビピグズヅブプゲゼデベペRIFAANNNボポヴァィゥェォャュョッ!@#$%^&*()_+-=[]{}|;:,.<>?";
  }

  @keyframes fall {
    0% {
      transform: translateY(-10%);
      opacity: 1;
    }
    100% {
      transform: translateY(200%);
      opacity: 0;
    }
  }

  /* fade out at the bottom - smooth dissolve into dark background */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(to bottom, rgba(17, 10, 25, 0) 0%, rgba(17, 10, 25, 0) 70%, rgba(17, 10, 25, 0.3) 85%, rgba(17, 10, 25, 0) 100%);
  }

  /* apply mask for better cross-browser dissolving */
  .matrix-container {
    -webkit-mask-image: linear-gradient(to bottom, rgba(17, 10, 25, 1) 0%, rgba(17, 10, 25, 1) 70%, rgba(17, 10, 25, 0) 100%);
            mask-image: linear-gradient(to bottom, rgba(17, 10, 25, 1) 0%, rgba(17, 10, 25, 1) 70%, rgba(17, 10, 25, 0) 100%);
  }

  @media (max-width: 768px) {
    .matrix-column {
      font-size: 14px;
      line-height: 16px;
      width: 18px;
    }
  }

  @media (max-width: 480px) {
    .matrix-column {
      font-size: 12px;
      line-height: 14px;
      width: 15px;
    }
  }
`;

export default Pattern;


