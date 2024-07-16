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
import { render } from '~common/helpers/test-utils';
import { Button } from '../Button';

it('should call onClick function when clicked', async () => {
  const onClick = jest.fn();
  const { user } = render(<Button onClick={onClick}>Click me</Button>);

  await user.click(screen.getByRole('button', { name: 'Click me' }));
  expect(onClick).toHaveBeenCalled();
});

it('should not call onClick function when disabled', async () => {
  const onClick = jest.fn();

  const { user } = render(
    <Button isDisabled onClick={onClick}>
      Click me
    </Button>,
    {},
    // We skip the pointer-events:none check from user-event to be able to test clicking on the disabled checkbox
    { pointerEventsCheck: PointerEventsCheckLevel.Never },
  );

  expect(screen.getByRole('button', { name: 'Click me' })).toBeDisabled();

  await user.click(screen.getByRole('button', { name: 'Click me' }));
  expect(onClick).not.toHaveBeenCalled();
});

it("should show a loading state, it doens't prevent clicking", () => {
  render(
    <Button isLoading onClick={jest.fn()}>
      Click me
    </Button>,
  );

  expect(screen.getByText('Loading...')).toBeVisible();
  expect(screen.getByRole('button', { name: 'Loading... Click me' })).toBeEnabled();
});

it('should render with prefix and suffix', () => {
  render(
    <Button onClick={jest.fn()} prefix={<span>Prefix</span>} suffix={<span>Suffix</span>}>
      Click me
    </Button>,
  );

  expect(screen.getByText('Prefix')).toBeVisible();
  expect(screen.getByText('Click me')).toBeVisible();
  expect(screen.getByText('Suffix')).toBeVisible();
});

it('should stop propagation of event', async () => {
  const propagatedClick = jest.fn();
  const onButtonClick = jest.fn();
  const { user } = render(
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onClick={propagatedClick}>
      <Button onClick={onButtonClick} shouldStopPropagation>
        Click me
      </Button>
    </div>,
  );

  await user.click(screen.getByRole('button', { name: 'Click me' }));

  expect(onButtonClick).toHaveBeenCalled();
  expect(propagatedClick).not.toHaveBeenCalled();
});

it('should be able to submit a form', async () => {
  const onFormSubmit = jest.fn().mockImplementation((e) => e.preventDefault());
  const { user } = render(
    <form onSubmit={onFormSubmit}>
      <Button type="submit">Click me</Button>
    </form>,
  );

  await user.click(screen.getByRole('button', { name: 'Click me' }));

  expect(onFormSubmit).toHaveBeenCalled();
});

it('should prevent default action', async () => {
  const onFormSubmit = jest.fn();
  const { user } = render(
    <form onSubmit={onFormSubmit}>
      <Button shouldPreventDefault type="submit">
        Click me
      </Button>
    </form>,
  );

  await user.click(screen.getByRole('button', { name: 'Click me' }));

  expect(onFormSubmit).not.toHaveBeenCalled();
});

it('should handle keyboard events', async () => {
  const onClick = jest.fn();
  const { user } = render(<Button onClick={onClick}>Click me</Button>);

  await user.tab();
  expect(screen.getByRole('button', { name: 'Click me' })).toHaveFocus();

  await user.keyboard('{enter}');
  expect(onClick).toHaveBeenCalled();
});

it("shouldn't have any a11y violation", async () => {
  const { container } = render(<Button onClick={jest.fn()}>Click me</Button>);
  await expect(container).toHaveNoA11yViolations();
});
