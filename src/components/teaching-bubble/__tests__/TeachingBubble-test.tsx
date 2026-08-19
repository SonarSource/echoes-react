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
import { act, screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { render } from '~common/helpers/test-utils';
import { TeachingBubble } from '..';

it('appears on load, calls `onClose` when "esc" is hit', async () => {
  const onClose = jest.fn();
  const { user } = setupTeachingBubble({ isOpen: true, onClose });

  expect(screen.getByText('Header')).toBeInTheDocument();

  await user.keyboard('[escape]');

  expect(onClose).toHaveBeenCalled();
});

it('should have no accessibility violations', async () => {
  await act(async () => {
    const { container } = setupTeachingBubble({ isOpen: true });
    await expect(container).toHaveNoA11yViolations();
  });
});

it('does not call `onClose` when clicking outside the bubble', async () => {
  const onClose = jest.fn();
  const { user } = setupTeachingBubble({ isOpen: true, onClose });

  await user.click(document.body);

  expect(onClose).not.toHaveBeenCalled();
});

it('does not call `onClose` when the trigger is clicked while the bubble is closed', async () => {
  const onClose = jest.fn();
  const { user } = setupTeachingBubble({ isOpen: false, onClose });

  await user.click(screen.getByText('New feature'));

  expect(onClose).not.toHaveBeenCalled();
});

it('calls `onClose` when CloseButton is clicked', async () => {
  const onClose = jest.fn();
  const otherCallback = jest.fn();
  const { user } = setupTeachingBubble({
    isOpen: true,
    onClose,
    footer: (
      <TeachingBubble.CloseButton onClick={otherCallback}>close it</TeachingBubble.CloseButton>
    ),
  });

  expect(screen.getByText('Header')).toBeInTheDocument();

  await user.click(screen.getByText('close it'));
  expect(onClose).toHaveBeenCalled();
  expect(otherCallback).toHaveBeenCalled();
});

function setupTeachingBubble(props: Partial<ComponentProps<typeof TeachingBubble>> = {}) {
  return render(
    <TeachingBubble isOpen onClose={jest.fn()} title="Header" {...props}>
      <button type="button">New feature</button>
    </TeachingBubble>,
  );
}
