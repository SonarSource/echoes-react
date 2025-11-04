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
import userEvent from '@testing-library/user-event';
import { render } from '~common/helpers/test-utils';
import { Spotlight } from '../Spotlight';
import { SpotlightModalPlacement, SpotlightProps } from '../SpotlightTypes';

it('should display the spotlight', async () => {
  const user = userEvent.setup();
  const callback = jest.fn();
  renderSpotlight({ callback, image: <>a fake image</> });

  expect(await screen.findByRole('alertdialog')).toBeInTheDocument();
  let dialog = screen.getByRole('alertdialog');
  expect(dialog).toHaveTextContent('Trust The Foo');
  expect(dialog).toHaveTextContent('Foo bar is baz');
  expect(screen.getByText('step 1 of 5')).toBeInTheDocument();
  expect(screen.getByText('a fake image')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Next' }));

  dialog = screen.getByRole('alertdialog');
  expect(dialog).toHaveTextContent('Trust The Baz');
  expect(dialog).toHaveTextContent('Baz foo is bar');
  expect(screen.getByText('a fake image')).toBeInTheDocument();
  expect(callback).toHaveBeenCalled();

  await user.click(screen.getByRole('button', { name: 'Next' }));

  dialog = screen.getByRole('alertdialog');
  expect(dialog).toHaveTextContent('Trust The Bar');
  expect(dialog).toHaveTextContent('Bar baz is foo');

  await user.click(screen.getByRole('button', { name: 'Next' }));

  dialog = screen.getByRole('alertdialog');
  expect(dialog).toHaveTextContent('Trust The Foo 2');
  expect(dialog).toHaveTextContent('Foo baz is bar');

  await user.click(screen.getByRole('button', { name: 'Go back' }));

  dialog = screen.getByRole('alertdialog');
  expect(dialog).toHaveTextContent('Trust The Bar');
  expect(dialog).toHaveTextContent('Bar baz is foo');

  await user.click(screen.getByRole('button', { name: 'Next' }));
  await user.click(screen.getByRole('button', { name: 'Next' }));

  dialog = screen.getByRole('alertdialog');
  expect(dialog).toHaveTextContent('Trust The Baz 2');
  expect(dialog).toHaveTextContent('Baz bar is foo');

  expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Close' }));

  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
});

it('should not show the spotlight if isRunning is false', () => {
  renderSpotlight({ isRunning: false });

  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
});

it('should allow the customization of button labels', async () => {
  const user = userEvent.setup();

  renderSpotlight({
    backLabel: 'backward',
    closeLabel: 'close_me',
    nextLabel: 'forward',
    skipLabel: "just don't",
    stepXofYLabel: undefined,
  });

  expect(await screen.findByRole('alertdialog')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'forward' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: "just don't" })).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'forward' }));

  expect(screen.getByRole('button', { name: 'backward' })).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'forward' }));
  await user.click(screen.getByRole('button', { name: 'forward' }));
  await user.click(screen.getByRole('button', { name: 'forward' }));

  expect(screen.getByRole('button', { name: 'close_me' })).toBeInTheDocument();
});

it('should not display the step counter when there is only one step and no render method', async () => {
  renderSpotlight({
    steps: [
      {
        bodyText: 'Foo bar is baz',
        headerText: 'Trust The Foo',
        placement: SpotlightModalPlacement.Top,
        target: '#step1',
      },
    ],
    stepXofYLabel: undefined,
  });

  expect(await screen.findByRole('alertdialog')).toBeInTheDocument();
  expect(screen.queryByText('step 1 of 1')).not.toBeInTheDocument();
});

function renderSpotlight(props: Partial<SpotlightProps> = {}) {
  return render(
    <div>
      <div id="step1">This is step 1</div>
      <div id="step2">This is step 2</div>
      <div id="step3">This is step 3</div>
      <div id="step4">This is step 4</div>
      <div id="step5">This is step 5</div>

      <Spotlight
        stepXofYLabel={(x: number, y: number) => `step ${x} of ${y}`}
        steps={[
          {
            bodyText: 'Foo bar is baz',
            headerText: 'Trust The Foo',
            placement: SpotlightModalPlacement.Top,
            target: '#step1',
          },
          {
            bodyText: 'Baz foo is bar',
            headerText: 'Trust The Baz',
            placement: SpotlightModalPlacement.Right,
            target: '#step2',
          },
          {
            bodyText: 'Bar baz is foo',
            headerText: 'Trust The Bar',
            placement: SpotlightModalPlacement.Bottom,
            target: '#step3',
          },
          {
            bodyText: 'Foo baz is bar',
            headerText: 'Trust The Foo 2',
            placement: SpotlightModalPlacement.Left,
            target: '#step4',
          },
          {
            bodyText: 'Baz bar is foo',
            headerText: 'Trust The Baz 2',
            placement: SpotlightModalPlacement.Center,
            target: '#step5',
          },
        ]}
        {...props}
      />
    </div>,
  );
}
