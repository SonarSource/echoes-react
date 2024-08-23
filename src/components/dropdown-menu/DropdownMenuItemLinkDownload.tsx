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

import { forwardRef } from 'react';
import { IconDownload, LinkProps } from '..';
import { DropdownMenuItemBaseProps } from './DropdownMenuItemBase';
import { DropdownMenuItemLink } from './DropdownMenuItemLink';

type Props = Omit<DropdownMenuItemBaseProps, 'isCheckable' | 'isChecked' | 'prefix' | 'suffix'> &
  Pick<LinkProps, 'to'> & { download: string };

export const DropdownMenuItemLinkDownload = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <DropdownMenuItemLink
      {...props}
      hasExternalIcon={false}
      isExternal
      prefix={<IconDownload color="echoes-color-icon-subdued" />}
      ref={ref}
    />
  );
});
DropdownMenuItemLinkDownload.displayName = 'DropdownMenu.ItemLinkDownload';
