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
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { forwardRef } from 'react';
import { useIntl } from 'react-intl';
import { NavLink as RouterNavLink, NavLinkProps as RouterNavLinkProps } from 'react-router-dom';
import { isSonarLink } from '~common/helpers/url';
import { IconLinkExternal } from '../icons/IconLinkExternal';
import { DropdownMenuItemBase, DropdownMenuItemBaseProps } from './DropdownMenuItemBase';

type Props = Omit<
  DropdownMenuItemBaseProps,
  'isCheckable' | 'isChecked' | 'ItemWrapper' | 'itemWrapperProps'
> & { hasExternalIcon?: boolean } & Pick<
    DropdownMenuItemNavLinkProps,
    'download' | 'isMatchingFullPath' | 'shouldOpenInNewTab' | 'to'
  >;

const getComposedSuffix = ({
  shouldOpenInNewTab,
  suffix,
}: Readonly<Pick<Props, 'shouldOpenInNewTab' | 'suffix'>>) => {
  const externalSuffix = shouldOpenInNewTab ? <StyledIconLinkExternal /> : undefined;

  if (suffix && externalSuffix) {
    return (
      <StyledSuffix>
        {suffix}
        {externalSuffix}
      </StyledSuffix>
    );
  }

  return suffix || externalSuffix;
};

export const DropdownMenuItemLink = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    children,
    download,
    hasExternalIcon = true,
    isDisabled,
    isMatchingFullPath = false,
    shouldOpenInNewTab = false,
    suffix,
    to,
    ...radixProps
  } = props;

  const itemProps = {
    ...radixProps,
    isDisabled,
    suffix: getComposedSuffix({
      shouldOpenInNewTab: shouldOpenInNewTab && hasExternalIcon,
      suffix,
    }),
  };

  if (isDisabled) {
    return (
      <StyledDropdownMenuItemBase {...itemProps} ref={ref}>
        {children}
      </StyledDropdownMenuItemBase>
    );
  }

  return (
    <StyledDropdownMenuItemBase {...itemProps} ref={ref}>
      {({ getStyledItemContents }) => (
        <StyledLinkBase
          download={download}
          isMatchingFullPath={isMatchingFullPath}
          shouldOpenInNewTab={shouldOpenInNewTab}
          to={to}>
          {getStyledItemContents({ label: children })}
        </StyledLinkBase>
      )}
    </StyledDropdownMenuItemBase>
  );
});
DropdownMenuItemLink.displayName = 'DropdownMenu.ItemLink';

const StyledDropdownMenuItemBase = styled(DropdownMenuItemBase)`
  /* when the current URL matches 'to', react-router adds an 'active' class to the 'a' tag */
  &.active {
    background-color: var(--echoes-color-background-default-active);
  }

  &[data-disabled] {
    background-color: var(--echoes-color-background-default);
  }
`;

type RouterNavLinkPropsAllowed = 'download' | 'to';

type DropdownMenuItemNavLinkProps = Pick<RouterNavLinkProps, RouterNavLinkPropsAllowed> & {
  children: React.ReactNode;
  isMatchingFullPath?: boolean;
  shouldOpenInNewTab?: boolean;
};

const DropdownMenuItemNavLink = forwardRef<HTMLAnchorElement, DropdownMenuItemNavLinkProps>(
  (props, ref) => {
    const {
      children,
      isMatchingFullPath = false,
      shouldOpenInNewTab = false,
      to,
      ...restAndRadixProps
    } = props;

    const intl = useIntl();

    const shouldOpenInNewTabProps = shouldOpenInNewTab
      ? {
          rel: `noopener${typeof to === 'string' && isSonarLink(to) ? '' : ' noreferrer nofollow'}`,
          /* eslint-disable-next-line react/jsx-no-target-blank -- we only allow noopener noreferrer for known external links */
          target: '_blank',
        }
      : {};

    return (
      <RouterNavLink
        {...(isMatchingFullPath ? { end: true } : {})}
        {...shouldOpenInNewTabProps}
        {...restAndRadixProps}
        ref={ref}
        to={to}>
        {children}

        {shouldOpenInNewTabProps && (
          <VisuallyHidden.Root>
            {intl.formatMessage({
              id: 'open_in_new_tab',
              defaultMessage: '(opens in new tab)',
              description:
                'Screen reader-only text to indicate that the link will open in a new tab',
            })}
          </VisuallyHidden.Root>
        )}
      </RouterNavLink>
    );
  },
);

DropdownMenuItemNavLink.displayName = 'DropdownMenuItemNavLink';

const StyledLinkBase = styled(DropdownMenuItemNavLink)`
  text-decoration: none;
`;

const StyledIconLinkExternal = styled(IconLinkExternal)`
  font-size: var(--echoes-font-size-20);
  padding-right: var(--echoes-dimension-space-25);
`;

const StyledSuffix = styled.span`
  align-items: center;
  display: flex;
  gap: var(--echoes-dimension-space-50);
`;
