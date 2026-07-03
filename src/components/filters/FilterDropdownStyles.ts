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

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import * as RadixPopover from '@radix-ui/react-popover';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { cssVar } from '~utils/design-tokens';
import { stylePopoverContentBase } from '../popover/PopoverStyles';

export const filterDropdownRowStyles = css`
  border: none;
  border-radius: ${cssVar('border-radius-400')};
  text-align: left;
  width: 100%;
`;

export const StyledFilterContent = styled(stylePopoverContentBase(RadixPopover.Content))`
  display: flex;
  flex-direction: column;
  min-height: ${cssVar('filter-dropdown-sizes-min-height-default')};
  overflow: visible;
  width: ${cssVar('sizes-overlays-width-default')};
`;
StyledFilterContent.displayName = 'StyledFilterContent';

export const StyledFilterLayout = styled.div`
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
`;
StyledFilterLayout.displayName = 'StyledFilterLayout';

export const StyledLeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-50')};
  box-sizing: border-box;
  flex-shrink: 0;
  border-right: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  padding: ${cssVar('dimension-space-100')};
  width: ${cssVar('filter-dropdown-sizes-left-panel-width-default')};
  overflow-y: auto;
`;
StyledLeftPanel.displayName = 'StyledLeftPanel';

export const StyledRightPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
`;
StyledRightPanel.displayName = 'StyledRightPanel';

export const StyledSearchHeader = styled.div`
  box-sizing: border-box;
  padding: ${cssVar('dimension-space-150')};
`;
StyledSearchHeader.displayName = 'StyledSearchHeader';

export const StyledItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-50')};
  overflow-y: auto;
  padding: ${cssVar('dimension-space-100')};
`;
StyledItemsList.displayName = 'StyledItemsList';

export const StyledItemsListRadioGroup = StyledItemsList.withComponent(RadixRadioGroup.Root);
StyledItemsListRadioGroup.displayName = 'StyledItemsListRadioGroup';

export const StyledCustomContent = styled.div`
  flex: 1 1 auto;
  overflow: auto;
`;
StyledCustomContent.displayName = 'StyledCustomContent';

export const StyledSpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
`;
StyledSpinnerWrapper.displayName = 'StyledSpinnerWrapper';

export const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: ${cssVar('dimension-space-150')} ${cssVar('dimension-space-250')};
`;
StyledFooter.displayName = 'StyledFooter';
