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
import * as radixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { ReactNode, forwardRef, useContext } from 'react';
import { truncate } from '~common/helpers/styles';
import { isDefined } from '~common/helpers/types';
import { PropsLabel } from '~types/utils';
import { THEME_DATA_ATTRIBUTE, ThemeContext } from '~utils/theme';
import { PortalContext } from '../../common/components/PortalContext';
import { HelperText, Label } from '../typography';
import { styleDropdownMenuOverlay } from './DropdownMenuCommons';
import { DropdownMenuGroupLabel } from './DropdownMenuGroupLabel';
import { DropdownMenuItemButton } from './DropdownMenuItemButton';
import { DropdownMenuItemButtonCheckable } from './DropdownMenuItemButtonCheckable';
import { DropdownMenuItemButtonDestructive } from './DropdownMenuItemButtonDestructive';
import { DropdownMenuItemLink } from './DropdownMenuItemLink';
import { DropdownMenuItemLinkDownload } from './DropdownMenuItemLinkDownload';
import { DropdownMenuSeparator } from './DropdownMenuSeparator';
import { DropdownMenuSubMenu } from './DropdownMenuSubMenu';

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
    const portalContext = useContext(PortalContext);
    const theme = useContext(ThemeContext);
    const themeOverrideProp = isDefined(theme) ? { [THEME_DATA_ATTRIBUTE]: theme } : {};

    if (isDisabled) {
      return <>{children}</>;
    }

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
        <radixDropdownMenu.Trigger asChild ref={ref} {...radixProps}>
          {children}
        </radixDropdownMenu.Trigger>

        <radixDropdownMenu.Portal container={portalContext.portalReference}>
          <StyledDropdownMenuContent
            {...themeOverrideProp}
            align={align}
            aria-labelledby={`${id}-trigger`}
            className={className}
            id={`${id}-dropdown`}>
            {header && (
              <>
                <StyledHeaderLabelAndHelpText>
                  <StyledHeaderLabel
                    as="div"
                    title={typeof header.label === 'string' ? header.label : ''}>
                    {header.label}
                  </StyledHeaderLabel>

                  <StyledHeaderHelpText
                    as="span"
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
  ItemButtonDestructive: DropdownMenuItemButtonDestructive,
  ItemLink: DropdownMenuItemLink,
  ItemLinkDownload: DropdownMenuItemLinkDownload,
  Root: DropdownMenuRoot,
  Separator: DropdownMenuSeparator,
  SubMenu: DropdownMenuSubMenu,
};

const StyledHeaderLabelAndHelpText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: var(--echoes-dimension-space-50);
  padding: var(--echoes-dimension-space-100) var(--echoes-dimension-space-150);
  row-gap: var(---echoes-dimension-space-50);
`;

const StyledHeaderLabel = styled(Label)`
  ${truncate}
`;

const StyledHeaderHelpText = styled(HelperText)`
  ${truncate}
`;

const StyledDropdownMenuContent = styleDropdownMenuOverlay(radixDropdownMenu.Content);
