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
import * as RadioGroup from '@radix-ui/react-radio-group';
import { cssVar } from '~utils/design-tokens';
import { HelperText, Label } from '../typography';

export const RadioButtonOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
RadioButtonOptionWrapper.displayName = 'RadioButtonOptionWrapper';

export const styleRadioButtonInputBase = styled.div`
  appearance: none;
  cursor: pointer;
  background-color: ${cssVar('color-background-utility-transparent')};

  box-sizing: border-box;
  padding: 0;
  border: ${cssVar('border-width-default')} solid ${cssVar('color-border-bolder')};
  border-radius: ${cssVar('border-radius-full')};

  height: ${cssVar('dimension-height-400')};
  width: ${cssVar('dimension-width-200')};
  min-width: ${cssVar('dimension-width-200')};
`.withComponent;

export const RadioButtonInput = styled(styleRadioButtonInputBase(RadioGroup.Item))`
  &:hover {
    background-color: ${cssVar('color-surface-hover')};
  }

  &[data-error='true'] {
    border: ${cssVar('border-width-default')} solid ${cssVar('color-border-danger-default')};
  }

  &[data-state='checked'] {
    background-color: ${cssVar('color-background-selected-bold-default')};
    border-color: ${cssVar('color-background-selected-bold-default')};

    &:not(:disabled):hover {
      background-color: ${cssVar('color-background-selected-bold-hover')};
      border-color: ${cssVar('color-background-selected-bold-hover')};
    }
  }

  &:focus,
  &:focus-visible {
    outline: ${cssVar('color-focus-default')} solid ${cssVar('focus-border-width-default')};
    outline-offset: ${cssVar('focus-border-offset-default')};
  }

  &:disabled {
    cursor: default;
    background-color: ${cssVar('color-surface-disabled')};
    border-color: ${cssVar('color-border-disabled')};
  }
`;
RadioButtonInput.displayName = 'RadioButtonInput';

export const RadioButtonSelectionIndicator = styled(RadioGroup.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    content: '';
    display: block;

    box-sizing: border-box;
    height: ${cssVar('dimension-height-150')};
    width: ${cssVar('dimension-width-75')};
    border-radius: ${cssVar('border-radius-full')};

    background-color: ${cssVar('color-icon-on-color')};
  }

  &[data-disabled]::after {
    background-color: ${cssVar('color-icon-disabled')};
  }
`;
RadioButtonSelectionIndicator.displayName = 'RadioButtonSelectionIndicator';

export const RadioButtonLabelWrapper = styled.span`
  display: inline-flex;
  gap: ${cssVar('dimension-space-100')};
  align-items: center;
`;
RadioButtonLabelWrapper.displayName = 'RadioButtonLabelWrapper';

export const RadioButtonOptionLabel = styled(Label)`
  font: ${cssVar('typography-others-label-medium')};

  display: block;
  width: 100%;

  cursor: pointer;

  [data-disabled] > & {
    color: ${cssVar('color-text-disabled')};
    cursor: default;
  }
`;
RadioButtonOptionLabel.displayName = 'RadioButtonOptionLabel';

export const RadioButtonOptionHelpText = styled(HelperText)`
  margin-left: calc(${cssVar('dimension-space-200')} + ${cssVar('dimension-space-100')});

  &[data-disabled] {
    color: ${cssVar('color-text-disabled')};
  }
`;
RadioButtonOptionHelpText.displayName = 'RadioButtonOptionHelpText';
