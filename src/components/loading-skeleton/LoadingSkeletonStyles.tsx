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

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { cssVar } from '~utils/design-tokens';
import { Label } from '../typography';
import { StyledHeading } from '../typography/Heading';

export const DEFAULT_LOADING_SKELETON_WIDTH_LABEL = '96px';
export const DEFAULT_LOADING_SKELETON_WIDTH_HEADING = '176px';
export const LAST_PARAGRAPH_LINE_WIDTH = '40%';

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const LoadingSkeletonBaseStyle = styled.div`
  background-color: ${cssVar('color-background-neutral-subtle-default')};

  border-radius: ${cssVar('border-radius-200')};

  position: relative; // necessary so the ::after pseudoelement doesn't misbehave with the container
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${cssVar('color-surface-default')} 50%,
      transparent 100%
    );
    animation: ${shimmer} 2s infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

export const StyledLoadingSkeletonText = styled(LoadingSkeletonBaseStyle)`
  height: 1em;
  margin-block: calc((1lh - 1em) / 2); // set margins to match the line-height
  min-width: ${DEFAULT_LOADING_SKELETON_WIDTH_LABEL};
  max-width: ${cssVar('sizes-typography-max-width-default')};

  ${Label} & {
    width: ${DEFAULT_LOADING_SKELETON_WIDTH_LABEL};
  }

  ${StyledHeading} & {
    width: ${DEFAULT_LOADING_SKELETON_WIDTH_HEADING};
  }
`;

export const StyledLoadingSkeletonTextLastParagraphLine = styled(StyledLoadingSkeletonText)`
  width: ${LAST_PARAGRAPH_LINE_WIDTH};
`;

export const StyledLoadingSkeletonWrapper = styled(LoadingSkeletonBaseStyle)`
  width: fit-content;
  height: fit-content;

  // Hide the child
  & > * {
    visibility: hidden;
  }
`;

export const StyledLoadingSkeletonWrapperDisk = styled(StyledLoadingSkeletonWrapper)`
  border-radius: ${cssVar('border-radius-full')};
`;

export const StyledParagraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-75')};
`;
