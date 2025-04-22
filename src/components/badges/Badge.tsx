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
  ariaLabel?: string;
  className?: string;
  isHighContrast?: boolean;
  size?: `${BadgeSize}`;
  variety: `${BadgeVariety}`;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const {
    ariaLabel,
    children,
    isHighContrast = false,
    size = BadgeSize.Small,
    variety,
    ...otherProps
  } = props;

  return (
    <StyledBadge
      aria-label={ariaLabel}
      {...otherProps}
      css={useMemo(
        () => ({
          ...(isHighContrast
            ? BADGE_HIGH_CONTRAST_VARIETY_STYLES[variety]
            : BADGE_VARIETY_STYLES[variety]),
          ...BADGE_SIZE_STYLES[size],
        }),
        [isHighContrast, size, variety],
      )}
      ref={ref}>
      {children}
    </StyledBadge>
  );
});

Badge.displayName = 'Badge';

const StyledBadge = styled.span`
  box-sizing: border-box;

  color: var(--badge-color);
  background-color: var(--badge-background-color);

  font-family: var(--echoes-font-family-sans);
  font-weight: var(--echoes-font-weight-medium);
  font-size: var(--badge-font-size);
  line-height: var(--badge-line-height);

  // Using outline so that the border doesn't take space in the flow
  outline: var(--badge-border-color) solid var(--echoes-border-width-default);
  border-radius: var(--echoes-border-radius-200);

  padding: var(--badge-padding);
  height: var(--badge-height);
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
  },
  [BadgeVariety.Highlight]: {
    '--badge-color': 'var(--echoes-color-text-emphasis)',
    '--badge-border-color': 'var(--echoes-color-border-emphasis-weak)',
    '--badge-background-color': 'var(--echoes-color-background-emphasis-weak-default)',
  },
  [BadgeVariety.Info]: {
    '--badge-color': 'var(--echoes-color-text-info)',
    '--badge-border-color': 'var(--echoes-color-border-info-weak)',
    '--badge-background-color': 'var(--echoes-color-background-info-weak)',
  },
  [BadgeVariety.Neutral]: {
    '--badge-color': 'var(--echoes-color-text-default)',
    '--badge-border-color': 'var(--echoes-color-border-weak)',
    '--badge-background-color': 'var(--echoes-color-background-neutral)',
  },
  [BadgeVariety.Success]: {
    '--badge-color': 'var(--echoes-color-text-success)',
    '--badge-border-color': 'var(--echoes-color-border-success-weak)',
    '--badge-background-color': 'var(--echoes-color-background-success-weak)',
  },
  [BadgeVariety.Warning]: {
    '--badge-color': 'var(--echoes-color-text-warning)',
    '--badge-border-color': 'var(--echoes-color-border-warning-weak)',
    '--badge-background-color': 'var(--echoes-color-background-warning-weak)',
  },
};

const BADGE_HIGH_CONTRAST_VARIETY_STYLES = {
  [BadgeVariety.Danger]: {
    '--badge-color': 'var(--echoes-color-text-on-color)',
    '--badge-border-color': 'transparent',
    '--badge-background-color': 'var(--echoes-color-background-danger-default)',
  },
  [BadgeVariety.Highlight]: {
    '--badge-color': 'var(--echoes-color-text-on-color)',
    '--badge-border-color': 'transparent',
    '--badge-background-color': 'var(--echoes-color-background-emphasis-default-default)',
  },
  [BadgeVariety.Info]: {
    '--badge-color': 'var(--echoes-color-text-on-color)',
    '--badge-border-color': 'transparent',
    '--badge-background-color': 'var(--echoes-color-background-info-default)',
  },
  [BadgeVariety.Neutral]: {
    '--badge-color': 'var(--echoes-color-text-on-color)',
    '--badge-border-color': 'transparent',
    '--badge-background-color': 'var(--echoes-color-background-inverse)',
  },
  [BadgeVariety.Success]: {
    '--badge-color': 'var(--echoes-color-text-on-color)',
    '--badge-border-color': 'transparent',
    '--badge-background-color': 'var(--echoes-color-background-success-default)',
  },
  [BadgeVariety.Warning]: {
    '--badge-color': 'var(--echoes-color-text-on-color-inverse)',
    '--badge-border-color': 'transparent',
    '--badge-background-color': 'var(--echoes-color-background-warning-default)',
  },
};
