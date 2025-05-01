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
import { forwardRef, PropsWithChildren, useMemo } from 'react';
import { isDefined } from '~common/helpers/types';
import { IconFilledProps } from '../icons/IconWrapper';

export enum BadgeSize {
  Small = 'small',
  Medium = 'medium',
}

export enum BadgeVariety {
  Danger = 'danger',
  Highlight = 'highlight',
  Info = 'info',
  Neutral = 'neutral',
  Success = 'success',
  Warning = 'warning',
}

export interface BadgeProps extends PropsWithChildren {
  /**
   * Optional icon component to render on the left side of the badge.
   */
  IconLeft?: React.ForwardRefExoticComponent<
    IconFilledProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * ARIA label for accessibility purposes. Provides a textual description of the badge.
   */
  ariaLabel?: string;

  className?: string;

  /**
   * Indicates whether the badge should use high-contrast styling for better visibility.
   */
  isHighContrast?: boolean;

  /**
   * Determines whether the icon (if provided) should be rendered in a filled style.
   */
  isIconFilled?: boolean;

  /**
   * Changes the badge into a button to allow interactivity (for a Popover, typically)
   */
  isInteractive?: boolean;

  /**
   * Specifies the size of the badge. Must match `BadgeSize`.
   */
  size?: `${BadgeSize}`;

  /**
   * Specifies the style of the badge. Must match `BadgeVariety`.
   */
  variety: `${BadgeVariety}`;
}

export const Badge = forwardRef<HTMLButtonElement, BadgeProps>((props, ref) => {
  const {
    IconLeft,
    ariaLabel,
    children,
    isHighContrast = false,
    isIconFilled = false,
    isInteractive = false,
    size = BadgeSize.Small,
    variety,
    ...otherProps
  } = props;

  return (
    <StyledBadge
      {...otherProps}
      aria-label={ariaLabel}
      as={isInteractive ? 'button' : 'span'}
      css={useMemo(
        () => ({
          ...(isHighContrast
            ? BADGE_HIGH_CONTRAST_VARIETY_STYLES[variety]
            : BADGE_VARIETY_STYLES[variety]),
          ...BADGE_SIZE_STYLES[size],
        }),
        [isHighContrast, size, variety],
      )}
      isInteractive={isInteractive}
      ref={ref}
      type="button" // ignored when rendering a span
    >
      {isDefined(IconLeft) && <IconLeft isFilled={isIconFilled} />}
      {children}
    </StyledBadge>
  );
});

Badge.displayName = 'Badge';

const StyledBadge = styled.button<{ isInteractive: boolean }>`
  display: flex;
  flex-direction: row;
  gap: var(--echoes-dimension-space-50);

  box-sizing: border-box;

  color: var(--badge-color);
  background-color: var(--badge-background-color);

  font-family: var(--echoes-font-family-sans);
  font-weight: var(--echoes-font-weight-medium);
  font-size: var(--badge-font-size);
  line-height: var(--badge-line-height);

  // Using outline so that the border doesn't take space in the flow
  outline: var(--badge-border-color) solid var(--echoes-border-width-default);
  border: none;
  border-radius: var(--echoes-border-radius-200);

  padding: var(--badge-padding);
  height: var(--badge-height);

  ${({ isInteractive }) =>
    isInteractive
      ? `
    &:focus,
    &:focus-visible {
      background-color: var(--badge-interactive-backgroud-color-focus);
    }

    &:focus-visible {
      outline: var(--echoes-color-focus-default) solid var(--echoes-focus-border-width-default);
      outline-offset: var(--echoes-focus-border-offset-default);
    }

    &:hover {
      background-color: var(--badge-interactive-backgroud-color-hover);
    }

    &:active {
      background-color: var(--badge-interactive-backgroud-color-active);
    }
  `
      : ''}
`;

