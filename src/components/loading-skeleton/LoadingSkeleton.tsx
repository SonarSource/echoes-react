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

import { ReactNode } from 'react';
import {
  StyledLoadingSkeletonText,
  StyledLoadingSkeletonTextLastParagraphLine,
  StyledLoadingSkeletonWrapper,
  StyledLoadingSkeletonWrapperDisk,
  StyledParagraphWrapper,
} from './LoadingSkeletonStyles';
import { LoadingSkeletonVariety } from './LoadingSkeletonTypes';

export interface LoadingSkeletonProps {
  className?: string;
  /**
   * Wrapped components will be hidden when isLoading is true (which is the default value).
   * If variety is not Text or Paragraph, the LoadingSkeleton will match the size of its child.
   */
  children?: ReactNode;
  /**
   * Displays the skeleton if `true`.
   * Displays its children if `false`.
   * @default true
   */
  isLoading?: boolean;
  /**
   * The type of skeleton. The varieties fall in two categories:
   * - text: Text or Paragraph, meant as a placeholder for text (either a label/heading or a paragraph of text). They are auto-sized according to the font size and line-height.
   * - shapes: Rectangle or Disk. These are meant to wrap components and are auto-sized to their child's dimensions.
   */
  variety: `${LoadingSkeletonVariety}`;
}

/**
 * Placeholder to display while we wait for data to be available.
 * This can be used in 3 ways:
 *
 * 1) For text, place the LoadingSkeleton inside the text component (i.e. Text, Heading, ...), but around the contents.
 * It will inherit the size of the font. This works for variety 'text' & 'paragraph'.
 * ```
 *  <Text size='sm'>
 *    <LoadingSkeleton isLoading={loading} variety='paragraph'>
 *      {stringDataThatNeedsLoading}
 *    </LoadingSkeleton>
 *  </Text>
 * ```
 *
 * 2) Wrap components to have the LoadingSkeleton inherit its size (if already known).
 * Works perfectly for fixed-size components whose state depends on async data.
 *
 * ```
 *  <LoadingSkeleton isLoading={loading} variety='rectangle'>
 *    <RatingBadge rating={rating} />
 *  </LoadingSkeleton>
 * ```
 *
 * 3) You can build a loading screen or component with standalone LoadingSkeletons
 * ```
 * <div>
 *   <div>
 *     <LoadingSkeleton className='sw-mr-50 sw-w-200 sw-h-200' variety='disk' />
 *     <LoadingSkeleton className='sw-w-300 sw-h-200' variety='rectangle' />
 *   </div>
 *
 *   <LoadingSkeleton className='sw-mt-50 sw-w-500 sw-h-300' variety='rectangle' />
 * </div>
 * ```
 *
 * ⚠️ Accessibility ⚠️
 *
 * LoadingSkeletons are `aria-hidden`. A11y must be handled outside of this component, typically by using a LoadingContainer.
 * Check out LoadingContainer's tsdoc for more information.
 */
export function LoadingSkeleton(props: Readonly<LoadingSkeletonProps>) {
  const { children, isLoading = true, variety, ...radixProps } = props;

  if (!isLoading) {
    return children;
  }

  const commonProps = { ...radixProps, 'aria-hidden': true };

  switch (variety) {
    case LoadingSkeletonVariety.Text:
      return <StyledLoadingSkeletonText {...commonProps} />;

    case LoadingSkeletonVariety.Paragraph:
      return (
        <StyledParagraphWrapper {...commonProps}>
          <StyledLoadingSkeletonText />
          <StyledLoadingSkeletonText />
          <StyledLoadingSkeletonTextLastParagraphLine />
        </StyledParagraphWrapper>
      );

    case LoadingSkeletonVariety.Disk:
      return (
        <StyledLoadingSkeletonWrapperDisk {...commonProps}>
          {children}
        </StyledLoadingSkeletonWrapperDisk>
      );

    case LoadingSkeletonVariety.Rectangle:
    default:
      return (
        <StyledLoadingSkeletonWrapper {...commonProps}>{children}</StyledLoadingSkeletonWrapper>
      );
  }
}

LoadingSkeleton.displayName = 'LoadingSkeleton';
