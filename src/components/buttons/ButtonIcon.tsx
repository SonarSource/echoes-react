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

import { ComponentPropsWithoutRef, forwardRef, useMemo } from 'react';
import { isDefined } from '~common/helpers/types';
import { IconFilledProps } from '../icons/IconWrapper';
import { SpinnerOverrideColor } from '../spinner/SpinnerOverrideColor';
import { Tooltip } from '../tooltip';
import { useButtonClickHandler } from './Button';
import {
  BUTTON_VARIETY_STYLES,
  BUTTONICON_DIMENSIONS_STYLE,
  ButtonIconStyled,
} from './ButtonStyles';
import { ButtonCommonProps, ButtonSize, ButtonVariety } from './ButtonTypes';

type TooltipProps = ComponentPropsWithoutRef<typeof Tooltip>;
type TooltipOptions = Omit<TooltipProps, 'children' | 'content' | 'key'>;

interface ButtonIconProps extends ButtonCommonProps {
  Icon: React.ForwardRefExoticComponent<IconFilledProps & React.RefAttributes<HTMLSpanElement>>;
  isIconFilled?: IconFilledProps['isFilled'];

  ariaLabel: string;

  tooltipContent?: TooltipProps['content'];
  tooltipOptions?: TooltipOptions;
}

export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>((props, ref) => {
  const {
    Icon,
    ariaLabel,
    hasAutoFocus = false,
    isDisabled = false,
    isIconFilled,
    shouldPreventDefault = false,
    shouldStopPropagation = false,
    isLoading,
    onClick,
    size = ButtonSize.Large,
    variety = ButtonVariety.Default,
    tooltipContent = props.ariaLabel,
    tooltipOptions = {},
    type = 'button',
    ...htmlProps
  } = props;

  const handleClick = useButtonClickHandler(props);

  return (
    <Tooltip content={tooltipContent} {...tooltipOptions}>
      <ButtonIconStyled
        {...htmlProps}
        aria-label={ariaLabel}
        autoFocus={hasAutoFocus}
        css={useMemo(
          () => ({
            ...BUTTON_VARIETY_STYLES[variety],
            ...BUTTONICON_DIMENSIONS_STYLE[size],
          }),
          [variety, size],
        )}
        disabled={isDisabled}
        onClick={handleClick}
        ref={ref}
        type={type}>
        {isDefined(isLoading) ? (
          <SpinnerOverrideColor isLoading={isLoading}>
            <Icon isFilled={isIconFilled} />
          </SpinnerOverrideColor>
        ) : (
          <Icon isFilled={isIconFilled} />
        )}
      </ButtonIconStyled>
    </Tooltip>
  );
});
ButtonIcon.displayName = 'ButtonIcon';
