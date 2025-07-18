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
import { PropsLabelAndHelpText } from '~types/utils';
import { THEME_DATA_ATTRIBUTE, ThemeContext } from '~utils/theme';
import { PortalContext } from '../../common/components/PortalContext';
import { HelperText, Label } from '../typography';
import { styleDropdownMenuOverlay } from './DropdownMenuCommons';
import { DropdownMenuSeparator } from './DropdownMenuSeparator';

import { cssVar } from '~utils/design-tokens';

export enum DropdownMenuAlign {
  Center = 'center',
  End = 'end',
  Start = 'start',
}

export interface DropdownMenuProps extends radixDropdownMenu.DropdownMenuTriggerProps {
  align?: `${DropdownMenuAlign}`;
  children: ReactNode;
  className?: string;
  header?: Pick<PropsLabelAndHelpText, 'helpText' | 'label'> & { suffix?: ReactNode };
  id?: string;
  isDisabled?: boolean;
  isModal?: boolean;
  isOpen?: boolean;
  isOpenOnMount?: boolean;
  items: ReactNode | undefined;
  onClose?: () => void;
  onOpen?: () => void;
}

export const DropdownMenuRoot = forwardRef<HTMLButtonElement, DropdownMenuProps>(
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
    }: Readonly<DropdownMenuProps>,
    ref,
  ) => {
    const portalContext = useContext(PortalContext);
    const theme = useContext(ThemeContext);
    const themeOverrideProp = isDefined(theme) ? { [THEME_DATA_ATTRIBUTE]: theme } : {};

    if (isDisabled) {
      return <>{children}</>;
    }

    // Radix fully handles a11y binding with generated ids, but we have to do it manually because
    // this id format is extensively used by SQS ITs to locate dropdown elements
    // We can drop that and rely on Radix implem once we stop relying on ids in SQS ITs
    const a11yAttrs = {
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
                  <StyledHeaderWithSuffix>
                    <StyledHeaderLabel
                      as="div"
                      title={typeof header.label === 'string' ? header.label : ''}>
                      {header.label}
                    </StyledHeaderLabel>
                    {header.suffix}
                  </StyledHeaderWithSuffix>

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
DropdownMenuRoot.displayName = 'DropdownMenu';

const StyledHeaderLabelAndHelpText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: ${cssVar('dimension-space-50')};
  padding: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-150')};
  row-gap: ${cssVar('dimension-space-50')};
`;
StyledHeaderLabelAndHelpText.displayName = 'StyledHeaderLabelAndHelpText';

const StyledHeaderWithSuffix = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-100')};
`;
StyledHeaderWithSuffix.displayName = 'StyledHeaderWithSuffix';

const StyledHeaderLabel = styled(Label)`
  ${truncate}
`;
StyledHeaderLabel.displayName = 'StyledHeaderLabel';

const StyledHeaderHelpText = styled(HelperText)`
  ${truncate}
`;
StyledHeaderHelpText.displayName = 'StyledHeaderHelpText';

const StyledDropdownMenuContent = styleDropdownMenuOverlay(radixDropdownMenu.Content);
StyledDropdownMenuContent.displayName = 'StyledDropdownMenuContent';
