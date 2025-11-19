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

import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { Select as MantineSelect, SelectProps as MantineSelectProps } from '@mantine/core';
import { forwardRef, useContext, useEffect, useId } from 'react';
import { useIntl } from 'react-intl';
import { isDefined, isStringDefined } from '~common/helpers/types';
import { useForwardedRefWithState } from '~common/helpers/useForwardedRef';
import { PropsWithLabels, TextNodeOptional } from '~types/utils';
import { IconChevronDown, IconX, Spinner } from '..';
import { PortalContext } from '../../common/components/PortalContext';
import {
  type ValidationProps,
  FormField,
  FormFieldProps,
  FormFieldValidation,
} from '../form/FormField';
import { useFormFieldA11y } from '../form/useFormFieldA11y';
import { OptionComponent, useSelectOptionFunction } from './SelectItemCommons';
import { SelectData, SelectHighlight, SelectOption, SelectOptionType } from './SelectTypes';
import { SelectFilterFunction, useSelectOptionFilter } from './useSelectOptionFilter';

import { cssVar } from '~utils/design-tokens';

type FormFieldPropsSubset = Pick<FormFieldProps, 'helpToggletipProps' | 'width'>;

export interface SelectBaseProps extends ValidationProps, FormFieldPropsSubset {
  className?: string;
  data: SelectData;
  defaultValue?: MantineSelectProps['defaultValue'];
  filter?: SelectFilterFunction;
  hasDropdownAutoWidth?: boolean;
  helpText?: TextNodeOptional;
  highlight?: `${SelectHighlight}`;
  isDisabled?: boolean;
  isLoading?: boolean;
  isNotClearable?: boolean;
  isSearchable?: boolean;
  isRequired?: boolean;
  labelNotFound?: MantineSelectProps['nothingFoundMessage'];
  limit?: MantineSelectProps['limit'];
  name?: MantineSelectProps['name'];
  optionComponent?: OptionComponent;
  optionType?: `${SelectOptionType}`;
  onChange: (value: string | null, option: SelectOption) => void;
  onOpen?: MantineSelectProps['onDropdownOpen'];
  onSearch?: MantineSelectProps['onSearchChange'];
  placeholder?: MantineSelectProps['placeholder'];
  value: MantineSelectProps['value'];
  valueIcon?: MantineSelectProps['leftSection'];
}

export const SelectBase = forwardRef<HTMLInputElement, PropsWithLabels<SelectBaseProps>>(
  (props, forwardedRef) => {
    const {
      ariaLabel,
      ariaLabelledBy,
      data,
      filter,
      hasDropdownAutoWidth = false,
      helpText,
      helpToggletipProps,
      highlight = SelectHighlight.Default,
      id,
      isDisabled = false,
      isLoading = false,
      isNotClearable = false,
      isSearchable = false,
      isRequired = false,
      label,
      labelNotFound,
      messageInvalid,
      messageValid,
      onSearch,
      onOpen,
      optionComponent,
      optionType = SelectOptionType.Check,
      valueIcon,
      validation,
      width,
      ...selectProps
    } = props;

    const [ref, setRef] = useForwardedRefWithState(forwardedRef);
    const intl = useIntl();
    const portalContext = useContext(PortalContext);
    const optionsFilter = useSelectOptionFilter(filter);
    const optionRenderer = useSelectOptionFunction(optionComponent, optionType);
    const isClearable = !isNotClearable && !isRequired && !isDisabled;
    const defaultId = `${useId()}select`;

    const { controlId, describedBy, helpTextId, validationMessageId } = useFormFieldA11y({
      controlId: id ?? defaultId,
      hasHelpText: Boolean(helpText),
      hasValidationMessage: Boolean(messageValid || messageInvalid),
    });

    const rightSection = getSelectRightSection({
      hasValue: isStringDefined(selectProps.value),
      isLoading,
      isClearable,
    });

    useEffect(() => {
      // Mantine select will override the aria-describedby attribute, so we need
      // to set it manually.
      // https://github.com/mantinedev/mantine/blob/85f6f0ac372172d0de8a72690bac39b9c7cfaa36/packages/%40mantine/core/src/components/Input/Input.tsx#L288
      if (describedBy) {
        ref?.setAttribute('aria-describedby', describedBy);
      }
    }, [describedBy, ref]);

    return (
      <FormField
        controlId={controlId}
        helpText={helpText}
        helpTextId={helpTextId}
        helpToggletipProps={helpToggletipProps}
        isDisabled={isDisabled}
        isRequired={isRequired}
        label={label}
        messageInvalid={messageInvalid}
        messageValid={messageValid}
        validation={validation}
        validationMessageId={validationMessageId}
        width={width}>
        <SelectStyled
          allowDeselect={isClearable}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          classNames={
            hasDropdownAutoWidth
              ? { ...SELECT_CLASSNAMES, dropdown: 'echoes-select-dropdown-auto-width' }
              : SELECT_CLASSNAMES
          }
          clearButtonProps={
            isClearable
              ? {
                  'aria-label': intl.formatMessage({
                    id: 'select.clear',
                    defaultMessage: 'Clear select field',
                    description:
                      'Screen reader-only text to indicate that the select field can be cleared with a button',
                  }),
                  className: 'echoes-select-close-button',
                  icon: <IconX />,
                }
              : {}
          }
          clearable={isClearable}
          comboboxProps={{
            portalProps: {
              target: portalContext.portalReference,
            },
            withinPortal: isDefined(portalContext.portalReference),
          }}
          data={data}
          data-variant={highlight}
          disabled={isDisabled}
          error={validation === FormFieldValidation.Invalid}
          filter={optionsFilter}
          id={controlId}
          label={label}
          labelProps={{
            // We no longer use Mantine's InputLabel component. However, if we
            // do not pass a `label` prop to the Select component, Mantine will
            // render an `aria-label` on the OptionsDropdown component. This
            // causes the input and the dropdown to have the same label, which
            // is problematic for accessibility.
            labelElement: Null,
          }}
          leftSection={valueIcon}
          nothingFoundMessage={labelNotFound}
          onDropdownOpen={onOpen}
          onSearchChange={onSearch}
          ref={setRef}
          renderOption={optionRenderer}
          required={isRequired}
          rightSection={rightSection}
          rightSectionPointerEvents={isDefined(rightSection) ? 'none' : 'auto'} // Necessary to allow click events to go through and trigger the dropdown to open
          role="combobox"
          searchable={isSearchable}
          variant={highlight}
          withCheckIcon={false}
          withScrollArea={false}
          {...selectProps}
        />
      </FormField>
    );
  },
);

