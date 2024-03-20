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
import classNames from 'classnames';

export type IconProps = Omit<JSX.IntrinsicElements['span'], 'children'>;

export function Icon(props: Readonly<IconProps & { children: React.ReactNode }>) {
  const { children, className, ...rest } = props;

  return (
    <StyledSpan
      className={classNames('material-symbols-outlined', {
        className,
      })}
      {...rest}>
      {children}
    </StyledSpan>
  );
}

const StyledSpan = styled.span`
  font-size: var(--echoes-font-size-body-large);
`;
