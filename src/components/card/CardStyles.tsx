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
import { CardSize } from './CardSize';

import { cssVar } from '~utils/design-tokens';

export const CardStyled = styled.div`
  background-color: ${cssVar('color-surface-default')};
  border: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  border-radius: ${cssVar('border-radius-400')};
  box-shadow: ${cssVar('box-shadow-xsmall')};

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 470px;
  width: 100%;
`;
CardStyled.displayName = 'CardStyled';

export const CardHeaderStyled = styled.header`
  align-items: center;
  display: flex;
  min-height: var(--card-header-min-height);
  padding: var(--card-header-padding);
`;
CardHeaderStyled.displayName = 'CardHeaderStyled';

export const CardBodyStyled = styled.div<{ size: `${CardSize}`; insetContent: boolean }>`
  box-sizing: border-box;
  min-height: var(--card-body-min-height);
  padding: ${(props) => (props.insetContent ? '0' : 'var(--card-padding)')};
  width: 100%;

  & > * {
    height: 100%;
  }
`;
CardBodyStyled.displayName = 'CardBodyStyled';

export const CARD_HEADER_SIZE_STYLES = {
  [CardSize.Small]: {
    '--card-header-padding': `${cssVar('dimension-space-100')} ${cssVar('dimension-space-150')}`,
    '--card-header-min-height': '36px',
  },
  [CardSize.Medium]: {
    '--card-header-padding': `${cssVar('dimension-space-150')} ${cssVar('dimension-space-200')}`,
    '--card-header-min-height': '45px',
  },
  [CardSize.Large]: {
    '--card-header-padding': `${cssVar('dimension-space-200')} ${cssVar('dimension-space-300')}`,
    '--card-header-min-height': '58px',
  },
};

export const CARD_SIZE_STYLES = {
  [CardSize.Small]: {
    '--card-padding': cssVar('dimension-space-150'),
    '--card-body-min-height': '84px',
  },
  [CardSize.Medium]: {
    '--card-padding': cssVar('dimension-space-200'),
    '--card-body-min-height': '92px',
  },
  [CardSize.Large]: {
    '--card-padding': cssVar('dimension-space-300'),
    '--card-body-min-height': '108px',
  },
};
