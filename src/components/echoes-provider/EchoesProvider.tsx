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

import { HeadlessMantineProvider } from '@mantine/core';
import { ComponentProps, PropsWithChildren } from 'react';
import { TooltipProvider, TypographyGlobalStyles } from '..';
import { SelectGlobalStyles } from '../select/SelectCommons';

interface Props {
  tooltipsDelayDuration?: ComponentProps<typeof TooltipProvider>['delayDuration'];
}

export function EchoesProvider(props: PropsWithChildren<Props>) {
  const { children, tooltipsDelayDuration } = props;

  return (
    <>
      <TypographyGlobalStyles />
      <SelectGlobalStyles />
      <TooltipProvider delayDuration={tooltipsDelayDuration}>
        <HeadlessMantineProvider>{children}</HeadlessMantineProvider>
      </TooltipProvider>
    </>
  );
}

EchoesProvider.displayName = 'EchoesProvider';
