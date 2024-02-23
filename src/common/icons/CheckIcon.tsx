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

import { CustomIcon, IconProps } from './Icon';

// TODO: This is a temporary solution until we have a proper icons implemented
export function CheckIcon(props: Readonly<IconProps>) {
  return (
    <CustomIcon {...props}>
      <path
        clipRule="evenodd"
        d="M11.6634 5.47789c.2884.29737.2811.77218-.0163 1.06054L7.52211 10.5384c-.29414.2852-.76273.2816-1.05244-.0081l-2-1.99997c-.29289-.29289-.29289-.76777 0-1.06066s.76777-.29289 1.06066 0L7.0081 8.94744l3.5948-3.48586c.2974-.28836.7722-.28105 1.0605.01631Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </CustomIcon>
  );
}
