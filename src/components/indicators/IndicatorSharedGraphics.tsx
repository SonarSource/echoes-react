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

import { INDICATOR_DEFAULT_COLOR } from './indicatorUtils';

export function IndicatorBaseRingPath() {
  return (
    <path
      d="M18 0C27.9411 0 36 7.92548 36 17.7021C36 25.023 31.4814 31.3056 25.0371 34L20.8018 31.1937C27.1913 29.9175 32 24.3625 32 17.7021C32 10.0981 25.732 3.93379 18 3.93379C10.2682 3.93402 4 10.0982 4 17.7021C4 24.2641 8.66858 29.7529 14.917 31.1342L10.7373 33.903C4.41396 31.1572 0 24.9368 0 17.7021C0 7.92562 8.05907 0.000227089 18 0Z"
      fill={INDICATOR_DEFAULT_COLOR}
    />
  );
}

/**
 * Shared default/undefined indicator graphic (question mark icon)
 * Used across multiple indicator components when no rating is provided
 */
export function IndicatorDefaultGraphic() {
  return (
    <>
      <IndicatorBaseRingPath />
      <path
        d="M14.0146 16.6952C14.0073 14.5504 15.7922 12.8057 18.0014 12.7984C20.2105 12.7911 22.0073 14.5239 22.0146 16.6688C22.0219 18.8136 20.237 20.5582 18.0279 20.5655C15.8187 20.5728 14.022 18.84 14.0146 16.6952Z"
        fill={INDICATOR_DEFAULT_COLOR}
      />
      <path
        d="M19.58 24.4078C19.5822 25.0541 18.8952 25.5804 18.0455 25.5832C17.1959 25.586 16.5053 25.0643 16.5031 24.418L16.468 14.1196C16.4658 13.4732 17.1528 12.947 18.0024 12.9442C18.8521 12.9414 19.5427 13.4631 19.5449 14.1094L19.58 24.4078Z"
        fill={INDICATOR_DEFAULT_COLOR}
      />
    </>
  );
}
