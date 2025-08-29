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
import { render } from '../../../common/helpers/test-utils';
import { AsideLeft, AsideSize, ContentGrid, ContentWidth } from '../LayoutSlots';

describe('ContentGrid', () => {
  it.each([
    [ContentWidth.fixed, 'var(--echoes-layout-sizes-max-width-default)'],
    [ContentWidth.legacy, 'var(--echoes-layout-sizes-max-width-large)'],
  ])('should render correctly when %s', (width, expected) => {
    render(<ContentGrid width={width}>content</ContentGrid>);

    expect(screen.getByText('content')).toHaveStyle({ maxWidth: expected });
  });

  it('should render correctly when fluid', () => {
    render(<ContentGrid width={ContentWidth.fluid}>content</ContentGrid>);

    expect(screen.getByText('content')).not.toHaveStyle({
      maxWidth: 'var(--echoes-layout-sizes-max-width-default)',
    });
  });
});

describe('AsideLeft', () => {
  it.each([
    [AsideSize.small, 'var(--echoes-layout-aside-width-small)'],
    // Useless to run these (see below):

    // [AsideSize.medium, 'var(--echoes-layout-aside-width-medium)'],
    // [AsideSize.large, 'var(--echoes-layout-aside-width-large)'],
  ])('should render correctly when %s', (size, _expected) => {
    render(<AsideLeft size={size}>content</AsideLeft>);

    /* There is a bug with emotion-jest preventing the styles from being included
     * This means we can't validate the style.
     * https://github.com/emotion-js/emotion/issues/3178
     *
     * This is what we'd like to check:
     * expect(screen.getByText('content')).toHaveStyle({ width: expected });
     *
     * Instead, we do this empty check...
     */
    expect(screen.getByText('content')).toMatchSnapshot();
  });
});
