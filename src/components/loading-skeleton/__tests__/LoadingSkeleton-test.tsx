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
import { matchers } from '@emotion/jest';
import { screen } from '@testing-library/react';
import { render } from '~common/helpers/test-utils';
import { LoadingSkeleton, LoadingSkeletonVariety } from '..';

expect.extend(matchers);

it.each([
  [LoadingSkeletonVariety.Disk],
  [LoadingSkeletonVariety.Paragraph],
  [LoadingSkeletonVariety.Rectangle],
  [LoadingSkeletonVariety.Text],
])('%s should render correctly', async (variety) => {
  const { container } = render(<LoadingSkeleton variety={variety} />);

  await expect(container).toHaveNoA11yViolations();
});

it('should hide text content when loading', () => {
  render(<LoadingSkeleton variety="text">content</LoadingSkeleton>);

  expect(screen.queryByText('content')).not.toBeInTheDocument();
});

it('should show text content when not loading', () => {
  render(
    <LoadingSkeleton isLoading={false} variety="paragraph">
      content
    </LoadingSkeleton>,
  );

  expect(screen.getByText('content')).toBeInTheDocument();
});
