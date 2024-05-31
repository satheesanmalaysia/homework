
import React from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.toggleBorder};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;

  margin: 0 auto;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;

  outline: none;
`;

const SunIcon = styled.span`
  height: auto;
  width: 2rem;
  transition: all 0.3s linear;
`;

const MoonIcon = styled.span`
  height: auto;
  width: 2rem;
  transition: all 0.3s linear;
`;

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <ToggleContainer onClick={toggleTheme}>
            <SunIcon role="img" aria-label="Sun">☀️</SunIcon>
            <MoonIcon role="img" aria-label="Moon">🌙</MoonIcon>
        </ToggleContainer>
    );
}

export default ThemeToggle;
