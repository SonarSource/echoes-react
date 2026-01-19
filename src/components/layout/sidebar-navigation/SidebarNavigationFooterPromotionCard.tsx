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
import { forwardRef, useMemo } from 'react';
import {
  BADGE_VARIETIES,
  PROMOTED_SECTION_STYLES,
  PromotedSectionMainStyles,
  PromotedSectionTextAndActions,
  PromotedSectionTextContainer,
  PromotedSectionVariety,
} from '~common/components/PromotedSectionStyles';
import { TextNode } from '~types/utils';
import { cssVar } from '~utils/design-tokens';
import { Badge, BadgeSize } from '../../../components/badges';
import { Heading, HeadingSize, Text } from '../../typography';

export interface SidebarNavigationFooterPromotionCard {
  /**
   * The actions at the bottom should be instances of Button or StandaloneLink in a fragment.
   * They are wrapped in a ButtonGroup by this component.
   */
  actions: React.ReactNode;

  /**
   * The text to display on a badge above the header (optional).
   * No badge appears if this is undefined or the empty string `""`
   */
  badgeText?: TextNode;

  /**
   * CSS class name(s) to apply to the section (optional)
   */
  className?: string;

  /**
   * The header text for the section
   */
  headerText: TextNode;

  /**
   * The main text for the section
   */
  text: TextNode;

  /**
   * The variety: either PromotedSectionVariety.Highlight/'highlight' or PromotedSectionVariety.Neutral/'neutral'.
   * Defaults to PromotedSectionVariety.Neutral/'neutral' (optional)
   */
  variety?: `${PromotedSectionVariety}`;
}

export const SidebarNavigationFooterPromotionCard = forwardRef<
  HTMLDivElement,
  Readonly<SidebarNavigationFooterPromotionCard>
>(
  (
    {
      actions,
      badgeText,
      className,
      headerText,
      text,
      variety = PromotedSectionVariety.Neutral,
      ...otherProps
    },
    ref,
  ) => {
    return (
      <StyledPromotedSectionMainStyles
        className={className}
        css={useMemo(() => PROMOTED_SECTION_STYLES[variety], [variety])}
        ref={ref}
        {...otherProps}>
        <PromotedSectionTextAndActions>
          <PromotedSectionTextContainer>
            {badgeText && (
              <Badge
                isHighContrast={variety === PromotedSectionVariety.Highlight}
                size={BadgeSize.Small}
                variety={BADGE_VARIETIES[variety]}>
                {badgeText}
              </Badge>
            )}

            <Heading as="h2" hasMarginBottom={false} size={HeadingSize.Medium}>
              {headerText}
            </Heading>

            <Text>{text}</Text>
          </PromotedSectionTextContainer>

          {actions}
        </PromotedSectionTextAndActions>
      </StyledPromotedSectionMainStyles>
    );
  },
);

SidebarNavigationFooterPromotionCard.displayName = 'SidebarNavigationFooterPromotionCard';

const StyledPromotedSectionMainStyles = styled(PromotedSectionMainStyles)`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-100')};
  align-items: start;
  opacity: 1;
  /* step-end makes it appear at the very end, when the sidebar has reached its full size.
   * This prevents showing it resizing
   */
  transition: opacity 0.1s step-end;

  [data-sidebar-docked='false'] nav:not(:hover, :focus-within) & {
    opacity: 0;
    /* When closing, we want the opposite: it disappears immediately */
    transition: opacity 0s;
  }
`;
StyledPromotedSectionMainStyles.displayName = 'StyledPromotedSectionMainStyles';
