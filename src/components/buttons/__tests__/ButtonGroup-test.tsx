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

import { render } from '~common/helpers/test-utils';
import { Button, ButtonGroup } from '..';

import { cssVar } from '~utils/design-tokens';

const buttons = (
  <>
    <Button>First</Button>
    <Button>Second</Button>
    <Button>Third</Button>
    <Button>Fourth</Button>
  </>
);

it('should default to an un-combined group', () => {
  const { container } = render(<ButtonGroup className="__test__">{buttons}</ButtonGroup>);

  // eslint-disable-next-line testing-library/no-container
  const buttonGroup = container.getElementsByClassName('__test__')[0];

  expect(buttonGroup).toHaveStyle(`gap: ${cssVar('dimension-space-100')}`);
});

it('should combine the buttons', () => {
  const { container } = render(
    <ButtonGroup className="__test__" isCombined>
      {buttons}
    </ButtonGroup>,
  );

  // eslint-disable-next-line testing-library/no-container
  const buttonGroup = container.getElementsByClassName('__test__')[0];

  expect(buttonGroup).toHaveStyle('gap: 0');
});
