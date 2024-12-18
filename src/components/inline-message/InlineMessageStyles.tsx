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
import { InlineMessageType } from './InlineMessageTypes';

export const INLINE_MESSAGE_TYPE_ICON = {
  [InlineMessageType.Info]: <IconInfo color="echoes-color-icon-info" />,
  [InlineMessageType.Danger]: <IconError color="echoes-color-icon-danger" />,
  [InlineMessageType.Warning]: <IconWarning color="echoes-color-icon-warning" />,
  [InlineMessageType.Success]: <IconCheckCircle color="echoes-color-icon-success" />,
  [InlineMessageType.Discover]: <IconQuestionMark color="echoes-color-icon-accent" />,
};

export const INLINE_MESSAGE_TYPE_STYLE = {
  [InlineMessageType.Info]: {
    '--inline-message-background': 'var(--echoes-color-background-info-weak)',
    '--inline-message-title-color': 'var(--echoes-color-text-info-bold)',
  },
  [InlineMessageType.Danger]: {
    '--inline-message-background': 'var(--echoes-color-background-danger-weak-default)',
    '--inline-message-title-color': 'var(--echoes-color-text-danger-bold)',
  },
  [InlineMessageType.Warning]: {
    '--inline-message-background': 'var(--echoes-color-background-warning-weak)',
    '--inline-message-title-color': 'var(--echoes-color-text-warning-bold)',
  },
  [InlineMessageType.Success]: {
    '--inline-message-background': 'var(--echoes-color-background-success-weak)',
    '--inline-message-title-color': 'var(--echoes-color-text-success-bold)',
  },
  [InlineMessageType.Discover]: {
    '--inline-message-background': 'var(--echoes-color-background-accent-weak-default)',
    '--inline-message-title-color': 'var(--echoes-color-text-accent-bold)',
  },
};

export const InlineMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--echoes-dimension-space-100);
  border-radius: var(--echoes-border-radius-400);

  color: var(--echoes-color-text-default);
  padding: var(--echoes-dimension-space-200);

  /* Variable */
  background-color: var(--inline-message-background);
`;

export const InlineMessageMainContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--echoes-dimension-space-100);
  align-items: start;
`;

export const InlineMessageTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--echoes-dimension-space-100);
`;
