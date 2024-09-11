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

import { forwardRef, useCallback, useRef } from 'react';
import { PropsWithLabels } from '~types/utils';
import { SelectBase, SelectBaseProps } from './SelectCommons';
import { SelectOption } from './SelectTypes';

type Props = Omit<SelectBaseProps, 'filter' | 'isSearchable' | 'onSearch'> &
  Required<Pick<SelectBaseProps, 'onSearch'>>;

export const SelectAsync = forwardRef<HTMLInputElement, PropsWithLabels<Props>>((props, ref) => {
  const { onChange, onSearch, value, ...selectProps } = props;

  const previousSearchQuery = useRef<string>();
  const selectedOptionRef = useRef<SelectOption | null>();

  const handleSearch = useCallback(
    (searchQuery: string) => {
      // Avoid repeated queries (this callback is triggered repeatedly with the same query)
      const queryIsRepeated = searchQuery === previousSearchQuery.current;
      if (onSearch === undefined || queryIsRepeated) {
        return;
      }

      // Prevent search from being triggered when we select a value
      const searchQueryIsCurrentOptionLabel = searchQuery === selectedOptionRef.current?.label;

      if (!searchQueryIsCurrentOptionLabel) {
        previousSearchQuery.current = searchQuery;
        onSearch(searchQuery);
      }
    },
    [onSearch],
  );

  const handleChange = useCallback(
    (value: string | null, option: SelectOption) => {
      /*
       * Current selected option value is saved to prevent the search
       * from being triggered when we select a value. (See comment above `selectedOptionLabel`)
       */
      selectedOptionRef.current = option;

      if (onChange) {
        onChange(value, option);
      }
    },
    [onChange],
  );

  return (
    <SelectBase
      filter={() => true} // Filtering is done on search
      isSearchable
      onChange={handleChange}
      onSearch={handleSearch}
      ref={ref}
      value={value ?? null}
      {...selectProps}
    />
  );
});
SelectAsync.displayName = 'SelectAsync';
