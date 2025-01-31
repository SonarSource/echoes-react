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
import React, { forwardRef } from 'react';
import { useIntl } from 'react-intl';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { isSonarLink } from '~common/helpers/url';
import { IconLinkExternal } from '../icons/IconLinkExternal';

type RouterNavLinkPropsAllowed = 'download' | 'reloadDocument' | 'state' | 'style' | 'title' | 'to';

export enum LinkHighlight {
  Accent = 'accent',
  CurrentColor = 'current-color',
  Default = 'default',
  Subdued = 'subdued',
}

export interface LinkProps extends Pick<RouterLinkProps, RouterNavLinkPropsAllowed> {
  children: React.ReactNode;
  className?: string;
  highlight?: `${LinkHighlight}`;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  shouldBlurAfterClick?: boolean;
  shouldOpenInNewTab?: boolean;
  shouldPreventDefault?: boolean;
  shouldStopPropagation?: boolean;
}

export const LinkBase = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const {
    children,
    shouldBlurAfterClick = false,
    onClick,
    shouldOpenInNewTab = false,
    shouldPreventDefault = false,
    shouldStopPropagation = false,
    style,
    to,
    ...restAndRadixProps
  } = props;

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

  const shouldOpenInNewTabProps = shouldOpenInNewTab
    ? {
        rel: `noopener${typeof to === 'string' && isSonarLink(to) ? '' : ' noreferrer nofollow'}`,
        /* eslint-disable-next-line react/jsx-no-target-blank -- we only allow noopener noreferrer for known external links */
        target: '_blank',
      }
    : {};

  return (
    <RouterLink
      {...shouldOpenInNewTabProps}
      {...restAndRadixProps}
      onClick={handleClick}
      ref={ref}
      style={style}
      to={to}>
      {children}

      {shouldOpenInNewTab && (
        <>
          &nbsp;
          <IconLinkExternal data-testid="echoes-link-external-icon" />
          <VisuallyHidden.Root>
            {intl.formatMessage({
              id: 'open_in_new_tab',
              defaultMessage: '(opens in new tab)',
              description:
                'Screen reader-only text to indicate that the link will open in a new tab',
            })}
          </VisuallyHidden.Root>
        </>
      )}
    </RouterLink>
  );
});

LinkBase.displayName = 'LinkBase';
