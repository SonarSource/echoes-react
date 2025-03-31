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

export { CardSize } from './CardSize';

/**
 * {@link CardRoot | Card} is a component for displaying content in a contained, styled container.
 * It provides a flexible card layout system.
 *
 * **Available sizes**
 * - SMALL: Compact card with minimal padding
 * - MEDIUM: Standard card size (default)
 * - LARGE: Expanded card with increased padding
 *
 * **Permitted Content**
 *
 * Exactly one {@link CardBody | Card.Body} component and optionally one
 * {@link CardHeader | Card.Header} component.
 *
 * **Example**
 *
 * ```tsx
 * <Card>
 *   <Card.Header>Card Title</Card.Header>
 *   <Card.Body>Card Content</Card.Body>
 * </Card>
 * ```
 *
 * **Example with size**
 *
 * ```tsx
 * <Card size={CardSize.LARGE}>
 *   <Card.Header>Large Card</Card.Header>
 *   <Card.Body>Content for a large card</Card.Body>
 * </Card>
 * ```
 *
 * **Example without header**
 *
 * ```tsx
 * <Card>
 *   <Card.Body>Card content without a header</Card.Body>
 * </Card>
 * ```
 */
export const Card = Object.assign(CardRoot, {
  /**
   * {@link CardHeader | Card.Header} provides a consistently styled header section for the Card component.
   * Automatically inherits size context from parent Card component.
   *
   * **Props**
   * - `title`: React.ReactNode - Required title content
   * - `description?`: React.ReactNode - Optional description text below the title
   * - `hasDivider?`: boolean - When true, renders a divider below the header (default: false)
   * - `rightContent?`: React.ReactNode - Optional content to display on the right side
   * - `className?`: string - Optional CSS class name
   *
   * **Example with description and right content**
   *
   * ```tsx
   * <Card.Header
   *   title="Card Title"
   *   description="Additional information about this card"
   *   rightContent={<Button>Action</Button>}
   * />
   * ```
   *
   * **Example with divider**
   *
   * ```tsx
   * <Card.Header title="Card Title" hasDivider />
   * ```
   */
  Header: CardHeader,

  /**
   * {@link CardBody | Card.Body} is the container for the main content of a Card.
   * Automatically inherits size context from parent Card component.
   *
   * **Props**
   * - `children`: React.ReactNode - Required content to display in the body
   * - `className?`: string - Optional CSS class name
   * - `insetContent?`: boolean - When true, removes padding from the body (default: false)
   *
   * **Example standard usage**
   *
   * ```tsx
   * <Card.Body>
   *   <p>This is the content of the card.</p>
   * </Card.Body>
   * ```
   *
   * **Example with inset content**
   *
   * ```tsx
   * <Card.Body insetContent>
   *   <div style={{ padding: '8px' }}>Custom padded content</div>
   * </Card.Body>
   * ```
   */
  Body: CardBody,
});
