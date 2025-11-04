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
import { screen } from '@testing-library/react';
import { useState } from 'react';
import { render } from '~common/helpers/test-utils';
import { TextArea } from '../../text-area/TextArea';

it('should render with a label, an help text and a placeholder', () => {
  render(<TextArea helpText="I'm helpin'" label="Input Label" placeholder="Placeholding" />);

  expect(screen.getByRole('textbox', { name: 'Input Label' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { description: "I'm helpin'" })).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Placeholding')).toBeInTheDocument();
});

it('should call onChange function when input value changes', async () => {
  const onChange = jest.fn();
  const { user } = render(<TextArea isRequired label="Input Label" onChange={onChange} />);
  const input = screen.getByLabelText('Input Label*');

  await user.type(input, 'test');
  expect(onChange).toHaveBeenLastCalledWith(
    expect.objectContaining({ target: expect.objectContaining({ value: 'test' }) }),
  );
});

it('should be disabled when isDisabled prop is passed', () => {
  render(<TextArea ariaLabel="Invisible Label" isDisabled />);

  expect(screen.getByLabelText('Invisible Label')).toBeDisabled();
});

it("shouldn't have any a11y violations", async () => {
  const { container } = render(<TextArea helpText="Help text" isRequired label="Label" />);
  await expect(container).toHaveNoA11yViolations();
});

it('should work when controlled', async () => {
  function InputController() {
    const [value, setValue] = useState('initial value');
    return <TextArea label="Label" onChange={(e) => setValue(e.target.value)} value={value} />;
  }

  const { user } = render(<InputController />);
  const input = screen.getByLabelText('Label');
  expect(input).toHaveValue('initial value');

  await user.clear(input);
  expect(input).toHaveValue('');

  await user.type(input, 'new value');
  expect(input).toHaveValue('new value');
});

it('should display an error message when validation is invalid', () => {
  const commonProps = { helpText: 'Helping', label: 'Label', messageInvalid: 'Error message' };
  const { rerender } = render(<TextArea {...commonProps} validation="none" />);

  expect(screen.getByRole('textbox', { description: ' Helping' })).toBeInTheDocument();
  expect(screen.queryByText('Error message')).not.toBeInTheDocument();

  rerender(<TextArea {...commonProps} validation="invalid" />);
  expect(screen.getByText('Error message')).toBeInTheDocument();
  expect(screen.getByText('Helping')).not.toBeVisible();
});

it('should display an valid message when validation is valid', () => {
  const commonProps = { helpText: 'Helping', label: 'Label', messageValid: 'Youhou!' };
  const { rerender } = render(<TextArea {...commonProps} validation="none" />);

  expect(screen.getByRole('textbox', { description: ' Helping' })).toBeInTheDocument();
  expect(screen.queryByText('Youhou')).not.toBeInTheDocument();

  rerender(<TextArea {...commonProps} validation="valid" />);
  expect(screen.getByText('Youhou!')).toBeInTheDocument();
  expect(screen.getByText('Helping')).not.toBeVisible();
});

it('should be resizable when isResizable prop is passed', () => {
  const { rerender } = render(<TextArea ariaLabel="Label" />);
  expect(screen.getByLabelText('Label')).not.toHaveStyle({ resize: 'vertical' });

  rerender(<TextArea ariaLabel="Label" isResizable />);
  expect(screen.getByLabelText('Label')).toHaveStyle({ resize: 'vertical' });
});
