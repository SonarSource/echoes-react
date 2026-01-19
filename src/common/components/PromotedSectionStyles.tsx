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
import { BadgeVariety } from '../../components/badges/Badge';

export enum PromotedSectionVariety {
  Highlight = 'highlight',
  Neutral = 'neutral',
}

export const BADGE_VARIETIES = {
  [PromotedSectionVariety.Highlight]: BadgeVariety.Highlight,
  [PromotedSectionVariety.Neutral]: BadgeVariety.Neutral,
};

export const PROMOTED_SECTION_STYLES = {
  [PromotedSectionVariety.Highlight]: {
    '--promoted-section-background-color': cssVar('color-background-emphasis-weak-default'),
    '--promoted-section-border': `1px solid ${cssVar('color-border-emphasis-weak')}`,
  },

  [PromotedSectionVariety.Neutral]: {
    '--promoted-section-background-color': cssVar('color-surface-default'),
    '--promoted-section-border': `1px solid ${cssVar('color-border-weak')}`,
  },
};

export const PromotedSectionMainStyles = styled.div`
  background-color: var(--promoted-section-background-color);
  border: var(--promoted-section-border);
  border-radius: ${cssVar('border-radius-400')};
  box-shadow: ${cssVar('box-shadow-xsmall')};
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
