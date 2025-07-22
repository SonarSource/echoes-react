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
import { Text, TextSize } from '../Text';

import { cssVar } from '~utils/design-tokens';

describe.each([
  ['default & regular', false, false],
  ['subdued & regular', true, false],
  ['default & strong', false, true],
  ['subdued & strong', true, true],
])('%s', (_, isSubdued, isHighlighted) => {
  it.each([[TextSize.Small], [TextSize.Default], [TextSize.Large]])(
    'renders with size %s',
    (size) => {
      const text = 'hi there';
      setupText({ children: text, size, isHighlighted, isSubdued });

      expect(screen.getByText(text)).toMatchSnapshot();
    },
  );

  it.each([
    ['default', undefined],
    ['paragraph', 'p'],
    ['div', 'div'],
    ['span', 'span'],
  ] as Array<[_: string, as: ComponentProps<typeof Text>['as']]>)('renders as %s', (_, as) => {
    const text = 'hi there';
    setupText({ as, children: text, isSubdued, isHighlighted });

    expect(screen.getByText(text)).toMatchSnapshot();
  });
});

it('allows to override the color', () => {
  const text = 'hi there';
  setupText({ children: text, colorOverride: 'echoes-color-text-danger' });

  expect(screen.getByText(text)).toHaveStyle(`color: ${cssVar('color-text-danger')}`);
});

function setupText(
  { children, ...otherProps }: Partial<ComponentProps<typeof Text>> = {
    children: 'Text goes here',
  },
) {
  return render(<Text {...otherProps}>{children}</Text>);
}
