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

import * as RadixPopover from '@radix-ui/react-popover';
import { ReactElement, ReactNode, forwardRef, useContext } from 'react';
import { isDefined } from '~common/helpers/types';
import { TextNodeOptional } from '~types/utils';
import { THEME_DATA_ATTRIBUTE, ThemeContext } from '~utils/theme';
import { Heading, HeadingSize, Text } from '../typography';
import {
  OVERLAY_ARROW_PADDING,
  OVERLAY_SIDE_OFFSET,
  PopoverArrow,
  PopoverContent,
  PopoverExtraContent,
  PopoverFooter,
} from './PopoverStyles';

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
  className?: string;
  description?: TextNodeOptional;
  extraContent?: ReactNode;
  footer?: ReactNode; // Enforce Button, ButtonGroup or Link ?
  isOpen?: boolean;
  side?: `${PopoverSide}`;
  title?: TextNodeOptional;
}

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
  const {
    align,
    children,
    className,
    description,
    extraContent,
    footer,
    isOpen,
    side,
    title,
    ...radixProps
  } = props;
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
          arrowPadding={OVERLAY_ARROW_PADDING}
          className={className}
          side={side}
          sideOffset={OVERLAY_SIDE_OFFSET}>
          {title && (
            <Heading as="h1" hasMarginBottom={Boolean(description)} size={HeadingSize.Medium}>
              {title}
            </Heading>
          )}

          {description && <Text isSubtle>{description}</Text>}

          {extraContent && <PopoverExtraContent>{extraContent}</PopoverExtraContent>}

          {footer && <PopoverFooter>{footer}</PopoverFooter>}
          <PopoverArrow />
        </PopoverContent>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
});

Popover.displayName = 'Popover';
