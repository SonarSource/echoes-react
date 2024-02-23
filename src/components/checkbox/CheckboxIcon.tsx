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
import { CheckIcon } from '~common/icons/CheckIcon';
import { CustomIcon } from '~common/icons/Icon';

interface Props {
  checked?: boolean | 'indeterminate';
}

export function CheckboxIcon({ checked }: Readonly<Props>) {
  if (checked === 'indeterminate') {
    return (
      <CustomIcon>
        <rect fill="currentColor" height="2" rx="1" width="50%" x="4" y="7" />
      </CustomIcon>
    );
  } else if (checked) {
    return <CheckIcon />;
  }
  return null;
}
