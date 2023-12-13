/*
 * Echoes React
 * Copyright (C) 2023-2023 SonarSource SA
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
import { LinkBase } from './LinkBase';

export const LinkBaseStyled = styled(LinkBase)`
  color: var(--color);
  text-decoration-color: var(--color);
  text-decoration: var(--echoes-text-decoration-underline);

  &:visited {
    color: var(--color);
  }

  &:hover {
    color: var(--hover);
  }

  &:focus,
  &:active {
    color: var(--active);
    text-decoration-color: var(--active);
  }

  &:focus,
  &:focus-visible {
    outline: var(--echoes-color-border-focus) solid 2px;
    outline-offset: var(--echoes-dimension-space-25);
  }

  & > svg {
    vertical-align: text-bottom !important;
  }

  ${({ icon }) =>
    icon &&
    css`
      & > svg,
      & > img {
        margin-right: var(--echoes-dimension-space-50);
      }
    `};

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
