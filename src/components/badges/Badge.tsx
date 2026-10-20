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
   * Default is Small.
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
      // Everything above this line can be overridden by the `otherProps` object
      {...otherProps}
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
      outline: ${cssVar('badge-colors-focus-ring')} solid ${cssVar('focus-border-width-default')};
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
    '--badge-color': cssVar('badge-colors-danger-weak-foreground'),
    '--badge-border-color': cssVar('badge-colors-danger-weak-border'),
    '--badge-background-color': cssVar('badge-colors-danger-weak-default'),
    '--badge-interactive-backgroud-color-active': cssVar('badge-colors-danger-weak-pressed'),
    '--badge-interactive-backgroud-color-focus': cssVar('badge-colors-danger-weak-default'),
    '--badge-interactive-backgroud-color-hover': cssVar('badge-colors-danger-weak-hover'),
  },
  [BadgeVariety.Highlight]: {
    '--badge-color': cssVar('badge-colors-highlight-weak-foreground'),
    '--badge-border-color': cssVar('badge-colors-highlight-weak-border'),
    '--badge-background-color': cssVar('badge-colors-highlight-weak-default'),
    '--badge-interactive-backgroud-color-active': cssVar('badge-colors-highlight-weak-pressed'),
    '--badge-interactive-backgroud-color-focus': cssVar('badge-colors-highlight-weak-default'),
    '--badge-interactive-backgroud-color-hover': cssVar('badge-colors-highlight-weak-hover'),
  },
  [BadgeVariety.Info]: {
    '--badge-color': cssVar('badge-colors-information-weak-foreground'),
    '--badge-border-color': cssVar('badge-colors-information-weak-border'),
    '--badge-background-color': cssVar('badge-colors-information-weak-default'),
    '--badge-interactive-backgroud-color-active': cssVar('badge-colors-information-weak-pressed'),
    '--badge-interactive-backgroud-color-focus': cssVar('badge-colors-information-weak-default'),
    '--badge-interactive-backgroud-color-hover': cssVar('badge-colors-information-weak-hover'),
  },
  [BadgeVariety.Neutral]: {
    '--badge-color': cssVar('badge-colors-neutral-weak-foreground'),
    '--badge-border-color': cssVar('badge-colors-neutral-weak-border'),
    '--badge-background-color': cssVar('badge-colors-neutral-weak-default'),
    '--badge-interactive-backgroud-color-active': cssVar('badge-colors-neutral-weak-pressed'),
    '--badge-interactive-backgroud-color-focus': cssVar('badge-colors-neutral-weak-default'),
    '--badge-interactive-backgroud-color-hover': cssVar('badge-colors-neutral-weak-hover'),
  },
  [BadgeVariety.Success]: {
    '--badge-color': cssVar('badge-colors-success-weak-foreground'),
    '--badge-border-color': cssVar('badge-colors-success-weak-border'),
    '--badge-background-color': cssVar('badge-colors-success-weak-default'),
    '--badge-interactive-backgroud-color-active': cssVar('badge-colors-success-weak-pressed'),
    '--badge-interactive-backgroud-color-focus': cssVar('badge-colors-success-weak-default'),
    '--badge-interactive-backgroud-color-hover': cssVar('badge-colors-success-weak-hover'),
  },
  [BadgeVariety.Warning]: {
    '--badge-color': cssVar('badge-colors-warning-weak-foreground'),
    '--badge-border-color': cssVar('badge-colors-warning-weak-border'),
    '--badge-background-color': cssVar('badge-colors-warning-weak-default'),
    '--badge-interactive-backgroud-color-active': cssVar('badge-colors-warning-weak-pressed'),
    '--badge-interactive-backgroud-color-focus': cssVar('badge-colors-warning-weak-default'),
    '--badge-interactive-backgroud-color-hover': cssVar('badge-colors-warning-weak-hover'),
  },
};

const BADGE_HIGH_CONTRAST_VARIETY_STYLES = {
  [BadgeVariety.Danger]: {
    '--badge-color': cssVar('badge-colors-danger-solid-foreground'),
    '--badge-border-color': 'transparent',
    '--badge-background-color': cssVar('badge-colors-danger-solid-default'),
    '--badge-interactive-backgroud-color-active': cssVar('badge-colors-danger-solid-pressed'),
    '--badge-interactive-backgroud-color-focus': cssVar('badge-colors-danger-solid-default'),
    '--badge-interactive-backgroud-color-hover': cssVar('badge-colors-danger-solid-hover'),
  },
  [BadgeVariety.Highlight]: {
    '--badge-color': cssVar('badge-colors-highlight-solid-foreground'),
    '--badge-border-color': 'transparent',
    '--badge-background-color': cssVar('badge-colors-highlight-solid-default'),
    '--badge-interactive-backgroud-color-active': cssVar('badge-colors-highlight-solid-pressed'),
    '--badge-interactive-backgroud-color-focus': cssVar('badge-colors-highlight-solid-default'),
    '--badge-interactive-backgroud-color-hover': cssVar('badge-colors-highlight-solid-hover'),
  },
  [BadgeVariety.Info]: {
    '--badge-color': cssVar('badge-colors-information-solid-foreground'),
    '--badge-border-color': 'transparent',
    '--badge-background-color': cssVar('badge-colors-information-solid-default'),
    '--badge-interactive-backgroud-color-active': cssVar('badge-colors-information-solid-pressed'),
    '--badge-interactive-backgroud-color-focus': cssVar('badge-colors-information-solid-default'),
    '--badge-interactive-backgroud-color-hover': cssVar('badge-colors-information-solid-hover'),
  },
  [BadgeVariety.Neutral]: {
    '--badge-color': cssVar('badge-colors-neutral-solid-foreground'),
    '--badge-border-color': 'transparent',
    '--badge-background-color': cssVar('badge-colors-neutral-solid-default'),
    '--badge-interactive-backgroud-color-active': cssVar('badge-colors-neutral-solid-pressed'),
    '--badge-interactive-backgroud-color-focus': cssVar('badge-colors-neutral-solid-default'),
    '--badge-interactive-backgroud-color-hover': cssVar('badge-colors-neutral-solid-hover'),
  },
  [BadgeVariety.Success]: {
    '--badge-color': cssVar('badge-colors-success-solid-foreground'),
    '--badge-border-color': 'transparent',
    '--badge-background-color': cssVar('badge-colors-success-solid-default'),
    '--badge-interactive-backgroud-color-active': cssVar('badge-colors-success-solid-pressed'),
    '--badge-interactive-backgroud-color-focus': cssVar('badge-colors-success-solid-default'),
    '--badge-interactive-backgroud-color-hover': cssVar('badge-colors-success-solid-hover'),
  },
  [BadgeVariety.Warning]: {
    '--badge-color': cssVar('badge-colors-warning-solid-foreground'),
    '--badge-border-color': 'transparent',
    '--badge-background-color': cssVar('badge-colors-warning-solid-default'),
    '--badge-interactive-backgroud-color-active': cssVar('badge-colors-warning-solid-pressed'),
    '--badge-interactive-backgroud-color-focus': cssVar('badge-colors-warning-solid-default'),
    '--badge-interactive-backgroud-color-hover': cssVar('badge-colors-warning-solid-hover'),
  },
};
