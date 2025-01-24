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
import { OmitPropsWithLabels, render } from '~common/helpers/test-utils';
import { RadioButtonGroup, RadioButtonGroupAlignment } from '../RadioButtonGroup';

const DEFAULT_OPTIONS = [
  { label: 'a', value: '1' },
  { label: 'b', value: '2' },
  { label: 'c', value: '3' },
];

describe('RadioButtonGroup', () => {
  it('should render a radio button for each option', async () => {
    const { container, user } = renderRadioButtonGroup({ ariaLabel: 'me' });

    expect(screen.getAllByRole('radio')).toHaveLength(DEFAULT_OPTIONS.length);

    await user.click(screen.getByRole('radio', { name: 'b' }));

    expect(screen.getByRole('radio', { name: 'b' })).toBeChecked();
    await expect(container).toHaveNoA11yViolations();
  });

  it('should render a radio button for each option, horizontally', async () => {
    const { container } = renderRadioButtonGroup({
      ariaLabel: 'me',
      alignment: RadioButtonGroupAlignment.Horizontal,
    });

    expect(screen.getAllByRole('radio')).toHaveLength(DEFAULT_OPTIONS.length);

    await expect(container).toHaveNoA11yViolations();
  });

  it('should disable each radio button if the group is disabled', () => {
    renderRadioButtonGroup({ ariaLabel: 'me', isDisabled: true });

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(DEFAULT_OPTIONS.length);
    expect(radioButtons.filter((o) => o.hasAttribute('disabled'))).toHaveLength(
      DEFAULT_OPTIONS.length,
    );
  });

  it('should error the whole group when labelRadioGroupError is passed', () => {
    renderRadioButtonGroup({
      ariaLabel: 'me',
      isRequired: true,
      messageInvalid: 'Error message',
      validation: 'invalid',
    });

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(DEFAULT_OPTIONS.length);
    expect(radioButtons.filter((o) => o.hasAttribute('data-error'))).toHaveLength(
      DEFAULT_OPTIONS.length,
    );
    expect(screen.getByText('Error message')).toBeVisible();
  });

  it('should support radio group label and help text', () => {
    renderRadioButtonGroup({
      isRequired: true,
      helpText: 'Help text',
      id: 'group1',
      label: 'Radio group label',
    });

    const description = screen.getByText('Help text');
    const label = screen.getByLabelText('Radio group label*');
    const radioGroup = screen.getByRole('radiogroup');
    expect(description).toBeVisible();
    expect(radioGroup).toHaveAttribute('aria-describedby', description.id);
    expect(label).toBeVisible();
  });

  it('should support radio group label as JSX.Element', () => {
    renderRadioButtonGroup({ isRequired: true, label: <span>Group label</span> });

    expect(screen.getByText('Group label')).toBeVisible();
  });
});

function renderRadioButtonGroup(overrides: OmitPropsWithLabels<typeof RadioButtonGroup>) {
  return render(<RadioButtonGroup id="group1" options={DEFAULT_OPTIONS} {...overrides} />);
}
