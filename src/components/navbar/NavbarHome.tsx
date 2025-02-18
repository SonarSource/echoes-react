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
import { forwardRef } from 'react';
import { useIntl } from 'react-intl';
import { LinkStandalone } from '../links';

export interface NavbarHomeProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export const NavbarHome = forwardRef<HTMLDivElement, NavbarHomeProps>(
  ({ children, ariaLabel, ...rest }: Readonly<NavbarHomeProps>, ref) => {
    const intl = useIntl();

    const defaultAriaLabel = intl.formatMessage({
      id: 'navbar.home_logo',
      defaultMessage: 'Link to home page',
      description: 'ARIA-label for the brand link to home page',
    });

    return (
      <HomeContainer ref={ref} {...rest}>
        <StyledLinkStandalone aria-label={ariaLabel ?? defaultAriaLabel} to="/">
          <LogoContainer>{children}</LogoContainer>
        </StyledLinkStandalone>
      </HomeContainer>
    );
  },
);

NavbarHome.displayName = 'NavbarHome';

const HomeContainer = styled.div`
  padding: 0 var(--echoes-dimension-space-300);
`;

const StyledLinkStandalone = styled(LinkStandalone)`
  display: flex;
  align-items: center;

  padding: var(--echoes-dimension-space-50);
  border-radius: var(--echoes-border-radius-200);

  &:hover {
    background-color: var(--echoes-color-background-default-hover);
  }

  &:active {
    background-color: var(--echoes-color-background-default-active);
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  /* Prevent image distortion of custom logos */
  & > img {
    max-height: var(--echoes-sizes-logo-height-small);
    max-width: 150px;
    object-fit: contain;
  }
`;
