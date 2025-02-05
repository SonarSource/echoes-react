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

import styled from '@emotion/styled';
import * as RadixPopover from '@radix-ui/react-popover';
import { ReactElement, ReactNode, forwardRef, useContext } from 'react';
import { isDefined } from '~common/helpers/types';
import { TextNodeOptional } from '~types/utils';
import { THEME_DATA_ATTRIBUTE, ThemeContext } from '~utils/theme';
import { Heading, HeadingSize, Text, TextSize } from '../typography';

export enum PopoverAlign {
  Start = 'start',
  Center = 'center',
  End = 'end',
}

export enum PopoverSide {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

export interface PopoverProps {
  align?: `${PopoverAlign}`;
  children: ReactElement;
  description?: TextNodeOptional;
  extraContent?: ReactNode;
  footer?: ReactNode; // Enforce Button, ButtonGroup or Link ?
  isOpen?: boolean;
  side?: `${PopoverSide}`;
  title?: TextNodeOptional;
}

/* This is the distance between the point of the arrow and the trigger */
const POPOVER_OFFSET = 4;

/* This is the padding between the edge of the tooltip and the arrow. */
const ARROW_PADDING = 16;

/**
 * **Popovers must be attached to a button to be accessible.**
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
export const Popover = forwardRef<HTMLButtonElement, PopoverProps>((props, ref) => {
  const { align, children, description, extraContent, footer, isOpen, side, title, ...radixProps } =
    props;
  const theme = useContext(ThemeContext);
  const themeOverrideProp = isDefined(theme) ? { [THEME_DATA_ATTRIBUTE]: theme } : {};

  return (
    <RadixPopover.Root open={isOpen}>
      <RadixPopover.Trigger asChild ref={ref} {...radixProps}>
        {children}
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <PopoverContent
          {...themeOverrideProp}
          align={align}
          arrowPadding={ARROW_PADDING}
          side={side}
          sideOffset={POPOVER_OFFSET}>
          {title && (
            <Heading as="h1" hasMarginBottom={Boolean(description)} size={HeadingSize.Medium}>
              {title}
            </Heading>
          )}

          {description && (
            <Text isSubdued size={TextSize.Small}>
              {description}
            </Text>
          )}
          {extraContent && <PopoverExtraContent>{extraContent}</PopoverExtraContent>}
          {footer && <PopoverFooter>{footer}</PopoverFooter>}
          <PopoverArrow />
        </PopoverContent>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
});

Popover.displayName = 'Popover';

const PopoverExtraContent = styled.div`
  margin-top: var(--echoes-dimension-space-200);
`;

const PopoverFooter = styled.div`
  margin-top: var(--echoes-dimension-space-200);
`;

const PopoverContent = styled(RadixPopover.Content)`
  border: var(--echoes-border-width-default) solid var(--echoes-color-border-weak);
  border-radius: var(--echoes-border-radius-400);
  padding: var(--echoes-dimension-space-300) var(--echoes-dimension-space-250);
  background-color: var(--echoes-color-background-default);
  box-shadow: var(--echoes-box-shadow-large);
  max-width: var(--echoes-dimension-width-5000);
  box-sizing: border-box;

  // We are in a modal context, so we don't want to display the focus ring
  &:focus,
  &:focus-visible {
    outline: none;
  }
`;

const PopoverArrow = styled(RadixPopover.Arrow)`
  stroke: var(--echoes-color-border-weak);
  fill: var(--echoes-color-background-default);
  height: 9px;
  width: 15px;

  /* overlap the border by moving the arrow down over the box border and
   * clipping it so its own borders don't overlap the box content
   */
  clip-path: inset(0.9px 0 0 0);
  margin-top: -2px;
`;
