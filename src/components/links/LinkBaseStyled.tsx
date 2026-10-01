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
import { LinkBase } from './LinkBase';
import { LinkHighlight } from './LinkTypes';

import { cssVar } from '~utils/design-tokens';

const LinkBaseStyledHighlight = {
  [LinkHighlight.Accent]: `
    --color: ${cssVar('link-colors-action-default')};
    --hover: ${cssVar('link-colors-action-hover')};
  `,
  [LinkHighlight.Default]: `
    --color: ${cssVar('link-colors-default-default')};
    --hover: ${cssVar('link-colors-default-hover')};
  `,
  [LinkHighlight.Subtle]: `
    --color: ${cssVar('link-colors-subtle-default')};
    --hover: ${cssVar('link-colors-subtle-hover')};
  `,
  [LinkHighlight.CurrentColor]: `
    --color: 'currentColor';
    --hover: ${cssVar('link-colors-default-hover')};
  `,
};

export const LinkBaseStyled = styled(LinkBase)`
  all: unset;

  ${({ highlight = LinkHighlight.Accent }) => LinkBaseStyledHighlight[highlight]};

  color: var(--color);

  font: inherit;
  font-weight: ${cssVar('font-weight-semi-bold')};
  text-decoration-line: ${cssVar('text-decoration-underline')};
  text-decoration-color: var(--color);
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;

  cursor: pointer;

  &:visited {
    color: var(--color);
  }

  &:hover,
  &:focus,
  &:active {
    color: var(--hover);
    text-decoration-color: var(--hover);
    outline: none;
  }

  &:focus-visible {
    outline: ${cssVar('link-colors-focus-ring')} solid ${cssVar('focus-border-width-default')};
    outline-offset: ${cssVar('focus-border-offset-default')};
    border-radius: ${cssVar('border-radius-200')};
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
LinkBaseStyled.displayName = 'LinkBaseStyled';