const BADGE_SIZE_STYLES = {
  [BadgeSize.Small]: {
    '--badge-padding': 'var(--echoes-dimension-space-25) var(--echoes-dimension-space-50)',
    '--badge-height': 'var(--echoes-dimension-height-500)',
    '--badge-font-size': 'var(--echoes-font-size-10)',
    '--badge-line-height': 'var(--echoes-line-height-10)',
  },
  [BadgeSize.Medium]: {
    '--badge-padding': 'var(--echoes-dimension-space-50) var(--echoes-dimension-space-75)',
    '--badge-height': 'var(--echoes-dimension-height-700)',
    '--badge-font-size': 'var(--echoes-font-size-20)',
    '--badge-line-height': 'var(--echoes-line-height-20)',
  },
};

const BADGE_VARIETY_STYLES = {
  [BadgeVariety.Danger]: {
    '--badge-color': 'var(--echoes-color-text-danger)',
    '--badge-border-color': 'var(--echoes-color-border-danger-weak)',
    '--badge-background-color': 'var(--echoes-color-background-danger-weak-default)',
    '--badge-interactive-backgroud-color-active':
      'var(--echoes-color-background-danger-weak-active)',
    '--badge-interactive-backgroud-color-focus': 'var(--echoes-color-background-danger-weak-focus)',
    '--badge-interactive-backgroud-color-hover': 'var(--echoes-color-background-danger-weak-hover)',
  },
  [BadgeVariety.Highlight]: {
    '--badge-color': 'var(--echoes-color-text-emphasis)',
    '--badge-border-color': 'var(--echoes-color-border-emphasis-weak)',
    '--badge-background-color': 'var(--echoes-color-background-emphasis-weak-default)',
    '--badge-interactive-backgroud-color-active':
      'var(--echoes-color-background-emphasis-weak-active)',
    '--badge-interactive-backgroud-color-focus':
      'var(--echoes-color-background-emphasis-weak-focus)',
    '--badge-interactive-backgroud-color-hover':
      'var(--echoes-color-background-emphasis-weak-hover)',
  },
  [BadgeVariety.Info]: {
    '--badge-color': 'var(--echoes-color-text-info)',
    '--badge-border-color': 'var(--echoes-color-border-info-weak)',
    '--badge-background-color': 'var(--echoes-color-background-info-weak-default)',
    '--badge-interactive-backgroud-color-active': 'var(--echoes-color-background-info-weak-active)',
    '--badge-interactive-backgroud-color-focus': 'var(--echoes-color-background-info-weak-focus)',
    '--badge-interactive-backgroud-color-hover': 'var(--echoes-color-background-info-weak-hover)',
  },
  [BadgeVariety.Neutral]: {
    '--badge-color': 'var(--echoes-color-text-default)',
    '--badge-border-color': 'var(--echoes-color-border-weak)',
    '--badge-background-color': 'var(--echoes-color-background-neutral-weak-default)',
    '--badge-interactive-backgroud-color-active':
      'var(--echoes-color-background-neutral-weak-active)',
    '--badge-interactive-backgroud-color-focus':
      'var(--echoes-color-background-neutral-weak-focus)',
    '--badge-interactive-backgroud-color-hover':
      'var(--echoes-color-background-neutral-weak-hover)',
  },
  [BadgeVariety.Success]: {
    '--badge-color': 'var(--echoes-color-text-success)',
    '--badge-border-color': 'var(--echoes-color-border-success-weak)',
    '--badge-background-color': 'var(--echoes-color-background-success-weak-default)',
    '--badge-interactive-backgroud-color-active':
      'var(--echoes-color-background-success-weak-active)',
    '--badge-interactive-backgroud-color-focus':
      'var(--echoes-color-background-success-weak-focus)',
    '--badge-interactive-backgroud-color-hover':
      'var(--echoes-color-background-success-weak-hover)',
  },
  [BadgeVariety.Warning]: {
    '--badge-color': 'var(--echoes-color-text-warning)',
    '--badge-border-color': 'var(--echoes-color-border-warning-weak)',
    '--badge-background-color': 'var(--echoes-color-background-warning-weak-default)',
    '--badge-interactive-backgroud-color-active':
      'var(--echoes-color-background-warning-weak-active)',
    '--badge-interactive-backgroud-color-focus':
      'var(--echoes-color-background-warning-weak-focus)',
    '--badge-interactive-backgroud-color-hover':
      'var(--echoes-color-background-warning-weak-hover)',
  },
};

