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
import { Button, ButtonProps } from '../buttons';
import { Heading, HeadingSize, Text } from '../typography';
import {
  OVERLAY_ARROW_PADDING,
  OVERLAY_SIDE_OFFSET,
  PopoverArrow,
  PopoverContent,
  PopoverExtraContent,
  PopoverFooter,
  PopoverIllustrationContainer,
  PopoverInnerContent,
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
  /**
   * Controls the alignment of the popover with its trigger
   */
  align?: `${PopoverAlign}`;
  /**
   * The trigger for the popover. Must be an interactive element, typically a button.
   */
  children: ReactElement;
  /**
   * CSS class name(s) to apply to the Popover container
   */
  className?: string;
  /**
   * Optional text content of a subtle paragraph, for the body of the Popover
   */
  description?: TextNodeOptional;
  /**
   * Set to `true` to prevent the popover from closing when clicking outside
   */
  disableOutsideClick?: boolean;
  /**
   * Slot for additional content. Displayed under the description and/or title (if any)
   */
  extraContent?: ReactNode;
  /**
   * Slot for the footer of the Popover. Meant for actions (e.g. Button, ButtonGroup, Link )
   */
  footer?: ReactNode;
  /**
   * Optional illustration displayed above the title of the Popover
   */
  illustration?: ReactNode;
  /**
   * Controls the Popover's `open` state, rather than relying on the trigger
   */
  isOpen?: boolean;
  /**
   * Called when `isOpen` changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Defines on what side the popover should appear.
   * If there is no space for it, it will automatically flip to the opposing side of the same dimension
   */
  side?: `${PopoverSide}`;
  /**
   * Text content of the Heading of the Popover
   */
  title?: TextNodeOptional;
}

export const PopoverRoot = forwardRef<HTMLButtonElement, PopoverProps>((props, ref) => {
  const {
    align,
    children,
    className,
    description,
    disableOutsideClick,
    extraContent,
    footer,
    illustration,
    isOpen,
    onOpenChange,
    side,
    title,
    ...radixProps
  } = props;

  const theme = useContext(ThemeContext);
  const themeOverrideProp = isDefined(theme) ? { [THEME_DATA_ATTRIBUTE]: theme } : {};

  return (
    <RadixPopover.Root onOpenChange={onOpenChange} open={isOpen}>
      <RadixPopover.Trigger asChild ref={ref} {...radixProps}>
        {children}
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <PopoverContent
          {...themeOverrideProp}
          align={align}
          arrowPadding={OVERLAY_ARROW_PADDING}
          className={className}
          data-has-illustration={isDefined(illustration)}
          onInteractOutside={
            disableOutsideClick
              ? (e) => {
                  e.preventDefault();
                }
              : undefined
          }
          side={side}
          sideOffset={OVERLAY_SIDE_OFFSET}>
          {illustration && (
            <PopoverIllustrationContainer>{illustration}</PopoverIllustrationContainer>
          )}
          <PopoverInnerContent>
            {title && (
              <Heading as="h1" hasMarginBottom={Boolean(description)} size={HeadingSize.Medium}>
                {title}
              </Heading>
            )}

            {description && <Text isSubtle>{description}</Text>}

            {extraContent && <PopoverExtraContent>{extraContent}</PopoverExtraContent>}

            {footer && <PopoverFooter>{footer}</PopoverFooter>}
          </PopoverInnerContent>
          <PopoverArrow />
        </PopoverContent>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
});

PopoverRoot.displayName = 'Popover';

export function PopoverCloseButton(props: ButtonProps) {
  return (
    <RadixPopover.Close asChild>
      <Button {...props} />
    </RadixPopover.Close>
  );
}
PopoverCloseButton.displayName = 'PopoverCloseButton';
