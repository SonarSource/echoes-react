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

import styled from '@emotion/styled';
import React, { HTMLAttributeAnchorTarget } from 'react';
import { useIntl } from 'react-intl';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { isSonarLink } from '~common/helpers/url';
import { IconLinkExternal } from '../icons/IconLinkExternal';

type RouterLinkPropsRequired = 'download' | 'reloadDocument' | 'state' | 'style' | 'title' | 'to';

export enum LinkHighlight {
  Accent = 'accent',
  CurrentColor = 'current-color',
  Default = 'default',
  Subdued = 'subdued',
}

export interface LinkProps extends Pick<RouterLinkProps, RouterLinkPropsRequired> {
  children: React.ReactNode;
  className?: string;
  isExternal?: boolean;
  hasExternalIcon?: boolean;
  highlight?: LinkHighlight;
  shouldBlurAfterClick?: boolean;
  shouldPreventDefault?: boolean;
  shouldStopPropagation?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: HTMLAttributeAnchorTarget;
}

function LinkBaseWithRef(props: Readonly<LinkProps>, ref: React.ForwardedRef<HTMLAnchorElement>) {
  const {
    children,
    shouldBlurAfterClick = false,
    isExternal: isExternalProp = false,
    onClick,
    shouldPreventDefault = false,
    hasExternalIcon = true,
    shouldStopPropagation = false,
    to,
    ...rest
  } = props;

  const toAsString =
    typeof to === 'string' ? to : `${to.pathname ?? ''}${to.search ?? ''}${to.hash ?? ''}`;

  const isExternal = isExternalProp || toAsString.startsWith('http');

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

  if (isExternal) {
    return (
      // eslint-disable-next-line react/jsx-no-target-blank --  we only allow noopener noreferrer for known external links
      <a
        rel={`noopener${isSonarLink(toAsString) ? '' : ' noreferrer nofollow'}`}
        target="_blank"
        {...rest}
        href={toAsString}
        onClick={handleClick}
        ref={ref}>
        {children}
        {hasExternalIcon && (
          <ExternalIcon
            ariaLabel={intl.formatMessage({
              id: 'open_in_new_window',
              defaultMessage: 'Open in new window',
              description: 'aria-label text, to indicate that the link will open in a new window',
            })}
          />
        )}
      </a>
    );
  }

  return (
    <RouterLink ref={ref} {...rest} onClick={handleClick} to={to}>
      {children}
    </RouterLink>
  );
}

const ExternalIcon = styled(IconLinkExternal)`
  margin-left: var(--echoes-dimension-space-50);
`;

export const LinkBase = React.forwardRef(LinkBaseWithRef);
