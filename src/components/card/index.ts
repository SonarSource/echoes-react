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

import { CardBody } from './CardBody';
import { CardHeader } from './CardHeader';
import { CardRoot } from './CardRoot';

export { CardSize } from './CardRoot';

/**
 * Card component for displaying content in a contained, styled container.
 *
 * @description A compound component that provides a flexible card layout system.
 * It requires exactly one `Card.Body` component and can optionally include one `Card.Header` component.
 *
 * Available sizes:
 * - SMALL: Compact card with minimal padding
 * - MEDIUM: Standard card size (default)
 * - LARGE: Expanded card with increased padding
 * @example Basic usage
 * ```tsx
 * <Card>
 *   <Card.Header>Card Title</Card.Header>
 *   <Card.Body>Card Content</Card.Body>
 * </Card>
 * ```
 *
 * @example Using with size
 * ```tsx
 * <Card size={CardSize.LARGE}>
 *   <Card.Header>Large Card</Card.Header>
 *   <Card.Body>Content for a large card</Card.Body>
 * </Card>
 * ```
 *
 * @example Without header (minimal)
 * ```tsx
 * <Card>
 *   <Card.Body>Card content without a header</Card.Body>
 * </Card>
 * ```
 */
export const Card = Object.assign(CardRoot, {
  /**
   * Header component for Card
   *
   * @description Provides a consistently styled header section for the Card component.
   * Automatically inherits size context from parent Card component.
   *
   * @props
   * - `title`: React.ReactNode - Required title content
   * - `description?`: React.ReactNode - Optional description text below the title
   * - `hasDivider?`: boolean - When true, renders a divider below the header (default: false)
   * - `rightContent?`: React.ReactNode - Optional content to display on the right side
   * - `className?`: string - Optional CSS class name
   *
   * @example With description and right content
   * ```tsx
   * <Card.Header
   *   title="Card Title"
   *   description="Additional information about this card"
   *   rightContent={<Button>Action</Button>}
   * />
   * ```
   *
   * @example With divider
   * ```tsx
   * <Card.Header title="Card Title" hasDivider />
   * ```
   */
  Header: CardHeader,

  /**
   * Body component for Card
   *
   * @description Container for the main content of a Card.
   * Automatically inherits size context from parent Card component.
   *
   * @props
   * - `children`: React.ReactNode - Required content to display in the body
   * - `className?`: string - Optional CSS class name
   * - `insetContent?`: boolean - When true, removes padding from the body (default: false)
   *
   * @example Standard usage
   * ```tsx
   * <Card.Body>
   *   <p>This is the content of the card.</p>
   * </Card.Body>
   * ```
   *
   * @example With inset content (no padding)
   * ```tsx
   * <Card.Body insetContent>
   *   <div style={{ padding: '8px' }}>Custom padded content</div>
   * </Card.Body>
   * ```
   */
  Body: CardBody,
});
