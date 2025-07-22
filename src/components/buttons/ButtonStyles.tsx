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

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { truncate } from '~common/helpers/styles';
import { SpinnerOverrideColor } from '../spinner/SpinnerOverrideColor';
import { ButtonSize, ButtonVariety } from './ButtonTypes';

import { cssVar } from '~utils/design-tokens';

export const ButtonStyled = styled.button`
  all: unset;

  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  padding: ${cssVar('dimension-space-0')} var(--button-padding);
  height: var(--button-height);
  min-height: var(--button-height);
  overflow: hidden;

  font: ${cssVar('typography-others-label')};
  color: var(--button-color);
  text-decoration: none;

  background-color: var(--button-background);

  border: var(--button-border);
  border-radius: ${cssVar('border-radius-400')};
  outline: none;

  cursor: pointer;

  &:focus,
  &:focus-visible {
    background-color: var(--button-background-focus);
  }

  &:focus-visible {
    outline: ${cssVar('color-focus-default')} solid ${cssVar('focus-border-width-default')};
    outline-offset: ${cssVar('focus-border-offset-default')};
  }

  &:hover {
    background-color: var(--button-background-hover);
  }

  &:active {
    background-color: var(--button-background-active);
  }

  &:disabled,
  &:disabled:has(:hover, :active, :focus, :focus-visible) {
    color: ${cssVar('color-text-disabled')};
    background-color: var(--button-background-disabled);

    border: none;

    cursor: not-allowed;
    pointer-events: none;
  }
`;

ButtonStyled.displayName = 'ButtonStyled';

export const buttonIconStyles = css`
  justify-content: center;

  width: var(--button-width);
`;

export const ButtonIconStyled = styled(ButtonStyled)(buttonIconStyles);

export const ButtonInnerWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-75')};

  overflow: hidden;
`;

ButtonInnerWrapper.displayName = 'ButtonInnerWrapper';

export const ButtonText = styled.span`
  ${truncate}
`;

ButtonText.displayName = 'ButtonText';

export const SpinnerButton = styled(SpinnerOverrideColor)`
  margin-right: ${cssVar('dimension-space-75')};
`;

export const BUTTON_VARIETY_STYLES = {
  [ButtonVariety.Default]: {
    '--button-color': cssVar('color-text-default'),
    '--button-border': `${cssVar('color-border-bold')} solid ${cssVar('border-width-default')}`,
    '--button-background': cssVar('color-surface-default'),
    '--button-background-hover': cssVar('color-surface-hover'),
    '--button-background-active': cssVar('color-surface-active'),
    '--button-background-focus': cssVar('color-surface-default'),
    '--button-background-disabled': cssVar('color-surface-disabled'),
  },
  [ButtonVariety.DefaultGhost]: {
    '--button-color': cssVar('color-text-default'),
    '--button-border': 'none',
    '--button-background': cssVar('color-background-ghost-neutral-default'),
    '--button-background-hover': cssVar('color-background-ghost-neutral-hover'),
    '--button-background-active': cssVar('color-background-ghost-neutral-active'),
    '--button-background-focus': cssVar('color-background-ghost-neutral-focus'),
    '--button-background-disabled': cssVar('color-background-ghost-neutral-default'),
  },
  [ButtonVariety.Primary]: {
    '--button-color': cssVar('color-text-on-color'),
    '--button-border': 'none',
    '--button-background': cssVar('color-background-accent-default'),
    '--button-background-hover': cssVar('color-background-accent-hover'),
    '--button-background-active': cssVar('color-background-accent-active'),
    '--button-background-focus': cssVar('color-background-accent-focus'),
    '--button-background-disabled': cssVar('color-surface-disabled'),
    '--spinner-color-override': cssVar('color-icon-on-color'),
  },
  [ButtonVariety.PrimaryGhost]: {
    '--button-color': cssVar('color-text-accent'),
    '--button-border': 'none',
    '--button-background': cssVar('color-background-ghost-accent-default'),
    '--button-background-hover': cssVar('color-background-ghost-accent-hover'),
    '--button-background-active': cssVar('color-background-ghost-accent-active'),
    '--button-background-focus': cssVar('color-background-ghost-accent-focus'),
    '--button-background-disabled': cssVar('color-background-ghost-accent-default'),
  },
  [ButtonVariety.Danger]: {
    '--button-color': cssVar('color-text-on-color'),
    '--button-border': 'none',
    '--button-background': cssVar('color-background-danger-default'),
    '--button-background-hover': cssVar('color-background-danger-hover'),
    '--button-background-active': cssVar('color-background-danger-active'),
    '--button-background-focus': cssVar('color-background-danger-focus'),
    '--button-background-disabled': cssVar('color-surface-disabled'),
    '--spinner-color-override': cssVar('color-icon-on-color'),
  },
  [ButtonVariety.DangerGhost]: {
    '--button-color': cssVar('color-text-danger'),
    '--button-border': 'none',
    '--button-background': cssVar('color-background-ghost-danger-default'),
    '--button-background-hover': cssVar('color-background-ghost-danger-hover'),
    '--button-background-active': cssVar('color-background-ghost-danger-active'),
    '--button-background-focus': cssVar('color-background-ghost-danger-focus'),
    '--button-background-disabled': cssVar('color-background-ghost-danger-default'),
  },
  [ButtonVariety.DangerOutline]: {
    '--button-color': cssVar('color-text-danger'),
    '--button-border': `${cssVar('color-border-bold')} solid ${cssVar('border-width-default')}`,
    '--button-background': cssVar('color-surface-default'),
    '--button-background-hover': cssVar('color-surface-hover'),
    '--button-background-active': cssVar('color-surface-active'),
    '--button-background-focus': cssVar('color-surface-default'),
    '--button-background-disabled': cssVar('color-surface-disabled'),
  },
};

export const BUTTON_SIZE_STYLE = {
  [ButtonSize.Medium]: {
    '--button-padding': cssVar('dimension-space-100'),
    '--button-height': cssVar('sizes-buttons-medium'),
  },
  [ButtonSize.Large]: {
    '--button-padding': cssVar('dimension-space-150'),
    '--button-height': cssVar('sizes-buttons-large'),
  },
};

export const BUTTONICON_DIMENSIONS_STYLE = {
  [ButtonSize.Medium]: {
    '--button-padding': cssVar('dimension-space-0'),
    '--button-height': cssVar('sizes-buttons-medium'),
    '--button-width': cssVar('sizes-buttons-medium'),
  },
  [ButtonSize.Large]: {
    '--button-padding': cssVar('dimension-space-0'),
    '--button-height': cssVar('sizes-buttons-large'),
    '--button-width': cssVar('sizes-buttons-large'),
  },
};
