/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource SA
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

/* @jsxImportSource @emotion/react */ // <-- This allows jest to properly render emotion's css prop
import styled from '@emotion/styled';
import { PropsWithChildren, useMemo } from 'react';

export interface LayoutProps {
  className?: string;
  /**
   * Defines the intended width of the page:
   *  - `default` is 1280px, for pages with little content
   *  - `large` is 1560px, for pages with more content.
   *      Should be the usual choice for pages with a left or right 'aside'
   *  - `full-width`, as its name implies, is unlimited. For the codeviewer and similarly complex pages
   *
   * The gutters will scale to match (respectively 4px, 16px and 24px)
   *
   * Finally, if the viewport is smaller than the desired size,
   * the layout will resize down to 1280px.
   */
  type?: `${LayoutType}`;
}

export enum LayoutType {
  Default = 'default',
  Large = 'large',
  FullWidth = 'full-width',
}

const TYPE_STYLE = {
  [LayoutType.Default]: {
    '--layout-max-width': 'var(--echoes-layouts-sizes-max-width-default)',
    '--layout-gap': 'var(--echoes-dimension-space-50)',
  },
  [LayoutType.Large]: {
    '--layout-max-width': 'var(--echoes-layouts-sizes-max-width-large)',
    '--layout-gap': 'var(--echoes-dimension-space-200)',
  },
  [LayoutType.FullWidth]: {
    '--layout-max-width': 'var(--echoes-layouts-sizes-max-width-full)',
    '--layout-gap': 'var(--echoes-dimension-space-300)',
  },
};

export function LayoutRoot(props: PropsWithChildren<LayoutProps>) {
  const { children, className, type = LayoutType.Default, ...other } = props;

  const variableStyle = useMemo(
    () => ({
      ...TYPE_STYLE[type],
    }),
    [type],
  );

  return (
    <LayoutStyled className={className} css={variableStyle} {...other}>
      {children}
    </LayoutStyled>
  );
}

LayoutRoot.displayName = 'Layout';

export const LayoutAsideLeft = styled.aside`
  grid-column: 1 / 4;
`;

export const LayoutAsideRight = styled.aside`
  grid-column: -4 / -1;
`;

export const LayoutMain = styled.main`
  padding: var(--layout-gap);

  grid-column: 1 / 13;

  ${LayoutAsideLeft} + & {
    grid-column-start: 4;
    padding-left: 0;
  }

  &:has(+ ${LayoutAsideRight}) {
    grid-column-end: 10;
    padding-right: 0;
  }
`;

export const LayoutStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: none;

  grid-gap: 0 var(--layout-gap);

  align-items: stretch;
  justify-content: flex-start;

  min-width: 1280px;
  max-width: var(--layout-max-width);

  & > div {
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
  }
`;
