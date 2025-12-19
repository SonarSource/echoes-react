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
import { ComponentProps } from 'react';
import { render } from '~common/helpers/test-utils';
import { Heading, HeadingSize } from '../Heading';

it('uses the default size', () => {
  const { container } = setupHeading();

  expect(container).toMatchSnapshot();
});

it.each(['h1', 'h2', 'h3', 'h4', 'h5'] as const)(
  'renders a Heading as an %s with no bottom margin',
  async (as) => {
    const children = `This is a heading rendered as "${as}" with no bottom margin`;

    const { container } = setupHeading({ as, children });

    expect(await screen.findByText(children)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  },
);

it.each([
  HeadingSize.ExtraSmall,
  HeadingSize.Small,
  HeadingSize.Medium,
  HeadingSize.Large,
  HeadingSize.ExtraLarge,
])('renders a Heading with size %s and a bottom margin', async (size) => {
  const children = `This is a heading with size "${size}" with a bottom margin`;

  const { container } = setupHeading({ children, hasMarginBottom: true, size });

  expect(await screen.findByText(children)).toBeInTheDocument();

  expect(container).toMatchSnapshot();
});

function setupHeading(
  { as, children, ...otherProps }: Partial<ComponentProps<typeof Heading>> = {
    as: 'h1',
    children: 'Text goes here',
  },
) {
  return render(
    <Heading as={as as ComponentProps<typeof Heading>['as']} {...otherProps}>
      {children}
    </Heading>,
  );
}
