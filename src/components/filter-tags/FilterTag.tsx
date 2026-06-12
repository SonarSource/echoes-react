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
import { ReactNode, Ref } from 'react';
import { truncate } from '~common/helpers/styles';
import { cssVar } from '~utils/design-tokens';
import { IconX } from '../icons/IconX';

export interface FilterTagProps {
  /**
   * The label content displayed inside the filter tag.
   */
  children: ReactNode;

  /**
   * Accessible label for the dismiss button. Should describe what filter will be removed,
   * e.g. "Remove severity filter".
   */
  labelDismiss: string;

  /**
   * Whether the filter tag and its dismiss button are disabled.
   * @defaultValue false
   */
  isDisabled?: boolean;

  /**
   * Called when the user clicks the dismiss button to remove the filter.
   */
  onDismiss: () => void;

  /**
   * Optional CSS class name applied to the root element.
   */
  className?: string;

  /** React ref forwarded to the root element. */
  ref?: Ref<HTMLDivElement>;
}

/**
 * FilterTag displays an active filter criterion with a dismiss button.
 * Use it to show currently applied filters that users can remove.
 */
export function FilterTag({
  children,
  labelDismiss,
  isDisabled = false,
  onDismiss,
  className,
  ref,
  ...otherProps
}: FilterTagProps) {
  return (
    <FilterTagWrapper {...otherProps} className={className} ref={ref}>
      <FilterTagLabel>{children}</FilterTagLabel>
      <FilterTagDismissButton
        aria-label={labelDismiss}
        disabled={isDisabled}
        onClick={onDismiss}
        type="button">
        <IconX />
      </FilterTagDismissButton>
    </FilterTagWrapper>
  );
}

FilterTag.displayName = 'FilterTag';

const FilterTagWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${cssVar('dimension-space-50')};

  max-width: ${cssVar('sizes-filter-tag-max-width-default')};

  padding: ${cssVar('dimension-space-50')} ${cssVar('dimension-space-100')}
    ${cssVar('dimension-space-50')} ${cssVar('dimension-space-150')};

  border: ${cssVar('color-border-bold')} solid ${cssVar('border-width-default')};
  border-radius: ${cssVar('border-radius-full')};

  background-color: ${cssVar('color-surface-default')};
`;

FilterTagWrapper.displayName = 'FilterTagWrapper';

const FilterTagLabel = styled.span`
  flex: 1 0 0;
  min-width: 0;

  font-family: ${cssVar('font-family-sans')};
  font-weight: ${cssVar('font-weight-semi-bold')};
  font-size: ${cssVar('font-size-10')};
  line-height: ${cssVar('line-height-10')};

  color: ${cssVar('color-text-default')};

  ${truncate}
`;

FilterTagLabel.displayName = 'FilterTagLabel';

const FilterTagDismissButton = styled.button`
  all: unset;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  border-radius: ${cssVar('border-radius-200')};

  background-color: ${cssVar('color-surface-default')};

  cursor: pointer;

  &:hover {
    background-color: ${cssVar('color-surface-hover')};
  }

  &:focus,
  &:focus-visible {
    background-color: ${cssVar('color-surface-active')};
  }

  &:focus-visible {
    outline: ${cssVar('color-focus-default')} solid ${cssVar('focus-border-width-default')};
    outline-offset: ${cssVar('focus-border-offset-default')};
  }

  &:disabled {
    color: ${cssVar('color-text-disabled')};
    background-color: ${cssVar('color-surface-default')};
    cursor: not-allowed;
    pointer-events: none;
  }
`;

FilterTagDismissButton.displayName = 'FilterTagDismissButton';
