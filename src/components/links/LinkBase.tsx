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

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import React, { CSSProperties, HTMLAttributeAnchorTarget, forwardRef } from 'react';
import { useIntl } from 'react-intl';
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
  NavLinkProps as RouterNavLinkProps,
} from 'react-router-dom';
import { isSonarLink } from '~common/helpers/url';
import { IconLinkExternal } from '../icons/IconLinkExternal';

type RouterNavLinkPropsAllowed = 'download' | 'reloadDocument' | 'state' | 'style' | 'title' | 'to';

export enum LinkHighlight {
  Accent = 'accent',
  CurrentColor = 'current-color',
  Default = 'default',
  Subdued = 'subdued',
}

export type NavLinkProps =
  | {
      isMatchingFullPath?: boolean;
      isNavLink: true;
    }
  | {
      isMatchingFullPath?: never;
      isNavLink?: false;
    };

export type LinkBaseFixedProps = Pick<RouterNavLinkProps, RouterNavLinkPropsAllowed> & {
  children: React.ReactNode;
  className?: string;
  hasExternalIcon?: boolean;
  highlight?: LinkHighlight;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  shouldBlurAfterClick?: boolean;
  shouldOpenInNewTab?: boolean;
  shouldPreventDefault?: boolean;
  shouldStopPropagation?: boolean;
  target?: HTMLAttributeAnchorTarget;
};

export type LinkBaseProps = LinkBaseFixedProps & NavLinkProps;

export const LinkBase = forwardRef<HTMLAnchorElement, LinkBaseProps>((props, ref) => {
  const {
    children,
    shouldBlurAfterClick = false,
    isMatchingFullPath = false,
    onClick,
    shouldOpenInNewTab = false,
    shouldPreventDefault = false,
    hasExternalIcon = true,
    isNavLink = false,
    shouldStopPropagation = false,
    style,
    to,
    ...restAndRadixProps
  } = props;

  const toAsString =
    typeof to === 'string' ? to : `${to.pathname ?? ''}${to.search ?? ''}${to.hash ?? ''}`;

  const intl = useIntl();

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (shouldBlurAfterClick) {
        event.currentTarget.blur();
      }

      if (shouldPreventDefault) {
        event.preventDefault();
      }

      if (shouldStopPropagation) {
        event.stopPropagation();
      }

      if (onClick) {
        onClick(event);
      }
    },
    [onClick, shouldBlurAfterClick, shouldPreventDefault, shouldStopPropagation],
  );

  if (shouldOpenInNewTab) {
    return (
      /* eslint-disable-next-line react/jsx-no-target-blank -- we only allow noopener noreferrer for known external links */
      <a
        rel={`noopener${isSonarLink(toAsString) ? '' : ' noreferrer nofollow'}`}
        target="_blank"
        {...restAndRadixProps}
        href={toAsString}
        onClick={handleClick}
        ref={ref}
        style={style as CSSProperties | undefined}>
        {children}

        {hasExternalIcon && (
          <>
            &nbsp;
            <IconLinkExternal data-testid="echoes-link-external-icon" />
          </>
        )}

        <VisuallyHidden.Root>
          {intl.formatMessage({
            id: 'open_in_new_tab',
            defaultMessage: '(opens in new tab)',
            description: 'Screen reader-only text to indicate that the link will open in a new tab',
          })}
        </VisuallyHidden.Root>
      </a>
    );
  }

  const RouterLinkComponent = isNavLink ? RouterNavLink : RouterLink;

  return (
    <RouterLinkComponent
      {...(isMatchingFullPath && isNavLink ? { end: true } : {})}
      {...restAndRadixProps}
      onClick={handleClick}
      ref={ref}
      style={style}
      to={to}>
      {children}
    </RouterLinkComponent>
  );
});

LinkBase.displayName = 'LinkBase';
