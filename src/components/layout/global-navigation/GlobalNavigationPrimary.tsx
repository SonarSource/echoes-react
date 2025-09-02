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
import { forwardRef, useContext } from 'react';
import { useIntl } from 'react-intl';
import { cssVar } from '~utils/design-tokens';
import { ButtonIcon } from '../../buttons';
import { IconDockToRight } from '../../icons';
import { LayoutContext } from '../LayoutContext';

export interface GlobalNavigationPrimaryProps extends React.PropsWithChildren {
  className?: string;
}

export const GlobalNavigationPrimary = forwardRef<HTMLDivElement, GlobalNavigationPrimaryProps>(
  (props, ref) => {
    const { children, ...htmlProps } = props;
    const { isSidebarDocked, setIsSidebarDocked } = useContext(LayoutContext);
    const intl = useIntl();

    return (
      <GlobalNavigationPrimaryContainer ref={ref} {...htmlProps}>
        <GlobalNavigationSidebarDockButton
          Icon={IconDockToRight}
          ariaLabel={
            isSidebarDocked
              ? intl.formatMessage({
                  id: 'global_navigation.sidebar.undock',
                  defaultMessage: 'Undock sidebar',
                })
              : intl.formatMessage({
                  id: 'global_navigation.sidebar.dock',
                  defaultMessage: 'Dock sidebar',
                })
          }
          onClick={() => {
            setIsSidebarDocked((isSidebarDocked) => !isSidebarDocked);
          }}
          variety="default-ghost"
        />
        {children}
      </GlobalNavigationPrimaryContainer>
    );
  },
);
GlobalNavigationPrimary.displayName = 'GlobalNavigationPrimary';

const GlobalNavigationPrimaryContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  gap: ${cssVar('dimension-space-150')};
`;
GlobalNavigationPrimaryContainer.displayName = 'GlobalNavigationPrimaryContainer';

const GlobalNavigationSidebarDockButton = styled(ButtonIcon)`
  display: none;
  color: ${cssVar('color-icon-subtle')};

  [data-sidebar-is-dockable='true'][data-sidebar-exist='true'] & {
    display: inline-flex;
  }
`;
GlobalNavigationSidebarDockButton.displayName = 'GlobalNavigationSidebarDockButton';
