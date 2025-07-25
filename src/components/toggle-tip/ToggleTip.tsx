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
import { forwardRef } from 'react';
import { useIntl } from 'react-intl';
import { ButtonIcon, ButtonVariety } from '../buttons';
import { IconInfo } from '../icons';
import { Popover, PopoverProps } from '../popover';

import { cssVar } from '~utils/design-tokens';

type PopoverPropsSubset = Omit<PopoverProps, 'children'>;

export interface ToggleTipProps extends PopoverPropsSubset {
  ariaLabel?: string;
  className?: string;
}

export const ToggleTip = forwardRef<HTMLButtonElement, ToggleTipProps>(
  (props: ToggleTipProps, ref) => {
    const { ariaLabel, className, ...popoverProps } = props;

    const intl = useIntl();

    const defaultAriaLabel = intl.formatMessage({
      id: 'toggletip.help',
      defaultMessage: 'More information',
      description: 'aria-label text and tooltip for the ToggleTip',
    });

    return (
      <Popover {...popoverProps}>
        <ToggleTipButtonIcon
          Icon={IconInfo}
          ariaLabel={ariaLabel ?? defaultAriaLabel}
          className={className}
          ref={ref}
          variety={ButtonVariety.DefaultGhost}
        />
      </Popover>
    );
  },
);

const ToggleTipButtonIcon = styled(ButtonIcon)`
  line-height: ${cssVar('line-height-10')};
  font-size: ${cssVar('font-size-10')};
  border-radius: ${cssVar('border-radius-200')};
  --button-padding: ${cssVar('dimension-space-0')};
  --button-height: ${cssVar('sizes-toggletips-height')};
  --button-width: ${cssVar('sizes-toggletips-width')};
`;

ToggleTip.displayName = 'ToggleTip';
