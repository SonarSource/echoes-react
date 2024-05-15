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

import * as radixTooltip from '@radix-ui/react-tooltip';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { ComponentProps } from 'react';
import { render } from '~common/helpers/test-utils';
import { Tooltip } from '../Tooltip';

it('toggles when trigger is hovered', async () => {
  const { user } = setupTooltip();

  expect(screen.queryByRole('tooltip', { name: 'content' })).not.toBeInTheDocument();

  user.hover(screen.getByText('Trigger'));

  expect(await screen.findByRole('tooltip', { name: 'content' })).toBeInTheDocument();

  user.keyboard('[Escape]');

  await waitForElementToBeRemoved(() => screen.queryByRole('tooltip', { name: 'content' }));
});

it.each([
  ['null', null],
  ['undefined', undefined],
  ['empty', ''],
])('does not appear when content is %s', async (_, content) => {
  const { user } = setupTooltip({ content });

  await user.hover(screen.getByText('Trigger'));

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});

function setupTooltip(props: Partial<ComponentProps<typeof Tooltip>> = {}) {
  return render(
    <radixTooltip.Provider delayDuration={0}>
      <Tooltip content="content" {...props}>
        <button type="button">Trigger</button>
      </Tooltip>
    </radixTooltip.Provider>,
  );
}