const BADGE_HIGH_CONTRAST_VARIETY_STYLES = {
  [BadgeVariety.Danger]: {
    '--badge-color': 'var(--echoes-color-text-on-color)',
    '--badge-border-color': 'transparent',
    '--badge-background-color': 'var(--echoes-color-background-danger-default)',
    '--badge-interactive-backgroud-color-active': 'var(--echoes-color-background-danger-active)',
    '--badge-interactive-backgroud-color-focus': 'var(--echoes-color-background-danger-focus)',
    '--badge-interactive-backgroud-color-hover': 'var(--echoes-color-background-danger-hover)',
  },
  [BadgeVariety.Highlight]: {
    '--badge-color': 'var(--echoes-color-text-on-color)',
    '--badge-border-color': 'transparent',
    '--badge-background-color': 'var(--echoes-color-background-emphasis-default)',
    '--badge-interactive-backgroud-color-active': 'var(--echoes-color-background-emphasis-active)',
    '--badge-interactive-backgroud-color-focus': 'var(--echoes-color-background-emphasis-focus)',
    '--badge-interactive-backgroud-color-hover': 'var(--echoes-color-background-emphasis-hover)',
  },
  [BadgeVariety.Info]: {
    '--badge-color': 'var(--echoes-color-text-on-color)',
    '--badge-border-color': 'transparent',
    '--badge-background-color': 'var(--echoes-color-background-info-default)',
    '--badge-interactive-backgroud-color-active': 'var(--echoes-color-background-info-active)',
    '--badge-interactive-backgroud-color-focus': 'var(--echoes-color-background-info-focus)',
    '--badge-interactive-backgroud-color-hover': 'var(--echoes-color-background-info-hover)',
  },
  [BadgeVariety.Neutral]: {
    '--badge-color': 'var(--echoes-color-text-on-color)',
    '--badge-border-color': 'transparent',
    '--badge-background-color': 'var(--echoes-color-background-inverse)',
    '--badge-interactive-backgroud-color-active': 'var(--echoes-color-background-neutral-active)',
    '--badge-interactive-backgroud-color-focus': 'var(--echoes-color-background-neutral-focus)',
    '--badge-interactive-backgroud-color-hover': 'var(--echoes-color-background-neutral-hover)',
  },
  [BadgeVariety.Success]: {
    '--badge-color': 'var(--echoes-color-text-on-color)',
    '--badge-border-color': 'transparent',
    '--badge-background-color': 'var(--echoes-color-background-success-default)',
    '--badge-interactive-backgroud-color-active': 'var(--echoes-color-background-success-active)',
    '--badge-interactive-backgroud-color-focus': 'var(--echoes-color-background-success-focus)',
    '--badge-interactive-backgroud-color-hover': 'var(--echoes-color-background-success-hover)',
  },
  [BadgeVariety.Warning]: {
    '--badge-color': 'var(--echoes-color-text-on-color-inverse)',
    '--badge-border-color': 'transparent',
    '--badge-background-color': 'var(--echoes-color-background-warning-default)',
    '--badge-interactive-backgroud-color-active': 'var(--echoes-color-background-warning-active)',
    '--badge-interactive-backgroud-color-focus': 'var(--echoes-color-background-warning-focus)',
    '--badge-interactive-backgroud-color-hover': 'var(--echoes-color-background-warning-hover)',
  },
};
