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

import { screen } from '@testing-library/react';
import { PointerEventsCheckLevel } from '@testing-library/user-event';
import { ComponentProps } from 'react';
import { render } from '~common/helpers/test-utils';
import { Tooltip } from '../../tooltip';
import { Checkbox } from '../Checkbox';

it('should call check function when clicked without label', async () => {
  const onCheck = jest.fn();
  const { container, rerender, user } = setupCheckbox({
    ariaLabel: 'me',
    label: undefined,
    onCheck,
    checked: false,
    title: 'title',
  });

  await user.click(screen.getByRole('checkbox', { name: 'me' }));
  expect(onCheck).toHaveBeenCalledWith(true, undefined);
  expect(screen.getByTitle('title')).toBeVisible();
  await expect(container).toHaveNoA11yViolations();

  rerender({ ariaLabel: undefined, checked: true });
  await user.click(screen.getByRole('checkbox', { name: 'title' }));
  expect(onCheck).toHaveBeenCalledWith(false, undefined);
  await expect(container).toHaveNoA11yViolations();
});

it("should call check function when clicked on it's label", async () => {
  const onCheck = jest.fn();
  const { rerender, user } = setupCheckbox({ label: 'me', onCheck, checked: false });

  await user.click(screen.getByText('me'));
  expect(onCheck).toHaveBeenCalledWith(true, undefined);

  rerender({ checked: true });
  await user.click(screen.getByRole('checkbox', { name: 'me' }));
  expect(onCheck).toHaveBeenCalledWith(false, undefined);
});

it('should work with indeterminate state', async () => {
  const onCheck = jest.fn();
  const { user } = setupCheckbox({ label: 'me', checked: 'indeterminate', onCheck });
  expect(screen.getByRole('checkbox', { name: 'me' })).not.toBeChecked();

  // eslint-disable-next-line jest-dom/prefer-checked -- that doesn't allow use to check for indeterminate state
  expect(screen.getByRole('checkbox', { name: 'me' })).toHaveAttribute('aria-checked', 'mixed');

  await user.click(screen.getByRole('checkbox', { name: 'me' }));
  expect(onCheck).toHaveBeenCalledWith(true, undefined);
});

it('should show a loading state', async () => {
  const onCheck = jest.fn();
  const { container, user } = setupCheckbox({
    label: 'me',
    checked: false,
    isLoading: true,
    onCheck,
  });

  expect(screen.getByText('Loading...')).toBeVisible();

  await user.click(screen.getByText('me'));
  expect(onCheck).not.toHaveBeenCalled();
  await expect(container).toHaveNoA11yViolations();
});

it('should display a help text', async () => {
  const { container } = setupCheckbox({ label: 'me', helpText: 'help' });
  expect(screen.getByText('help')).toBeVisible();
  await expect(container).toHaveNoA11yViolations();
});

it('should have a error style when not checked', async () => {
  const { container, rerender } = setupCheckbox({ label: 'me', hasError: true });
  expect(screen.getByRole('checkbox', { name: 'me' })).not.toHaveAttribute('data-error', 'true');

  rerender({ checked: false });
  expect(screen.getByRole('checkbox', { name: 'me' })).toHaveAttribute('data-error', 'true');
  await expect(container).toHaveNoA11yViolations();
});

it('should be keyboard focusable while disabled', async () => {
  const onCheck = jest.fn();
  const { user } = setupCheckbox({ label: 'me', checked: false, isDisabled: true, onCheck });

  const checkboxElement = screen.getByRole('checkbox', { name: 'me' });
  expect(checkboxElement).toBeVisible();
  expect(checkboxElement).toBeEnabled();
  expect(checkboxElement).toHaveAttribute('aria-disabled', 'true');

  expect(checkboxElement).not.toHaveFocus();
  await user.tab();
  expect(checkboxElement).toHaveFocus();

  await user.keyboard('{enter}');
  expect(onCheck).not.toHaveBeenCalled();

  await user.click(checkboxElement);
  expect(onCheck).not.toHaveBeenCalled();
});

it('should correclty support tooltips', async () => {
  const { user } = render(
    <Tooltip content="my tooltip">
      <Checkbox checked label="me" onCheck={jest.fn()} />
    </Tooltip>,
  );

  await user.hover(screen.getByRole('checkbox'));
  expect(screen.getByRole('tooltip', { name: 'my tooltip' })).toBeInTheDocument();
});

function setupCheckbox(props: Partial<ComponentProps<typeof Checkbox>> = {}) {
  const { rerender: rtlRerender, ...rest } = render(
    <Checkbox ariaLabel={props.label || ''} checked onCheck={jest.fn()} {...props} />,
    undefined,

    // We skip the pointer-events:none check from user-event to be able to test clicking on the disabled checkbox
    { pointerEventsCheck: PointerEventsCheckLevel.Never },
  );
  return {
    rerender(override?: Partial<ComponentProps<typeof Checkbox>>) {
      rtlRerender(
        <Checkbox
          ariaLabel={props.label || ''}
          checked
          onCheck={jest.fn()}
          {...props}
          {...override}
        />,
      );
    },
    ...rest,
  };
}
