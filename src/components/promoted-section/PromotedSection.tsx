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
import { useIntl } from 'react-intl';
import { isDefined } from '~common/helpers/types';
import { TextNode } from '~types/utils';
import { Badge, BadgeSize } from '../badges';
import { ButtonIcon, ButtonSize, ButtonVariety } from '../buttons';
import { IconX } from '../icons';
import { Heading, HeadingProps, HeadingSize, Text } from '../typography';

import {
  BADGE_VARIETIES,
  PROMOTED_SECTION_STYLES,
  PromotedSectionMainStyles,
  PromotedSectionTextAndActions,
  PromotedSectionTextContainer,
  PromotedSectionVariety,
} from '~common/components/PromotedSectionStyles';
import { cssVar } from '~utils/design-tokens';

export interface PromotedSectionProps {
  /**
   * The actions at the bottom: either a Button, a ButtonGroup, or a LinkStandalone (optional)
   */
  actions?: React.ReactNode;

  /**
   * The text to display on a badge next to the header (optional).
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
      headerText,
      illustration,
      onDismiss,
      text,
      titleAs = 'h2',
      variety = PromotedSectionVariety.Neutral,
      ...otherProps
    },
    ref,
  ) => {
    const intl = useIntl();

    return (
      <PromotedSectionMainStyles
        className={className}
        css={useMemo(() => PROMOTED_SECTION_STYLES[variety], [variety])}
        ref={ref}
        {...(illustration ? { style: { display: 'inline-block' } } : {})}
        {...otherProps}>
        <MainContainer>
          <MainContainerLeftSide>
            <TextAndActionsContainer>
              <PromotedSectionTextAndActions>
                <PromotedSectionTextContainer>
                  <HeaderContainer>
                    <StyledHeading as={titleAs} hasMarginBottom={false} size={HeadingSize.Medium}>
                      {headerText}
                    </StyledHeading>

                    {badgeText && (
                      <Badge
                        isHighContrast={variety === PromotedSectionVariety.Highlight}
                        size={BadgeSize.Small}
                        variety={BADGE_VARIETIES[variety]}>
                        {badgeText}
                      </Badge>
                    )}
                  </HeaderContainer>

                  <Text>{text}</Text>
                </PromotedSectionTextContainer>

                {actions && <ActionsContainer>{actions}</ActionsContainer>}
              </PromotedSectionTextAndActions>
            </TextAndActionsContainer>

            {illustration && <IllustrationContainer>{illustration}</IllustrationContainer>}
          </MainContainerLeftSide>

          {isDefined(onDismiss) && (
            <MainContainerRightSide>
              <StyledButtonIcon
                Icon={IconX}
                ariaLabel={intl.formatMessage({
                  id: 'promoted_section.dismiss',
                  defaultMessage: 'Dismiss',
                  description: 'ARIA-label for the dismiss button in the top-right corner.',
                })}
                onClick={onDismiss}
                size={ButtonSize.Medium}
                variety={ButtonVariety.DefaultGhost}
              />
            </MainContainerRightSide>
          )}
        </MainContainer>
      </PromotedSectionMainStyles>
    );
  },
);

PromotedSection.displayName = 'PromotedSection';

const ActionsContainer = styled.div`
  align-items: center;
  align-self: stretch;
`;

ActionsContainer.displayName = 'ActionsContainer';

const HeaderContainer = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  gap: ${cssVar('dimension-space-100')};
`;

HeaderContainer.displayName = 'HeaderContainer';

const IllustrationContainer = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  justify-content: center;
  max-height: 108px;
  max-width: 108px;
  padding-left: ${cssVar('dimension-space-200')};

  & img,
  svg {
    height: 100%;
    object-fit: contain;
    width: 100%;
  }
`;

IllustrationContainer.displayName = 'IllustrationContainer';

const MainContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1 0 0;
  justify-content: space-between;
`;

MainContainer.displayName = 'MainContainer';

const MainContainerLeftSide = styled.div`
  align-items: center;
  display: flex;
  flex: 1 0 0;
  justify-content: space-between;
`;

MainContainerLeftSide.displayName = 'MainContainerLeftSide';

const MainContainerRightSide = styled.div`
  align-items: center;
  display: flex;
  padding-left: ${cssVar('dimension-space-200')};
`;

MainContainerRightSide.displayName = 'MainContainerRightSide';

const StyledButtonIcon = styled(ButtonIcon)`
  position: relative;
  right: ${cssVar('dimension-negative-spacing-800')};
  top: ${cssVar('dimension-negative-spacing-600')};
`;

StyledButtonIcon.displayName = 'StyledButtonIcon';

const StyledHeading = styled(Heading)`
  line-height: ${cssVar('dimension-height-500')};
`;

StyledHeading.displayName = 'StyledHeading';

const TextAndActionsContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1 0 0;
  gap: ${cssVar('dimension-space-400')};
`;

TextAndActionsContainer.displayName = 'TextAndActionsContainer';
