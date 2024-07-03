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

import { SelectProps as MantineSelectProps } from '@mantine/core';
import { forwardRef, useCallback, useRef } from 'react';
import { PropsWithLabels } from '~types/utils';
import { SelectBase, SelectBaseProps } from './SelectCommons';
import { SelectOption } from './SelectTypes';

interface Props extends Omit<SelectBaseProps, 'filter' | 'isSearchable'> {
  onSearch: MantineSelectProps['onSearchChange'];
}

export const SelectAsync = forwardRef<HTMLInputElement, PropsWithLabels<Props>>((props, ref) => {
  const {
    data,
    onChange,
    onSearch,
    value,

    ...selectProps
  } = props;

  const previousQuery = useRef<string>();
  const valueRef = useRef<string | null>();

  const handleSearch = useCallback(
    (query: string) => {
      // Avoid repeated queries (this callback is triggered repeatedly with the same query)
      const queryIsRepeated = query === previousQuery.current;

      if (onSearch === undefined || queryIsRepeated) {
        return;
      }

      /*
       * Prevent search from being triggered when we select a value
       * Explanation: When selecting an option, onSearchChange is triggered
       * with the selected option's *label*.
       * So we get the selected option (`find` the one that matches the current value)
       * and get its label.
       */
      const selectedOptionLabel = getItemLabel(
        data.find((item) => getItemValue(item) === valueRef.current),
      );

      const queryIsCurrentOptionLabel = query === selectedOptionLabel;

      if (!queryIsCurrentOptionLabel) {
        previousQuery.current = query;
        onSearch(query);
      }
    },
    [data, onSearch],
  );

  const handleChange = useCallback(
    (value: string | null) => {
      /*
       * Current selected option value is saved to prevent the search
       * from being triggered when we select a value. (See comment above `selectedOptionLabel`)
       */
      valueRef.current = value;

      if (onChange) {
        onChange(value);
      }
    },
    [onChange],
  );

  return (
    <SelectBase
      data={data}
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

const getItemValue = (item: SelectOption | string | undefined) => {
  if (item === undefined || typeof item === 'string') {
    return item;
  }

  return item.value;
};

const getItemLabel = (item: SelectOption | string | undefined) => {
  if (item === undefined || typeof item === 'string') {
    return item;
  }

  return item.label;
};
