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
import {
  AsideLeft,
  ContentGrid,
  PageContent,
  PageContentProps,
  PageGrid,
  PageGridProps,
} from '../LayoutSlots';
import { AsideSize, PageWidth } from '../LayoutTypes';
import { ContentHeader } from '../header';

expect.extend(matchers);

describe('PageGrid', () => {
  it.each([[PageWidth.default, 'var(--echoes-layout-sizes-max-width-default)']])(
    'should render correctly when %s',
    (width, expected) => {
      renderPageGrid({ width });

      expect(screen.getByText('content')).toHaveStyle({ maxWidth: expected });
    },
  );

  it('should render correctly when fluid', () => {
    renderPageGrid({ width: PageWidth.fluid });

    expect(screen.getByText('content')).not.toHaveStyle({
      maxWidth: 'var(--echoes-layout-sizes-max-width-default)',
    });
  });

  it.each([
    ['loading', { isLoading: true }, 'true', 'Loading page'],
    ['not loading', { isLoading: false }, 'false', 'Page loaded'],
    [
      'loading (custom message)',
      { isLoading: true, loadingMessage: 'Fetching data' },
      'true',
      'Fetching data',
    ],
    [
      'not loading (custom message)',
      { isLoading: false, loadedMessage: 'All done' },
      'false',
      'All done',
    ],
  ])('should render correctly when %s', async (_, args, ariaBusy, expectedText) => {
    const { container } = renderPageGrid(args);

    await expect(container).toHaveNoA11yViolations();

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toHaveAttribute('aria-busy', ariaBusy);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

describe('ContentGrid', () => {
  it.each([false, true])(
    'keeps the header full-width and scrolls with page when scrollFirst is %s',
    (scrollFirst) => {
      render(
        <ContentGrid data-testid="grid">
          <ContentHeader
            scrollFirst={scrollFirst}
            title={<ContentHeader.Title>header</ContentHeader.Title>}
          />
          <AsideLeft id="aside">aside</AsideLeft>
          <PageGrid id="page">
            <PageContent>content</PageContent>
          </PageGrid>
        </ContentGrid>,
      );

      expect(getComputedStyle(screen.getByTestId('grid')).overflowY).toBe(
        scrollFirst ? 'auto' : 'hidden',
      );
      expect(getComputedStyle(screen.getByText('aside')).position).toBe(
        scrollFirst ? 'sticky' : '',
      );
      expect(getComputedStyle(screen.getByText('aside')).overflowY).toBe('auto');
      // eslint-disable-next-line testing-library/no-node-access
      const page = screen.getByText('content').closest('#page');
      expect(page).not.toBeNull();
      expect(getComputedStyle(page!).overflowY).toBe(scrollFirst ? 'visible' : 'auto');
    },
  );

  it('resets the layout when the scrolling header unmounts', () => {
    const { rerender } = render(
      <ContentGrid data-testid="grid">
        <ContentHeader scrollFirst title={<ContentHeader.Title>header</ContentHeader.Title>} />
      </ContentGrid>,
    );
    expect(getComputedStyle(screen.getByTestId('grid')).overflowY).toBe('auto');

    rerender(<ContentGrid data-testid="grid" />);
    expect(getComputedStyle(screen.getByTestId('grid')).overflowY).toBe('hidden');
  });
});

describe('PageContent', () => {
  it.each([
    ['loading', { isLoading: true }, 'true', 'Loading page content'],
    ['not loading', { isLoading: false }, 'false', 'Page content loaded'],
    [
      'loading (custom message)',
      { isLoading: true, loadingMessage: 'Fetching data' },
      'true',
      'Fetching data',
    ],
    [
      'not loading (custom message)',
      { isLoading: false, loadedMessage: 'All done' },
      'false',
      'All done',
    ],
  ])('should render correctly when %s', async (_, args, ariaBusy, expectedText) => {
    const { container } = renderPageContent(args);

    await expect(container).toHaveNoA11yViolations();

    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', ariaBusy);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

describe('AsideLeft', () => {
  it.each([
    [
      AsideSize.small,
      'var(--echoes-layout-aside-width-small)',
      'var(--echoes-dimension-space-150)',
    ],
    [
      AsideSize.medium,
      'var(--echoes-layout-aside-width-medium)',
      'var(--echoes-dimension-space-200)',
    ],
    [
      AsideSize.large,
      'var(--echoes-layout-aside-width-large)',
      'var(--echoes-dimension-space-250)',
    ],
  ])('should render correctly when %s', (size, expectedWidth, expectedPadding) => {
    renderAsideLeft(size);

    expect(screen.getByText('content')).toHaveStyle({
      '--aside-left-padding': expectedPadding,
      '--aside-left-width': expectedWidth,
      padding: 'var(--aside-left-padding)',
      width: 'var(--aside-left-width)',
    });
  });
});

function renderPageGrid(props: PageGridProps = {}) {
  return render(<PageGrid {...props}>content</PageGrid>);
}

function renderPageContent(props: PageContentProps = {}) {
  return render(<PageContent {...props}>content</PageContent>);
}

function renderAsideLeft(size: `${AsideSize}`) {
  return render(<AsideLeft size={size}>content</AsideLeft>);
}
