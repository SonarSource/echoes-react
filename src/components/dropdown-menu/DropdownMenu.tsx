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
import { PropsLabel } from '~types/utils';
import { DropdownMenuGroupLabel } from './DropdownMenuGroupLabel';
import { DropdownMenuItemButton } from './DropdownMenuItemButton';
import { DropdownMenuItemButtonCheckable } from './DropdownMenuItemButtonCheckable';
import { DropdownMenuItemButtonCopy } from './DropdownMenuItemButtonCopy';
import { DropdownMenuItemButtonDestructive } from './DropdownMenuItemButtonDestructive';
import { DropdownMenuItemLink } from './DropdownMenuItemLink';
import { DropdownMenuItemLinkDownload } from './DropdownMenuItemLinkDownload';
import { DropdownMenuSeparator } from './DropdownMenuSeparator';

type A11yAttrs = Pick<React.AriaAttributes, 'aria-controls'> & {
  id?: string;
};

export enum DropdownMenuAlign {
  Center = 'center',
  End = 'end',
  Start = 'start',
}

interface DropdownMenuRootProps extends radixDropdownMenu.DropdownMenuTriggerProps {
  align?: DropdownMenuAlign;
  children: ReactNode;
  className?: string;
  header?: Pick<PropsLabel, 'helpText' | 'label'>;
  id?: string;
  isDisabled?: boolean;
  isModal?: boolean;
  isOpen?: boolean;
  isOpenOnMount?: boolean;
  items: ReactNode | undefined;
  onClose?: () => void;
  onOpen?: () => void;
}

const DropdownMenuRoot = forwardRef<HTMLButtonElement, DropdownMenuRootProps>(
  (
    {
      align = DropdownMenuAlign.Center,
      children,
      className,
      header,
      id = 'dropdown-menu',
      isDisabled = false,
      isModal = false,
      isOpen,
      isOpenOnMount,
      items,
      onClose,
      onOpen,
      ...radixProps
    }: Readonly<DropdownMenuRootProps>,
    ref,
  ) => {
    if (isDisabled) {
      return <>{children}</>;
    }

    const a11yAttrs: A11yAttrs = {
      'aria-controls': `${id}-dropdown`,
      id: `${id}-trigger`,
    };

    return (
      <radixDropdownMenu.Root
        defaultOpen={isOpenOnMount}
        modal={isModal}
        onOpenChange={(open: boolean) => {
          if (open && onOpen) {
            onOpen();
          } else if (!open && onClose) {
            onClose();
          }
        }}
        open={isOpen}>
        <radixDropdownMenu.Trigger asChild ref={ref} {...a11yAttrs} {...radixProps}>
          {children}
        </radixDropdownMenu.Trigger>

        <radixDropdownMenu.Portal>
          <StyledDropdownMenuContent
            align={align}
            aria-labelledby={`${id}-trigger`}
            className={className}
            id={`${id}-dropdown`}>
            {header && (
              <>
                <StyledHeaderLabelAndHelpText>
                  <StyledHeaderLabel title={typeof header.label === 'string' ? header.label : ''}>
                    {header.label}
                  </StyledHeaderLabel>

                  <StyledHeaderHelpText
                    title={typeof header.helpText === 'string' ? header.helpText : ''}>
                    {header.helpText}
                  </StyledHeaderHelpText>
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
  ItemLink: DropdownMenuItemLink,
  ItemLinkDownload: DropdownMenuItemLinkDownload,
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledHeaderHelpText = styled.span`
  color: var(--echoes-color-text-subdued);
  font: var(--echoes-typography-paragraph-small-regular);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
