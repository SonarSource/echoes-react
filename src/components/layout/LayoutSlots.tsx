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

import styled from '@emotion/styled';
import { CSSProperties, forwardRef, PropsWithChildren } from 'react';
import { FormattedMessage } from 'react-intl';
import { LoadingStateProvider } from '~common/components/LoadingStateProvider';
import { ScreenReaderOnlyLoadingStatus } from '~common/components/ScreenReaderOnlyLoadingStatus';
import { isDefined } from '~common/helpers/types';
import { TextNode } from '~types/utils';
import { cssVar } from '~utils/design-tokens';
import { AsideSize, ContentGridArea, GlobalGridArea, PageGridArea, PageWidth } from './LayoutTypes';

const AsideSizeStyles: Record<AsideSize, CSSProperties> = {
  [AsideSize.small]: { width: cssVar('layout-aside-width-small') },
  [AsideSize.medium]: { width: cssVar('layout-aside-width-medium') },
  [AsideSize.large]: { width: cssVar('layout-aside-width-large') },
};

/*
 * Layer 1 Grid components
 */
export const BannerContainer = styled.div`
  grid-area: ${GlobalGridArea.banner};

  z-index: 1; // Ensure the banners are showing over the content
`;
BannerContainer.displayName = 'BannerContainer';

export const ContentGrid = styled.div`
  grid-area: ${GlobalGridArea.content};

  position: relative;
  overflow-y: hidden;
  isolation: isolate; // Reset stacking context

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    '${ContentGridArea.header} ${ContentGridArea.header}'
    '${ContentGridArea.aside} ${ContentGridArea.page}';

  background-color: ${cssVar('color-surface-canvas-default')};
`;
ContentGrid.displayName = 'ContentGrid';

/*
 * Layer 2 Grid components
 * (ContentGrid)
 */
export interface AsideProps {
  className?: string;
  id?: string;
  role?: string;
  size?: `${AsideSize}`;
}

export const AsideLeft = forwardRef<HTMLDivElement, PropsWithChildren<AsideProps>>((props, ref) => {
  const { children, size = 'medium', ...restProps } = props;
  return (
    <StyledAsideLeft {...restProps} ref={ref} style={AsideSizeStyles[size]}>
      {children}
    </StyledAsideLeft>
  );
});
AsideLeft.displayName = 'AsideLeft';

const StyledAsideLeft = styled.div`
  grid-area: ${ContentGridArea.aside};
  overflow-y: auto;

  background-color: ${cssVar('color-surface-default')};
  border-right: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  box-sizing: border-box;
  padding: ${cssVar('dimension-space-250')};
`;
StyledAsideLeft.displayName = 'StyledAside';

export interface PageGridProps {
  className?: string;
  /**
   * Setting this prop will make this component behave like a LoadingContainer.
   * It will provide a LoadingContext that LoadingSkeletons can consume (automatically),
   * and deal with screen readers.
   * Customize the accessible status messages by specifying `loadedMessage` and `loadingMessage`.
   */
  isLoading?: boolean;
  /**
   * Allows you to customize the screen reader-only status message when `isLoading` is defined.
   * @defaultValue Page loaded
   */
  loadedMessage?: TextNode;
  /**
   * Allows you to customize the screen reader-only status message when `isLoading` is defined.
   * @defaultValue Loading page
   */
  loadingMessage?: TextNode;
  width?: `${PageWidth}`;
}

