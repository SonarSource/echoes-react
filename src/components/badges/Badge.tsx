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
import { cssVar } from '~utils/design-tokens';
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

/**
 * Badge is used to highlight metadata and pieces of information associated with another element.
 * Can be used as a static badge or interactive with a popover that explains the badge's meaning.
 */
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
      {...otherProps}>
      {isDefined(IconLeft) && <IconLeft isFilled={isIconFilled} />}
      {children}
    </StyledBadge>
  );
});

Badge.displayName = 'Badge';

const StyledBadge = styled.button<{ isInteractive: boolean }>`
  display: inline-flex;
  flex-direction: row;
  gap: ${cssVar('dimension-space-50')};

  box-sizing: border-box;

  color: var(--badge-color);
  background-color: var(--badge-background-color);

  font-family: ${cssVar('font-family-sans')};
  font-weight: ${cssVar('font-weight-medium')};
  font-size: var(--badge-font-size);
  line-height: var(--badge-line-height);
  white-space: nowrap;

  // Using outline so that the border doesn't take space in the flow
  outline: var(--badge-border-color) solid ${cssVar('border-width-default')};
  border: none;
  border-radius: ${cssVar('border-radius-200')};

  padding: var(--badge-padding);
  height: var(--badge-height);

  ${({ isInteractive }) =>
    isInteractive
      ? `
    cursor: pointer;

    &:focus,
    &:focus-visible {
      background-color: var(--badge-interactive-backgroud-color-focus);
    }

    &:focus-visible {
      outline: ${cssVar('color-focus-default')} solid ${cssVar('focus-border-width-default')};
      outline-offset: ${cssVar('focus-border-offset-default')};
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
StyledBadge.displayName = 'StyledBadge';

const BADGE_SIZE_STYLES = {
  [BadgeSize.Small]: {
    '--badge-padding': `${cssVar('dimension-space-25')} ${cssVar('dimension-space-50')}`,
    '--badge-height': cssVar('badge-sizes-height-small'),
    '--badge-font-size': cssVar('font-size-10'),
    '--badge-line-height': cssVar('line-height-10'),
  },
  [BadgeSize.Medium]: {
    '--badge-padding': `${cssVar('dimension-space-50')} ${cssVar('dimension-space-75')}`,
    '--badge-height': cssVar('badge-sizes-height-medium'),
    '--badge-font-size': cssVar('font-size-20'),
    '--badge-line-height': cssVar('line-height-20'),
  },
};

const BADGE_VARIETY_STYLES = {
  [BadgeVariety.Danger]: {
    '--badge-color': cssVar('color-text-danger'),
    '--badge-border-color': cssVar('color-border-danger-weak'),
    '--badge-background-color': cssVar('color-background-danger-weak-default'),
    '--badge-interactive-backgroud-color-active': cssVar('color-background-danger-weak-active'),
    '--badge-interactive-backgroud-color-focus': cssVar('color-background-danger-weak-focus'),
    '--badge-interactive-backgroud-color-hover': cssVar('color-background-danger-weak-hover'),
  },
  [BadgeVariety.Highlight]: {
    '--badge-color': cssVar('color-text-emphasis'),
    '--badge-border-color': cssVar('color-border-emphasis-weak'),
    '--badge-background-color': cssVar('color-background-emphasis-weak-default'),
    '--badge-interactive-backgroud-color-active': cssVar('color-background-emphasis-weak-active'),
    '--badge-interactive-backgroud-color-focus': cssVar('color-background-emphasis-weak-focus'),
    '--badge-interactive-backgroud-color-hover': cssVar('color-background-emphasis-weak-hover'),
  },
  [BadgeVariety.Info]: {
    '--badge-color': cssVar('color-text-info'),
    '--badge-border-color': cssVar('color-border-info-weak'),
    '--badge-background-color': cssVar('color-background-info-weak-default'),
    '--badge-interactive-backgroud-color-active': cssVar('color-background-info-weak-active'),
    '--badge-interactive-backgroud-color-focus': cssVar('color-background-info-weak-focus'),
    '--badge-interactive-backgroud-color-hover': cssVar('color-background-info-weak-hover'),
  },
  [BadgeVariety.Neutral]: {
    '--badge-color': cssVar('color-text-default'),
    '--badge-border-color': cssVar('color-border-weak'),
    '--badge-background-color': cssVar('color-background-neutral-subtle-default'),
    '--badge-interactive-backgroud-color-active': cssVar('color-background-neutral-subtle-active'),
    '--badge-interactive-backgroud-color-focus': cssVar('color-background-neutral-subtle-focus'),
    '--badge-interactive-backgroud-color-hover': cssVar('color-background-neutral-subtle-hover'),
  },
  [BadgeVariety.Success]: {
    '--badge-color': cssVar('color-text-success'),
    '--badge-border-color': cssVar('color-border-success-weak'),
    '--badge-background-color': cssVar('color-background-success-weak-default'),
    '--badge-interactive-backgroud-color-active': cssVar('color-background-success-weak-active'),
    '--badge-interactive-backgroud-color-focus': cssVar('color-background-success-weak-focus'),
    '--badge-interactive-backgroud-color-hover': cssVar('color-background-success-weak-hover'),
  },
  [BadgeVariety.Warning]: {
    '--badge-color': cssVar('color-text-warning'),
    '--badge-border-color': cssVar('color-border-warning-weak'),
    '--badge-background-color': cssVar('color-background-warning-weak-default'),
    '--badge-interactive-backgroud-color-active': cssVar('color-background-warning-weak-active'),
    '--badge-interactive-backgroud-color-focus': cssVar('color-background-warning-weak-focus'),
    '--badge-interactive-backgroud-color-hover': cssVar('color-background-warning-weak-hover'),
  },
};

const BADGE_HIGH_CONTRAST_VARIETY_STYLES = {
  [BadgeVariety.Danger]: {
    '--badge-color': cssVar('color-text-on-color'),
    '--badge-border-color': 'transparent',
    '--badge-background-color': cssVar('color-background-danger-default'),
    '--badge-interactive-backgroud-color-active': cssVar('color-background-danger-active'),
    '--badge-interactive-backgroud-color-focus': cssVar('color-background-danger-focus'),
    '--badge-interactive-backgroud-color-hover': cssVar('color-background-danger-hover'),
  },
  [BadgeVariety.Highlight]: {
    '--badge-color': cssVar('color-text-on-color'),
    '--badge-border-color': 'transparent',
    '--badge-background-color': cssVar('color-background-emphasis-default'),
    '--badge-interactive-backgroud-color-active': cssVar('color-background-emphasis-active'),
    '--badge-interactive-backgroud-color-focus': cssVar('color-background-emphasis-focus'),
    '--badge-interactive-backgroud-color-hover': cssVar('color-background-emphasis-hover'),
  },
  [BadgeVariety.Info]: {
    '--badge-color': cssVar('color-text-on-color'),
    '--badge-border-color': 'transparent',
    '--badge-background-color': cssVar('color-background-info-default'),
    '--badge-interactive-backgroud-color-active': cssVar('color-background-info-active'),
    '--badge-interactive-backgroud-color-focus': cssVar('color-background-info-focus'),
    '--badge-interactive-backgroud-color-hover': cssVar('color-background-info-hover'),
  },
  [BadgeVariety.Neutral]: {
    '--badge-color': cssVar('color-text-on-color'),
    '--badge-border-color': 'transparent',
    '--badge-background-color': cssVar('color-surface-inverse-default'),
    '--badge-interactive-backgroud-color-active': cssVar('color-surface-inverse-active'),
    '--badge-interactive-backgroud-color-focus': cssVar('color-surface-inverse-focus'),
    '--badge-interactive-backgroud-color-hover': cssVar('color-surface-inverse-hover'),
  },
  [BadgeVariety.Success]: {
    '--badge-color': cssVar('color-text-on-color'),
    '--badge-border-color': 'transparent',
    '--badge-background-color': cssVar('color-background-success-default'),
    '--badge-interactive-backgroud-color-active': cssVar('color-background-success-active'),
    '--badge-interactive-backgroud-color-focus': cssVar('color-background-success-focus'),
    '--badge-interactive-backgroud-color-hover': cssVar('color-background-success-hover'),
  },
  [BadgeVariety.Warning]: {
    '--badge-color': cssVar('color-text-on-color-inverse'),
    '--badge-border-color': 'transparent',
    '--badge-background-color': cssVar('color-background-warning-default'),
    '--badge-interactive-backgroud-color-active': cssVar('color-background-warning-active'),
    '--badge-interactive-backgroud-color-focus': cssVar('color-background-warning-focus'),
    '--badge-interactive-backgroud-color-hover': cssVar('color-background-warning-hover'),
  },
};
