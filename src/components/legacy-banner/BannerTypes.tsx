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

import { TextNodeOptional } from '~types/utils';
import { BannerVariety } from '../layout';

export interface LegacyBannerProps {
  /**
   * The content to be displayed in the banner, keep it short and concise. It can't break into multiple lines and will be ellipsized if too long.
   */
  children: TextNodeOptional;
  className?: string;
  /**
   * Set to true to disable the follow horizontal scroll behavior of the banner.
   */
  disableFollowScroll?: boolean;
  /**
   * Function that will be called when the dismiss button is clicked, the dismiss button is only showed if this function is defined.
   */
  onDismiss?: VoidFunction | ((event: React.MouseEvent<HTMLButtonElement>) => Promise<void>);
  /**
   * Prefix text for screen readers to announce before the banner content. Optional since a default value is provided.
   */
  screenReaderPrefix?: TextNodeOptional;
  /**
   * The variety of banner to display, controls the styling and icon.
   */
  variety: `${BannerVariety}`;
  /**
   * Custom z-index for the banner, defaults to 1.
   */
  zIndex?: number;
}
