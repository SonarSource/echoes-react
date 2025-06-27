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
import { forwardRef } from 'react';
import { useButtonClickHandler } from '../../components/buttons/Button';
import { ButtonStyled } from '../../components/buttons/ButtonStyles';
import { ButtonBaseProps } from '../../components/buttons/ButtonTypes';
import { IconX } from '../../components/icons';
import { Tooltip } from '../../components/tooltip';

interface DismissButtonProps extends Pick<ButtonBaseProps, 'className' | 'onClick'> {
  ariaLabel: string;
}

export const DismissButton = forwardRef<HTMLButtonElement, DismissButtonProps>((props, ref) => {
  const { ariaLabel, onClick, ...htmlProps } = props;

  const handleClick = useButtonClickHandler(props);

  return (
    <Tooltip content={ariaLabel}>
      <DismissButtonStyled
        {...htmlProps}
        aria-label={ariaLabel}
        onClick={handleClick}
        ref={ref}
        type="button">
        <IconX />
      </DismissButtonStyled>
    </Tooltip>
  );
});
DismissButton.displayName = 'DismissButton';

const DismissButtonStyled = styled(ButtonStyled)`
  flex: 0 0 auto;

  height: var(--echoes-dimension-height-600);
  width: var(--echoes-dimension-width-300);

  justify-content: center;

  background-color: var(--echoes-color-background-transparent);
  border-radius: var(--echoes-border-radius-200);
`;
DismissButtonStyled.displayName = 'DismissButtonStyled';
