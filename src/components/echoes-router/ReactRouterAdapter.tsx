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

import { forwardRef, PropsWithChildren } from 'react';
import {
  createPath,
  Link as RouterLink,
  matchPath,
  resolvePath,
  To,
  useLocation,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
import { EchoesRouterContext } from './EchoesRouterContext';
import {
  EchoesActiveOptions,
  EchoesLinkProps,
  EchoesRouterContextValue,
  EchoesTo,
} from './EchoesRouterTypes';

export const ReactRouterEchoesLink = forwardRef<HTMLAnchorElement, EchoesLinkProps>(
  (props, ref) => {
    const { to, ...rest } = props;

    return <RouterLink ref={ref} to={to as To} {...rest} />;
  },
);

ReactRouterEchoesLink.displayName = 'ReactRouterEchoesLink';

export function reactRouterToHref(to: EchoesTo) {
  return createPath(resolvePath(to as To));
}

export function reactRouterMatchPattern(to: string, pathname: string) {
  return matchPath(to, pathname) !== null;
}

function useReactRouterIsActive(to: EchoesTo, options?: EchoesActiveOptions) {
  const resolved = useResolvedPath(to as To);
  const prefixMatch = useMatch(`${resolved.pathname}/*`);
  const exactMatch = useMatch({ end: true, path: resolved.pathname });

  return options?.end === true ? exactMatch !== null : prefixMatch !== null;
}

function useReactRouterPathname() {
  return useLocation().pathname;
}

const reactRouterValue: EchoesRouterContextValue = {
  Link: ReactRouterEchoesLink,
  matchPattern: reactRouterMatchPattern,
  toHref: reactRouterToHref,
  useIsActive: useReactRouterIsActive,
  usePathname: useReactRouterPathname,
};

export function ReactRouterAdapter({ children }: PropsWithChildren) {
  return (
    <EchoesRouterContext.Provider value={reactRouterValue}>{children}</EchoesRouterContext.Provider>
  );
}

ReactRouterAdapter.displayName = 'ReactRouterAdapter';
