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

import { render, screen } from '@testing-library/react';
import { forwardRef, PropsWithChildren, useMemo } from 'react';
import { IntlProvider } from 'react-intl';
import { NavLinkBase } from '~common/components/NavLinkBase';
import { Link } from '../../links';
import { EchoesProvider } from '../../echoes-provider';
import { EchoesRouterContext } from '../EchoesRouterContext';
import {
  type EchoesActiveOptions,
  type EchoesLinkProps,
  type EchoesRouterContextValue,
  type EchoesTo,
} from '../EchoesRouterTypes';

const CURRENT_PATH = '/settings';

const FakeLink = forwardRef<HTMLAnchorElement, EchoesLinkProps>((props, ref) => {
  const { children, to, ...rest } = props;

  return (
    <a href={hrefOf(to)} ref={ref} {...rest}>
      {children}
    </a>
  );
});

FakeLink.displayName = 'FakeLink';

function hrefOf(to: EchoesTo) {
  return typeof to === 'string' ? to : (to.pathname ?? '/');
}

function useFakeIsActive(to: EchoesTo, options?: EchoesActiveOptions) {
  const path = hrefOf(to).split(/[?#]/)[0] || '/';

  if (options?.end === true) {
    return path === CURRENT_PATH;
  }

  if (path === '/') {
    return true;
  }

  return path === CURRENT_PATH || CURRENT_PATH.startsWith(`${path}/`);
}

function FakeRouter({ children }: PropsWithChildren) {
  const value = useMemo<EchoesRouterContextValue>(
    () => ({
      Link: FakeLink,
      matchPattern: (to, pathname) => to === pathname,
      toHref: hrefOf,
      useIsActive: useFakeIsActive,
      usePathname: () => CURRENT_PATH,
    }),
    [],
  );

  return <EchoesRouterContext.Provider value={value}>{children}</EchoesRouterContext.Provider>;
}

it('renders link href and active class from the router adapter', () => {
  render(
    <IntlProvider locale="en">
      <EchoesProvider router={FakeRouter}>
        <Link to="/settings/tokens">Tokens</Link>
        <NavLinkBase to="/settings">Settings</NavLinkBase>
        <NavLinkBase to="/other">Other</NavLinkBase>
        <NavLinkBase to="/">Home</NavLinkBase>
      </EchoesProvider>
    </IntlProvider>,
  );

  expect(screen.getByRole('link', { name: 'Tokens' })).toHaveAttribute('href', '/settings/tokens');
  expect(screen.getByRole('link', { name: 'Settings' })).toHaveClass('active');
  expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute('href', '/settings');
  expect(screen.getByRole('link', { name: 'Other' })).not.toHaveClass('active');
  expect(screen.getByRole('link', { name: 'Other' })).toHaveAttribute('href', '/other');
  expect(screen.getByRole('link', { name: 'Home' })).toHaveClass('active');
});
