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
import { Tooltip } from '../../tooltip';
import { MessageInline } from '../MessageInline';
import { MessageVariety } from '../MessageTypes';

it('should show a message', async () => {
  const { container } = setupMessageInline({ children: 'Fancy Content' });

  expect(screen.getByText('Fancy Content')).toBeInTheDocument();
  await expect(container).toHaveNoA11yViolations();
});

it.each([
  [MessageVariety.Danger, 'Error:'],
  [MessageVariety.Discover, 'Hint:'],
  [MessageVariety.Info, 'Information:'],
  [MessageVariety.Success, 'Success:'],
  [MessageVariety.Warning, 'Warning:'],
])('should indicate the message is of variety %s', (variety, expectedPrefix) => {
  setupMessageInline({ variety });

  expect(screen.getByText(expectedPrefix)).toBeInTheDocument();
});

it('should correctly support tooltips', async () => {
  const { user } = render(
    <Tooltip content="my tooltip">
      <MessageInline variety={MessageVariety.Info}>Look at my tooltip</MessageInline>
    </Tooltip>,
  );

  await user.hover(screen.getByText('Look at my tooltip'));
  expect(screen.getByRole('tooltip', { name: 'my tooltip' })).toBeInTheDocument();
});

function setupMessageInline({
  children = 'text',
  ...props
}: Partial<ComponentProps<typeof MessageInline>>) {
  return render(
    <MessageInline variety={MessageVariety.Info} {...props}>
      {children}
    </MessageInline>,
  );
}
