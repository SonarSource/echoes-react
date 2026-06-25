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
import { Ref } from 'react';
import { cssVar } from '~utils/design-tokens';

export enum BadgeCounterVariety {
  Accent = 'accent',
  Default = 'default',
}

export interface BadgeCounterProps {
  className?: string;
  ref?: Ref<HTMLSpanElement>;
  /**
   * Specifies the content of the BadgeCounter.
   * Type string is possible, to allow for use cases like `23+`
   */
  value: number | string;
  /**
   * Specifies the visual style of the BadgeCounter. Must match `BadgeCounterVariety`.
   * @defaultValue `BadgeCounterVariety.Default`.
   */
  variety?: `${BadgeCounterVariety}`;
}

export function BadgeCounter(props: Readonly<BadgeCounterProps>) {
  const { value, variety = BadgeCounterVariety.Default, ...restProps } = props;
  return (
    <BadgeCounterStyled {...restProps} css={BADGE_COUNTER_VARIETY_STYLES[variety]}>
      {value}
    </BadgeCounterStyled>
  );
}

BadgeCounter.displayName = 'BadgeCounter';

const BadgeCounterStyled = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: ${cssVar('line-height-10')};
  min-width: ${cssVar('dimension-width-200')};

  border-radius: ${cssVar('border-radius-full')};
  padding: ${cssVar('dimension-space-0')} ${cssVar('dimension-space-50')};

  font: ${cssVar('typography-text-small-semi-bold')};
  color: var(--badge-counter-color);

  background-color: var(--badge-counter-background-color);
`;
BadgeCounterStyled.displayName = 'BadgeCounterStyled';

const BADGE_COUNTER_VARIETY_STYLES = {
  [BadgeCounterVariety.Default]: {
    '--badge-counter-color': cssVar('color-text-default'),
    '--badge-counter-background-color': cssVar('color-background-neutral-bolder-default'),
  },
  [BadgeCounterVariety.Accent]: {
    '--badge-counter-color': cssVar('color-text-on-color'),
    '--badge-counter-background-color': cssVar('color-background-accent-default'),
  },
};
