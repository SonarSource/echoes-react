/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource Sàrl
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
import * as radixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { forwardRef } from 'react';
import { LinkStandalone } from '../links';
import { LinkBaseProps } from '../links/LinkTypes';

import { cssVar } from '~utils/design-tokens';

export interface DropdownMenuGroupLabelProps extends radixDropdownMenu.DropdownMenuLabelProps {
  /**
   * Optional link to display at the end of the group label element.
   */
  link?: {
    linkElement: LinkBaseProps['children'];
    to: LinkBaseProps['to'];
  };
}

export const DropdownMenuGroupLabel = forwardRef<HTMLDivElement, DropdownMenuGroupLabelProps>(
  (props, ref) => {
    const { children, link, ...rest } = props;

    return (
      <StyledWrapper>
        <StyledDropdownMenuGroupLabel ref={ref} {...rest}>
          {children}
        </StyledDropdownMenuGroupLabel>

        {link && (
          <StyledMenuItem asChild>
            <StyledLink to={link.to}>{link.linkElement}</StyledLink>
          </StyledMenuItem>
        )}
      </StyledWrapper>
    );
  },
);

DropdownMenuGroupLabel.displayName = 'DropdownMenuGroupLabel';

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const StyledDropdownMenuGroupLabel = styled(radixDropdownMenu.Label)`
  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-small-semi-bold')};

  padding: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-150')}
    ${cssVar('dimension-space-50')};
`;

StyledDropdownMenuGroupLabel.displayName = 'StyledDropdownMenuGroupLabel';

const StyledMenuItem = styled(radixDropdownMenu.Item)`
  /* With asChild, these styles apply directly to the <a> tag */
  background: none;
  padding: ${cssVar('dimension-space-50')} ${cssVar('dimension-space-100')};

  &:hover,
  &[data-highlighted] {
    background: none;
  }
`;

const StyledLink = styled(LinkStandalone)`
  /* Match the label typography (same as StyledDropdownMenuGroupLabel) */
  font: ${cssVar('typography-text-small-semi-bold')};
  margin-right: ${cssVar('dimension-space-100')};

  /* Show focus ring only for keyboard navigation - && needed for extra specificity */
  &&:focus-visible {
    border-radius: ${cssVar('border-radius-200')};
    outline: ${cssVar('color-focus-default')} solid ${cssVar('focus-border-width-default')};
    outline-offset: ${cssVar('focus-border-offset-default')};
  }

  /* Hide focus ring on mouse hover - && needed for extra specificity */
  &&:hover {
    outline: none;
  }
`;
