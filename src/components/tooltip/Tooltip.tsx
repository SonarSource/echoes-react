/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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
import * as radixTooltip from '@radix-ui/react-tooltip';
import { ReactElement, ReactNode } from 'react';
import { isDefined } from '~common/helpers/types';

export enum TooltipAlign {
  Start = 'start',
  Center = 'center',
  End = 'end',
}

export enum TooltipSide {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

interface Props {
  align?: TooltipAlign;
  children: ReactElement;
  content?: ReactNode;
  isOpen?: boolean;
  side?: TooltipSide;
}

/* This is the distance between the point of the arrow and the trigger */
const TOOLTIP_OFFSET = 4;

/* This is the padding between the edge of the tooltip and the arrow. */
const ARROW_PADDING = 12;

export function Tooltip(props: Readonly<Props>) {
  const { align, children, content, isOpen, side } = props;

  /*
   * Undefined content, Boolean false content or empty strings should not render a tooltip
   */
  if (
    !isDefined(content) ||
    (typeof content === 'string' && content.length === 0) ||
    (typeof content === 'boolean' && !content)
  ) {
    return <>{children}</>;
  }

  return (
    <radixTooltip.Root open={isOpen}>
      <radixTooltip.Trigger asChild>{children}</radixTooltip.Trigger>
      <radixTooltip.Portal>
        <TooltipContent
          align={align}
          arrowPadding={ARROW_PADDING}
          side={side}
          sideOffset={TOOLTIP_OFFSET}>
          {content}
          <TooltipArrow />
        </TooltipContent>
      </radixTooltip.Portal>
    </radixTooltip.Root>
  );
}

Tooltip.displayName = 'Tooltip';

const TooltipContent = styled(radixTooltip.Content)`
  border-radius: var(--echoes-border-radius-200);
  padding: var(--echoes-dimension-space-50) var(--echoes-dimension-space-150);
  font: var(--echoes-typography-paragraph-small-regular);
  color: var(--echoes-color-text-on-color);
  background-color: var(--echoes-color-background-inverse);
  box-shadow: var(--echoes-box-shadow-medium);
  max-width: var(--echoes-dimension-size-5000);
  box-sizing: border-box;
`;

const TooltipArrow = styled(radixTooltip.Arrow)`
  fill: var(--echoes-color-background-inverse);
  height: 7px;
`;
