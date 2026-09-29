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

import { AnchorHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Location passed to Echoes links.
 * A string is a path, optionally with a search or hash.
 * An object is a partial location.
 */
export type EchoesTo =
  | string
  | {
      hash?: string;
      pathname?: string;
      search?: string;
    };

/**
 * Options for active-route matching.
 */
export interface EchoesActiveOptions {
  /**
   * Match the path exactly.
   * When omitted or false, the path matches itself and its descendants.
   * The root path `/` then matches every location.
   * @defaultValue false
   */
  end?: boolean;
}

/**
 * Props for the anchor rendered by an Echoes router adapter.
 */
export interface EchoesLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /**
   * Prompts the browser to download the linked URL instead of navigating.
   */
  download?: string | boolean;
  /**
   * Navigates with a full document load instead of client-side routing.
   * @defaultValue false
   */
  reloadDocument?: boolean;
  /**
   * State passed to the destination. Ignored by adapters that have no location state.
   */
  state?: unknown;
  /**
   * Destination of the link.
   */
  to: EchoesTo;
}

/**
 * Anchor component supplied by a router adapter.
 */
export type EchoesLinkComponent = ForwardRefExoticComponent<
  EchoesLinkProps & RefAttributes<HTMLAnchorElement>
>;

/**
 * Routing implementation used by Echoes links, buttons, breadcrumbs, and navigation.
 * The default adapter talks to react-router-dom. Apps on another router provide their own.
 */
export interface EchoesRouterContextValue {
  /**
   * Anchor that performs client-side navigation.
   */
  Link: EchoesLinkComponent;
  /**
   * Whether `to` matches `pathname`.
   * `to` may be a concrete path or a pattern the adapter understands.
   * Matching is exact, unless `to` ends in `/*`.
   */
  matchPattern: (to: string, pathname: string) => boolean;
  /**
   * Serializes a destination to an href string.
   */
  toHref: (to: EchoesTo) => string;
  /**
   * Whether `to` is the active route.
   * Implementations may call router hooks. Call this unconditionally.
   */
  useIsActive: (to: EchoesTo, options?: EchoesActiveOptions) => boolean;
  /**
   * Current pathname, without the search or hash.
   * Implementations may call router hooks. Call this unconditionally.
   */
  usePathname: () => string;
}
