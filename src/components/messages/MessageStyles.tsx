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
  [MessageVariety.Info]: <IconInfo />,
  [MessageVariety.Danger]: <IconError />,
  [MessageVariety.Warning]: <IconWarning />,
  [MessageVariety.Success]: <IconCheckCircle />,
  [MessageVariety.Discover]: <IconRocket />,
};

export const MESSAGE_CALLOUT_VARIETY_STYLE = {
  [MessageVariety.Info]: {
    '--message-background': cssVar('message-colors-information-background'),
    '--message-body-color': cssVar('message-colors-information-body'),
    '--message-icon-color': cssVar('message-colors-information-icon'),
    '--message-title-color': cssVar('message-colors-information-title'),
  },
  [MessageVariety.Danger]: {
    '--message-background': cssVar('message-colors-danger-background'),
    '--message-body-color': cssVar('message-colors-danger-body'),
    '--message-icon-color': cssVar('message-colors-danger-icon'),
    '--message-title-color': cssVar('message-colors-danger-title'),
  },
  [MessageVariety.Warning]: {
    '--message-background': cssVar('message-colors-warning-background'),
    '--message-body-color': cssVar('message-colors-warning-body'),
    '--message-icon-color': cssVar('message-colors-warning-icon'),
    '--message-title-color': cssVar('message-colors-warning-title'),
  },
  [MessageVariety.Success]: {
    '--message-background': cssVar('message-colors-success-background'),
    '--message-body-color': cssVar('message-colors-success-body'),
    '--message-icon-color': cssVar('message-colors-success-icon'),
    '--message-title-color': cssVar('message-colors-success-title'),
  },
  [MessageVariety.Discover]: {
    '--message-background': cssVar('promoted-feature-colors-background'),
    '--message-body-color': cssVar('promoted-feature-colors-body'),
    '--message-icon-color': cssVar('promoted-feature-colors-icon'),
    '--message-title-color': cssVar('promoted-feature-colors-title'),
  },
};

export const MessageCalloutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-100')};
  border-radius: ${cssVar('border-radius-400')};

  color: var(--message-body-color);

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
  color: var(--message-icon-color);
  ${({ addMargin: offset }) => (offset ? `margin-top: ${cssVar('dimension-space-25')};` : '')}
`;
MessageCalloutIconWrapper.displayName = 'MessageCalloutIconWrapper';

export const MessageCalloutTitleWrapper = styled.div`
  flex: 1 0 auto;
  font: ${cssVar('typography-heading-medium')};
  letter-spacing: ${cssVar('letter-spacing-decreased')};
  color: var(--message-title-color);
`;
MessageCalloutTitleWrapper.displayName = 'MessageCalloutTitleWrapper';

export const MessageCalloutTextWrapper = styled.div`
  flex: 1 1 auto;

  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-100')};

  font: ${cssVar('typography-text-default-regular')};
  color: var(--message-body-color);
`;
MessageCalloutTextWrapper.displayName = 'MessageCalloutTextWrapper';

export const MessageCalloutFooter = styled.div`
  margin-left: ${cssVar('dimension-space-200')};
`;
MessageCalloutFooter.displayName = 'MessageCalloutFooter';
