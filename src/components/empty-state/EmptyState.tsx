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

import { type ReactNode, type Ref } from 'react';
import { isDefined } from '~common/helpers/types';
import type { TextNode } from '~types/utils';
import { Heading, type HeadingProps, type HeadingSize, Text } from '../typography';
import {
  EmptyStateActionsGroup,
  EmptyStateGraphicContent,
  EmptyStateGraphicWrapper,
  EmptyStateRoot,
  EmptyStateTextGroup,
} from './EmptyStateStyles';

export interface EmptyStateProps {
  /**
   * Optional primary action displayed below the text block.
   */
  action?: ReactNode;
  /**
   * Optional CSS class name applied to the root element.
   */
  className?: string;
  /**
   * Graphic displayed inside the neutral wrapper.
   * Echoes icons passed here will inherit the default icon color from the component.
   */
  graphic: ReactNode;
  /**
   * Optional link displayed below the action.
   */
  link?: ReactNode;
  /**
   * React ref forwarded to the root element.
   */
  ref?: Ref<HTMLDivElement>;
  /**
   * Supporting body text.
   */
  text: TextNode;
  /**
   * Main title text.
   */
  title: TextNode;
  /**
   * Semantic heading element used for the title.
   * @defaultValue 'h2'
   */
  titleAs?: `${HeadingProps['as']}`;
  /**
   * Visual heading size used for the title.
   * @defaultValue 'large'
   */
  titleSize?: `${HeadingSize}`;
}

export function EmptyState(props: Readonly<EmptyStateProps>) {
  const {
    title,
    text,
    graphic,
    titleAs = 'h2',
    titleSize = 'large',
    action,
    link,
    className,
    ref,
    ...restProps
  } = props;

  return (
    <EmptyStateRoot className={className} ref={ref} {...restProps}>
      <EmptyStateGraphicWrapper data-testid="empty-state-graphic-wrapper">
        <EmptyStateGraphicContent data-testid="empty-state-graphic-content">
          {graphic}
        </EmptyStateGraphicContent>
      </EmptyStateGraphicWrapper>

      <EmptyStateTextGroup>
        <Heading as={titleAs} hasMarginBottom={false} size={titleSize}>
          {title}
        </Heading>

        <Text as="p" isSubtle>
          {text}
        </Text>
      </EmptyStateTextGroup>

      {(isDefined(action) || isDefined(link)) && (
        <EmptyStateActionsGroup>
          {isDefined(action) && action}
          {isDefined(link) && link}
        </EmptyStateActionsGroup>
      )}
    </EmptyStateRoot>
  );
}

EmptyState.displayName = 'EmptyState';
