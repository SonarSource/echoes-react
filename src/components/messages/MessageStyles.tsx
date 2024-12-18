/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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
import { IconCheckCircle, IconError, IconInfo, IconQuestionMark, IconWarning } from '../icons';
import { MessageType } from './MessageTypes';

export const MESSAGE_TYPE_ICON = {
  [MessageType.Info]: <IconInfo color="echoes-color-icon-info" />,
  [MessageType.Danger]: <IconError color="echoes-color-icon-danger" />,
  [MessageType.Warning]: <IconWarning color="echoes-color-icon-warning" />,
  [MessageType.Success]: <IconCheckCircle color="echoes-color-icon-success" />,
  [MessageType.Discover]: <IconQuestionMark color="echoes-color-icon-accent" />,
};

export const MESSAGE_CALLOUT_TYPE_STYLE = {
  [MessageType.Info]: {
    '--message-background': 'var(--echoes-color-background-info-weak)',
    '--message-title-color': 'var(--echoes-color-text-info-bold)',
  },
  [MessageType.Danger]: {
    '--message-background': 'var(--echoes-color-background-danger-weak-default)',
    '--message-title-color': 'var(--echoes-color-text-danger-bold)',
  },
  [MessageType.Warning]: {
    '--message-background': 'var(--echoes-color-background-warning-weak)',
    '--message-title-color': 'var(--echoes-color-text-warning-bold)',
  },
  [MessageType.Success]: {
    '--message-background': 'var(--echoes-color-background-success-weak)',
    '--message-title-color': 'var(--echoes-color-text-success-bold)',
  },
  [MessageType.Discover]: {
    '--message-background': 'var(--echoes-color-background-accent-weak-default)',
    '--message-title-color': 'var(--echoes-color-text-accent-bold)',
  },
};

export const MessageCalloutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--echoes-dimension-space-100);
  border-radius: var(--echoes-border-radius-400);

  color: var(--echoes-color-text-default);

  background-color: var(--message-background);
  padding: var(--echoes-dimension-space-200);
`;
MessageCalloutContainer.displayName = 'MessageCalloutContainer';

export const MessageCalloutMainContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--echoes-dimension-space-100);
  align-items: start;
`;
MessageCalloutMainContent.displayName = 'MessageCalloutMainContent';

export const MessageCalloutIconWrapper = styled.div<{ addMargin: boolean }>`
  flex: 0 0 auto;

  font: var(--echoes-typography-text-default-regular);
  ${({ addMargin: offset }) => (offset ? 'margin-top: var(--echoes-dimension-space-25);' : '')}
`;
MessageCalloutIconWrapper.displayName = 'MessageCalloutIconWrapper';

export const MessageCalloutTitleWrapper = styled.div`
  flex: 1 0 auto;
  font: var(--echoes-typography-heading-medium);
  color: var(--message-title-color);
`;
MessageCalloutTitleWrapper.displayName = 'MessageCalloutTitleWrapper';

export const MessageCalloutTextWrapper = styled.div`
  flex: 1 0 auto;

  display: flex;
  flex-direction: column;
  gap: var(--echoes-dimension-space-100);

  font: var(--echoes-typography-text-default-regular);
`;
MessageCalloutTextWrapper.displayName = 'MessageCalloutTextWrapper';

export const MessageCalloutFooter = styled.div`
  margin-left: var(--echoes-dimension-space-200);
`;
MessageCalloutFooter.displayName = 'MessageCalloutFooter';
