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
import { forwardRef, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { isDefined } from '~common/helpers/types';
import { TextNode } from '~types/utils';
import { Badge, BadgeSize, BadgeVariety } from '../badges';
import { ButtonIcon, ButtonSize, ButtonVariety } from '../buttons';
import { IconX } from '../icons';
import { Heading, HeadingProps, HeadingSize, Text } from '../typography';

export enum PromotedSectionVariety {
  Highlight = 'highlight',
  Neutral = 'neutral',
}

export interface PromotedSectionProps {
  /**
   * The actions on the bottom: either a Button, a ButtonGroup, or a LinkStandalone (optional)
   */
  actions?: React.ReactNode;

  /**
   * The text on the badge next to the header. Defaults to `"New"` when `undefined` or `""` (optional)
   */
  badgeText?: TextNode;

  /**
   * CSS class name(s) to apply to the section (optional)
   */
  className?: string;

  /**
   * Whether a badge should be displayed or not, showing the text from `badgeText` (or the default).
   * Defaults to `true` (optional).
   */
  hasBadge?: boolean;

  /**
   * The header text for the section
   */
  headerText: TextNode;

  /**
   * The illustration to display on the right-hand side (optional)
   */
  illustration?: React.ReactNode;

  /**
   * The callback function to call when the section is dismissed (optional).
   * When this is not `undefined`, a dismiss button is showed.
   */
  onDismiss?: () => void;

  /**
   * The main text for the section
   */
  text: TextNode;

  /**
   * The HTML element to use for the title. Defaults to `h2` (optional)
   */
  titleAs?: `${HeadingProps['as']}`;

  /**
   * The variety: either PromotedSectionVariety.Highlight/'highlight' or PromotedSectionVariety.Neutral/'neutral'.
   * Defaults to PromotedSectionVariety.Neutral/'neutral' (optional)
   */
  variety?: `${PromotedSectionVariety}`;
}

export const PromotedSection = forwardRef<HTMLDivElement, Readonly<PromotedSectionProps>>(
  (
    {
      actions,
      badgeText,
      className,
      hasBadge = true,
      headerText,
      illustration,
      onDismiss,
      text,
      titleAs = 'h2',
      variety = PromotedSectionVariety.Neutral,
    },
    ref,
  ) => {
    const intl = useIntl();

    return (
      <PromotedSectionStyled
        className={className}
        css={useMemo(() => PROMOTED_SECTION_STYLES[variety], [variety])}
        ref={ref}>
        <MainContainer>
          <MainContainerLeftSide>
            <TextAndActionsContainer>
              <TextAndActions>
                <TextContainer>
                  <HeaderContainer>
                    <StyledHeading as={titleAs} hasMarginBottom={false} size={HeadingSize.Medium}>
                      {headerText}
                    </StyledHeading>

                    {hasBadge && (
                      <Badge
                        isHighContrast={variety === PromotedSectionVariety.Highlight}
                        size={BadgeSize.Small}
                        variety={BADGE_VARIETIES[variety]}>
                        {badgeText ||
                          intl.formatMessage({
                            defaultMessage: 'New',
                            description:
                              'Default text to display on the optional PromotedSection badge',
                            id: 'promoted_section.badge.default_text',
                          })}
                      </Badge>
                    )}
                  </HeaderContainer>

                  <Text>{text}</Text>
                </TextContainer>

                {actions && <ActionsContainer ref={ref}>{actions}</ActionsContainer>}
              </TextAndActions>
            </TextAndActionsContainer>

            {illustration && <IllustrationContainer>{illustration}</IllustrationContainer>}
          </MainContainerLeftSide>

          {isDefined(onDismiss) && (
            <MainContainerRightSide>
              <StyledButtonIcon
                Icon={IconX}
                ariaLabel={intl.formatMessage({
                  id: 'inline.message.dismiss',
                  defaultMessage: 'Dismiss',
                  description: 'ARIA-label for the dismiss button.',
                })}
                onClick={onDismiss}
                size={ButtonSize.Medium}
                variety={ButtonVariety.DefaultGhost}
              />
            </MainContainerRightSide>
          )}
        </MainContainer>
      </PromotedSectionStyled>
    );
  },
);

PromotedSection.displayName = 'PromotedSection';

const BADGE_VARIETIES = {
  [PromotedSectionVariety.Highlight]: BadgeVariety.Highlight,
  [PromotedSectionVariety.Neutral]: BadgeVariety.Neutral,
};

const PROMOTED_SECTION_STYLES = {
  [PromotedSectionVariety.Highlight]: {
    '--promoted-section-background-color': 'var(--echoes-color-background-emphasis-weak-default)',
    '--promoted-section-border': '1px solid var(--echoes-color-border-emphasis-weak)',
  },

  [PromotedSectionVariety.Neutral]: {
    '--promoted-section-background-color': 'var(--echoes-color-background-default)',
    '--promoted-section-border': '1px solid var(--echoes-color-border-weak)',
  },
};

const ActionsContainer = styled.div`
  align-items: center;
  align-self: stretch;
`;

const HeaderContainer = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  gap: var(--echoes-dimension-space-100);
`;

const IllustrationContainer = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  justify-content: center;
  padding-left: var(--echoes-dimension-space-200);
`;

const MainContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1 0 0;
  justify-content: space-between;
`;

const MainContainerLeftSide = styled.div`
  align-items: center;
  display: flex;
  flex: 1 0 0;
  justify-content: space-between;
`;

const MainContainerRightSide = styled.div`
  align-items: center;
  display: flex;
  padding-left: var(--echoes-dimension-space-200);
`;

const PromotedSectionStyled = styled.div`
  align-items: center;
  background-color: var(--promoted-section-background-color);
  border: var(--promoted-section-border);
  border-radius: var(--echoes-border-radius-400);
  box-shadow: var(--echoes-box-shadow-xsmall);
  display: flex;
  gap: var(--echoes-dimension-space-100);
  padding: var(--echoes-dimension-space-200);
`;

const StyledButtonIcon = styled(ButtonIcon)`
  position: relative;
  right: -9px;
  top: -5px;
`;

const StyledHeading = styled(Heading)`
  line-height: var(--echoes-dimension-height-500);
`;

const TextAndActions = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  gap: var(--echoes-dimension-space-150);
`;

const TextAndActionsContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1 0 0;
  gap: var(--echoes-dimension-space-400);
`;

const TextContainer = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: var(--echoes-dimension-space-100);
`;
