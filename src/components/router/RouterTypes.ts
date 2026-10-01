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

import { AnchorHTMLAttributes, ComponentType, Ref } from 'react';

/**
 * Destination of an Echoes link.
 * A string is a path, optionally with a search and a hash, or an absolute URL.
 * An object is a partial location.
 */
export type LinkTo =
  | string
  | {
      /** Hash of the destination. The leading `#` is optional. */
      hash?: string;
      /** Pathname of the destination. */
      pathname?: string;
      /** Search of the destination. The leading `?` is optional. */
      search?: string;
    };

/**
 * Props received by the `Link` component of an {@link EchoesRouter}.
 */
export interface EchoesRouterLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> {
  /** Ref to the rendered anchor element. */
  ref?: Ref<HTMLAnchorElement>;
  /**
   * Navigate with a full document load instead of client-side routing.
   * @defaultValue false
   */
  reloadDocument?: boolean;
  /** State passed to the destination. Routers without location state can ignore it. */
  state?: unknown;
  /** Destination of the link. */
  to: LinkTo;
}

/**
 * Router adapter used by Echoes links, buttons, breadcrumbs and navigation components.
 *
 * Define it once at module scope so its reference stays stable.
 */
export interface EchoesRouter {
  /** Anchor component that performs client-side navigation. */
  Link: ComponentType<EchoesRouterLinkProps>;
  /**
   * Hook returning the current pathname, without basename, search or hash.
   * It must re-render its caller when the location changes.
   */
  usePathname: () => string;
}
