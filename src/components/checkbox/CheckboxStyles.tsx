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
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { cssVar } from '~utils/design-tokens';
import { FormFieldLabel } from '../form/FormFieldLabel';
import { Spinner } from '../spinner';

export const CheckboxContainer = styled.span`
  display: inline-flex;
  vertical-align: top;

  &[data-disabled] {
    pointer-events: none;
  }
`;
CheckboxContainer.displayName = 'CheckboxContainer';

export const CheckboxInnerContainer = styled.span`
  display: flex;
`;
CheckboxInnerContainer.displayName = 'CheckboxInnerContainer';

export const CheckboxSpinner = styled(Spinner)`
  margin: ${cssVar('dimension-space-25')} 0;
`;
CheckboxSpinner.displayName = 'CheckboxSpinner';

export const CheckboxLabelWrapper = styled.span`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: ${cssVar('dimension-space-100')};
`;
CheckboxLabelWrapper.displayName = 'CheckboxLabelWrapper';

export const CheckboxLabel = styled(FormFieldLabel)`
  color: ${cssVar('checkbox-colors-foreground-default')};
  font: ${cssVar('typography-others-label-medium')};
`;
CheckboxLabel.displayName = 'CheckboxLabel';

export const CheckboxIndicator = styled(RadixCheckbox.Indicator)`
  align-items: center;
  display: flex;
  height: ${cssVar('dimension-height-400')};
  justify-content: center;
  line-height: 0;
  width: ${cssVar('dimension-width-200')};
`;
CheckboxIndicator.displayName = 'CheckboxIndicator';

export const styleCheckboxRootBase = styled.div`
  color: ${cssVar('checkbox-colors-foreground-selected')};
  background-color: ${cssVar('checkbox-colors-background-default')};
  border: ${cssVar('border-width-default')} solid ${cssVar('checkbox-colors-border-default')};

  height: ${cssVar('dimension-height-400')};
  width: ${cssVar('dimension-width-200')};
  border-radius: ${cssVar('border-radius-200')};
  margin: ${cssVar('dimension-space-25')} 0;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`.withComponent;

export const CheckboxRoot = styled(styleCheckboxRootBase(RadixCheckbox.Root))`
  &:focus,
  &:focus-visible {
    outline: ${cssVar('checkbox-colors-focus-ring')} solid ${cssVar('focus-border-width-default')};
    outline-offset: ${cssVar('focus-border-offset-default')};
  }

  &[aria-disabled='true'] {
    color: ${cssVar('checkbox-colors-foreground-disabled')};
    background-color: ${cssVar('checkbox-colors-background-disabled')};
    border-color: ${cssVar('checkbox-colors-border-disabled')};

    &[aria-checked='true'],
    &[aria-checked='mixed'] {
      background-color: ${cssVar('checkbox-colors-background-disabled')};
      border-color: ${cssVar('checkbox-colors-border-disabled')};
    }
  }

  &:not([aria-disabled='true']) {
    &:hover {
      background-color: ${cssVar('checkbox-colors-background-hover')};
      border-color: ${cssVar('checkbox-colors-border-hover')};
    }

    &[aria-checked='true'],
    &[aria-checked='mixed'] {
      background-color: ${cssVar('checkbox-colors-background-selected')};
      border-color: ${cssVar('checkbox-colors-background-selected')};

      &:hover {
        background-color: ${cssVar('checkbox-colors-background-selected-hover')};
        border-color: ${cssVar('checkbox-colors-background-selected-hover')};
      }
    }

    &[data-error] {
      border-color: ${cssVar('checkbox-colors-border-error')};
    }
  }
`;
CheckboxRoot.displayName = 'CheckboxRoot';
