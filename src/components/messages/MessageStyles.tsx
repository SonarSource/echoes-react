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
import { IconCheckCircle, IconError, IconInfo, IconRocket, IconWarning } from '../icons';
import { MessageVariety } from './MessageTypes';

import { cssVar } from '~utils/design-tokens';

export const MESSAGE_VARIETY_ICON = {
  [MessageVariety.Info]: <IconInfo color="echoes-color-icon-info" />,
  [MessageVariety.Danger]: <IconError color="echoes-color-icon-danger" />,
  [MessageVariety.Warning]: <IconWarning color="echoes-color-icon-warning" />,
  [MessageVariety.Success]: <IconCheckCircle color="echoes-color-icon-success" />,
  [MessageVariety.Discover]: <IconRocket color="echoes-color-icon-emphasis" />,
};

export const MESSAGE_CALLOUT_VARIETY_STYLE = {
  [MessageVariety.Info]: {
    '--message-background': cssVar('color-background-info-weak-default'),
    '--message-text-color': cssVar('color-text-info'),
  },
  [MessageVariety.Danger]: {
    '--message-background': cssVar('color-background-danger-weak-default'),
    '--message-text-color': cssVar('color-text-danger'),
  },
  [MessageVariety.Warning]: {
    '--message-background': cssVar('color-background-warning-weak-default'),
    '--message-text-color': cssVar('color-text-warning'),
  },
  [MessageVariety.Success]: {
    '--message-background': cssVar('color-background-success-weak-default'),
    '--message-text-color': cssVar('color-text-success'),
  },
  [MessageVariety.Discover]: {
    '--message-background': cssVar('color-background-emphasis-weak-default'),
    '--message-text-color': cssVar('color-text-emphasis'),
  },
};

export const MessageCalloutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-100')};
  border-radius: ${cssVar('border-radius-400')};

  color: ${cssVar('color-text-default')};

  background-color: var(--message-background);
  padding: ${cssVar('dimension-space-200')};
`;
MessageCalloutContainer.displayName = 'MessageCalloutContainer';

export const MessageCalloutMainContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${cssVar('dimension-space-100')};
  align-items: start;
`;
MessageCalloutMainContent.displayName = 'MessageCalloutMainContent';

export const MessageCalloutIconWrapper = styled.div<{ addMargin: boolean }>`
  flex: 0 0 auto;

  font: ${cssVar('typography-text-default-regular')};
  ${({ addMargin: offset }) => (offset ? `margin-top: ${cssVar('dimension-space-25')};` : '')}
`;
MessageCalloutIconWrapper.displayName = 'MessageCalloutIconWrapper';

export const MessageCalloutTitleWrapper = styled.div`
  flex: 1 0 auto;
  font: ${cssVar('typography-heading-medium')};
  letter-spacing: ${cssVar('letter-spacing-decreased')};
  color: var(--message-text-color);
`;
MessageCalloutTitleWrapper.displayName = 'MessageCalloutTitleWrapper';

export const MessageCalloutTextWrapper = styled.div`
  flex: 1 1 auto;

  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-100')};

  font: ${cssVar('typography-text-default-regular')};
  color: var(--message-text-color);
`;
MessageCalloutTextWrapper.displayName = 'MessageCalloutTextWrapper';

export const MessageCalloutFooter = styled.div`
  margin-left: ${cssVar('dimension-space-200')};
`;
MessageCalloutFooter.displayName = 'MessageCalloutFooter';
