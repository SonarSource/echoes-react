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
import { forwardRef, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button } from '../buttons';
import { IconChevronLeft, IconChevronRight } from '../icons';
import { PaginationProps } from './PaginationTypes';
import { computePages } from './utils';

import { cssVar } from '~utils/design-tokens';

/**
 * This component shows the current page and buttons to move to other pages
 */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>((props, ref) => {
  const { isDisabled = false, onChange, page, totalPages, ...radixProps } = props;

  const intl = useIntl();

  const handlePrevious = useCallback(() => {
    if (page > 1) {
      onChange(page - 1);
    }
  }, [onChange, page]);

  const handleNext = useCallback(() => {
    if (page < totalPages) {
      onChange(page + 1);
    }
  }, [onChange, page, totalPages]);

  const pages = computePages({ page, totalPages });

  return (
    <PaginationWrapper ref={ref} {...radixProps}>
      <PaginationButton
        ariaLabel={intl.formatMessage({
          id: 'pagination.previous_page',
          defaultMessage: 'Previous page',
          description: 'ARIA-label for the pagination button that takes you to the previous page',
        })}
        isDisabled={isDisabled || page <= 1}
        onClick={handlePrevious}
        prefix={<IconChevronLeft />}
        size="medium"
        variety="primary-ghost">
        <FormattedMessage
          defaultMessage="Previous"
          description="Label for the pagination button that takes you to the previous page"
          id="pagination.previous"
        />
      </PaginationButton>

      {pages.map((p) =>
        p.includes('ellipsis') ? (
          <EllipsisIndicator key={p}>...</EllipsisIndicator>
        ) : (
          <PaginationButton
            aria-current={p === `${page}` ? 'page' : undefined}
            ariaLabel={intl.formatMessage(
              {
                id: 'pagination.page_x',
                defaultMessage: 'page {page}',
                description: 'ARIA-label for page buttons',
              },
              { page: p },
            )}
            isDisabled={isDisabled}
            key={p}
            onClick={() => onChange(parseInt(p, 10))}
            size="medium"
            variety={p === `${page}` ? 'primary' : 'default-ghost'}>
            {p}
          </PaginationButton>
        ),
      )}

      <PaginationButton
        ariaLabel={intl.formatMessage({
          id: 'pagination.next_page',
          defaultMessage: 'Next page',
          description: 'ARIA-label for the pagination button that takes you to the next page',
        })}
        isDisabled={isDisabled || page >= totalPages}
        onClick={handleNext}
        size="medium"
        suffix={<IconChevronRight />}
        variety="primary-ghost">
        <FormattedMessage
          defaultMessage="Next"
          description="Label for the pagination button that takes you to the next page"
          id="pagination.next"
        />
      </PaginationButton>
    </PaginationWrapper>
  );
});

Pagination.displayName = 'Pagination';

const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${cssVar('dimension-space-100')};
`;
PaginationWrapper.displayName = 'PaginationWrapper';

const PaginationButton = styled(Button)`
  font-weight: ${cssVar('font-weight-regular')};
  justify-content: center;
  min-width: ${cssVar('sizes-buttons-medium')};
`;
PaginationButton.displayName = 'PaginationButton';

const EllipsisIndicator = styled.div`
  display: flex;
  align-items: center;

  box-sizing: border-box;
  height: ${cssVar('sizes-buttons-medium')};
  width: ${cssVar('sizes-buttons-medium')};
  padding: ${cssVar('dimension-space-75')} ${cssVar('dimension-space-150')};
  font: ${cssVar('typography-text-default-regular')};
`;
EllipsisIndicator.displayName = 'EllipsisIndicator';
