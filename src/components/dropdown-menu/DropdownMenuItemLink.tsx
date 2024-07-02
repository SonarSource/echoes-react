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
import { IconLinkExternal } from '../icons/IconLinkExternal';
import { LinkBase, LinkProps } from '../links/LinkBase';
import { DropdownMenuItemBase, DropdownMenuItemBaseProps } from './DropdownMenuItemBase';

type Props = Omit<DropdownMenuItemBaseProps, 'isCheckable' | 'isChecked' | 'suffix'> &
  Pick<LinkProps, 'isExternal' | 'to'>;

export function DropdownMenuItemLink({
  isDisabled,
  isExternal: isExternalProp = false,
  to,
  ...props
}: Readonly<Props>) {
  const toAsString =
    typeof to === 'string' ? to : `${to.pathname ?? ''}${to.search ?? ''}${to.hash ?? ''}`;

  const isExternal = isExternalProp || toAsString.startsWith('http');

  return (
    <StyledLinkBase
      hasExternalIcon={false}
      hasNavLink
      isExternal={isExternal}
      to={isDisabled ? '' : to}>
      <StyledDropdownMenuItemBase
        {...props}
        isDisabled={isDisabled}
        suffix={isExternal ? <StyledIconLinkExternal /> : undefined}
      />
    </StyledLinkBase>
  );
}

const StyledLinkBase = styled(LinkBase)`
  text-decoration: none;
`;

const StyledDropdownMenuItemBase = styled(DropdownMenuItemBase)`
  /* when the current URL matches 'to', react-router adds an 'active' class to the parent 'a' */
  .active & {
    background-color: var(--echoes-color-background-default-active);
  }

  &[data-disabled] {
    background-color: var(--echoes-color-background-default);
  }
`;

const StyledIconLinkExternal = styled(IconLinkExternal)`
  font-size: var(--echoes-font-size-body-medium);
`;
