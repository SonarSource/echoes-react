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
import { PropsWithChildren } from 'react';

export enum TooltipAlignment {
  Start = 'start',
  Center = 'center',
  End = 'end',
}

export enum TooltipPlacement {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

interface Props {
  align?: TooltipAlignment;
  content: React.ReactNode;
  side?: TooltipPlacement;
}

export function Tooltip(props: PropsWithChildren<Props>) {
  const { align, children, content, side } = props;

  return (
    <radixTooltip.Root>
      <radixTooltip.Trigger asChild>{children}</radixTooltip.Trigger>
      <radixTooltip.Portal>
        <TooltipContent align={align} sideOffset={4} side={side}>
          {content}
          <TooltipArrow />
        </TooltipContent>
      </radixTooltip.Portal>
    </radixTooltip.Root>
  );
}

const TooltipContent = styled(radixTooltip.Content)`
  border-radius: 4px;
  padding: 4px 12px;
  color: white;
  background-color: #2a2f40;
  box-shadow:
    hsl(206deg 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206deg 22% 7% / 20%) 0px 10px 20px -15px;
  user-select: none;
  max-width: 400px;
  box-sizing: border-box;
`;

const TooltipArrow = styled(radixTooltip.Arrow)`
  fill: #2a2f40;
  height: 7px;
`;
