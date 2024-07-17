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
import { MouseEvent, ReactNode, forwardRef, useCallback, useMemo } from 'react';
import { isDefined } from '~common/helpers/types';
import { Spinner } from '../spinner';
import {
  BUTTON_SIZE_STYLE,
  BUTTON_VARIETY_STYLES,
  ButtonInnerWrapper,
  ButtonStyled,
  ButtonText,
} from './ButtonStyles';
import { ButtonSize, ButtonVariety, HTMLButtonProps } from './ButtonTypes';

export interface ButtonProps extends HTMLButtonProps {
  children?: ReactNode;
  className?: string;
  hasAutoFocus?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => unknown;
  prefix?: ReactNode;
  size?: ButtonSize;
  shouldPreventDefault?: boolean;
  shouldStopPropagation?: boolean;
  suffix?: ReactNode;
  variety?: ButtonVariety;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    hasAutoFocus = false,
    isDisabled = false,
    isLoading,
    onClick,
    prefix,
    shouldPreventDefault = false,
    shouldStopPropagation = false,
    size = ButtonSize.Large,
    variety = ButtonVariety.Neutral,
    suffix,
    type = 'button',
    ...htmlProps
  } = props;

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (shouldPreventDefault || isDisabled) {
        event.preventDefault();
      }

      if (shouldStopPropagation) {
        event.stopPropagation();
      }

      if (onClick && !isDisabled) {
        onClick(event);
      }
    },
    [isDisabled, onClick, shouldPreventDefault, shouldStopPropagation],
  );

  return (
    <ButtonStyled
      {...htmlProps}
      autoFocus={hasAutoFocus}
      css={useMemo(
        () => ({
          ...BUTTON_VARIETY_STYLES[variety],
          ...BUTTON_SIZE_STYLE[size],
        }),
        [variety, size],
      )}
      disabled={isDisabled}
      onClick={handleClick}
      ref={ref}
      type={type}>
      {isDefined(isLoading) && (
        <Spinner
          className="echoes-button-spinner"
          isLoading={isLoading}
          wrapperClassName="echoes-button-spinner-wrapper"
        />
      )}
      <ButtonInnerWrapper>
        {prefix}
        <ButtonText>{children}</ButtonText>
        {suffix}
      </ButtonInnerWrapper>
    </ButtonStyled>
  );
});

Button.displayName = 'Button';
