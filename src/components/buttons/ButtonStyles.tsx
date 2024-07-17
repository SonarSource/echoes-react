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
import { truncate } from '~common/helpers/styles';
import { ButtonSize, ButtonVariety } from './ButtonTypes';

export const ButtonStyled = styled.button`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  padding: var(--echoes-dimension-size-0) var(--button-padding);
  height: var(--button-height);
  min-height: var(--button-height);
  overflow: hidden;

  font: var(--echoes-typography-paragraph-default-semi-bold);
  color: var(--button-color);
  text-decoration: none;

  background-color: var(--button-background);

  border: var(--button-border);
  border-radius: var(--echoes-border-radius-400);
  outline: none;

  cursor: pointer;

  &:focus,
  &:focus-visible {
    background-color: var(--button-background-focus);

    outline: var(--echoes-color-focus-default) solid var(--echoes-focus-border-width-default);
    outline-offset: var(--echoes-focus-border-offset-default);
  }

  &:hover {
    background-color: var(--button-background-hover);
  }

  &:active {
    background-color: var(--button-background-active);
  }

  &:disabled,
  &:disabled:has(:hover, :active, :focus, :focus-visible) {
    color: var(--echoes-color-text-disabled);
    background-color: var(--button-background-disabled);

    border: none;

    cursor: not-allowed;
    pointer-events: none;
  }
`;

ButtonStyled.displayName = 'ButtonStyled';

export const ButtonInnerWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--echoes-dimension-size-75);

  overflow: hidden;
`;

ButtonInnerWrapper.displayName = 'ButtonInnerWrapper';

export const ButtonText = styled.span`
  ${truncate}
`;

ButtonText.displayName = 'ButtonText';

export const BUTTON_VARIETY_STYLES = {
  [ButtonVariety.Neutral]: {
    '--button-color': 'var(--echoes-color-text-default)',
    '--button-border': 'var(--echoes-color-border-bold) solid var(--echoes-border-width-default)',
    '--button-background': 'var(--echoes-color-background-default)',
    '--button-background-hover': 'var(--echoes-color-background-default-hover)',
    '--button-background-active': 'var(--echoes-color-background-default-active)',
    '--button-background-focus': 'var(--echoes-color-background-default)',
    '--button-background-disabled': 'var(--echoes-color-background-disabled)',
    '--button-spinner-color': 'var(--echoes-color-background-accent-default)',
  },
  [ButtonVariety.NeutralGhost]: {
    '--button-color': 'var(--echoes-color-text-default)',
    '--button-border': 'none',
    '--button-background': 'var(--echoes-color-background-ghost-neutral-default)',
    '--button-background-hover': 'var(--echoes-color-background-ghost-neutral-hover)',
    '--button-background-active': 'var(--echoes-color-background-ghost-neutral-active)',
    '--button-background-focus': 'var(--echoes-color-background-ghost-neutral-focus)',
    '--button-background-disabled': 'var(--echoes-color-background-ghost-neutral-default)',
    '--button-spinner-color': 'var(--echoes-color-background-accent-default)',
  },
  [ButtonVariety.Accent]: {
    '--button-color': 'var(--echoes-color-text-on-color)',
    '--button-border': 'none',
    '--button-background': 'var(--echoes-color-background-accent-default)',
    '--button-background-hover': 'var(--echoes-color-background-accent-hover)',
    '--button-background-active': 'var(--echoes-color-background-accent-active)',
    '--button-background-focus': 'var(--echoes-color-background-accent-focus)',
    '--button-background-disabled': 'var(--echoes-color-background-disabled)',
    '--button-spinner-color': 'var(--echoes-color-icon-on-color)',
  },
  [ButtonVariety.AccentGhost]: {
    '--button-color': 'var(--echoes-color-text-accent)',
    '--button-border': 'none',
    '--button-background': 'var(--echoes-color-background-ghost-accent-default)',
    '--button-background-hover': 'var(--echoes-color-background-ghost-accent-hover)',
    '--button-background-active': 'var(--echoes-color-background-ghost-accent-active)',
    '--button-background-focus': 'var(--echoes-color-background-ghost-accent-focus)',
    '--button-background-disabled': 'var(--echoes-color-background-ghost-accent-default)',
    '--button-spinner-color': 'var(--echoes-color-background-accent-default)',
  },
  [ButtonVariety.Danger]: {
    '--button-color': 'var(--echoes-color-text-on-color)',
    '--button-border': 'none',
    '--button-background': 'var(--echoes-color-background-danger-default)',
    '--button-background-hover': 'var(--echoes-color-background-danger-hover)',
    '--button-background-active': 'var(--echoes-color-background-danger-active)',
    '--button-background-focus': 'var(--echoes-color-background-danger-focus)',
    '--button-background-disabled': 'var(--echoes-color-background-disabled)',
    '--button-spinner-color': 'var(--echoes-color-icon-on-color)',
  },
  [ButtonVariety.DangerGhost]: {
    '--button-color': 'var(--echoes-color-text-danger)',
    '--button-border': 'none',
    '--button-background': 'var(--echoes-color-background-ghost-danger-default)',
    '--button-background-hover': 'var(--echoes-color-background-ghost-danger-hover)',
    '--button-background-active': 'var(--echoes-color-background-ghost-danger-active)',
    '--button-background-focus': 'var(--echoes-color-background-ghost-danger-focus)',
    '--button-background-disabled': 'var(--echoes-color-background-ghost-danger-default)',
    '--button-spinner-color': 'var(--echoes-color-background-accent-default)',
  },
  [ButtonVariety.DangerOutline]: {
    '--button-color': 'var(--echoes-color-text-danger)',
    '--button-border': 'var(--echoes-color-border-bold) solid var(--echoes-border-width-default)',
    '--button-background': 'var(--echoes-color-background-default)',
    '--button-background-hover': 'var(--echoes-color-background-default-hover)',
    '--button-background-active': 'var(--echoes-color-background-default-active)',
    '--button-background-focus': 'var(--echoes-color-background-default)',
    '--button-background-disabled': 'var(--echoes-color-background-disabled)',
    '--button-spinner-color': 'var(--echoes-color-background-accent-default)',
  },
};

export const BUTTON_SIZE_STYLE = {
  [ButtonSize.Medium]: {
    '--button-padding': 'var(--echoes-dimension-space-100)',
    '--button-height': 'var(--echoes-dimension-size-400)',
  },
  [ButtonSize.Large]: {
    '--button-padding': 'var(--echoes-dimension-space-150)',
    '--button-height': 'var(--echoes-dimension-size-450)',
  },
};
