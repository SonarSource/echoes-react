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

function IconBase(props: Readonly<IconProps & { children: React.ReactNode }>) {
  const { children, className, ...rest } = props;

  return (
    <span className={className} {...rest}>
      {children}
    </span>
  );
}

export const IconMaterialWrapper = styled(IconBase)`
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-family: 'Material Symbols Rounded';
  font-size: calc(1em * (18 / 14));
  font-style: normal;
  font-weight: normal;
  height: calc(1em * (20 / 18));
  line-height: calc(1em * (20 / 18));
  text-align: center;
  vertical-align: bottom;
  width: calc(1em * (20 / 18));
`;
IconMaterialWrapper.displayName = 'IconMaterialWrapper';

export const IconCustomWrapper = styled(IconMaterialWrapper)`
  font-family: 'Echoes Icons';
`;
IconMaterialWrapper.displayName = 'IconCustomWrapper';
