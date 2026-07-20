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
import { IconCustomWrapper, IconMaterialWrapper } from '../icons/IconWrapper';
import { Text } from '../typography';

export const EmptyStateRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${cssVar('dimension-space-200')};

  text-align: center;
`;
EmptyStateRoot.displayName = 'EmptyStateRoot';

export const EmptyStateGraphicWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${cssVar('dimension-width-400')};
  height: ${cssVar('dimension-height-800')};

  border-radius: ${cssVar('border-radius-200')};
  background-color: ${cssVar('color-background-neutral-subtle-default')};
  padding: ${cssVar('dimension-space-0')};
`;
EmptyStateGraphicWrapper.displayName = 'EmptyStateGraphicWrapper';

export const EmptyStateGraphicContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${cssVar('dimension-width-300')};
  height: ${cssVar('dimension-height-600')};
  color: ${cssVar('color-icon-default')};

  & > * {
    max-width: 100%;
    max-height: 100%;
  }

  & > ${IconMaterialWrapper}, & > ${IconCustomWrapper} {
    color: inherit;
  }

  & > svg,
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
EmptyStateGraphicContent.displayName = 'EmptyStateGraphicContent';

export const EmptyStateTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${cssVar('dimension-space-75')};
`;
EmptyStateTextGroup.displayName = 'EmptyStateTextGroup';

export const EmptyStateText = styled(Text)`
  margin: 0;
`;
EmptyStateText.displayName = 'EmptyStateText';

export const EmptyStateActionsGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${cssVar('dimension-space-200')};
`;
EmptyStateActionsGroup.displayName = 'EmptyStateActionsGroup';

export const EmptyStateActionSlot = styled.div`
  display: flex;
  justify-content: center;
`;
EmptyStateActionSlot.displayName = 'EmptyStateActionSlot';

export const EmptyStateLinkSlot = styled.div`
  display: flex;
  justify-content: center;
`;
EmptyStateLinkSlot.displayName = 'EmptyStateLinkSlot';
