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
import { forwardRef, MouseEventHandler, ReactNode, useCallback } from 'react';
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

type FunctionChild = (data: {
  getStyledItemContents: ({ label }: { label: ReactNode }) => ReactNode;
}) => ReactNode;

type Props = Omit<DropdownMenuItemBaseProps, 'children'> & {
  children: ReactNode | FunctionChild;
};

export const DropdownMenuItemBase = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
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
    ...radixProps
  } = props;

  let checkMarkOrPlaceHolder: ReactNode = null;

  if (isCheckable) {
    checkMarkOrPlaceHolder = isChecked ? (
      <StyledIconCheck color="echoes-color-icon-selected" />
    ) : (
      <CheckmarkPlaceholder />
    );
  }

  const getStyledItemContents = useCallback(
    ({ label }: { label: ReactNode }) => (
      <>
        <StyledLeftHandSide>
          {checkMarkOrPlaceHolder}

          {prefix && <StyledPrefix>{prefix}</StyledPrefix>}

          <StyledLabelAndHelpText>
            <StyledLabel>{label}</StyledLabel>

            <StyledHelpText isDisabled={isDisabled}>{helpText}</StyledHelpText>
          </StyledLabelAndHelpText>
        </StyledLeftHandSide>

        <StyledSuffix>{suffix}</StyledSuffix>
      </>
    ),
    [checkMarkOrPlaceHolder, helpText, isDisabled, prefix, suffix],
  );

  const isItemWrapped = typeof children === 'function';

  const itemContainer = isItemWrapped
    ? children({ getStyledItemContents })
    : getStyledItemContents({ label: children });

  return (
    <StyledRadixDropdownMenuItem
      {...radixProps}
      aria-label={ariaLabel}
      {...(isItemWrapped ? { asChild: true } : {})}
      className={className}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      ref={ref}>
      {itemContainer}
    </StyledRadixDropdownMenuItem>
  );
});
DropdownMenuItemBase.displayName = 'DropdownMenu.ItemBase';

export function isDropdownMenuItemComponent(node: any): boolean {
  return Boolean(node?.type?.displayName?.includes('DropdownMenu.Item'));
}

const StyledIconCheck = styled(IconCheck)`
  font-size: var(--echoes-font-size-20);
`;

const CheckmarkPlaceholder = styled(StyledIconCheck)`
  visibility: hidden;
`;

const StyledPrefix = styled.span`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
`;

const StyledLeftHandSide = styled.div`
  align-items: center;
  column-gap: var(--echoes-dimension-space-100);
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-start;
`;

const StyledLabelAndHelpText = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  row-gap: var(---echoes-dimension-space-25);
`;

const StyledLabel = styled.span`
  &,
  * {
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const StyledHelpText = styled.span<{ isDisabled?: boolean }>`
  color: ${(props) =>
    props.isDisabled ? 'var(--echoes-color-text-disabled)' : 'var(--echoes-color-text-subdued)'};
  font: var(--echoes-typography-others-helper-text);
`;

const StyledSuffix = styled.span`
  align-items: center;
  color: var(--echoes-color-text-subdued);
  display: flex;
  flex: 0 0 auto;
  justify-content: flex-end;
`;

const StyledRadixDropdownMenuItem = styled(radixDropdownMenu.Item)`
  background-color: var(--echoes-color-background-default);
  color: var(--echoes-color-text-default);
  font: var(--echoes-typography-text-default-regular);

  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: var(--echoes-dimension-space-100);
  padding: var(--echoes-dimension-space-100) var(--echoes-dimension-space-150);

  cursor: pointer;

  * {
    overflow: hidden;
  }

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
