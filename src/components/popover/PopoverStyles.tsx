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

import styled from '@emotion/styled';
import * as RadixPopover from '@radix-ui/react-popover';
import { cssVar } from '../../utils/design-tokens';

/** Distance between the arrow tip and the trigger element. */
export const OVERLAY_SIDE_OFFSET = 4;

/** Minimum distance between the arrow and the rounded corner of the content box. */
export const OVERLAY_ARROW_PADDING = 16;

/**
 * Base styles shared by light-surface overlay content boxes (Popover, FilterDropdown).
 * Apply inside a styled component template alongside component-specific overrides.
 */
export const stylePopoverContentBase = styled.div`
  border: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  border-radius: ${cssVar('border-radius-400')};
  background-color: ${cssVar('color-surface-default')};
  box-shadow: ${cssVar('box-shadow-large')};

  box-sizing: border-box;
  max-height: ${cssVar('sizes-overlays-max-height-default')};

  &:focus,
  &:focus-visible {
    outline: none;
  }
`.withComponent;

export const PopoverContent = styled(stylePopoverContentBase(RadixPopover.Content))`
  padding: ${cssVar('dimension-space-300')} ${cssVar('dimension-space-250')};
  max-width: ${cssVar('dimension-width-5000')};
  overflow-y: auto;
`;

PopoverContent.displayName = 'PopoverContent';

export const PopoverArrow = styled(RadixPopover.Arrow)`
  clip-path: inset(0.9px 0 0 0);
  fill: ${cssVar('color-surface-default')};
  height: 9px;
  margin-top: -2px;
  stroke: ${cssVar('color-border-weak')};
  width: 15px;
`;
PopoverArrow.displayName = 'PopoverArrow';

export const PopoverExtraContent = styled.div`
  margin-top: ${cssVar('dimension-space-200')};
`;
PopoverExtraContent.displayName = 'PopoverExtraContent';

export const PopoverFooter = styled.div`
  margin-top: ${cssVar('dimension-space-200')};
`;
PopoverFooter.displayName = 'PopoverFooter';
