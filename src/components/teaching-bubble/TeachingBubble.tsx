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
import { useCallback } from 'react';
import {
  FEATURE_COMMUNICATION_DATA_ATTRIBUTE,
  FeatureCommunicationComponent,
} from '~common/helpers/constants';
import { Popover, PopoverProps } from '../popover';

type SelectedPopoverProps = Omit<
  PopoverProps,
  'isOpen' | 'onOpenChange' | 'disableOutsideClick' | 'contentProps'
>;
type RequiredPopoverProps = Required<Pick<PopoverProps, 'isOpen'>>;

export interface TeachingBubbleProps extends SelectedPopoverProps, RequiredPopoverProps {
  /**
   * Called when the user requests the TeachingBubble be closed, either when hitting `esc`,
   * clicking a `TeachingBubble.CloseButton` inside of it, or clicking the target element (if interactive!)
   */
  onClose: () => void;
}

export function TeachingBubbleRoot(props: Readonly<TeachingBubbleProps>) {
  const { isOpen, onClose, ...popoverProps } = props;

  // Discard open requests — the Teaching Bubble is always externally controlled.
  const handleClose = useCallback(
    (_: boolean) => {
      if (isOpen) {
        onClose();
      }
    },
    [isOpen, onClose],
  );

  return (
    <StyledPopover
      {...popoverProps}
      contentProps={{
        [FEATURE_COMMUNICATION_DATA_ATTRIBUTE]: FeatureCommunicationComponent.TeachingBubble,
      }}
      disableOutsideClick
      isOpen={isOpen}
      onOpenChange={handleClose}
    />
  );
}

TeachingBubbleRoot.displayName = 'TeachingBubble';

const StyledPopover = styled(Popover)`
  width: 300px;
`;
StyledPopover.displayName = 'StyledPopover';
