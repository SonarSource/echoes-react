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
  border-radius: ${cssVar('border-radius-300')};
  box-shadow: var(--button-shadow, ${cssVar('shadow-suppressed')});
  outline: none;

  cursor: pointer;

  &:focus,
  &:focus-visible {
    background-color: var(--button-background-focus);
  }

  &:focus-visible {
    outline: ${cssVar('button-colors-focus-ring')} solid ${cssVar('focus-border-width-default')};
    outline-offset: ${cssVar('focus-border-offset-default')};
  }

  &:hover {
    background-color: var(--button-background-hover);
    border-color: var(--button-border-color-hover);
  }

  &:active {
    background-color: var(--button-background-active);
  }

  &:disabled,
  &:disabled:has(:hover, :active, :focus, :focus-visible) {
    color: ${cssVar('button-colors-foreground-disabled')};
    background-color: var(--button-background-disabled);

    border: none;
    box-shadow: ${cssVar('shadow-suppressed')};

    cursor: not-allowed;
    pointer-events: none;
    user-select: none;
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
    '--button-color': cssVar('button-colors-foreground-secondary'),
    '--button-border': `${cssVar('button-colors-border-secondary')} solid ${cssVar('border-width-default')}`,
    '--button-border-color-hover': cssVar('button-colors-border-secondary-hover'),
    '--button-background': cssVar('button-colors-background-secondary-default'),
    '--button-background-hover': cssVar('button-colors-background-secondary-hover'),
    '--button-background-active': cssVar('button-colors-background-secondary-pressed'),
    '--button-background-focus': cssVar('button-colors-background-secondary-default'),
    '--button-background-disabled': cssVar('button-colors-background-disabled'),
    '--button-shadow': cssVar('shadow-resting'),
    '--spinner-color-override': cssVar('button-colors-foreground-secondary'),
    '--spinner-track-color-override': cssVar('button-colors-border-secondary'),
  },
  [ButtonVariety.DefaultGhost]: {
    '--button-color': cssVar('button-colors-foreground-ghost'),
    '--button-border': 'none',
    '--button-background': cssVar('button-colors-background-ghost-default'),
    '--button-background-hover': cssVar('button-colors-background-ghost-hover'),
    '--button-background-active': cssVar('button-colors-background-ghost-pressed'),
    '--button-background-focus': cssVar('button-colors-background-ghost-default'),
    '--button-background-disabled': cssVar('button-colors-background-ghost-default'),
    '--spinner-color-override': cssVar('button-colors-foreground-ghost'),
    '--spinner-track-color-override': cssVar('button-colors-border-secondary'),
  },
  [ButtonVariety.Primary]: {
    '--button-color': cssVar('button-colors-foreground-primary'),
    '--button-border': 'none',
    '--button-background': cssVar('button-colors-background-primary-default'),
    '--button-background-hover': cssVar('button-colors-background-primary-hover'),
    '--button-background-active': cssVar('button-colors-background-primary-pressed'),
    '--button-background-focus': cssVar('button-colors-background-primary-focus'),
    '--button-background-disabled': cssVar('button-colors-background-disabled'),
    '--button-shadow': cssVar('shadow-resting'),
    '--spinner-color-override': cssVar('button-colors-foreground-primary'),
    '--spinner-track-color-override': cssVar('button-colors-border-secondary'),
  },
  [ButtonVariety.PrimaryGhost]: {
    '--button-color': cssVar('button-colors-foreground-ghost'),
    '--button-border': 'none',
    '--button-background': cssVar('button-colors-background-ghost-default'),
    '--button-background-hover': cssVar('button-colors-background-ghost-hover'),
    '--button-background-active': cssVar('button-colors-background-ghost-pressed'),
    '--button-background-focus': cssVar('button-colors-background-ghost-default'),
    '--button-background-disabled': cssVar('button-colors-background-ghost-default'),
    '--spinner-color-override': cssVar('button-colors-foreground-ghost'),
  },
  [ButtonVariety.Danger]: {
    '--button-color': cssVar('button-colors-foreground-danger'),
    '--button-border': 'none',
    '--button-background': cssVar('button-colors-background-danger-default'),
    '--button-background-hover': cssVar('button-colors-background-danger-hover'),
    '--button-background-active': cssVar('button-colors-background-danger-pressed'),
    '--button-background-focus': cssVar('button-colors-background-danger-default'),
    '--button-background-disabled': cssVar('button-colors-background-disabled'),
    '--spinner-color-override': cssVar('button-colors-foreground-danger'),
    '--spinner-track-color-override': cssVar('button-colors-background-danger-pressed'),
  },
  [ButtonVariety.DangerGhost]: {
    '--button-color': cssVar('button-colors-foreground-danger-ghost'),
    '--button-border': 'none',
    '--button-background': cssVar('button-colors-background-ghost-default'),
    '--button-background-hover': cssVar('button-colors-background-ghost-hover'),
    '--button-background-active': cssVar('button-colors-background-ghost-pressed'),
    '--button-background-focus': cssVar('button-colors-background-ghost-default'),
    '--button-background-disabled': cssVar('button-colors-background-ghost-default'),
    '--spinner-color-override': cssVar('button-colors-foreground-danger-ghost'),
  },
  [ButtonVariety.DangerOutline]: {
    '--button-color': cssVar('button-colors-foreground-danger-ghost'),
    '--button-border': `${cssVar('button-colors-border-secondary')} solid ${cssVar('border-width-default')}`,
    '--button-border-color-hover': cssVar('button-colors-border-secondary-hover'),
    '--button-background': cssVar('button-colors-background-secondary-default'),
    '--button-background-hover': cssVar('button-colors-background-secondary-hover'),
    '--button-background-active': cssVar('button-colors-background-secondary-pressed'),
    '--button-background-focus': cssVar('button-colors-background-secondary-default'),
    '--button-background-disabled': cssVar('button-colors-background-disabled'),
    '--button-shadow': cssVar('shadow-resting'),
    '--spinner-color-override': cssVar('button-colors-foreground-danger-ghost'),
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
