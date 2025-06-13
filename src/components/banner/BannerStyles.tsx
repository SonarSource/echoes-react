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
import { BannerType } from './BannerTypes';

export const BANNER_TYPE_STYLES = {
  [BannerType.Danger]: {
    '--banner-color': 'var(--echoes-color-text-danger-bold)',
    '--banner-background': 'var(--echoes-color-background-danger-weak-default)',
  },
  [BannerType.Info]: {
    '--banner-color': 'var(--echoes-color-text-info-bold)',
    '--banner-background': 'var(--echoes-color-background-info-weak-default)',
  },
  [BannerType.Success]: {
    '--banner-color': 'var(--echoes-color-text-success-bold)',
    '--banner-background': 'var(--echoes-color-background-success-weak-default)',
  },
  [BannerType.Warning]: {
    '--banner-color': 'var(--echoes-color-text-warning-bold)',
    '--banner-background': 'var(--echoes-color-background-warning-weak-default)',
  },
};

export const BANNER_TYPE_ICONS = {
  [BannerType.Danger]: {
    icon: IconError,
    iconColor: 'echoes-color-icon-danger' as const,
  },
  [BannerType.Info]: {
    icon: IconInfo,
    iconColor: 'echoes-color-icon-info' as const,
  },
  [BannerType.Success]: {
    icon: IconCheckCircle,
    iconColor: 'echoes-color-icon-success' as const,
  },
  [BannerType.Warning]: {
    icon: IconWarning,
    iconColor: 'echoes-color-icon-warning' as const,
  },
};

// The BannerSkeleton is used to make sure the banner that is fixed position still takes up space in the layout
export const BannerSkeleton = styled.div`
  height: var(--echoes-banner-sizes-height);
`;
BannerSkeleton.displayName = 'BannerSkeleton';

// The BannerWrapper is in fixed position to ensure it stays a the top of the viewport even when scrolling
// It also provides a stable non transparent background color for the BannerInner that has a transparent background when in dark mode
export const BannerWrapper = styled.div`
  position: fixed;
  background-color: var(--echoes-color-background-default);

  height: inherit;
  width: 100%;
  min-width: var(--echoes-layout-sizes-min-width-default);
  max-width: var(--echoes-layout-sizes-max-width-full);

  // Not great but should be revisted when Echoes provide a framework for z-indexes
  z-index: var(--banner-z-index);
`;
BannerWrapper.displayName = 'BannerWrapper';

export const BannerInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--echoes-dimension-space-300);

  box-sizing: border-box;
  height: inherit;
  width: 100%;
  padding: var(--echoes-dimension-space-75) var(--echoes-dimension-space-200);
  overflow: hidden;

  background-color: var(--banner-background);
  color: var(--banner-color);
  font: var(--echoes-typography-text-default-regular);
`;
BannerInner.displayName = 'BannerInner';

export const BannerContent = styled.div`
  display: flex;
  align-items: center;
  gap: var(--echoes-dimension-space-200);
  width: 100%;

  ${truncate}
`;
BannerContent.displayName = 'BannerContent';

export const BannerContentText = styled.div`
  display: flex;
  align-items: center;
  gap: var(--echoes-dimension-space-50);

  ${truncate}
`;
BannerContentText.displayName = 'BannerContentText';
