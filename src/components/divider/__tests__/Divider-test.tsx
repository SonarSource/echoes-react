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

import { render, screen } from '@testing-library/react';
import { Divider } from '../Divider';

describe('Divider', () => {
  it('renders horizontal divider by default', () => {
    render(<Divider data-testid="divider" />);

    const divider = screen.getByTestId('divider');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    expect(divider.tagName).toBe('HR');
  });

  it('renders vertical divider when specified', () => {
    render(<Divider data-testid="divider" isVertical />);

    const divider = screen.getByTestId('divider');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders divider with text', () => {
    render(<Divider data-testid="divider" text="OR" />);

    const divider = screen.getByTestId('divider');
    expect(divider).toBeInTheDocument();
    expect(divider.tagName).toBe('DIV');
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('renders divider with React element as text', () => {
    render(
      <Divider
        data-testid="divider"
        text={<span data-testid="custom-text">Custom Element</span>}
      />,
    );

    expect(screen.getByTestId('divider')).toBeInTheDocument();
    expect(screen.getByTestId('custom-text')).toBeInTheDocument();
    expect(screen.getByText('Custom Element')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Divider className="custom-class" data-testid="divider" />);

    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass('custom-class');
  });

  it('uses default separator role', () => {
    render(<Divider data-testid="divider" />);

    const divider = screen.getByTestId('divider');
    expect(divider).toHaveAttribute('role', 'separator');
  });

  it('allows custom role override', () => {
    render(<Divider data-testid="divider" role="presentation" />);

    const divider = screen.getByTestId('divider');
    expect(divider).toHaveAttribute('role', 'presentation');
  });

  it('renders vertical divider with text', () => {
    render(<Divider data-testid="divider" isVertical text="OR" />);

    const divider = screen.getByTestId('divider');
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('forwards ref to the root element', () => {
    const ref = jest.fn();
    render(<Divider ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('forwards ref to the container with text', () => {
    const ref = jest.fn();
    render(<Divider ref={ref} text="OR" />);
    expect(ref).toHaveBeenCalled();
  });
});
