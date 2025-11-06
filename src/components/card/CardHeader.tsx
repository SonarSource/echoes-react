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
import React, { useMemo } from 'react';
import { cssVar } from '~utils/design-tokens';
import { ButtonIcon, ButtonSize, ButtonVariety } from '../buttons';
import { Divider } from '../divider';
import { IconChevronDown, IconChevronUp } from '../icons';
import { Heading } from '../typography';
import { useCardContext } from './CardRoot';
import { CardSize } from './CardSize';
import {
  CARD_HEADER_SIZE_STYLES,
  CardHeaderStyled,
  CardHeaderTitleButtonStyled,
} from './CardStyles';

export interface CardHeaderProps {
  className?: string;
  description?: React.ReactNode;
  hasDivider?: boolean;
  rightContent?: React.ReactNode;
  title: React.ReactNode;
}

// There is no public "small" button size, by design
const CardChevronButtonSmallStyled = styled(ButtonIcon)`
  --button-height: ${cssVar('dimension-height-600')};
  --button-width: ${cssVar('dimension-height-600')};
`;
CardChevronButtonSmallStyled.displayName = 'CardChevronButtonSmallStyled';

const CARD_SIZE_CONFIG = {
  [CardSize.Large]: {
    ChevronButton: ButtonIcon,
    chevronSize: ButtonSize.Large,
    headingLevel: 'h2' as const,
    styles: CARD_HEADER_SIZE_STYLES[CardSize.Large],
  },
  [CardSize.Medium]: {
    ChevronButton: ButtonIcon,
    chevronSize: ButtonSize.Medium,
    headingLevel: 'h3' as const,
    styles: CARD_HEADER_SIZE_STYLES[CardSize.Medium],
  },
  [CardSize.Small]: {
    ChevronButton: CardChevronButtonSmallStyled,
    chevronSize: undefined,
    headingLevel: 'h4' as const,
    styles: CARD_HEADER_SIZE_STYLES[CardSize.Small],
  },
};

export const CardHeader = React.forwardRef<HTMLDivElement, Readonly<CardHeaderProps>>(
  ({ className, description, hasDivider = false, rightContent, title }, ref) => {
    const { isCollapsible, isOpen, onToggle, size } = useCardContext();

    const sizeConfig = CARD_SIZE_CONFIG[size];

    const titleContent = (
      <>
        <Heading as={sizeConfig.headingLevel}>{title}</Heading>

        {description && <DescriptionStyled>{description}</DescriptionStyled>}
      </>
    );

    return (
      <>
        <CardHeaderStyled
          className={className}
          css={useMemo(
            () => ({
              ...sizeConfig.styles,
            }),
            [sizeConfig.styles],
          )}
          ref={ref}>
          <CardHeaderTextStyled>
            {isCollapsible ? (
              <CardHeaderTitleButtonStyled onClick={onToggle} type="button">
                {titleContent}
              </CardHeaderTitleButtonStyled>
            ) : (
              <CardHeaderTitleStyled>{titleContent}</CardHeaderTitleStyled>
            )}

            <RightContentStyled>
              {rightContent}

              {isCollapsible && (
                <sizeConfig.ChevronButton
                  Icon={isOpen ? IconChevronUp : IconChevronDown}
                  ariaLabel={isOpen ? 'Collapse' : 'Expand'}
                  onClick={onToggle}
                  size={sizeConfig.chevronSize}
                  variety={ButtonVariety.DefaultGhost}
                />
              )}
            </RightContentStyled>
          </CardHeaderTextStyled>
        </CardHeaderStyled>

        {hasDivider && <Divider />}
      </>
    );
  },
);

CardHeader.displayName = 'CardHeader';

const CardHeaderTextStyled = styled.div`
  align-items: center;
  display: flex;
  gap: ${cssVar('dimension-space-100')};
  justify-content: space-between;
  width: 100%;
`;
CardHeaderTextStyled.displayName = 'CardHeaderTextStyled';

const CardHeaderTitleStyled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
CardHeaderTitleStyled.displayName = 'CardHeaderTitleStyled';

const RightContentStyled = styled.div`
  align-items: center;
  display: flex;
  gap: ${cssVar('dimension-space-100')};
  max-height: var(--card-header-heading-height);
`;
RightContentStyled.displayName = 'RightContentStyled';

const DescriptionStyled = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
DescriptionStyled.displayName = 'DescriptionStyled';
