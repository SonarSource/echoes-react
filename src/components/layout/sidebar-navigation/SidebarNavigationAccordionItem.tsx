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

import { ReactNode, Ref, useCallback, useEffect, useId, useRef, useState } from 'react';

import { TextNode } from '~types/utils';
import { cssVar } from '~utils/design-tokens';
import { IconChevronDown, IconChevronRight } from '../../icons';
import { Tooltip } from '../../tooltip';

import {
  sidebarNavigationBaseItemStyles,
  sidebarNavigationItemIconStyles,
  SidebarNavigationItemLabel,
} from './SidebarNavigationItemStyles';

import { SidebarNavigationIconComponent } from './SidebarNavigationTypes';
import { TOOLTIP_DELAY_IN_MS } from './utils';

export interface SidebarNavigationAccordionItemProps {
  /**
   * ARIA label for the SidebarNavigationAccordionItem button.
   */
  ariaLabel?: string;
  /**
   * List of navigation child items displayed when the accordion is expanded.
   * Prefer `SidebarNavigation.AccordionItem.Item` and keep the list to five items or fewer.
   */
  children: ReactNode;
  /**
   * Optional CSS class name applied to the accordion button element.
   */
  className?: string;
  /**
   * Whether to disable the tooltip on the accordion item or not.
   * By default the tooltip is enabled, it should only be disabled if you don't expect the content to be ellipsed.
   * @defaultValue false
   */
  disableTooltip?: boolean;
  /**
   * The icon component to display at the start of the SidebarNavigationAccordionItem.
   * Must be an Echoes Icon component.
   */
  Icon: SidebarNavigationIconComponent;
  /**
   * Whether the accordion is open by default.
   * @defaultValue false
   */
  isDefaultOpen?: boolean;
  /**
   * The label for the SidebarNavigationAccordionItem.
   */
  label: TextNode;
  /**
   * The onClose callback is called when the accordion is closed.
   */
  onClose?: VoidFunction;
  /**
   * The onOpen callback is called when the accordion is opened.
   */
  onOpen?: VoidFunction;
  /**
   * React ref forwarded to the root button element.
   */
  ref?: Ref<HTMLButtonElement>;
  /**
   * When true, scrolls the last child item into view when the accordion opens.
   * Useful when the accordion is near the bottom of a scrollable container.
   * @defaultValue false
   */
  scrollLastChildIntoViewOnOpen?: boolean;
  /**
   * Optional content to display on the right, before the chevron. Typically badges, item count and similar metadata.
   */
  suffix?: ReactNode;
}

export function SidebarNavigationAccordionItem(
  props: Readonly<SidebarNavigationAccordionItemProps>,
) {
  const {
    ariaLabel,
    children,
    disableTooltip = false,
    Icon,
    isDefaultOpen = false,
    label,
    onClose,
    onOpen,
    ref,
    scrollLastChildIntoViewOnOpen,
    suffix,
    ...htmlProps
  } = props;

  const [open, setOpen] = useState(isDefaultOpen);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open && scrollLastChildIntoViewOnOpen) {
      const lastChild = panelRef.current?.querySelector('li:last-child');
      (lastChild as HTMLElement | null)?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [open, scrollLastChildIntoViewOnOpen]);

  const accordionId = `${useId()}sidebar-accordion`;
  const accordionPanelId = `${accordionId}-panel`;

  const handleClick = useCallback(() => {
    setOpen((open) => {
      if (!open) {
        onOpen?.();

        return true;
      }

      onClose?.();

      return false;
    });
  }, [onOpen, onClose]);

  return (
    <AccordionWrapper>
      <Tooltip
        content={disableTooltip ? undefined : label}
        delayDuration={TOOLTIP_DELAY_IN_MS}
        side="right">
        <AccordionItem
          {...htmlProps}
          aria-controls={accordionPanelId}
          aria-expanded={open}
          aria-label={ariaLabel}
          id={accordionId}
          onClick={handleClick}
          ref={ref}
          type="button">
          <Icon css={sidebarNavigationItemIconStyles} isFilled={false} />

          <SidebarNavigationItemLabel>{label}</SidebarNavigationItemLabel>

          {suffix}

          {open ? (
            <IconChevronDown css={sidebarNavigationItemIconStyles} />
          ) : (
            <IconChevronRight css={sidebarNavigationItemIconStyles} />
          )}
        </AccordionItem>
      </Tooltip>

      <AccordionItemPanel
        aria-labelledby={accordionId}
        data-accordion-open={open}
        id={accordionPanelId}
        ref={panelRef}>
        <AccordionItemsList>{children}</AccordionItemsList>
      </AccordionItemPanel>
    </AccordionWrapper>
  );
}

SidebarNavigationAccordionItem.displayName = 'SidebarNavigationAccordionItem';

const AccordionWrapper = styled.li`
  all: unset;

  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-50')};
`;

AccordionWrapper.displayName = 'AccordionWrapper';

const AccordionItem = styled.button`
  ${sidebarNavigationBaseItemStyles}

  &:active {
    background-color: ${cssVar('sidebar-navigation-item-colors-background-active')};
  }
`;

AccordionItem.displayName = 'AccordionItem';

const AccordionItemPanel = styled.section`
  margin-left: ${cssVar('dimension-space-200')};
  padding-left: ${cssVar('dimension-space-100')};
  padding-right: ${cssVar('dimension-space-100')};
  border-left: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  // The children SidebarNavigationItems rely on this css property to set their display value,
  // falling back to flex if not inside an accordion
  --sidebar-navigation-accordion-children-display: flex;

  // Hide the child SidebarNavigationItems when the accordion is closed
  &[data-accordion-open='false'] {
    --sidebar-navigation-accordion-children-display: none;
  }
`;

AccordionItemPanel.displayName = 'AccordionItemPanel';

const AccordionItemsList = styled.ul`
  all: unset;

  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-50')};

  [data-accordion-open='false'] & {
    // Override the gap to avoid extra space that shows the left border when the accordion is closed
    gap: ${cssVar('dimension-space-0')};
  }
`;

AccordionItemsList.displayName = 'AccordionItemsList';
