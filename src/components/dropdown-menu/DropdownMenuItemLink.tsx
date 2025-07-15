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

import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { NavLinkBase, NavLinkBaseProps } from '~common/components/NavLinkBase';
import { IconLinkExternal } from '../icons/IconLinkExternal';
import { DropdownMenuItemBase, DropdownMenuItemBaseProps } from './DropdownMenuItemBase';

export type DropdownMenuItemLinkProps = Omit<
  DropdownMenuItemBaseProps,
  'isCheckable' | 'isChecked'
> & {
  hasExternalIcon?: boolean;
} & Pick<NavLinkBaseProps, 'download' | 'isMatchingFullPath' | 'shouldOpenInNewTab' | 'to'>;

export const DropdownMenuItemLink = forwardRef<HTMLDivElement, DropdownMenuItemLinkProps>(
  (props, ref) => {
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
          <StyledNavLinkBase
            download={download}
            isMatchingFullPath={isMatchingFullPath}
            shouldOpenInNewTab={shouldOpenInNewTab}
            to={to}>
            {getStyledItemContents({ label: children })}
          </StyledNavLinkBase>
        )}
      </StyledDropdownMenuItemBase>
    );
  },
);
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
StyledDropdownMenuItemBase.displayName = 'StyledDropdownMenuItemBase';

const StyledNavLinkBase = styled(NavLinkBase)`
  text-decoration: none;
`;
StyledNavLinkBase.displayName = 'StyledNavLinkBase';

const StyledIconLinkExternal = styled(IconLinkExternal)`
  font-size: var(--echoes-font-size-20);
  padding-right: var(--echoes-dimension-space-25);
`;
StyledIconLinkExternal.displayName = 'StyledIconLinkExternal';

const StyledSuffix = styled.span`
  align-items: center;
  display: flex;
  gap: var(--echoes-dimension-space-50);
`;
StyledSuffix.displayName = 'StyledSuffix';

const getComposedSuffix = ({
  shouldOpenInNewTab,
  suffix,
}: Readonly<Pick<DropdownMenuItemLinkProps, 'shouldOpenInNewTab' | 'suffix'>>) => {
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
