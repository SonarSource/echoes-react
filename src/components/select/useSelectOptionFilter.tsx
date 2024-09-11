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

import { useCallback } from 'react';
import { SelectOption, SelectOptionGroup } from './SelectTypes';

export interface SelectParsedOptionGroup {
  group: string;
  items: SelectOption[];
}
export type SelectParsedOption = SelectOption | SelectParsedOptionGroup;

export interface SelectFilterOptionsInput {
  options: SelectParsedOption[];
  search: string;
  limit: number;
}

export function isOptionsGroup(option: SelectParsedOption): option is SelectParsedOptionGroup {
  return 'group' in option;
}

export interface SelectFilterFunctionInput {
  option: SelectOption;
  search: string;
}

export function defaultSelectFilter({ option, search }: SelectFilterFunctionInput): boolean {
  return option.label.toLowerCase().includes(search);
}

export type SelectFilterFunction = typeof defaultSelectFilter;

export function useSelectOptionFilter(filter: SelectFilterFunction = defaultSelectFilter) {
  return useCallback(
    ({ options, search, limit }: SelectFilterOptionsInput) => {
      const parsedSearch = search.trim().toLowerCase();

      return options.reduce<SelectParsedOption[]>((result, option) => {
        if (result.length >= limit) {
          return result;
        }

        if (isOptionsGroup(option)) {
          const group: SelectOptionGroup = {
            ...option,
            items: option.items
              .filter((optionInGroup) => filter({ option: optionInGroup, search: parsedSearch }))
              .slice(0, limit),
          };

          if (group.items.length > 0) {
            result.push(group);
          }
        } else if (filter({ option, search: parsedSearch })) {
          result.push(option);
        }
        return result;
      }, []);
    },
    [filter],
  );
}
