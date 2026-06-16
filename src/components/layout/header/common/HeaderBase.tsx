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
import { CSSProperties, forwardRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { LoadingStateProvider } from '~common/components/LoadingStateProvider';
import { ScreenReaderOnlyLoadingStatus } from '~common/components/ScreenReaderOnlyLoadingStatus';
import { isDefined } from '~common/helpers/types';
import { cssVar } from '~utils/design-tokens';
import {
  StyledDivider,
  StyledDividerWithOverlap,
  StyledPageHeaderActions,
  StyledPageHeaderBottom,
  StyledPageHeaderBreadcrumbs,
  StyledPageHeaderCallout,
  StyledPageHeaderMain,
} from './HeaderStyles';
import { HeaderProps, PageHeaderArea } from './HeaderTypes';

interface InternalProps {
  actionsStyles?: CSSProperties;
  hasFullWidthNav?: boolean;
}

const HeaderBase = forwardRef<HTMLDivElement, HeaderProps & InternalProps>((props, ref) => {
  const {
    actions,
    actionsStyles,
    breadcrumbs,
    callout,
    description,
    hasDivider,
    hasFullWidthNav,
    isLoading,
    loadedMessage,
    loadingMessage,
    metadata,
    navigation,
    title,
    ...rest
  } = props;

  return (
    <>
      <header aria-busy={isLoading} ref={ref} {...rest}>
        <LoadingStateProvider isLoading={isLoading}>
          {callout && <StyledPageHeaderCallout>{callout}</StyledPageHeaderCallout>}

          {breadcrumbs && <StyledPageHeaderBreadcrumbs>{breadcrumbs}</StyledPageHeaderBreadcrumbs>}

          <StyledPageHeaderMain>
            {title}

            {metadata}

            {description}
          </StyledPageHeaderMain>

          {actions && (
            <StyledPageHeaderActions style={actionsStyles}>{actions}</StyledPageHeaderActions>
          )}

          {navigation && (
            <>
              <StyledPageHeaderBottom>{navigation}</StyledPageHeaderBottom>

              {hasDivider && <StyledDividerWithOverlap />}
            </>
          )}

          {hasDivider && !navigation && <StyledDivider />}
        </LoadingStateProvider>
      </header>

      {isDefined(isLoading) && (
        <ScreenReaderOnlyLoadingStatus
          isLoading={isLoading}
          loadedMessage={
            loadedMessage ?? (
              <FormattedMessage
                defaultMessage="Page header loaded"
                description="Default message to be announced by screen readers when the page header is loaded"
                id="page_header.default_loaded_message"
              />
            )
          }
          loadingMessage={
            loadingMessage ?? (
              <FormattedMessage
                defaultMessage="Loading page header"
                description="Default message to be announced by screen readers when the page header is loading"
                id="page_header.default_loading_message"
              />
            )
          }
        />
      )}
    </>
  );
});
HeaderBase.displayName = 'HeaderBase';

export const StyledHeaderBase = styled(HeaderBase)`
  display: grid;

  grid-template-columns: auto min-content;
  grid-template-rows: repeat(4, auto);
  grid-template-areas: ${({ hasFullWidthNav = true }) =>
    hasFullWidthNav
      ? `
      '${PageHeaderArea.callout}      ${PageHeaderArea.callout}'
      '${PageHeaderArea.breadcrumbs}  ${PageHeaderArea.breadcrumbs}'
      '${PageHeaderArea.main}         ${PageHeaderArea.actions}'
      '${PageHeaderArea.nav}          ${PageHeaderArea.nav}'
      '${PageHeaderArea.divider}      ${PageHeaderArea.divider}'
    `
      : `
      '${PageHeaderArea.callout}      ${PageHeaderArea.callout}'
      '${PageHeaderArea.breadcrumbs}  ${PageHeaderArea.breadcrumbs}'
      '${PageHeaderArea.main}         ${PageHeaderArea.actions}'
      '${PageHeaderArea.nav}          _'
      '${PageHeaderArea.divider}      ${PageHeaderArea.divider}'
    `};

  padding-top: ${cssVar('dimension-space-300')};
  padding-right: ${cssVar('dimension-space-300')};
  padding-left: ${cssVar('dimension-space-300')};
`;
StyledHeaderBase.displayName = 'StyledHeaderBase';
