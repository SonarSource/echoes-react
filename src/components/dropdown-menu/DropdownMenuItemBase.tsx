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
import * as radixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { forwardRef, MouseEventHandler, ReactNode, useCallback } from 'react';
import { TextNode } from '~types/utils';
import { IconCheck } from '../icons/IconCheck';

import { cssVar } from '~utils/design-tokens';

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
  helpText?: TextNode;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

type FunctionChild = (data: {
  getStyledItemContents: ({ label }: { label: ReactNode }) => ReactNode;
}) => ReactNode;

type Props = Omit<DropdownMenuItemBaseProps, 'children'> & {
  as?: React.FC;
  children: ReactNode | FunctionChild;
};

export const DropdownMenuItemBase = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    ariaLabel,
    as,
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

  let MenuItemComponent = StyledRadixDropdownMenuItem;

  if (as) {
    MenuItemComponent = StyledRadixDropdownMenuItem.withComponent(as);
  }

  return (
    <MenuItemComponent
      aria-label={ariaLabel}
      // Everything above this line can be overridden by the `radixProps` object
      {...radixProps}
      {...(isItemWrapped ? { asChild: true } : {})}
      className={className}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      ref={ref}>
      {itemContainer}
    </MenuItemComponent>
  );
});
DropdownMenuItemBase.displayName = 'DropdownMenu.ItemBase';

export function isDropdownMenuItemComponent(node: any): boolean {
  return Boolean(node?.type?.displayName?.includes('DropdownMenu.Item'));
}

const StyledIconCheck = styled(IconCheck)`
  font-size: ${cssVar('font-size-20')};
`;
StyledIconCheck.displayName = 'StyledIconCheck';

const CheckmarkPlaceholder = styled(StyledIconCheck)`
  visibility: hidden;
`;
CheckmarkPlaceholder.displayName = 'CheckmarkPlaceholder';

const StyledPrefix = styled.span`
  align-items: center;
  display: flex;
  flex: 0 0 auto;
`;
StyledPrefix.displayName = 'StyledPrefix';

const StyledLeftHandSide = styled.div`
  align-items: center;
  column-gap: ${cssVar('dimension-space-100')};
  display: flex;
  min-width: 0; // Necessary for ellipsis
  flex: 1 1 auto;
  justify-content: flex-start;
`;
StyledLeftHandSide.displayName = 'StyledLeftHandSide';

const StyledLabelAndHelpText = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  row-gap: ${cssVar('dimension-space-25')};
`;
StyledLabelAndHelpText.displayName = 'StyledLabelAndHelpText';

const StyledLabel = styled.span`
  overflow: hidden;

  &,
  * {
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
StyledLabel.displayName = 'StyledLabel';

const StyledHelpText = styled.span<{ isDisabled?: boolean }>`
  color: ${(props) =>
    props.isDisabled ? cssVar('color-text-disabled') : cssVar('color-text-subtle')};
  font: ${cssVar('typography-others-helper-text')};
`;
StyledHelpText.displayName = 'StyledHelpText';

const StyledSuffix = styled.span`
  align-items: center;
  color: ${cssVar('color-text-subtle')};
  display: flex;
  flex: 0 0 auto;
  justify-content: flex-end;
`;
StyledSuffix.displayName = 'StyledSuffix';

const StyledRadixDropdownMenuItem = styled(radixDropdownMenu.Item)`
  background-color: ${cssVar('color-surface-default')};
  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-default-regular')};

  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: ${cssVar('dimension-space-100')};
  padding: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-150')};

  cursor: pointer;

  &:focus-visible {
    border-radius: ${cssVar('border-radius-400')};
    outline: ${cssVar('color-focus-default')} solid ${cssVar('focus-border-width-default')};
    outline-offset: -2px;
  }

  &:hover {
    background-color: ${cssVar('color-surface-hover')};
    border-radius: 0;
    outline: none;
  }

  /* when the item is clicked */
  &:active {
    background-color: ${cssVar('color-surface-active')};
  }

  &[data-disabled] {
    background-color: ${cssVar('color-surface-default')};
    color: ${cssVar('color-text-disabled')};
    cursor: default;
  }
`;
StyledRadixDropdownMenuItem.displayName = 'StyledRadixDropdownMenuItem';
