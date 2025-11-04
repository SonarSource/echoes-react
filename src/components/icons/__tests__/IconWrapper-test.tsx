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
import { render } from '../../../common/helpers/test-utils';
import { IconCustomWrapper, IconMaterialWrapper } from '../IconWrapper';

import { cssVar } from '~utils/design-tokens';

it('should render material icon correctly', () => {
  const { container } = render(
    <IconMaterialWrapper data-testid="icon">&#xE3A6;</IconMaterialWrapper>,
  );

  expect(screen.queryByTestId('icon')).not.toHaveAccessibleDescription();

  const icon = screen.getByTestId('icon');
  expect(icon).toContainHTML('&#xE3A6;');

  expect(icon).toHaveStyle({
    'font-family': `'Material Symbols Rounded'`,
  });

  expect(icon).not.toHaveStyle({
    'font-variation-settings': `'FILL' 1`,
    'font-family': `'Echoes'`,
  });

  expect(container).toMatchSnapshot();
});

it('should render custom icon correctly', () => {
  render(<IconCustomWrapper data-testid="custom icon">&#x21;</IconCustomWrapper>);

  expect(screen.queryByTestId('custom icon')).not.toHaveAccessibleDescription();

  const icon = screen.getByTestId('custom icon');
  expect(icon).toContainHTML('&#x21;');

  expect(icon).not.toHaveStyle({
    'font-family': `'Material Symbols Rounded'`,
  });

  expect(icon).toHaveStyle({
    'font-family': `'Echoes'`,
  });
});

it('should correctly handled isFilled props for material icons', () => {
  render(
    <IconMaterialWrapper data-testid="filled icon" isFilled>
      &#xE3A6;
    </IconMaterialWrapper>,
  );

  expect(screen.getByTestId('filled icon')).toHaveStyle({
    'font-variation-settings': `'FILL' 1`,
  });
});

it('should accept custom color', () => {
  render(
    <IconMaterialWrapper color="echoes-color-icon-success" data-testid="colored icon">
      &#xE3A6;
    </IconMaterialWrapper>,
  );

  expect(screen.getByTestId('colored icon')).toHaveStyle({
    color: cssVar('color-icon-success'),
  });
});
