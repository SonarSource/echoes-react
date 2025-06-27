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

import { ComponentPropsWithoutRef, ForwardedRef, forwardRef, useMemo } from 'react';
import { isDefined } from '~common/helpers/types';
import { IconFilledProps } from '../icons/IconWrapper';
import { getShouldOpenInNewTabProps } from '../links/LinkBase';
import { SpinnerOverrideColor } from '../spinner/SpinnerOverrideColor';
import { Tooltip } from '../tooltip';
import { useButtonClickHandler } from './Button';
import { ButtonAsLinkBaseProps, ButtonIconAsLink } from './ButtonAsLink';
import {
  BUTTON_VARIETY_STYLES,
  BUTTONICON_DIMENSIONS_STYLE,
  ButtonIconStyled,
} from './ButtonStyles';
import { ButtonBaseProps, ButtonSize, ButtonVariety } from './ButtonTypes';

type TooltipProps = ComponentPropsWithoutRef<typeof Tooltip>;
type TooltipOptions = Omit<TooltipProps, 'children' | 'content' | 'key'>;

interface CommonProps {
  Icon: React.ForwardRefExoticComponent<IconFilledProps & React.RefAttributes<HTMLSpanElement>>;
  isIconFilled?: IconFilledProps['isFilled'];

  ariaLabel: string;

  tooltipContent?: TooltipProps['content'];
  tooltipOptions?: TooltipOptions;
}

export interface ButtonIconAsButtonProps extends CommonProps, ButtonBaseProps {
  to?: never;
}

interface ButtonIconAsLinkProps extends CommonProps, ButtonAsLinkBaseProps {}

export type ButtonIconProps = ButtonIconAsButtonProps | ButtonIconAsLinkProps;

export const ButtonIcon = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonIconProps>(
  (props, ref) => {
    const {
      Icon,
      ariaLabel,
      hasAutoFocus = false,
      isIconFilled,
      shouldPreventDefault = false,
      shouldStopPropagation = false,
      isLoading,
      onClick,
      size = ButtonSize.Large,
      variety = ButtonVariety.Default,
      tooltipContent = props.ariaLabel,
      tooltipOptions = {},
      ...restProps
    } = props;

    const handleClick = useButtonClickHandler(props);

    const commonStyles = useMemo(
      () => ({
        ...BUTTON_VARIETY_STYLES[variety],
        ...BUTTONICON_DIMENSIONS_STYLE[size],
      }),
      [variety, size],
    );

    if (isButtonIconAsLink(props)) {
      const { to, shouldOpenInNewTab } = props;

      return (
        <Tooltip content={tooltipContent} {...tooltipOptions}>
          <ButtonIconAsLink
            {...restProps}
            {...getShouldOpenInNewTabProps({ shouldOpenInNewTab, to })}
            aria-label={ariaLabel}
            autoFocus={hasAutoFocus}
            css={commonStyles}
            onClick={handleClick}
            ref={ref as ForwardedRef<HTMLAnchorElement>}
            to={to}>
            <ButtonIconContent Icon={Icon} isIconFilled={isIconFilled} isLoading={isLoading} />
          </ButtonIconAsLink>
        </Tooltip>
      );
    }

    const { isDisabled = false, type = 'button' } = props;

    return (
      <Tooltip content={tooltipContent} {...tooltipOptions}>
        <ButtonIconStyled
          {...restProps}
          aria-label={ariaLabel}
          autoFocus={hasAutoFocus}
          css={commonStyles}
          disabled={isDisabled}
          onClick={handleClick}
          ref={ref as ForwardedRef<HTMLButtonElement>}
          type={type}>
          <ButtonIconContent Icon={Icon} isIconFilled={isIconFilled} isLoading={isLoading} />
        </ButtonIconStyled>
      </Tooltip>
    );
  },
);
ButtonIcon.displayName = 'ButtonIcon';

function ButtonIconContent(
  props: Readonly<Pick<ButtonIconProps, 'Icon' | 'isIconFilled' | 'isLoading'>>,
) {
  const { isLoading, Icon, isIconFilled } = props;
  if (isDefined(isLoading)) {
    return (
      <SpinnerOverrideColor isLoading={isLoading}>
        <Icon isFilled={isIconFilled} />
      </SpinnerOverrideColor>
    );
  }

  return <Icon isFilled={isIconFilled} />;
}

ButtonIconContent.displayName = 'ButtonIconContent';

function isButtonIconAsLink(props: ButtonIconProps): props is ButtonIconAsLinkProps {
  return 'to' in props;
}
