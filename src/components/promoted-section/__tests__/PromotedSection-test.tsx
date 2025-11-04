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
import { render } from '~common/helpers/test-utils';
import { Button } from '../../buttons';
import { IconBug } from '../../icons';
import { PromotedSection, PromotedSectionProps } from '../PromotedSection';

describe('PromotedSection', () => {
  it('should render a neutral non-dismissable section by default', async () => {
    const { container } = renderPromotedSection();

    expect(screen.getByTestId('promoted-section')).toHaveStyle({ display: 'block' });
    expect(screen.queryByLabelText('Dismiss')).not.toBeInTheDocument();

    await expect(container).toHaveNoA11yViolations();
  });

  it('should render a badge', () => {
    renderPromotedSection({ badgeText: 'New' });

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('should render an illustration and use inline-block', () => {
    renderPromotedSection({ illustration: <IconBug /> });

    expect(screen.getByTestId('promoted-section')).toHaveStyle({ display: 'inline-block' });
  });

  it('should render a dismiss button', async () => {
    const onDismiss = jest.fn();

    const { user } = renderPromotedSection({ onDismiss });

    await user.click(screen.getByRole('button'));

    expect(onDismiss).toHaveBeenCalled();
  });

  it('should render an action', async () => {
    const onActionClick = jest.fn();

    const { user } = renderPromotedSection({
      actions: <Button onClick={onActionClick}>Action</Button>,
    });

    await user.click(screen.getByRole('button'));

    expect(onActionClick).toHaveBeenCalled();
  });
});

function renderPromotedSection(overrides: Partial<PromotedSectionProps> = {}) {
  return render(
    <PromotedSection
      data-testid="promoted-section"
      headerText="Default header text"
      text="Default text"
      {...overrides}
    />,
  );
}
