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
import { type ReactNode, type Ref } from 'react';
import { useIntl } from 'react-intl';
import type { LinkProps } from 'react-router-dom';
import { LinkStandalone } from '../../links';

import { cssVar } from '~utils/design-tokens';

export interface GlobalNavigationHomeProps {
  /** Optional ARIA label applied to the home link */
  ariaLabel?: string;
  /** Content rendered inside the home link */
  children: ReactNode;
  /** Optional CSS class name applied to the root container */
  className?: string;
  /** React ref forwarded to the root container */
  ref?: Ref<HTMLDivElement>;
  /** Whether the home link should force a full page reload */
  reloadDocument?: NonNullable<LinkProps['reloadDocument']>;
  /**
   * Target location for the home link.
   * @defaultValue '/'
   */
  to?: LinkProps['to'];
}

export function GlobalNavigationHome(props: Readonly<GlobalNavigationHomeProps>) {
  const { children, ariaLabel, ref, reloadDocument, to = '/', ...rest } = props;
  const intl = useIntl();

  const defaultAriaLabel = intl.formatMessage({
    id: 'global_navigation.home_logo',
    defaultMessage: 'Link to home page',
    description: 'ARIA-label for the brand link to home page',
  });

  return (
    <HomeContainer ref={ref} {...rest}>
      <StyledLinkStandalone
        aria-label={ariaLabel ?? defaultAriaLabel}
        reloadDocument={reloadDocument}
        to={to}>
        <LogoContainer>{children}</LogoContainer>
      </StyledLinkStandalone>
    </HomeContainer>
  );
}

GlobalNavigationHome.displayName = 'GlobalNavigationHome';

const HomeContainer = styled.div`
  padding-left: ${cssVar('dimension-space-150')};
  padding-right: ${cssVar('dimension-space-300')};
`;

HomeContainer.displayName = 'HomeContainer';

const StyledLinkStandalone = styled(LinkStandalone)`
  display: flex;
  align-items: center;

  padding: ${cssVar('dimension-space-50')};
  border-radius: ${cssVar('border-radius-200')};

  &:hover {
    background-color: ${cssVar('color-surface-hover')};
    text-decoration-line: ${cssVar('text-decoration-none')};
  }

  &:active {
    background-color: ${cssVar('color-surface-active')};
  }
`;

StyledLinkStandalone.displayName = 'StyledLinkStandalone';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  /* Prevent image distortion of custom logos */
  & > img {
    max-height: ${cssVar('sizes-logo-height-small')};
    max-width: 150px;
    object-fit: contain;
  }
`;

LogoContainer.displayName = 'LogoContainer';
