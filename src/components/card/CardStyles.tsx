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

import { TextSize } from '../typography';
import { CardSize } from './CardRoot';

const HEADER_PADDING_MAP = {
  [CardSize.Small]: {
    vertical: 'var(--echoes-dimension-space-100)',
    horizontal: 'var(--echoes-dimension-space-150)',
  },
  [CardSize.Medium]: {
    vertical: 'var(--echoes-dimension-space-150)',
    horizontal: 'var(--echoes-dimension-space-200)',
  },
  [CardSize.Large]: {
    vertical: 'var(--echoes-dimension-space-200)',
    horizontal: 'var(--echoes-dimension-space-300)',
  },
};

// Text size mapping based on card size
export const TEXT_SIZE_MAP: Record<CardSize, TextSize> = {
  [CardSize.Small]: TextSize.Small,
  [CardSize.Medium]: TextSize.Default,
  [CardSize.Large]: TextSize.Default,
};

// Header height mapping based on card size
const HEADER_HEIGHT_MAP: Record<CardSize, string> = {
  [CardSize.Small]: '36px',
  [CardSize.Medium]: '45px',
  [CardSize.Large]: '58px',
};

// Header level mapping for semantic heading levels
export const HEADER_LEVEL_MAP: Record<CardSize, 'h2' | 'h3' | 'h4'> = {
  [CardSize.Small]: 'h4',
  [CardSize.Medium]: 'h3',
  [CardSize.Large]: 'h2',
};

// Body padding based on card size
export const BODY_PADDING_MAP = {
  [CardSize.Small]: 'var(--echoes-dimension-space-150)',
  [CardSize.Medium]: 'var(--echoes-dimension-space-200)',
  [CardSize.Large]: 'var(--echoes-dimension-space-300)',
};

export const CARD_HEADER_STYLES = {
  [CardSize.Small]: {
    'box-sizing': 'border-box',
    padding: `${HEADER_PADDING_MAP[CardSize.Small].vertical} ${HEADER_PADDING_MAP[CardSize.Small].horizontal}`,
    'min-height': HEADER_HEIGHT_MAP[CardSize.Small],
  },
  [CardSize.Medium]: {
    'box-sizing': 'border-box',
    padding: `${HEADER_PADDING_MAP[CardSize.Medium].vertical} ${HEADER_PADDING_MAP[CardSize.Medium].horizontal}`,
    'min-height': HEADER_HEIGHT_MAP[CardSize.Medium],
  },
  [CardSize.Large]: {
    'box-sizing': 'border-box',
    padding: `${HEADER_PADDING_MAP[CardSize.Large].vertical} ${HEADER_PADDING_MAP[CardSize.Large].horizontal}`,
    'min-height': HEADER_HEIGHT_MAP[CardSize.Large],
  },
};
