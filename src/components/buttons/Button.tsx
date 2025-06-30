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
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { ForwardedRef, MouseEvent, ReactNode, forwardRef, useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { isDefined } from '~common/helpers/types';
import { IconLinkExternal } from '../icons';
import { getShouldOpenInNewTabProps } from '../links/LinkBase';
import { ButtonAsLink, ButtonAsLinkBaseProps } from './ButtonAsLink';
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

export interface ButtonAsButtonProps extends CommonProps, ButtonBaseProps {
  to?: never;
}

interface ButtonAsLinkProps extends CommonProps, ButtonAsLinkBaseProps {}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      hasAutoFocus = false,
      isLoading,
      onClick,
      prefix,
      shouldPreventDefault = false,
      shouldStopPropagation = false,
      size = ButtonSize.Large,
      variety = ButtonVariety.Default,
      suffix,
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
      // Since "props" is narrowed to ButtonAsLinkProps, we can safely assume that "restProps" is of type ButtonAsLinkBaseProps
      const { to, shouldOpenInNewTab, ...htmlProps } = restProps as ButtonAsLinkBaseProps;

      return (
        <ButtonAsLink
          {...htmlProps}
          {...getShouldOpenInNewTabProps({ shouldOpenInNewTab, to })}
          autoFocus={hasAutoFocus}
          css={commonStyles}
          onClick={handleClick}
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          to={to}>
          <ButtonContent
            isLoading={isLoading}
            prefix={prefix}
            suffix={
              suffix ||
              (shouldOpenInNewTab && (
                <>
                  &nbsp;
                  <IconLinkExternal data-testid="echoes-link-external-icon" />
                  <VisuallyHidden.Root>
                    <FormattedMessage
                      defaultMessage="(opens in new tab)"
                      description="Screen reader-only text to indicate that the link will open in a new tab"
                      id="open_in_new_tab"
                    />
                  </VisuallyHidden.Root>
                </>
              ))
            }>
            {children}
          </ButtonContent>
        </ButtonAsLink>
      );
    }

    const { isDisabled = false, type = 'button' } = props;

    return (
      <ButtonStyled
        {...restProps}
        autoFocus={hasAutoFocus}
        css={commonStyles}
        disabled={isDisabled}
        onClick={handleClick}
        ref={ref as ForwardedRef<HTMLButtonElement>}
        type={type}>
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
  props: Pick<ButtonBaseProps, 'isDisabled' | 'shouldPreventDefault' | 'shouldStopPropagation'> & {
    onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => unknown;
  },
) {
  const { isDisabled, onClick, shouldPreventDefault, shouldStopPropagation } = props;

  return useCallback(
    (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
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

function isButtonAsLink(props: ButtonProps): props is ButtonAsLinkProps {
  // A link must have a 'to' prop and a link cannot be disabled.
  // Disabling a link will end up rendering a disabled button instead.
  return 'to' in props && !props.isDisabled;
}
