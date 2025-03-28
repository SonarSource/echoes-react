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
import React from 'react';

import { CardRoot } from '../CardRoot';
import { CardHeader } from '../CardHeader';
import { CardBody } from '../CardBody';
import { render } from '~common/helpers/test-utils';
import { CardSize } from '../CardTypes';

describe('Card components', () => {
  describe('CardRoot', () => {
    it('renders children correctly', () => {
      render(<CardRoot>Test Content</CardRoot>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<CardRoot className="custom-class">Content</CardRoot>);
      const card = screen.getByText('Content');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<CardRoot ref={ref}>Content</CardRoot>);
      expect(ref.current).not.toBeNull();
    });

    it('uses medium size by default', () => {
      render(
        <CardRoot>
          <CardHeader title="Default Size Card" />
        </CardRoot>,
      );
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Default Size Card');
    });
  });

  describe('CardHeader', () => {
    it('renders title correctly', () => {
      render(
        <CardRoot>
          <CardHeader title="Card Title" />
        </CardRoot>,
      );
      expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(
        <CardRoot>
          <CardHeader description="Card Description" title="Card Title" />
        </CardRoot>,
      );
      expect(screen.getByText('Card Description')).toBeInTheDocument();
    });

    it('renders right content when provided', () => {
      render(
        <CardRoot>
          <CardHeader rightContent={<button type="button">Action</button>} title="Card Title" />
        </CardRoot>,
      );
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('uses correct heading level based on card size', () => {
      const { rerender } = render(
        <CardRoot size={CardSize.Small}>
          <CardHeader title="Small Card" />
        </CardRoot>,
      );

      expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Small Card');

      rerender(
        <CardRoot size={CardSize.Medium}>
          <CardHeader title="Medium Card" />
        </CardRoot>,
      );
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Medium Card');

      rerender(
        <CardRoot size={CardSize.Large}>
          <CardHeader title="Large Card" />
        </CardRoot>,
      );
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Large Card');
    });
  });

  describe('CardBody', () => {
    it('renders children correctly', () => {
      render(
        <CardRoot>
          <CardBody>Body Content</CardBody>
        </CardRoot>,
      );
      expect(screen.getByText('Body Content')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(
        <CardRoot>
          <CardBody className="custom-body-class">Content</CardBody>
        </CardRoot>,
      );
      const body = screen.getByText('Content');
      expect(body).toHaveClass('custom-body-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <CardRoot>
          <CardBody ref={ref}>Content</CardBody>
        </CardRoot>,
      );
      expect(ref.current).not.toBeNull();
    });

    it('applies insetContent prop correctly', () => {
      const { rerender } = render(
        <CardRoot>
          <CardBody>Content</CardBody>
        </CardRoot>,
      );

      const bodyWithPadding = screen.getByText('Content');
      const styleWithPadding = window.getComputedStyle(bodyWithPadding);

      expect(styleWithPadding.padding).not.toBe('0px');

      rerender(
        <CardRoot>
          <CardBody insetContent>Content</CardBody>
        </CardRoot>,
      );

      const bodyWithoutPadding = screen.getByText('Content');
      const styleWithoutPadding = window.getComputedStyle(bodyWithoutPadding);

      expect(styleWithoutPadding.padding).toBe('0px');
    });
  });

  describe('Card integrated tests', () => {
    it('renders a complete card with header and body', () => {
      render(
        <CardRoot>
          <CardHeader description="Card Description" title="Card Title" />
          <CardBody>Card Content</CardBody>
        </CardRoot>,
      );

      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card Description')).toBeInTheDocument();
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('maintains the expected structure with all components', () => {
      render(
        <CardRoot className="card-root">
          <CardHeader
            description="Card Description"
            hasDivider
            rightContent={<span>Actions</span>}
            title="Card Title"
          />
          <CardBody>Card Content</CardBody>
        </CardRoot>,
      );

      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card Description')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
    });
  });
});
