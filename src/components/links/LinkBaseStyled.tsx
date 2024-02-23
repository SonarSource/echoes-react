/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { LinkBase, LinkHighlight } from './LinkBase';

const LinkBaseStyledType = {
  [LinkHighlight.Accent]: css`
    --color: var(--echoes-color-text-accent);
    --hover: var(--echoes-color-text-accent-hover);
  `,
  [LinkHighlight.Default]: css`
    --color: var(--echoes-color-text-default);
    --hover: var(--echoes-color-text-accent-hover);
  `,
  [LinkHighlight.Subdued]: css`
    --color: var(--echoes-color-text-subdued);
    --hover: var(--echoes-color-text-accent-hover);
  `,
};

const LinkBaseStyledNoType = css`
  ${LinkBaseStyledType[LinkHighlight.Default]}
  --color: 'currentColor';
`;

export const LinkBaseStyled = styled(LinkBase)`
  ${({ highlight: type }) => (type ? LinkBaseStyledType[type] : LinkBaseStyledNoType)};

  color: var(--color);
  font-weight: var(--echoes-font-weight-semi-bold);
  text-decoration-line: var(--echoes-text-decoration-underline);
  text-decoration-color: var(--color);
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;

  &:visited {
    color: var(--color);
  }

  &:hover,
  &:focus,
  &:active {
    color: var(--hover);
    text-decoration-color: var(--hover);
  }

  &:focus,
  &:focus-visible {
    outline: var(--echoes-color-focus-default) solid var(--echoes-focus-border-width-default);
    outline-offset: var(--echoes-focus-border-offset-default);
    border-radius: var(--echoes-border-radius-200);
  }

  & > svg {
    vertical-align: text-bottom !important;
  }

  @media print {
    &,
    &:visited,
    &:hover,
    &:focus,
    &:active {
      color: 'currentColor';
      text-decoration: none;
    }
  }
`;
