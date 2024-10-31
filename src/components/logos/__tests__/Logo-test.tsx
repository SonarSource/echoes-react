/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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
import {
  LogoSonar,
  LogoSonarQubeCloud,
  LogoSonarQubeCommunity,
  LogoSonarQubeIde,
  LogoSonarQubeServer,
} from '..';
import { render } from '../../../common/helpers/test-utils';

it.each([
  ['SonarQube Cloud', LogoSonarQubeCloud],
  ['SonarQube Community', LogoSonarQubeCommunity],
  ['SonarQube for IDE', LogoSonarQubeIde],
  ['SonarQube Server', LogoSonarQubeServer],
  ['Sonar', LogoSonar],
])('should render %s logo with text', (accessibleName, Logo) => {
  render(<Logo data-testid="logo" hasText />);

  expect(screen.queryByTestId('logo')).not.toHaveAccessibleDescription();

  const icon = screen.getByTestId('logo');
  expect(icon).toHaveAccessibleName(accessibleName);
});

it.each([
  ['SonarQube Cloud', LogoSonarQubeCloud],
  ['SonarQube Community', LogoSonarQubeCommunity],
  ['SonarQube for IDE', LogoSonarQubeIde],
  ['SonarQube Server', LogoSonarQubeServer],
  ['Sonar', LogoSonar],
])('should render %s logo without text', (accessibleName, Logo) => {
  render(<Logo data-testid="logo" />);

  expect(screen.queryByTestId('logo')).not.toHaveAccessibleDescription();

  const icon = screen.getByTestId('logo');
  expect(icon).toHaveAccessibleName(accessibleName);
});
