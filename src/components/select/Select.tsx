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
import { isDefined } from '~common/helpers/types';
import { PropsWithLabels } from '~types/utils';
import { InputSize } from '../../utils/inputs';
import { SelectStyled, getSelectRightSection } from './SelectCommons';
import { useSelectItemComponent } from './SelectItemCommons';
import { SelectBaseProps, SelectHighlight, SelectOptionType } from './SelectTypes';

interface Props extends SelectBaseProps {
  isSearchable?: boolean;
}

export const Select = forwardRef<HTMLInputElement, PropsWithLabels<Props>>((props, ref) => {
  const {
    ariaLabel,
    ariaLabelledBy,
    data,
    hasError = false,
    helpText,
    highlight = SelectHighlight.Default,
    isDisabled = false,
    isLoading = false,
    isNotClearable = false,
    isSearchable = false,
    isRequired = false,
    label,
    labelError,
    labelNotFound,
    onOpen,
    optionComponent,
    optionType = SelectOptionType.Check,
    size = InputSize.Full,
    valueIcon,
    ...selectProps
  } = props;

  const itemComponent = useSelectItemComponent(optionComponent, optionType);
  const isClearable = !isNotClearable && !isRequired;

  // TODO Highlighter for search

  return (
    <SelectStyled
      allowDeselect={isClearable}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      clearable={isClearable}
      data={data}
      data-variant={highlight}
      description={helpText}
      disabled={isDisabled}
      error={labelError ?? hasError}
      icon={valueIcon}
      inputSize={size}
      itemComponent={itemComponent}
      label={label}
      nothingFound={labelNotFound}
      onDropdownOpen={onOpen}
      ref={ref}
      required={isRequired}
      rightSection={getSelectRightSection({
        hasValue: isDefined(selectProps.value),
        isLoading,
        isClearable,
      })}
      searchable={isSearchable}
      variant={highlight}
      {...selectProps}
    />
  );
});

Select.displayName = 'Select';