export const PageGrid = forwardRef<HTMLDivElement, PropsWithChildren<PageGridProps>>(
  (props, ref) => {
    const {
      children,
      isLoading,
      loadedMessage,
      loadingMessage,
      width = 'default',
      ...restProps
    } = props;

    return (
      <PageGridContainer {...restProps} aria-busy={isLoading} ref={ref}>
        <PageGridInner style={PAGE_WIDTH_STYLES[width]}>
          <LoadingStateProvider isLoading={isLoading}>{children}</LoadingStateProvider>
        </PageGridInner>

        {isDefined(isLoading) && (
          <ScreenReaderOnlyLoadingStatus
            isLoading={isLoading}
            loadedMessage={
              loadedMessage ?? (
                <FormattedMessage
                  defaultMessage="Page loaded"
                  description="Default message to be announced by screen readers when the page is loaded"
                  id="page_grid.default_loaded_message"
                />
              )
            }
            loadingMessage={
              loadingMessage ?? (
                <FormattedMessage
                  defaultMessage="Loading page"
                  description="Default message to be announced by screen readers when the page is loading"
                  id="page_grid.default_loading_message"
                />
              )
            }
          />
        )}
      </PageGridContainer>
    );
  },
);
PageGrid.displayName = 'PageGrid';

const PageGridContainer = styled.div`
  grid-area: ${ContentGridArea.page};
  position: relative; // Prevent scroll issues with sr-only elements we can have inside
  overflow-y: auto;
`;
PageGridContainer.displayName = 'PageGridContainer';

const PageGridInner = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    '${PageGridArea.header}'
    '${PageGridArea.main}'
    '${PageGridArea.footer}';

  min-height: 100%;
`;
PageGridInner.displayName = 'PageGridInner';

const PAGE_WIDTH_STYLES: Record<PageWidth, CSSProperties> = {
  [PageWidth.default]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: cssVar('layout-sizes-max-width-default'),
  },

  [PageWidth.fluid]: {},
};

export interface PageContentProps {
  className?: string;
  /**
   * Setting this prop will make this component behave like a LoadingContainer.
   * It will provide a LoadingContext that LoadingSkeletons can consume (automatically),
   * and deal with screen readers.
   * Customize the accessible status messages by specifying `loadedMessage` and `loadingMessage`.
   */
  isLoading?: boolean;
  /**
   * Allows you to customize the screen reader-only status message when `isLoading` is defined.
   * @defaultValue Page content loaded
   */
  loadedMessage?: TextNode;
  /**
   * Allows you to customize the screen reader-only status message when `isLoading` is defined.
   * @defaultValue Loading page content
   */
  loadingMessage?: TextNode;
}

export const PageContent = forwardRef<HTMLElement, PropsWithChildren<PageContentProps>>(
  (props, ref) => {
    const { children, isLoading, loadedMessage, loadingMessage, ...restProps } = props;

    return (
      <>
        <StyledPageContent {...restProps} aria-busy={isLoading} ref={ref}>
          <LoadingStateProvider isLoading={isLoading}>{children}</LoadingStateProvider>
        </StyledPageContent>

        {isDefined(isLoading) && (
          <ScreenReaderOnlyLoadingStatus
            isLoading={isLoading}
            loadedMessage={
              loadedMessage ?? (
                <FormattedMessage
                  defaultMessage="Page content loaded"
                  description="Default message to be announced by screen readers when the page content is loaded"
                  id="page_content.default_loaded_message"
                />
              )
            }
            loadingMessage={
              loadingMessage ?? (
                <FormattedMessage
                  defaultMessage="Loading page content"
                  description="Default message to be announced by screen readers when the page content is loading"
                  id="page_content.default_loading_message"
                />
              )
            }
          />
        )}
      </>
    );
  },
);
PageContent.displayName = 'PageContent';

const StyledPageContent = styled.main`
  grid-area: ${PageGridArea.main};

  padding: ${cssVar('dimension-space-300')};
  isolation: isolate; // Prevent content z-index values from escaping and overlapping a sticky PageHeader
`;
StyledPageContent.displayName = 'StyledPageContent';

export const PageFooter = styled.footer`
  grid-area: ${PageGridArea.footer};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: ${cssVar('dimension-space-300')};
  padding-top: ${cssVar('dimension-space-200')};
`;
PageFooter.displayName = 'PageFooter';
