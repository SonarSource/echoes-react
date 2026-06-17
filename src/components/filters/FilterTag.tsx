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
import { Ref } from 'react';
import { useIntl } from 'react-intl';
import { DismissButton } from '~common/components/DismissButton';
import { truncate } from '~common/helpers/styles';
import { cssVar } from '~utils/design-tokens';
import { Label } from '../typography';

export interface FilterTagProps {
  /**
   * The label content displayed inside the filter tag.
   */
  children: string;

  /**
   * Optional CSS class name applied to the root element.
   */
  className?: string;

  /**
   * Accessible label for the dismiss button. Should describe what filter will be removed,
   * e.g. "Remove severity filter".
   * @defaultValue "Remove {filter} filter" where {filter} is the children prop
   */
  labelDismiss?: string;

  /**
   * Called when the user clicks the dismiss button to remove the filter.
   */
  onDismiss: () => void;

  /** React ref forwarded to the root element. */
  ref?: Ref<HTMLDivElement>;
}

/**
 * FilterTag displays an active filter criterion with a dismiss button.
 * Use it to show currently applied filters that users can remove.
 */
export function FilterTag(props: Readonly<FilterTagProps>) {
  const { children, labelDismiss, onDismiss, className, ref, ...restProps } = props;
  const { formatMessage } = useIntl();

  return (
    <FilterTagWrapper {...restProps} className={className} ref={ref}>
      <FilterTagLabel as="span">{children}</FilterTagLabel>
      <DismissButton
        ariaLabel={
          labelDismiss ??
          formatMessage(
            {
              id: 'filter.tag.dismiss',
              defaultMessage: 'Remove {filter} filter',
              description:
                'Accessible label for the dismiss button of a filter tag, where {filter} is the name of the filter to be removed',
            },
            { filter: children },
          )
        }
        hasVisibleStateStyles
        onClick={onDismiss}
        size="small"
      />
    </FilterTagWrapper>
  );
}

FilterTag.displayName = 'FilterTag';

const FilterTagWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${cssVar('dimension-space-50')};

  max-width: ${cssVar('filter-tag-sizes-max-width-default')};

  padding: ${cssVar('dimension-space-50')} ${cssVar('dimension-space-100')}
    ${cssVar('dimension-space-50')} ${cssVar('dimension-space-150')};

  border: ${cssVar('border-width-default')} solid ${cssVar('color-border-bold')};
  border-radius: ${cssVar('border-radius-full')};

  background-color: ${cssVar('color-surface-default')};
`;

FilterTagWrapper.displayName = 'FilterTagWrapper';

const FilterTagLabel = styled(Label)`
  flex: 1 0 0;
  min-width: 0;

  font-size: ${cssVar('font-size-10')};
  line-height: ${cssVar('line-height-10')};

  ${truncate}
`;

FilterTagLabel.displayName = 'FilterTagLabel';
