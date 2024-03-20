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

import styled from '@emotion/styled';

export type IconProps = Omit<JSX.IntrinsicElements['span'], 'children'>;

export function IconWrapper(props: Readonly<IconProps & { children: React.ReactNode }>) {
  const { children, className, ...rest } = props;

  return (
    <StyledSpan className={className} {...rest}>
      {children}
    </StyledSpan>
  );
}

const StyledSpan = styled.span`
  font-family: 'Material Symbols Rounded';
  font-size: 1.2em;
  font-style: normal;
  font-weight: normal;
  letter-spacing: normal;
  line-height: calc(1em + 4px);
  text-rendering: optimizeLegibility;
  text-transform: none;
  white-space: nowrap;
  word-wrap: normal;
`;
