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
import { ForwardedRef, MouseEvent, ReactNode, forwardRef, useCallback, useMemo } from 'react';
import { isDefined } from '~common/helpers/types';
import { getShouldOpenInNewTabProps } from '../links/LinkBase';
import { LinkOpenInNewTabSuffix } from '../links/LinkOpenInNewTabSuffix';
import { ButtonAsLink, ButtonAsLinkBaseProps, LinkPropsForbiddenForButton } from './ButtonAsLink';
import {
  BUTTON_SIZE_STYLE,
  BUTTON_VARIETY_STYLES,
  ButtonInnerWrapper,
  ButtonStyled,
  ButtonText,
  SpinnerButton,
} from './ButtonStyles';
import { ButtonBaseProps, ButtonSize, ButtonVariety } from './ButtonTypes';

interface CommonProps {
  children?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export interface ButtonAsButtonProps
  extends CommonProps,
    ButtonBaseProps,
    LinkPropsForbiddenForButton {}

interface ButtonAsLinkProps extends CommonProps, ButtonAsLinkBaseProps {}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      ariaLabel,
      children,
      hasAutoFocus = false,
      isDisabled = false,
      isLoading,
      onClick,
      prefix,
      enablePreventDefault = false,
      enableStopPropagation = false,
      size = ButtonSize.Large,
      variety = ButtonVariety.Default,
      enableOpenInNewTab = false,
      suffix,
      to,
      type = 'button',
      ...restProps
    } = props;

    const handleClick = useButtonClickHandler(props);

    const commonStyles = useMemo(
      () => ({
        ...BUTTON_VARIETY_STYLES[variety],
        ...BUTTON_SIZE_STYLE[size],
      }),
      [variety, size],
    );

    if (isButtonAsLink(props)) {
      const { to } = props;

      return (
        <ButtonAsLink
          {...getShouldOpenInNewTabProps({ enableOpenInNewTab, to })}
          aria-label={ariaLabel}
          autoFocus={hasAutoFocus}
          css={commonStyles}
          onClick={handleClick}
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          to={to}
          {...restProps}>
          <ButtonContent
            isLoading={isLoading}
            prefix={prefix}
            suffix={suffix || <LinkOpenInNewTabSuffix enableOpenInNewTab={enableOpenInNewTab} />}>
            {children}
          </ButtonContent>
        </ButtonAsLink>
      );
    }

    // Extracting the rest of the link props to avoid passing them to the button element.
    const { download, reloadDocument, state, ...htmlProps } = restProps;

    return (
      <ButtonStyled
        aria-label={ariaLabel}
        autoFocus={hasAutoFocus}
        css={commonStyles}
        disabled={isDisabled}
        onClick={handleClick}
        ref={ref as ForwardedRef<HTMLButtonElement>}
        type={type}
        {...htmlProps}>
        <ButtonContent isLoading={isLoading} prefix={prefix} suffix={suffix}>
          {children}
        </ButtonContent>
      </ButtonStyled>
    );
  },
);

Button.displayName = 'Button';

function ButtonContent(
  props: Readonly<Pick<ButtonProps, 'children' | 'isLoading' | 'prefix' | 'suffix'>>,
) {
  const { children, isLoading, prefix, suffix } = props;
  return (
    <>
      {isDefined(isLoading) && <SpinnerButton isLoading={isLoading} />}
      <ButtonInnerWrapper>
        {prefix}
        <ButtonText>{children}</ButtonText>
        {suffix}
      </ButtonInnerWrapper>
    </>
  );
}

ButtonContent.displayName = 'ButtonContent';

export function useButtonClickHandler(
  props: Pick<ButtonBaseProps, 'isDisabled' | 'enablePreventDefault' | 'enableStopPropagation'> & {
    onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => unknown;
  },
) {
  const { isDisabled, onClick, enablePreventDefault, enableStopPropagation } = props;

  return useCallback(
    (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (enablePreventDefault || isDisabled) {
        event.preventDefault();
      }

      if (enableStopPropagation) {
        event.stopPropagation();
      }

      if (onClick && !isDisabled) {
        onClick(event);
      }
    },
    [isDisabled, onClick, enablePreventDefault, enableStopPropagation],
  );
}

function isButtonAsLink(props: ButtonProps): props is ButtonAsLinkProps {
  // A link must have a 'to' prop and a link cannot be disabled.
  // Disabling a link will end up rendering a disabled button instead.
  return 'to' in props && !props.isDisabled;
}
