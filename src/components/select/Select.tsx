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

import { Select as MantineSelect, SelectItem } from '@mantine/core';
import sortBy from 'lodash.sortby';
import { ComponentProps, forwardRef, useMemo } from 'react';
import { PropsWithLabels } from '~types/utils';
import { Spinner } from '..';

export enum SelectHighlight {
  Default = 'default',
  Ghost = 'unstyled',
}

type MantineSelectProps = ComponentProps<typeof MantineSelect>;

interface Props {
  className?: string;
  data: ReadonlyArray<SelectItem>;
  defaultValue?: MantineSelectProps['defaultValue'];
  isDisabled?: boolean;
  isLoading?: boolean;
  isNotClearable?: boolean;
  isRequired?: boolean;
  isSearchable?: boolean;
  labelError?: MantineSelectProps['error'];
  labelNotFound?: MantineSelectProps['nothingFound'];
  limit?: MantineSelectProps['limit'];
  highlight?: SelectHighlight;
  optionComponent?: MantineSelectProps['itemComponent'];
  onChange?: MantineSelectProps['onChange'];
  onSearchChange?: MantineSelectProps['onSearchChange'];
  placeholder?: MantineSelectProps['placeholder'];
  searchValue?: MantineSelectProps['searchValue'];
  value?: MantineSelectProps['value'];
  shouldSortOptions?: boolean;
}

export const Select = forwardRef<HTMLInputElement, PropsWithLabels<Props>>((props, ref) => {
  const {
    data,
    isDisabled = false,
    isLoading = false,
    isNotClearable = false,
    isRequired = false,
    isSearchable = false,
    labelError,
    labelNotFound,
    onSearchChange,
    optionComponent,
    highlight,
    shouldSortOptions,
    ...selectProps
  } = props;

  const itemComponent = optionComponent;
  const selectData = useMemo(
    () => (shouldSortOptions ? sortBy(data, (o) => (o.label ?? o.value).toUpperCase()) : data),
    [data, shouldSortOptions],
  );

  /*
  if (isLoading) {
    selectData = [{ value: 'loading', disabled: true }, ...selectData];
    itemComponent = SelectOptionLoading;
  }*/

  const filterProps: Pick<MantineSelectProps, 'filter'> = {};
  if (onSearchChange) {
    filterProps.filter = () => true;
  }

  return (
    <MantineSelect
      clearable={!isNotClearable}
      data={selectData}
      disabled={isDisabled}
      error={labelError}
      itemComponent={itemComponent}
      nothingFound={labelNotFound}
      onSearchChange={onSearchChange}
      ref={ref}
      required={isRequired}
      rightSection={isLoading && <Spinner isLoading />}
      searchable={isSearchable}
      variant={highlight}
      {...filterProps}
      {...selectProps}
    />
  );
});

Select.displayName = 'Select';
/*
function SelectOptionLoading(props) {
  const { value, ...mantineProps } = props;

  console.log('SelectOptionLoading', mantineProps);

  const intl = useIntl();

  if (value !== 'loading') {
    return null;
  }

  return (
    <SelectOptionLoadingWrapper {...mantineProps}>
      <Spinner
        isLoading
        label={intl.formatMessage({
          id: 'select.loading',
          defaultMessage: 'Content is loading',
          description:
            'Message displayed next to a spinner in the select menu while the content is loading',
        })}
      />
    </SelectOptionLoadingWrapper>
  );
}

const SelectOptionLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: var(--echoes-dimension-size-100) 0;
`;
*/
