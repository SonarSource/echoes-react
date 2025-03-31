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

import styled from '@emotion/styled';

export enum CardSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export const CardStyled = styled.div`
  background-color: var(--echoes-color-background-default);
  border: var(--echoes-border-width-default) solid var(--echoes-color-border-weak);
  border-radius: var(--echoes-border-radius-400);
  box-shadow: var(--echoes-box-shadow-xsmall);

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 470px;
  width: 100%;
`;

export const CardHeaderStyled = styled.header`
  align-items: center;
  display: flex;
  min-height: var(--card-header-min-height);
  padding: var(--card-header-padding);
`;

export const CardBodyStyled = styled.div<{ size: CardSize; insetContent: boolean }>`
  box-sizing: border-box;
  min-height: var(--card-body-min-height);
  padding: ${(props) => (props.insetContent ? '0' : 'var(--card-padding)')};
  width: 100%;

  & > * {
    height: 100%;
  }
`;

export const CARD_HEADER_SIZE_STYLES = {
  [CardSize.Small]: {
    '--card-header-padding': `var(--echoes-dimension-space-100) var(--echoes-dimension-space-150)`,
    '--card-header-min-height': '36px',
  },
  [CardSize.Medium]: {
    '--card-header-padding': `var(--echoes-dimension-space-150) var(--echoes-dimension-space-200)`,
    '--card-header-min-height': '45px',
  },
  [CardSize.Large]: {
    '--card-header-padding': `var(--echoes-dimension-space-200) var(--echoes-dimension-space-300)`,
    '--card-header-min-height': '58px',
  },
};

export const CARD_SIZE_STYLES = {
  [CardSize.Small]: {
    '--card-padding': 'var(--echoes-dimension-space-150)',
    '--card-body-min-height': '84px',
  },
  [CardSize.Medium]: {
    '--card-padding': 'var(--echoes-dimension-space-200)',
    '--card-body-min-height': '92px',
  },
  [CardSize.Large]: {
    '--card-padding': 'var(--echoes-dimension-space-300)',
    '--card-body-min-height': '108px',
  },
};
