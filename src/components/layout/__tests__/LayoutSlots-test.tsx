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

import { screen } from '@testing-library/react';
import { render } from '~common/helpers/test-utils';
import { AsideLeft, PageGrid } from '../LayoutSlots';
import { AsideSize, PageWidth } from '../LayoutTypes';

describe('PageGrid', () => {
  it.each([[PageWidth.default, 'var(--echoes-layout-sizes-max-width-default)']])(
    'should render correctly when %s',
    (width, expected) => {
      render(<PageGrid width={width}>content</PageGrid>);

      expect(screen.getByText('content')).toHaveStyle({ maxWidth: expected });
    },
  );

  it('should render correctly when fluid', () => {
    render(<PageGrid width={PageWidth.fluid}>content</PageGrid>);

    expect(screen.getByText('content')).not.toHaveStyle({
      maxWidth: 'var(--echoes-layout-sizes-max-width-default)',
    });
  });
});

describe('AsideLeft', () => {
  it.each([
    [AsideSize.small, 'var(--echoes-layout-aside-width-small)'],
    [AsideSize.medium, 'var(--echoes-layout-aside-width-medium)'],
    [AsideSize.large, 'var(--echoes-layout-aside-width-large)'],
  ])('should render correctly when %s', (size, expected) => {
    render(<AsideLeft size={size}>content</AsideLeft>);

    expect(screen.getByText('content')).toHaveStyle({ width: expected });
  });
});
