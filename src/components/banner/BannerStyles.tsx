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
import { truncate } from '~common/helpers/styles';
import { IconCheckCircle, IconError, IconInfo, IconWarning } from '../icons';
import { BannerVariety } from './BannerTypes';

import { cssVar } from '~utils/design-tokens';

export const BANNER_TYPE_STYLES = {
  [BannerVariety.Danger]: {
    '--banner-color': cssVar('color-text-danger'),
    '--banner-background': cssVar('color-background-danger-weak-default'),
  },
  [BannerVariety.Info]: {
    '--banner-color': cssVar('color-text-info'),
    '--banner-background': cssVar('color-background-info-weak-default'),
  },
  [BannerVariety.Success]: {
    '--banner-color': cssVar('color-text-success'),
    '--banner-background': cssVar('color-background-success-weak-default'),
  },
  [BannerVariety.Warning]: {
    '--banner-color': cssVar('color-text-warning'),
    '--banner-background': cssVar('color-background-warning-weak-default'),
  },
};

export const BANNER_TYPE_ICONS = {
  [BannerVariety.Danger]: {
    icon: IconError,
    iconColor: 'echoes-color-icon-danger' as const,
  },
  [BannerVariety.Info]: {
    icon: IconInfo,
    iconColor: 'echoes-color-icon-info' as const,
  },
  [BannerVariety.Success]: {
    icon: IconCheckCircle,
    iconColor: 'echoes-color-icon-success' as const,
  },
  [BannerVariety.Warning]: {
    icon: IconWarning,
    iconColor: 'echoes-color-icon-warning' as const,
  },
};

// The BannerSkeleton is used to make sure the banner that is fixed position still takes up space in the layout
export const BannerSkeleton = styled.div`
  height: ${cssVar('banner-sizes-height')};
`;
BannerSkeleton.displayName = 'BannerSkeleton';

// The BannerWrapper is in fixed position to ensure it stays a the top of the viewport even when scrolling
// It also provides a stable non transparent background color for the BannerInner that has a transparent background when in dark mode
export const BannerWrapper = styled.div`
  position: fixed;
  background-color: ${cssVar('color-surface-default')};

  height: inherit;
  width: 100%;
  min-width: ${cssVar('layout-sizes-min-width-default')};
  max-width: ${cssVar('layout-sizes-max-width-full')};

  // Not great but should be revisted when Echoes provide a framework for z-indexes
  z-index: var(--banner-z-index);
`;
BannerWrapper.displayName = 'BannerWrapper';

export const BannerInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${cssVar('dimension-space-300')};

  box-sizing: border-box;
  height: inherit;
  width: 100%;
  padding: ${cssVar('dimension-space-75')} ${cssVar('dimension-space-200')};
  overflow: hidden;

  background-color: var(--banner-background);
  color: var(--banner-color);
  font: ${cssVar('typography-text-default-regular')};
`;
BannerInner.displayName = 'BannerInner';

export const BannerContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-200')};
  width: 100%;

  ${truncate}
`;
BannerContent.displayName = 'BannerContent';

export const BannerContentText = styled.div`
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-50')};
  padding: ${cssVar('dimension-space-50')};
  margin-left: calc(-1 * ${cssVar('dimension-space-50')});

  ${truncate}
`;
BannerContentText.displayName = 'BannerContentText';