function Null() {
  return null;
}

SelectBase.displayName = 'SelectBase';

const SELECT_CLASSNAMES = {
  wrapper: 'echoes-select-wrapper',
  input: 'echoes-select-input',
  section: 'echoes-select-input-section',
  root: 'echoes-select-root',
  label: 'echoes-select-label',
  required: 'echoes-select-required',
  description: 'echoes-select-description',
  error: 'echoes-select-error',
  dropdown: 'echoes-select-dropdown',
  options: 'echoes-select-options-wrapper',
  option: 'echoes-select-option',
  empty: 'echoes-select-empty',
  group: 'echoes-select-group',
  groupLabel: 'echoes-select-group-label',
};

export const SelectStyled = styled(MantineSelect)`
  // Wrapper around the input
  & .echoes-select-wrapper {
    position: relative;
    margin: 0;

    &:not([data-disabled])[data-pointer='true'] {
      &,
      & .echoes-select-input {
        cursor: pointer;
      }
    }

    &[data-with-left-section] .echoes-select-input {
      padding-left: ${cssVar('dimension-space-400')};
    }

    &[data-with-right-section] .echoes-select-input {
      padding-right: ${cssVar('dimension-space-300')};
    }
  }

  // Main input element, with styling for the default and ghost highlight and the different states
  & .echoes-select-input {
    display: block;
    box-sizing: border-box;
    height: ${cssVar('form-control-sizes-height-default')};
    min-height: ${cssVar('form-control-sizes-height-default')};
    width: 100%;
    padding: ${cssVar('dimension-space-100')};
    padding-left: ${cssVar('dimension-space-150')};

    font: ${cssVar('typography-text-default-regular')};
    color: ${cssVar('color-text-strong')};
    text-align: left;
    text-overflow: ellipsis;

    background-color: ${cssVar('form-control-colors-background-default')};
    border: ${cssVar('border-width-default')} solid ${cssVar('form-control-colors-border-default')};
    border-radius: ${cssVar('form-control-border-radius-default')};

    &[data-variant='unstyled'],
    &[data-variant='unstyled'][data-disabled] {
      border-color: transparent;
    }

    &:hover {
      background-color: ${cssVar('form-control-colors-background-hover')};
    }

    &[data-error] {
      border-color: ${cssVar('color-border-danger-default')};
    }

    &:focus,
    &:focus-visible {
      border-color: ${cssVar('color-border-weak')};
      outline: ${cssVar('color-focus-default')} solid ${cssVar('focus-border-width-default')};
    }

    &::placeholder {
      color: ${cssVar('color-text-placeholder')};
    }

    &[data-disabled],
    &[data-disabled]:hover {
      color: ${cssVar('color-text-disabled')};
      background-color: ${cssVar('color-surface-disabled')};
      border-color: ${cssVar('color-border-disabled')};
      outline: none;
      cursor: not-allowed;

      &::placeholder {
        color: ${cssVar('color-text-disabled')};
      }
    }
  }

  // Input left and right sections
  & .echoes-select-input-section {
    color: ${cssVar('form-control-colors-icon-default')};

    position: absolute;
    top: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: ${cssVar('dimension-width-450')};

    pointer-events: none;

    &[data-position='left'] {
      left: 0;
    }

    &[data-position='right'] {
      right: 0;

      // Clear button
      & .echoes-select-close-button {
        appearance: none;

        box-sizing: border-box;
        height: ${cssVar('dimension-height-600')};
        min-height: ${cssVar('dimension-height-600')};
        width: ${cssVar('dimension-width-300')};
        min-width: ${cssVar('dimension-width-300')};
        padding: ${cssVar('dimension-space-50')};

        display: flex;
        align-items: center;
        justify-content: center;

        font: ${cssVar('typography-text-small-medium')};
        background-color: ${cssVar('color-background-utility-transparent')};
        color: ${cssVar('form-control-colors-icon-default')};

        border: none;
        border-radius: ${cssVar('border-radius-200')};

        cursor: pointer;
        pointer-events: auto;

        &:hover {
          background-color: ${cssVar('color-surface-hover')};
        }

        &:focus,
        &:focus-visible {
          outline: ${cssVar('color-focus-default')} solid ${cssVar('focus-border-width-default')};
          outline-offset: ${cssVar('focus-border-offset-default')};
          border-radius: ${cssVar('border-radius-200')};
        }
      }
    }
  }

  // Input left and right sections icons when the input is disabled
  & .echoes-select-wrapper[data-disabled] .echoes-select-input-section {
    color: ${cssVar('color-icon-disabled')};
  }
`;

