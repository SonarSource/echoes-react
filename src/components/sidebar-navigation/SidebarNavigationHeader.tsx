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
import { forwardRef, ReactNode, useRef } from 'react';
import { truncate } from '~common/helpers/styles';
import { useIsOverflow } from '~common/helpers/useIsOverflow';
import { TextNode, TextNodeOptional } from '~types/utils';
import { cssVar } from '~utils/design-tokens';
import { IconExpandAll } from '../icons';
import { Tooltip, TooltipSide } from '../tooltip';
import { Text } from '../typography';

export interface SidebarNavigationHeaderProps {
  /**
   * Image to display to the left of the header.
   */
  avatar?: ReactNode;
  /**
   * Display a Icon on the right, indicating it triggers a dropdown.
   * To be set to `true` when used as a dropdown trigger.
   */
  isInteractive?: boolean;
  /**
   * Text to display under the main text of the header.
   * Typically defines the type of entity being shown (organization, enterprise, project, ...)
   */
  qualifier?: TextNodeOptional;
  /**
   * The main text to show in the header
   */
  name: TextNode;
}

export const SidebarNavigationHeader = forwardRef<HTMLButtonElement, SidebarNavigationHeaderProps>(
  (props, ref) => {
    const { avatar = null, isInteractive = false, qualifier, name, ...radixProps } = props;

    const labelRef = useRef<HTMLSpanElement>(null);
    const [isOverflow] = useIsOverflow(labelRef, [name]);

    return (
      <Tooltip content={isOverflow && isInteractive ? name : undefined} side={TooltipSide.Right}>
        <HeaderContainer as={isInteractive ? 'button' : 'div'} ref={ref} {...radixProps}>
          <MainContent>
            {avatar && <AvatarWrapper>{avatar}</AvatarWrapper>}
            <TextContent>
              <Text isHighlighted ref={labelRef}>
                {name}
              </Text>
              {qualifier && (
                <Text isSubtle size="small">
                  {qualifier}
                </Text>
              )}
            </TextContent>
          </MainContent>
          {isInteractive && <IconExpandAll />}
        </HeaderContainer>
      </Tooltip>
    );
  },
);
SidebarNavigationHeader.displayName = 'SidebarNavigationHeader';

const HeaderContainer = styled.button`
  all: unset;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: ${cssVar('dimension-space-100')};
  padding: ${cssVar('dimension-space-100')};

  overflow: hidden;

  background-color: ${cssVar('color-surface-default')};

  [data-sidebar-collapsed='true'] & {
    margin: 0 -4px;
  }

  /* If it is interactive, we want mouse interactivity */
  :is(button) {
    border-radius: ${cssVar('border-radius-400')};
    outline: none;

    cursor: pointer;

    &:focus,
    &:focus-visible {
      background-color: ${cssVar('color-surface-hover')};
    }

    &:focus-visible {
      outline: ${cssVar('color-focus-default')} solid ${cssVar('focus-border-width-default')};
      outline-offset: ${cssVar('focus-border-offset-default')};
    }

    &:hover {
      background-color: ${cssVar('color-surface-hover')};
    }

    &:active {
      background-color: ${cssVar('color-surface-active')};
    }
  }
`;
HeaderContainer.displayName = 'HeaderContainer';

const MainContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-100')};
  min-width: ${cssVar('dimension-width-300')};
`;
MainContent.displayName = 'MainContent';

const AvatarWrapper = styled.div`
  flex: 1 0 auto;
  width: ${cssVar('dimension-width-300')};
  height: ${cssVar('dimension-width-300')};
`;
AvatarWrapper.displayName = 'AvatarWrapper';

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: auto;

  & > span {
    ${truncate}
  }
`;
TextContent.displayName = 'TextContent';
