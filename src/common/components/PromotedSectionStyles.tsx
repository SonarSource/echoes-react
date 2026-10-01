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
import { cssVar } from '~utils/design-tokens';

export enum PromotedSectionVariety {
  /** Explicit AI, upgrade, upsell, pricing, or feature promotion. */
  Feature = 'feature',
  /** Frozen legacy highlighted treatment pending consumer audit. */
  Highlight = 'highlight',
  /** Neutral promotion without feature-color emphasis. */
  Neutral = 'neutral',
}

export const PROMOTED_SECTION_STYLES = {
  [PromotedSectionVariety.Feature]: {
    '--promoted-section-background-color': cssVar('promoted-feature-colors-background'),
    '--promoted-section-border': `${cssVar('border-width-default')} solid ${cssVar('promoted-feature-colors-border')}`,
  },

  [PromotedSectionVariety.Highlight]: {
    '--promoted-section-background-color': cssVar('promoted-section-colors-highlight-background'),
    '--promoted-section-border': `${cssVar('border-width-default')} solid ${cssVar('promoted-section-colors-highlight-border')}`,
  },

  [PromotedSectionVariety.Neutral]: {
    '--promoted-section-background-color': cssVar('promoted-section-colors-neutral-background'),
    '--promoted-section-border': `${cssVar('border-width-default')} solid ${cssVar('promoted-section-colors-neutral-border')}`,
  },
};

export const PromotedSectionMainStyles = styled.div`
  background-color: var(--promoted-section-background-color);
  border: var(--promoted-section-border);
  border-radius: ${cssVar('border-radius-400')};
  box-shadow: ${cssVar('shadow-resting')};
  padding: ${cssVar('dimension-space-200')};
`;
PromotedSectionMainStyles.displayName = 'PromotedSectionMainStyles';

export const PromotedSectionTextAndActions = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  gap: ${cssVar('dimension-space-150')};
`;
PromotedSectionTextAndActions.displayName = 'PromotedSectionTextAndActions';

export const PromotedSectionTextContainer = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-100')};
`;
PromotedSectionTextContainer.displayName = 'PromotedSectionTextContainer';
