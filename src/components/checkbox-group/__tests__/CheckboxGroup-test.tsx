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
import { PointerEventsCheckLevel } from '@testing-library/user-event';
import { useState } from 'react';
import { render } from '~common/helpers/test-utils';
import { CheckboxGroup } from '../CheckboxGroup';

it('displays a label and description', () => {
  render(
    <CheckboxGroup
      helpText="Help text"
      label="Label"
      onChange={() => {}}
      options={[{ label: 'Option' }]}
      value={[]}
    />,
  );

  const group = screen.getByRole('group', { description: 'Help text', name: 'Label' });
  expect(group).toBeVisible();
});

it('calls onChange when the value changes', async () => {
  const onChange = jest.fn();

  const { user } = render(
    <CheckboxGroup label="Label" onChange={onChange} options={[{ label: 'Option' }]} value={[]} />,
  );

  const checkbox = screen.getByRole('checkbox', { name: 'Option' });
  await user.click(checkbox);

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(['Option']);
});

it('functions as a controlled input', async () => {
  function ControlledCheckboxGroup() {
    const [value, setValue] = useState<string[]>([]);

    return (
      <CheckboxGroup
        label="Label"
        onChange={setValue}
        options={[{ label: 'Option' }]}
        value={value}
      />
    );
  }

  const { user } = render(<ControlledCheckboxGroup />);

  const checkbox = screen.getByRole('checkbox', { name: 'Option' });
  await user.click(checkbox);

  expect(checkbox).toBeChecked();
});

it('displays an error message when validation is invalid', () => {
  render(
    <CheckboxGroup
      label="Label"
      messageInvalid="Error message"
      onChange={() => {}}
      options={[{ label: 'Option' }]}
      validation="invalid"
      value={[]}
    />,
  );

  const group = screen.getByRole('group', { description: 'Error: Error message' });
  expect(group).toBeVisible();
});

it('displays a success message when validation is valid', () => {
  render(
    <CheckboxGroup
      label="Label"
      messageValid="Success message"
      onChange={() => {}}
      options={[{ label: 'Option' }]}
      validation="valid"
      value={[]}
    />,
  );

  const group = screen.getByRole('group', { description: 'Success: Success message' });
  expect(group).toBeVisible();
});

it('is disabled when isDisabled prop is passed', async () => {
  const onChange = jest.fn();

  const { user } = render(
    <CheckboxGroup
      isDisabled
      label="Label"
      onChange={onChange}
      options={[{ label: 'Option' }]}
      value={[]}
    />,
    undefined,
    { pointerEventsCheck: PointerEventsCheckLevel.Never },
  );

  const checkbox = screen.getByRole('checkbox', { name: 'Option' });
  expect(checkbox).toHaveAttribute('aria-disabled', 'true');

  await user.click(checkbox);

  expect(onChange).not.toHaveBeenCalled();
});

it('The disabled state may be forced to true for a single checkbox', async () => {
  const onChange = jest.fn();

  const { user } = render(
    <CheckboxGroup
      label="Label"
      onChange={onChange}
      options={[{ isDisabled: true, label: 'Option' }]}
      value={[]}
    />,
    undefined,
    { pointerEventsCheck: PointerEventsCheckLevel.Never },
  );

  const checkbox = screen.getByRole('checkbox', { name: 'Option' });
  expect(checkbox).toHaveAttribute('aria-disabled', 'true');

  await user.click(checkbox);
  expect(onChange).not.toHaveBeenCalled();
});

it('can integrate with HTML forms', () => {
  render(
    <form data-testid="form">
      <CheckboxGroup
        label="Label"
        name="foo"
        onChange={() => {}}
        options={[{ label: 'Option' }]}
        value={['Option']}
      />
    </form>,
  );

  const form = screen.getByTestId<HTMLFormElement>('form');
  expect([...new FormData(form).entries()]).toEqual([['foo', 'Option']]);
});

it('allows custom serialization for HTML forms', () => {
  render(
    <form data-testid="form">
      <CheckboxGroup
        label="Label"
        name="foo"
        onChange={() => {}}
        options={[{ label: 'Option' }]}
        serializeValue={(value) => value.toUpperCase()}
        value={['Option']}
      />
    </form>,
  );

  const form = screen.getByTestId<HTMLFormElement>('form');
  expect([...new FormData(form).entries()]).toEqual([['foo', 'OPTION']]);
});

it('allows options to have explicit values', () => {
  render(
    <CheckboxGroup
      label="Label"
      onChange={() => {}}
      options={[{ label: 'Option', value: 'option' }]}
      value={['option']}
    />,
  );

  const checkbox = screen.getByRole('checkbox', { name: 'Option' });
  expect(checkbox).toBeChecked();
});

it('does not have any a11y violations', async () => {
  const { container } = render(
    <CheckboxGroup label="Label" onChange={() => {}} options={[{ label: 'Option' }]} value={[]} />,
  );

  await expect(container).toHaveNoA11yViolations();
});
