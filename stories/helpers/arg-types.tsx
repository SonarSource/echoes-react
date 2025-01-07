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

import * as icons from '../../src/components/icons';

const iconKeys = Object.keys(icons) as (keyof typeof icons)[];

const iconsElements = Object.fromEntries(
  iconKeys.map((key: keyof typeof icons) => {
    const IconComponent = icons[key];
    return [key, <IconComponent key={key} />];
  }),
);

export const iconsElementsArgType = {
  mapping: iconsElements,
  options: iconKeys,
};

export const iconsComponentsArgType = {
  mapping: icons,
  options: iconKeys,
};