/*
 * These styles are meant for the dropdown part of the select, which can be portalled.
 * In that case, they aren't children of the root component, so they aren't scoped to the SelectStyled
 * wrapper below.
 * Instead, these styles are added as Global emotion styles in the EchoesProvider.
 */
export function SelectGlobalStyles() {
  return <Global styles={selectGlobalStyles} />;
}

const selectGlobalStyles = css`
  // Dropdown element - wrapper around the select items
  .echoes-select-dropdown,
  .echoes-select-dropdown-auto-width {
    position: absolute;

    overflow: hidden;

    background-color: ${cssVar('color-surface-default')};
    border: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
    border-radius: ${cssVar('border-radius-400')};

    box-shadow: ${cssVar('box-shadow-medium')};

    & .echoes-select-options-wrapper {
      max-height: 250px;
      overflow-y: auto;

      padding: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-0')};
    }
  }

  .echoes-select-dropdown-auto-width {
    width: auto !important; // We need to override the element width set by Mantine
  }

  // Inside the dropdown - Group wrapper, contains a group label and all the items of a group
  .echoes-select-group {
    display: flex;
    flex-direction: column;
    padding: ${cssVar('dimension-space-0')};
  }

  // Inside the dropdown - Group header label
  .echoes-select-group-label {
    padding: ${`${cssVar('dimension-space-50')} ${cssVar('dimension-space-200')}
      ${cssVar('dimension-space-100')}`};

    font: ${cssVar('typography-text-small-semi-bold')};
    color: ${cssVar('color-text-default')};
  }

  // Inside the dropdown - Adds a divider between two groups
  .echoes-select-group + .echoes-select-group::before {
    content: '';

    flex: 1;
    padding: ${cssVar('dimension-space-25')} ${cssVar('dimension-space-0')};

    border-top: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  }

  .echoes-select-empty {
    font: ${cssVar('typography-text-small-medium')};
    color: ${cssVar('color-text-subtle')};
    text-align: center;

    padding: ${cssVar('dimension-space-50')} ${cssVar('dimension-space-0')};
  }
`;

interface SelectRightSectionProps extends Pick<SelectBaseProps, 'isLoading'> {
  hasValue: boolean;
  isClearable: boolean;
}

// Can't be a component because it must return undefined when not needed
export function getSelectRightSection(props: Readonly<SelectRightSectionProps>) {
  const { isLoading, isClearable, hasValue, ...rest } = props;

  if (isLoading) {
    return <Spinner isLoading />;
  }

  // Display the clear button instead of the dropdown icon when the select is clearable and has a value selected
  if (isClearable && hasValue) {
    return undefined;
  }

  return <IconChevronDown {...rest} />;
}
