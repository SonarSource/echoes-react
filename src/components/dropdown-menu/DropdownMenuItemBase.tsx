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
import * as radixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { MouseEventHandler, ReactNode } from 'react';
import { IconCheck } from '../icons/IconCheck';

type CheckProps =
  | {
      isCheckable: true;
      isChecked?: boolean;
    }
  | {
      isCheckable?: false;
      isChecked?: never;
    };

export type DropdownMenuItemBaseProps = CheckProps & {
  ariaLabel?: string;
  children: ReactNode;
  className?: string;
  helpText?: JSX.Element | string;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export function DropdownMenuItemBase({
  ariaLabel,
  children,
  className,
  helpText,
  isCheckable = false,
  isChecked = false,
  isDisabled = false,
  onClick,
  prefix,
  suffix,
}: Readonly<DropdownMenuItemBaseProps>) {
  let checkMarkOrPlaceHolder = null;

  if (isCheckable) {
    checkMarkOrPlaceHolder = isChecked ? (
      <StyledIconCheck color="echoes-color-icon-selected" />
    ) : (
      <CheckmarkPlaceholder />
    );
  }

  return (
    <StyledDropdownMenuItemBase
      aria-label={ariaLabel}
      className={className}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}>
      <StyledLeftHandSide>
        {checkMarkOrPlaceHolder}

        {prefix}

        <StyledLabelAndHelpText>
          {children}

          <StyledHelpText isDisabled={isDisabled}>{helpText}</StyledHelpText>
        </StyledLabelAndHelpText>
      </StyledLeftHandSide>

      <StyledSuffix>{suffix}</StyledSuffix>
    </StyledDropdownMenuItemBase>
  );
}

const StyledIconCheck = styled(IconCheck)`
  font-size: var(--echoes-font-size-body-medium);
`;

const CheckmarkPlaceholder = styled(IconCheck)`
  font-size: var(--echoes-font-size-body-medium);
  visibility: hidden;
`;

const StyledLeftHandSide = styled.div`
  align-items: center;
  column-gap: var(--echoes-dimension-space-100);
  display: flex;
`;

const StyledLabelAndHelpText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  row-gap: var(---echoes-dimension-space-25);
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledHelpText = styled.span<{ isDisabled?: boolean }>`
  color: ${(props) =>
    props.isDisabled ? 'var(--echoes-color-text-disabled)' : 'var(--echoes-color-text-subdued)'};
  font: var(--echoes-typography-paragraph-small-regular);
`;

const StyledSuffix = styled.span`
  align-items: center;
  color: var(--echoes-color-text-subdued);
  display: flex;
`;

const StyledDropdownMenuItemBase = styled(radixDropdownMenu.Item)`
  align-items: center;
  background-color: var(--echoes-color-background-default);
  color: var(--echoes-color-text-default);
  column-gap: var(--echoes-dimension-space-100);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: var(--echoes-dimension-space-100) var(--echoes-dimension-space-150);

  &:focus-visible {
    border-radius: var(--echoes-border-radius-400);
    outline: var(--echoes-color-focus-default) solid var(--echoes-focus-border-width-default);
    outline-offset: -2px;
  }

  &:hover {
    background-color: var(--echoes-color-background-default-hover);
    border-radius: 0;
    outline: none;
  }

  /* when the item is clicked */
  &:active {
    background-color: var(--echoes-color-background-default-active);
  }

  &[data-disabled] {
    background-color: var(--echoes-color-background-default);
    color: var(--echoes-color-text-disabled);
    cursor: default;
  }
`;
