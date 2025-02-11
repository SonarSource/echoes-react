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

import { screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { render } from '~common/helpers/test-utils';
import { LayoutAsideLeft, LayoutAsideRight, LayoutMain, LayoutRoot, LayoutType } from '../Layout';

it.each([
  [LayoutType.Default, '--echoes-layouts-sizes-max-width-default'],
  [LayoutType.Large, '--echoes-layouts-sizes-max-width-large'],
  [LayoutType.FullWidth, '--echoes-layouts-sizes-max-width-full'],
])('renders type %s', (type, expected) => {
  setupLayout({ type });

  screen.getByTestId('root');

  expect(screen.getByTestId('root')).toHaveStyle({ '--layout-max-width': `var(${expected})` });
});

function setupLayout(props: Partial<ComponentProps<typeof LayoutRoot>> = {}) {
  return render(
    <LayoutRoot {...props} data-testid="root">
      <LayoutAsideLeft>Left</LayoutAsideLeft>
      <LayoutMain>Main</LayoutMain>
      <LayoutAsideRight>Right</LayoutAsideRight>
    </LayoutRoot>,
  );
}
