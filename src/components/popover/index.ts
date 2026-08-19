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

import { PopoverCloseButton, PopoverRoot } from './Popover';

export { PopoverAlign, PopoverSide, type PopoverProps } from './Popover';

/**
 * **Popovers must be attached to a button to be accessible.**
 *
 * ### Example usage
 *
 * ```tsx
 * <Popover
 *   description='paragraph with interesting content'
 *   title='Amazing popover'>
 *    <Button>Click to show more information</Button>
 * </Popover>
 * ```
 *
 * ### Stacking Context
 *
 * In order to have popovers appear above the rest of the UI, it is probably necessary to have a [Stacking Context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context) for your app. This means the root should define a new one, or be wrapped in a component that does it.
 *
 * The easiest way to start a new Stacking Context is to provide it with the following CSS properties:
 *
 * ```CSS
 *   position: relative;
 *   z-index: 0;
 * ```
 *
 * Since the popovers are appended to the body, they are in the root Stacking Context. If other elements are also there, the z-index will determine which appears on top. By creating a new Stacking Context for your app, it ensures that z-indexed elements will stay within that context, while popovers will be painted on top, in the parent Stacking Context.
 */
export const Popover = Object.assign(PopoverRoot, {
  /**
   * {@link PopoverCloseButton | Popover.CloseButton}
   *
   * Use this button in the Popover to have it close the popover.
   * You can define your own click event handler and it will do both.
   */
  CloseButton: PopoverCloseButton,
});
