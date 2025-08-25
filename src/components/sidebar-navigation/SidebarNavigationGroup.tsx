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
import { forwardRef, PropsWithChildren, useId } from 'react';
import { TextNode } from '~types/utils';
import { cssVar } from '~utils/design-tokens';
import { Text } from '../typography';

export interface SidebarNavigationGroupProps {
  className?: string;
  /**
   * The label of the SidebarNavigationGroup.
   * It can be a string or a JSX.Element. This is meant for FormattedMessages and other utility components.
   * The styling (font, color, weight, ...) is handled by this component.
   */
  label: TextNode;
}

export const SidebarNavigationGroup = forwardRef<
  HTMLDivElement,
  PropsWithChildren<SidebarNavigationGroupProps>
>((props, ref) => {
  const { children, className, label, ...radixProps } = props;

  const id = `${useId()}-sidebar-nav-group`;

  return (
    <li>
      <SidebarNavigationGroupContainer
        aria-labelledby={id}
        className={className}
        ref={ref}
        role="group"
        {...radixProps}>
        <SidebarNavigationGroupLabel id={id}>
          <Text isSubtle>{label}</Text>
        </SidebarNavigationGroupLabel>
        <ul>{children}</ul>
      </SidebarNavigationGroupContainer>
    </li>
  );
});

SidebarNavigationGroup.displayName = 'SidebarNavigationGroup';

const SidebarNavigationGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-50')};
`;
SidebarNavigationGroupContainer.displayName = 'SidebarNavigationGroupContainer';

const SidebarNavigationGroupLabel = styled.label`
  display: flex;
  align-items: center;
  height: ${cssVar('dimension-height-800')};
  padding: 0 ${cssVar('dimension-space-100')};

  [data-sidebar-collapsed='true'] & {
    display: none;
  }
`;
SidebarNavigationGroupLabel.displayName = 'SidebarNavigationGroupLabel';
