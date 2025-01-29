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
import { Form, FormRootProps } from '..';
import { Button } from '../../buttons';

it('displays a form with header, sections and footer', async () => {
  setupForm();

  expect(screen.getByRole('heading', { name: 'Form title' })).toBeInTheDocument();
  expect(screen.getByText('Form description')).toBeInTheDocument();
  expect(screen.getByText('Form extra content')).toBeInTheDocument();

  expect(screen.getByRole('group', { name: 'Section 1' })).toBeInTheDocument();
  expect(screen.getByRole('group', { name: 'Section 1' })).toHaveAccessibleDescription(
    'Section 1 description',
  );
  expect(screen.getByRole('group', { name: '' })).toHaveTextContent('Section 2 content');
  await expect(screen.getByRole('form')).toHaveNoA11yViolations();
});

it('should submit and reset the form', async () => {
  const onSubmit = jest.fn().mockImplementation((e) => e.preventDefault());
  const onReset = jest.fn();
  const { user } = setupForm({ onSubmit, onReset });

  await user.click(screen.getByRole('button', { name: 'Submit' }));
  expect(onSubmit).toHaveBeenCalled();

  await user.click(screen.getByRole('button', { name: 'Cancel' }));
  expect(onReset).toHaveBeenCalled();
});

function setupForm(props: Partial<FormRootProps> = {}) {
  return render(
    <Form name="MyForm" {...props}>
      <Form.Header
        description="Form description"
        extraContent="Form extra content"
        title="Form title"
      />
      <Form.Section description="Section 1 description" title="Section 1">
        Section 1 content
      </Form.Section>
      <Form.Section>Section 2 content</Form.Section>
      <Form.Footer>
        <Button type="reset">Cancel</Button>
        <Button type="submit" variety="primary">
          Submit
        </Button>
      </Form.Footer>
    </Form>,
  );
}
