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

import { useCallback, useEffect, useRef, useState } from 'react';

import { isDefined } from '~common/helpers/types';

interface UseSidebarNavigationAccordionStateInput {
  isDefaultOpen: boolean;
  isOpen?: boolean;
  onClose?: VoidFunction;
  onOpen?: VoidFunction;
  onOpenChange?: (isOpen: boolean) => void;
}

interface UseSidebarNavigationAccordionStateOutput {
  handleChildActive: VoidFunction;
  handleToggle: VoidFunction;
  open: boolean;
  shouldAutoOpenOnActiveChild: boolean;
}

/**
 * @internal
 * Accordion state machine for SidebarNavigation.AccordionItem.
 * Owns uncontrolled open state, child-driven auto-open, and callback dispatch.
 */
export function useSidebarNavigationAccordionState(
  props: Readonly<UseSidebarNavigationAccordionStateInput>,
): UseSidebarNavigationAccordionStateOutput {
  const { isDefaultOpen, isOpen, onClose, onOpen, onOpenChange } = props;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(isDefaultOpen);
  const previousOpenRef = useRef<boolean | undefined>(undefined);
  const isControlled = isDefined(isOpen);
  const shouldAutoOpenOnActiveChild = !isControlled;
  const open = isDefined(isOpen) ? isOpen : uncontrolledOpen;

  // In uncontrolled mode, callbacks follow the visible state after the initial mount settles, so
  // manual toggles and child-driven auto-open transitions share one path.
  useEffect(() => {
    const previousOpen = previousOpenRef.current;
    previousOpenRef.current = open;

    if (isControlled || !isDefined(previousOpen) || previousOpen === open) {
      return;
    }

    onOpenChange?.(open);

    if (open) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isControlled, onClose, onOpen, onOpenChange, open]);

  const handleChildActive = useCallback(() => {
    if (!isControlled) {
      setUncontrolledOpen(true);
    }
  }, [isControlled]);

  const handleToggle = useCallback(() => {
    const nextOpen = !open;

    if (!isControlled) {
      setUncontrolledOpen(nextOpen);

      return;
    }

    onOpenChange?.(nextOpen);

    if (nextOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isControlled, onClose, onOpen, onOpenChange, open]);

  return { handleChildActive, handleToggle, open, shouldAutoOpenOnActiveChild };
}
