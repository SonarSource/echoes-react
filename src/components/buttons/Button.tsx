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
import {
  BUTTON_SIZE_STYLE,
  BUTTON_VARIETY_STYLES,
  ButtonInnerWrapper,
  ButtonStyled,
  ButtonText,
  SpinnerButton,
} from './ButtonStyles';
import { ButtonCommonProps, ButtonSize, ButtonVariety } from './ButtonTypes';

export interface ButtonProps extends ButtonCommonProps {
  children?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
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
    variety = ButtonVariety.Default,
    suffix,
    type = 'button',
    ...htmlProps
  } = props;

  const handleClick = useButtonClickHandler(props);

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
      {isDefined(isLoading) && <SpinnerButton isLoading={isLoading} />}
      <ButtonInnerWrapper>
        {prefix}
        <ButtonText>{children}</ButtonText>
        {suffix}
      </ButtonInnerWrapper>
    </ButtonStyled>
  );
});

Button.displayName = 'Button';

export function useButtonClickHandler(
  props: Pick<
    ButtonProps,
    'isDisabled' | 'shouldPreventDefault' | 'shouldStopPropagation' | 'onClick'
  >,
) {
  const { isDisabled, onClick, shouldPreventDefault, shouldStopPropagation } = props;

  return useCallback(
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
}
