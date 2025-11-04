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

import { ArgTypes } from '@storybook/react-vite';
import { Args, InputType } from 'storybook/internal/types';
import { PropsWithLabels } from '~types/utils';
import { FormFieldValidation, FormFieldWidth } from '../../src/components/form';
import * as icons from '../../src/components/icons';
import { InputProps } from '../../src/components/text-input/TextInputBase';

const iconKeys = Object.keys(icons) as (keyof typeof icons)[];

const iconsElements = Object.fromEntries(
  iconKeys.map((key: keyof typeof icons) => {
    const IconComponent = icons[key];
    return [key, <IconComponent key={key} />];
  }),
);

export const iconsElementsArgType: InputType = {
  mapping: iconsElements,
  options: iconKeys,
};

export const iconsComponentsArgType: InputType = {
  mapping: icons,
  options: iconKeys,
};

export function toTextControlArgTypes<TArgs = Args>(...args: (keyof TArgs)[]) {
  const textControl: InputType = { control: { type: 'text' } };
  return Object.fromEntries(args.map((arg) => [arg, textControl])) as ArgTypes<TArgs>;
}

export function toDisabledControlArgType<TArgs = Args>(...args: (keyof TArgs)[]) {
  const disabledControl: InputType = { table: { disabled: true } };
  return Object.fromEntries(args.map((arg) => [arg, disabledControl])) as ArgTypes<TArgs>;
}

export const formFieldsArgTypes: ArgTypes<PropsWithLabels<InputProps>> = {
  ...toTextControlArgTypes('label', 'helpText', 'messageInvalid', 'messageValid', 'value'),
  helpToggletipProps: {
    mapping: {
      'with-help-toggletip': {
        description: 'This toggletip will be displayed next to the help text.',
      },
      none: undefined,
    },
    options: ['with-help-toggletip', 'none'],
  },
  validation: {
    control: { type: 'select' },
    table: {
      defaultValue: { summary: FormFieldValidation.None },
    },
  },
  width: {
    control: { type: 'select' },
    table: {
      defaultValue: { summary: FormFieldWidth.Full },
    },
  },
};
