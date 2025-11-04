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
import { forwardRef } from 'react';
import { useIntl } from 'react-intl';
import { cssVar } from '~utils/design-tokens';
import { GlobalGridArea } from '../LayoutTypes';

export interface GlobalNavigationProps extends React.PropsWithChildren {
  className?: string;
  ariaLabel?: string;
}

export const GlobalNavigationRoot = forwardRef<HTMLElement, GlobalNavigationProps>((props, ref) => {
  const { children, ariaLabel, ...rest } = props;
  const intl = useIntl();

  const defaultAriaLabel = intl.formatMessage({
    id: 'global_navigation.main.navigation',
    defaultMessage: 'Main navigation',
    description: 'ARIA-label for the main navigation',
  });

  return (
    <GlobalNavigationContainer aria-label={ariaLabel ?? defaultAriaLabel} ref={ref} {...rest}>
      {children}
    </GlobalNavigationContainer>
  );
});

GlobalNavigationRoot.displayName = 'GlobalNavigation';

const GlobalNavigationContainer = styled.nav`
  grid-area: ${GlobalGridArea.globalNav};

  height: ${cssVar('layout-global-navigation-sizes-height-default')};
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-left: ${cssVar('dimension-space-150')};
  padding-right: ${cssVar('dimension-space-300')};

  background-color: ${cssVar('color-surface-default')};
  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  z-index: 1; // Ensure the global navigation is showing over the content
`;
GlobalNavigationContainer.displayName = 'GlobalNavigationContainer';

export const GlobalNavigationSecondary = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  gap: ${cssVar('dimension-space-100')};
`;
GlobalNavigationSecondary.displayName = 'GlobalNavigationSecondary';
