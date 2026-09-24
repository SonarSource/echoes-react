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
import { ReactNode, Ref, useId } from 'react';
import { FormattedMessage } from 'react-intl';
import { isDefined } from '~common/helpers/types';
import { cssVar } from '~utils/design-tokens';
import { Button, ButtonSize, ButtonVariety } from '../buttons';
import { Text } from '../typography';

export interface ToolbarProps {
  /**
   * Accessible label for the toolbar group.
   * Example: `"Issues filters and sorting"`.
   */
  ariaLabel?: string;

  /**
   * Optional CSS class name applied to the root element.
   */
  className?: string;

  /**
   * Content displayed at the trailing end of the top row (e.g. action buttons, item count).
   * Automatically pushed to the right.
   */
  datasetControls?: ReactNode;

  /**
   * Filter controls (e.g., filter dropdowns) displayed after the search input.
   */
  filterControls?: ReactNode;

  /**
   * Array of active filter tags displayed in the applied-filters row.
   * An empty array hides the tags and shows `labelEmptyFilterTags` instead (when configured).
   * An array of FilterTag components is expected here.
   */
  filterTags?: ReactNode[];

  /**
   * Accessible label for the "Clear filters" button.
   * @defaultValue "Clear filters"
   */
  labelClearAll?: string;

  /**
   * Text displayed in the applied-filters row when `filterControls` is defined but
   * `filterTags` is empty or not provided.
   * @defaultValue not displayed
   */
  labelEmptyFilterTags?: string;

  /**
   * Static label displayed before the active filter tags, e.g. `"Applied filters (3)"`.
   * Only shown when `filterTags` is non-empty. This is a static string — to include the
   * active count, build it from your `filterTags` length before passing it.
   * @defaultValue `"Applied filters ({count})"` where `{count}` is `filterTags.length`
   */
  labelFilterTags?: string;

  /**
   * Called when the user clicks the "Clear filters" button.
   * The button is only shown when this is provided and `filterTags` is non-empty.
   */
  onClearAll?: () => void;

  /** React ref forwarded to the root element. */
  ref?: Ref<HTMLDivElement>;

  /**
   * Search input displayed after the selection checkbox in the top row.
   */
  searchInput?: ReactNode;

  /**
   * Select-all checkbox displayed at the very start of the top row.
   */
  selectAllControl?: ReactNode;

  /**
   * Sorting control displayed after the filter controls.
   */
  sortControls?: ReactNode;
}

/**
 * Toolbar is a horizontal container implementing the filtering pattern.
 * It displays filter controls in a top row and active FilterTag components in a second row.
 */
export function Toolbar(props: Readonly<ToolbarProps>) {
  const {
    ariaLabel,
    className,
    datasetControls,
    filterTags = [],
    filterControls,
    labelClearAll,
    labelEmptyFilterTags,
    labelFilterTags,
    onClearAll,
    ref,
    searchInput,
    selectAllControl,
    sortControls,
    ...restProps
  } = props;

  const filterTagsLabelId = useId();
  const hasActiveTags = filterTags.length > 0;
  const hasEmptyFilterTagsLabel = isDefined(labelEmptyFilterTags) && isDefined(filterControls);

  return (
    <ToolbarWrapper
      {...restProps}
      aria-label={ariaLabel}
      className={className}
      ref={ref}
      // role="toolbar" would be more semantically correct, but it requires implementing
      // roving tabindex (arrow key navigation), which conflicts with the mixed controls
      // (text input, dropdowns) this toolbar contains.
      role="group">
      <ToolbarRow>
        {selectAllControl}
        {isDefined(searchInput) && <ToolbarSearchWrapper>{searchInput}</ToolbarSearchWrapper>}
        {filterControls}
        {sortControls}
        {isDefined(datasetControls) && (
          <ToolbarDatasetControlsWrapper>{datasetControls}</ToolbarDatasetControlsWrapper>
        )}
      </ToolbarRow>

      {hasActiveTags && (
        <ToolbarRow aria-labelledby={filterTagsLabelId} role="group">
          <ToolbarFilterLabel id={filterTagsLabelId} isSubtle>
            {labelFilterTags ?? (
              <FormattedMessage
                defaultMessage="Applied filters ({count})"
                description="Label shown before active filter tags, indicating how many are applied"
                id="toolbar.filter-tags-count"
                values={{ count: filterTags.length }}
              />
            )}
          </ToolbarFilterLabel>

          {filterTags}

          {isDefined(onClearAll) && (
            <Button
              onClick={onClearAll}
              size={ButtonSize.Medium}
              variety={ButtonVariety.PrimaryGhost}>
              {labelClearAll ?? (
                <FormattedMessage
                  defaultMessage="Clear filters"
                  description="Label for the button that clears all active filters in the toolbar"
                  id="toolbar.clear-all"
                />
              )}
            </Button>
          )}
        </ToolbarRow>
      )}
      {!hasActiveTags && hasEmptyFilterTagsLabel && (
        <ToolbarFilterLabel isSubtle>{labelEmptyFilterTags}</ToolbarFilterLabel>
      )}
    </ToolbarWrapper>
  );
}

Toolbar.displayName = 'Toolbar';

const ToolbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-150')};
  margin-bottom: ${cssVar('dimension-space-200')};
  width: 100%;
`;

ToolbarWrapper.displayName = 'ToolbarWrapper';

const ToolbarRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${cssVar('dimension-space-100')};
  width: 100%;
`;

ToolbarRow.displayName = 'ToolbarRow';

const ToolbarSearchWrapper = styled.div`
  flex: 0 0 auto;
  min-width: 0;

  // Only a full-width search input should stretch to fill the available space.
  // SearchInput exposes its width mode through the data-width attribute.
  &:has([data-width='full']) {
    flex: 1 1 0;
    // 40% is a layout heuristic — no design token exists for this proportional cap.
    max-width: 40%;
    min-width: ${cssVar('sizes-form-field-medium')};
  }
`;

ToolbarSearchWrapper.displayName = 'ToolbarSearchWrapper';

const ToolbarDatasetControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-100')};
  margin-left: auto;
`;

ToolbarDatasetControlsWrapper.displayName = 'ToolbarDatasetControlsWrapper';

const ToolbarFilterLabel = styled(Text)`
  padding-top: ${cssVar('dimension-space-75')};
  padding-bottom: ${cssVar('dimension-space-75')};
`;

ToolbarFilterLabel.displayName = 'ToolbarFilterLabel';
