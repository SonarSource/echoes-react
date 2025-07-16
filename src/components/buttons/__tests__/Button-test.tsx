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
import { render, renderWithMemoryRouter } from '~common/helpers/test-utils';
import { Button } from '../Button';

describe('Button', () => {
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
      // We skip the pointer-events:none check from user-event to be able to test clicking on the disabled button
      { pointerEventsCheck: PointerEventsCheckLevel.Never },
    );

    expect(screen.getByRole('button', { name: 'Click me' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Click me' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("should show a loading state, it doesn't prevent clicking", () => {
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
        <Button enablePreventDefault type="submit">
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
});

describe('Button as Link', () => {
  it('should render as a link when "to" prop is provided', () => {
    renderWithMemoryRouter(
      <Button onClick={jest.fn()} to="/second">
        Click me
      </Button>,
    );

    expect(screen.getByRole('link', { name: 'Click me' })).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should call onClick function and navigate when link is clicked', async () => {
    const onClick = jest.fn();
    const { user } = renderWithMemoryRouter(
      <Button onClick={onClick} to="/second">
        Click me
      </Button>,
    );

    await user.click(screen.getByRole('link', { name: 'Click me' }));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByText('/second')).toBeInTheDocument();
  });

  it('should not call onClick function when link is disabled', async () => {
    const onClick = jest.fn();

    const { user } = renderWithMemoryRouter(
      <Button enableOpenInNewTab isDisabled onClick={onClick} to="/second">
        Click me
      </Button>,
      undefined,
      {},
      { pointerEventsCheck: PointerEventsCheckLevel.Never },
    );

    // Should actually render as a button instead of a link when disabled
    expect(screen.queryByRole('link', { name: 'Click me' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Click me' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Click me' }));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.queryByText('/second')).not.toBeInTheDocument();
  });

  it('should have prefix and suffix as link', () => {
    renderWithMemoryRouter(
      <Button
        onClick={jest.fn()}
        prefix={<span>Prefix</span>}
        suffix={<span>Suffix</span>}
        to="/second">
        Click me
      </Button>,
    );

    expect(screen.getByText('Prefix')).toBeVisible();
    expect(screen.getByText('Click me')).toBeVisible();
    expect(screen.getByText('Suffix')).toBeVisible();
    expect(screen.getByRole('link', { name: 'Prefix Click me Suffix' })).toBeInTheDocument();
  });

  it('should open in new tab when enableOpenInNewTab is true', () => {
    renderWithMemoryRouter(
      <Button enableOpenInNewTab onClick={jest.fn()} to="https://example.com">
        Click me
      </Button>,
    );

    const link = screen.getByRole('link', { name: /Click me/ });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer nofollow');
    expect(link).toHaveTextContent('(opens in new tab)');
  });

  it('should prevent default when enablePreventDefault is true', async () => {
    const onClick = jest.fn();
    const { user } = renderWithMemoryRouter(
      <Button enablePreventDefault onClick={onClick} to="/second">
        Click me
      </Button>,
    );

    await user.click(screen.getByRole('link', { name: 'Click me' }));
    expect(onClick).toHaveBeenCalled();
    expect(screen.queryByText('/second')).not.toBeInTheDocument();
  });

  it('should stop propagation of event as link', async () => {
    const propagatedClick = jest.fn();
    const onLinkClick = jest.fn();
    const { user } = renderWithMemoryRouter(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onClick={propagatedClick}>
        <Button onClick={onLinkClick} shouldStopPropagation to="/second">
          Click me
        </Button>
      </div>,
    );

    await user.click(screen.getByRole('link', { name: 'Click me' }));

    expect(onLinkClick).toHaveBeenCalled();
    expect(propagatedClick).not.toHaveBeenCalled();
  });

  it("shouldn't have any a11y violation as link", async () => {
    const { container } = renderWithMemoryRouter(<Button to="/second">Click me</Button>);
    await expect(container).toHaveNoA11yViolations();
  });
});
