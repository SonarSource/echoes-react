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

import styled from '@emotion/styled';
import { PropsWithChildren, ReactNode, useMemo } from 'react';
import { isDefined } from '~common/helpers/types';

export interface LayoutProps {
  className?: string;
  type?: `${LayoutType}`;
  asideLeft?: ReactNode;
  asideRight?: ReactNode;
}

enum LayoutType {
  Default = 'default',
  Large = 'large',
  FullWidth = 'full-width',
}

export function Layout(props: PropsWithChildren<LayoutProps>) {
  const { asideLeft, asideRight, children, className, type = LayoutType.Default } = props;

  const variableStyle = useMemo(
    () => ({
      ...TYPE_STYLE[type],
    }),
    [type],
  );

  return (
    <LayoutStyled className={className} css={variableStyle}>
      {isDefined(asideLeft) && <LeftAside>{asideLeft}</LeftAside>}
      <MainContent>{children}</MainContent>
      {isDefined(asideRight) && <RightAside>{asideRight}</RightAside>}
    </LayoutStyled>
  );
}

Layout.displayName = 'Layout';

const LeftAside = styled.div`
  grid-column: 1 / 4;
`;

const RightAside = styled.div`
  grid-column: -4 / -1;
`;

const MainContent = styled.div`
  padding: var(--layout-gap);

  grid-column: 1 / 13;

  ${LeftAside} + & {
    grid-column-start: 4;
    padding-left: 0;
  }

  &:has(+ ${RightAside}) {
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
