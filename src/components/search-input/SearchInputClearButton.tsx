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
import { useButtonClickHandler } from '../buttons/Button';
import { BUTTON_VARIETY_STYLES, ButtonIconStyled } from '../buttons/ButtonStyles';
import { ButtonBaseProps } from '../buttons/ButtonTypes';
import { IconX } from '../icons';

import { cssVar } from '~utils/design-tokens';

interface SearchInputClearButtonProps extends Pick<ButtonBaseProps, 'className' | 'onClick'> {
  ariaLabel: string;
}

export const SearchInputClearButton = forwardRef<HTMLButtonElement, SearchInputClearButtonProps>(
  (props, ref) => {
    const { ariaLabel, onClick, ...htmlProps } = props;

    const handleClick = useButtonClickHandler(props);

    return (
      <SearchInputClearButtonStyled
        aria-label={ariaLabel}
        // Everything above this line can be overridden by the `htmlProps` object
        {...htmlProps}
        onClick={handleClick}
        ref={ref}
        type="button">
        <IconX />
      </SearchInputClearButtonStyled>
    );
  },
);
SearchInputClearButton.displayName = 'SearchInputClearButton';

const SearchInputClearButtonStyled = styled(ButtonIconStyled)`
  ${BUTTON_VARIETY_STYLES['default-ghost']};
  --button-padding: ${cssVar('dimension-space-0')};
  --button-height: ${cssVar('dimension-height-500')};
  --button-width: ${cssVar('dimension-width-250')};

  display: flex;
  font: ${cssVar('typography-text-small-regular')};
  border-radius: ${cssVar('border-radius-200')};
`;
SearchInputClearButtonStyled.displayName = 'SearchInputClearButtonStyled';
