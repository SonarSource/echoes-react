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

import * as radixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { type ReactNode, type Ref, useId } from 'react';
import { TextNode } from '~types/utils';
import { DropdownMenuGroupLabel, type DropdownMenuGroupLabelProps } from './DropdownMenuGroupLabel';

export interface DropdownMenuGroupProps extends Pick<DropdownMenuGroupLabelProps, 'link'> {
  /**
   * The menu items belonging to the group.
   */
  children: ReactNode;
  /**
   * Optional CSS class name applied to the group element.
   */
  className?: string;
  /**
   * The label of the group, programmatically associated with the group's items.
   * It can be a string or a JSX.Element. This is meant for FormattedMessages and other utility components.
   * The styling (font, color, weight, ...) is handled by this component.
   */
  label: TextNode;
  /**
   * React ref forwarded to the group element.
   */
  ref?: Ref<HTMLDivElement>;
}

/**
 * A group of menu items with a visible label. The items are wrapped in an element with
 * `role="group"` that is labelled by the group label, so assistive technologies announce
 * which group each item belongs to.
 */
export function DropdownMenuGroup(props: Readonly<DropdownMenuGroupProps>) {
  const { children, className, label, link, ref, ...restProps } = props;

  const labelId = `${useId()}-dropdown-menu-group-label`;

  return (
    <radixDropdownMenu.Group
      aria-labelledby={labelId}
      className={className}
      ref={ref}
      {...restProps}>
      <DropdownMenuGroupLabel id={labelId} link={link}>
        {label}
      </DropdownMenuGroupLabel>

      {children}
    </radixDropdownMenu.Group>
  );
}

DropdownMenuGroup.displayName = 'DropdownMenu.Group';
