/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource Sàrl
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
import { cssVar } from '~utils/design-tokens';
import { BUTTON_VARIETY_STYLES, ButtonStyled } from '../buttons/ButtonStyles';
import { CardSize } from './CardSize';

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

export const CardHeaderStyled = styled.header<{ noPadding: boolean }>`
  align-items: center;
  display: flex;
  min-height: var(--card-header-min-height);
  ${({ noPadding }) => (noPadding ? '' : 'padding: var(--card-header-padding);')}
`;
CardHeaderStyled.displayName = 'CardHeaderStyled';

export const CardHeaderTextStyled = styled.div`
  align-items: center;
  display: flex;
  gap: ${cssVar('dimension-space-100')};
  justify-content: space-between;
  width: 100%;
`;
CardHeaderTextStyled.displayName = 'CardHeaderTextStyled';

export const CardHeaderTitleStyled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
CardHeaderTitleStyled.displayName = 'CardHeaderTitleStyled';

export const RightContentStyled = styled.div`
  align-items: center;
  display: flex;
  gap: ${cssVar('dimension-space-100')};
  max-height: var(--card-header-heading-height);
`;
RightContentStyled.displayName = 'RightContentStyled';

export const DescriptionStyled = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  font: ${cssVar('typography-text-default-regular')};
  color: ${cssVar('color-text-default')};
`;
DescriptionStyled.displayName = 'DescriptionStyled';

export const CardHeaderTitleButtonStyled = styled(ButtonStyled)`
  ${BUTTON_VARIETY_STYLES['default-ghost']};

  box-sizing: content-box;
  display: flex;
  flex-direction: row;
  flex: 1;
  min-height: var(--card-header-min-height);
  padding: var(--card-header-padding);

  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
`;
CardHeaderTitleButtonStyled.displayName = 'CardHeaderTitleButtonStyled';

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
  [CardSize.Large]: {
    '--card-header-heading-height': '1.875rem',
    '--card-header-min-height': '58px',
    '--card-header-padding': `${cssVar('dimension-space-200')} ${cssVar('dimension-space-300')}`,
  },
  [CardSize.Medium]: {
    '--card-header-heading-height': '1.5rem',
    '--card-header-min-height': '45px',
    '--card-header-padding': `${cssVar('dimension-space-150')} ${cssVar('dimension-space-200')}`,
  },
  [CardSize.Small]: {
    '--card-header-heading-height': '1.25rem',
    '--card-header-min-height': '36px',
    '--card-header-padding': `${cssVar('dimension-space-100')} ${cssVar('dimension-space-150')}`,
  },
};

export const CARD_SIZE_STYLES = {
  [CardSize.Large]: {
    '--card-body-min-height': '108px',
    '--card-padding': cssVar('dimension-space-300'),
  },
  [CardSize.Medium]: {
    '--card-body-min-height': '92px',
    '--card-padding': cssVar('dimension-space-200'),
  },
  [CardSize.Small]: {
    '--card-body-min-height': '84px',
    '--card-padding': cssVar('dimension-space-150'),
  },
};
