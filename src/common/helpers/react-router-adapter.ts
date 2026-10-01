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

// Dev-only: used by tests and Storybook. It must stay identical to the README recipe and must
// never be imported by library code, react-router-dom is not a dependency of Echoes.
import { Link, useLocation } from 'react-router-dom';
import { type EchoesRouter } from '../../components/router/RouterTypes';

export const reactRouterAdapter: EchoesRouter = {
  Link,
  usePathname: () => useLocation().pathname,
};
