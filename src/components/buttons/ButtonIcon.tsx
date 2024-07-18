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

import { forwardRef, MouseEvent, useMemo } from 'react';
import { IconProps } from '../icons';
import { SpinnerOverrideColor } from '../spinner/SpinnerOverrideColor';
import { useButtonClickHandler } from './Button';
import { BUTTON_VARIETY_STYLES, BUTTONICON_DIMENSIONS, ButtonIconStyled } from './ButtonStyles';
import { ButtonSize, ButtonVariety, HTMLButtonProps } from './ButtonTypes';

export interface ButtonIconProps extends HTMLButtonProps {
  Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<HTMLSpanElement>>;
  'aria-label': string;
  className?: string;
  hasAutoFocus?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => unknown;
  size?: ButtonSize;
  shouldPreventDefault?: boolean;
  shouldStopPropagation?: boolean;
  variety?: ButtonVariety;
}

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>((props, ref) => {
  const {
    Icon,
    hasAutoFocus = false,
    isDisabled = false,
    shouldPreventDefault = false,
    shouldStopPropagation = false,
    isLoading = false,
    onClick,
    size = ButtonSize.Large,
    variety = ButtonVariety.Neutral,
    type = 'button',
    ...htmlProps
  } = props;

  const handleClick = useButtonClickHandler(props);

  return (
    <ButtonIconStyled
      {...htmlProps}
      autoFocus={hasAutoFocus}
      css={useMemo(
        () => ({
          ...BUTTON_VARIETY_STYLES[variety],
          ...BUTTONICON_DIMENSIONS[size],
        }),
        [variety, size],
      )}
      disabled={isDisabled}
      onClick={handleClick}
      ref={ref}
      type={type}>
      <SpinnerOverrideColor isLoading={isLoading}>
        <Icon />
      </SpinnerOverrideColor>
    </ButtonIconStyled>
  );
});
ButtonIcon.displayName = 'ButtonIcon';
