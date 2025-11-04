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
import { Button } from '../../buttons';
import { Tooltip } from '../../tooltip';
import { MessageCallout } from '../MessageCallout';
import { MessageVariety } from '../MessageTypes';

it('should display a message', async () => {
  const { container } = setupMessageCallout({ children: 'Fancy Content' });

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
  setupMessageCallout({ variety });

  expect(screen.getByText(expectedPrefix)).toBeInTheDocument();
});

it('should display a title', async () => {
  const { container } = setupMessageCallout({ title: 'Fancy Title' });

  expect(screen.getByText('Fancy Title')).toBeInTheDocument();
  await expect(container).toHaveNoA11yViolations();
});

it('should display an action', async () => {
  const { container } = setupMessageCallout({
    action: <Button>Nice button</Button>,
  });

  expect(screen.getByRole('button', { name: 'Nice button' })).toBeInTheDocument();
  await expect(container).toHaveNoA11yViolations();
});

it('should be dismissable', async () => {
  const onDismiss = jest.fn();
  const { container, user } = setupMessageCallout({
    onDismiss,
  });

  await expect(container).toHaveNoA11yViolations();

  const dismissButton = screen.getByRole('button', { name: 'Dismiss' });
  expect(dismissButton).toBeInTheDocument();
  await user.click(dismissButton);

  expect(onDismiss).toHaveBeenCalled();
});

it('should correctly support tooltips', async () => {
  const { user } = render(
    <Tooltip content="my tooltip">
      <MessageCallout variety={MessageVariety.Info}>I got a tooltip</MessageCallout>
    </Tooltip>,
  );

  await user.hover(screen.getByText('I got a tooltip'));
  expect(screen.getByRole('tooltip', { name: 'my tooltip' })).toBeInTheDocument();
});

function setupMessageCallout({
  children = 'text',
  ...props
}: Partial<ComponentProps<typeof MessageCallout>>) {
  return render(
    <MessageCallout variety={MessageVariety.Info} {...props}>
      {children}
    </MessageCallout>,
  );
}
