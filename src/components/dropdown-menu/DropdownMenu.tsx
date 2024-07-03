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
import * as radixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { ReactNode, forwardRef } from 'react';
import { isDefined } from '~common/helpers/types';
import { PropsLabel } from '~types/utils';
import { DropdownMenuGroupLabel } from './DropdownMenuGroupLabel';
import { DropdownMenuItemButton } from './DropdownMenuItemButton';
import { DropdownMenuItemButtonCheckable } from './DropdownMenuItemButtonCheckable';
import { DropdownMenuItemButtonCopy } from './DropdownMenuItemButtonCopy';
import { DropdownMenuItemButtonDestructive } from './DropdownMenuItemButtonDestructive';
import { DropdownMenuItemButtonDownload } from './DropdownMenuItemButtonDownload';
import { DropdownMenuItemLink } from './DropdownMenuItemLink';
import { DropdownMenuSeparator } from './DropdownMenuSeparator';

interface DropdownMenuRootProps extends radixDropdownMenu.DropdownMenuTriggerProps {
  align?: 'center' | 'end' | 'start';
  children: ReactNode;
  className?: string;
  header?: Pick<PropsLabel, 'helpText' | 'label'>;
  isDisabled?: boolean;
  isModal?: boolean;
  isOpen?: boolean;
  items?: ReactNode;
}

const DropdownMenuRoot = forwardRef<HTMLButtonElement, DropdownMenuRootProps>(
  (
    {
      align = 'center',
      children,
      className,
      header,
      isDisabled = false,
      isModal = false,
      isOpen,
      items,
      ...radixProps
    }: Readonly<DropdownMenuRootProps>,
    ref,
  ) => {
    if (isDisabled || !isDefined(items)) {
      return <span>{children}</span>;
    }

    return (
      <radixDropdownMenu.Root modal={isModal} open={isOpen}>
        <radixDropdownMenu.Trigger asChild ref={ref} {...radixProps}>
          {children}
        </radixDropdownMenu.Trigger>

        <radixDropdownMenu.Portal>
          <StyledDropdownMenuContent align={align} className={className}>
            {header && (
              <>
                <StyledHeaderLabelAndHelpText>
                  <StyledHeaderLabel>{header.label}</StyledHeaderLabel>

                  <StyledHeaderHelpText>{header.helpText}</StyledHeaderHelpText>
                </StyledHeaderLabelAndHelpText>
                <DropdownMenuSeparator />
              </>
            )}
            {items}
          </StyledDropdownMenuContent>
        </radixDropdownMenu.Portal>
      </radixDropdownMenu.Root>
    );
  },
);

DropdownMenuRoot.displayName = 'DropdownMenu.Root';

export const DropdownMenu = {
  GroupLabel: DropdownMenuGroupLabel,
  ItemButton: DropdownMenuItemButton,
  ItemButtonCheckable: DropdownMenuItemButtonCheckable,
  ItemButtonCopy: DropdownMenuItemButtonCopy,
  ItemButtonDestructive: DropdownMenuItemButtonDestructive,
  ItemButtonDownload: DropdownMenuItemButtonDownload,
  ItemLink: DropdownMenuItemLink,
  Root: DropdownMenuRoot,
  Separator: DropdownMenuSeparator,
};

const StyledHeaderLabelAndHelpText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: var(--echoes-dimension-space-50);
  padding: var(--echoes-dimension-space-100) var(--echoes-dimension-space-150);
  row-gap: var(---echoes-dimension-space-50);
`;

const StyledHeaderLabel = styled.div`
  font: var(--echoes-typography-paragraph-default-semi-bold);
`;

const StyledHeaderHelpText = styled.span`
  color: var(--echoes-color-text-subdued);
  font: var(--echoes-typography-paragraph-small-regular);
`;

const StyledDropdownMenuContent = styled(radixDropdownMenu.Content)`
  background-color: var(--echoes-color-background-default);
  border: var(--echoes-border-width-default) solid var(--echoes-color-border-weak);
  border-radius: var(--echoes-dimension-space-100);
  box-shadow: var(--echoes-box-shadow-medium);
  box-sizing: border-box;
  margin: var(--echoes-dimension-space-50) 0;
  max-height: var(--radix-dropdown-menu-content-available-height);
  max-width: var(--echoes-sizes-overlays-max-width-default);
  min-width: var(--echoes-sizes-overlays-min-width-default);
  overflow-x: hidden;
  overflow-y: auto;
  padding: var(--echoes-dimension-space-50) var(--echoes-dimension-space-0);
`;
