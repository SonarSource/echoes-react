/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { screenReaderOnly } from '~common/helpers/styles';

import { cssVar } from '~utils/design-tokens';

export const SpinnerWrapper = styled.span<{ inline: boolean }>`
  position: relative;
  display: ${displaySwitcher};
`;
SpinnerWrapper.displayName = 'SpinnerWrapper';

export const SpinnerInner = styled.span<{ inline: boolean; isLoading: boolean }>`
  position: relative;
  display: ${displaySwitcher};
  height: var(--echoes-dimension-height-400);
  ${({ isLoading }) => (isLoading ? '' : screenReaderOnly)}
`;
SpinnerInner.displayName = 'SpinnerInner';

export const SpinnerAriaLabel = styled.span`
  ${screenReaderOnly};
`;
SpinnerAriaLabel.displayName = 'SpinnerAriaLabel';

export const SpinnerLabel = styled.span`
  margin-left: ${cssVar('dimension-space-50')};
`;
SpinnerLabel.displayName = 'SpinnerLabel';

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-360deg);
  }
`;

export const SpinnerStyled = styled.span<{ inline: boolean }>`
  border: 2px solid transparent;
  background:
    linear-gradient(0deg, ${cssVar('color-background-accent-default')} 50%, transparent 50% 100%)
      border-box,
    linear-gradient(90deg, ${cssVar('color-background-accent-default')} 25%, transparent 75% 100%)
      border-box;
  mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: ${spinAnimation} 1s infinite linear;

  display: ${displaySwitcher};
  box-sizing: border-box;
  height: ${cssVar('dimension-height-400')};
  width: ${cssVar('dimension-width-200')};
  border-radius: ${cssVar('border-radius-full')};
  vertical-align: text-bottom;
`;
SpinnerStyled.displayName = 'SpinnerStyled';

export const SpinnerPlaceholder = styled.div`
  display: inline-block;
  vertical-align: text-bottom;
  visibility: hidden;
  height: ${cssVar('dimension-height-400')};
  width: ${cssVar('dimension-width-200')};
`;
SpinnerPlaceholder.displayName = 'SpinnerPlaceholder';

function displaySwitcher(options: { inline: boolean }) {
  return options.inline ? 'inline-block' : 'block';
}
