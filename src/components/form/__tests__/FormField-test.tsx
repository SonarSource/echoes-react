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
import { screen } from '@testing-library/react';
import { render } from '~common/helpers/test-utils';
import { FormField, FormFieldValidation, FormFieldWidth } from '../FormField';

it('displays a label', () => {
  render(
    <FormField label="Label 1">
      <input />
    </FormField>,
  );
  const label = screen.getByText('Label 1');
  expect(label).toBeVisible();
  expect(label.tagName).toBe('LABEL');
});

it('displays an asterisk next to the label if the form field is required', () => {
  render(
    <FormField isRequired label="Label 2">
      <input />
    </FormField>,
  );

  const label = screen.getByText((_, element) => element?.textContent === 'Label 2*', {
    selector: 'label',
  });

  expect(label).toBeVisible();
});

it('disables pointer events on the label if the form field is disabled', () => {
  render(
    <FormField isDisabled label="Label 3">
      <input />
    </FormField>,
  );
  const label = screen.getByText('Label 3');
  expect(label).toHaveStyle({ pointerEvents: 'none' });
});

it('sets the for attribute on the label if a control ID is provided', () => {
  render(
    <FormField controlId="foo" label="Label 4">
      <input />
    </FormField>,
  );
  const label = screen.getByText('Label 4');
  expect(label).toHaveAttribute('for', 'foo');
});

it('has no a11y violations', async () => {
  const { container } = render(
    <FormField controlId="input" description="Help text" label="Label">
      <input id="input" />
    </FormField>,
  );
  await expect(container).toHaveNoA11yViolations();
});

it('displays a description if one is provided', () => {
  render(
    <FormField description="Description text 1">
      <input />
    </FormField>,
  );
  const description = screen.getByText('Description text 1');
  expect(description).toBeVisible();
});

it.each([FormFieldValidation.Invalid, FormFieldValidation.Valid])(
  'does not display the description if the form field validation is %s and a validation message is provided',
  (validation) => {
    render(
      <FormField
        description="Description text 2"
        messageInvalid="💣"
        messageValid="😎"
        validation={validation}>
        <input />
      </FormField>,
    );
    const description = screen.queryByText('Description text 2');
    expect(description).not.toBeVisible();
  },
);

it.each([FormFieldValidation.Invalid, FormFieldValidation.Valid])(
  'displays the description if the form field validation is %s and no validation message is provided',
  (validation) => {
    render(
      <FormField description="Description text 3" validation={validation}>
        <input />
      </FormField>,
    );
    const description = screen.queryByText('Description text 3');
    expect(description).toBeVisible();
  },
);

it('sets the id on the description if one is provided', () => {
  render(
    <FormField description="Description text 4" descriptionId="foo">
      <input />
    </FormField>,
  );
  const description = screen.getByText('Description text 4');
  expect(description).toHaveAttribute('id', 'foo');
});

it('displays an error message if the form field is invalid', () => {
  render(
    <FormField messageInvalid="💣" validation="invalid">
      <input />
    </FormField>,
  );
  const messageInvalid = screen.getByText('💣');
  expect(messageInvalid).toBeVisible();
});

it.each([FormFieldValidation.None, FormFieldValidation.Valid])(
  'does not display an error message if the form field validation is %s',
  (validation) => {
    render(
      <FormField messageInvalid="💣" validation={validation}>
        <input />
      </FormField>,
    );
    const messageInvalid = screen.queryByText('💣');
    expect(messageInvalid).not.toBeInTheDocument();
  },
);

it('displays a success message if the form field is valid', () => {
  render(
    <FormField messageValid="😎" validation="valid">
      <input />
    </FormField>,
  );
  const messageInvalid = screen.getByText('😎');
  expect(messageInvalid).toBeVisible();
});

it.each([FormFieldValidation.Invalid, FormFieldValidation.None])(
  'does not display a success message if the form field validation is %s',
  (validation) => {
    render(
      <FormField messageValid="😎" validation={validation}>
        <input />
      </FormField>,
    );
    const messageInvalid = screen.queryByText('😎');
    expect(messageInvalid).not.toBeInTheDocument();
  },
);

it.each(Object.values(FormFieldWidth))('sets the width of the form field to %s', (width) => {
  const { container } = render(
    <FormField width={width}>
      <input />
    </FormField>,
  );
  expect(container).toHaveStyle({ width: `var(--echoes-sizes-form-field-${width})` });
});
