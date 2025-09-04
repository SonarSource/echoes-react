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
import {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  useCallback,
  useId,
  useState,
} from 'react';
import { TextNode } from '~types/utils';
import { cssVar } from '~utils/design-tokens';
import { IconChevronDown, IconChevronRight, IconProps } from '../../icons';
import {
  sidebarNavigationBaseItemStyles,
  sidebarNavigationItemIconStyles,
  SidebarNavigationItemLabel,
  UnstyledUList,
} from './SidebarNavigationItemStyles';

export interface SidebarNavigationAccordionItemProps {
  ariaLabel?: string;
  /**
   * List of SidebarNavigationItem that are displayed when the accordion is expanded.
   * Should ideally be maximum 5 items.
   */
  children: ReactNode;
  className?: string;
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
   * The icon component to display at the start of the SidebarNavigationAccordionItem.
   * Must be an Echoes Icon component.
   */
  Icon: ForwardRefExoticComponent<IconProps & React.RefAttributes<HTMLSpanElement>>;
}

export const SidebarNavigationAccordionItem = forwardRef<
  HTMLButtonElement,
  SidebarNavigationAccordionItemProps
>((props, ref) => {
  const { children, Icon, label, onClose, onOpen, ...htmlProps } = props;
  const [open, setOpen] = useState(false);

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
      <AccordionItem
        {...htmlProps}
        aria-controls={accordionPanelId}
        aria-expanded={open}
        id={accordionId}
        onClick={handleClick}
        ref={ref}>
        <Icon css={sidebarNavigationItemIconStyles} />
        <SidebarNavigationItemLabel>{label}</SidebarNavigationItemLabel>
        {open ? (
          <IconChevronDown css={sidebarNavigationItemIconStyles} />
        ) : (
          <IconChevronRight css={sidebarNavigationItemIconStyles} />
        )}
      </AccordionItem>
      <AccordionItemPanel
        aria-labelledby={accordionId}
        data-accordion-open={open}
        id={accordionPanelId}>
        <UnstyledUList>{children}</UnstyledUList>
      </AccordionItemPanel>
    </AccordionWrapper>
  );
});

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
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-50')};

  margin-left: ${cssVar('dimension-space-300')};
  padding-left: ${cssVar('dimension-space-100')};
  padding-right: ${cssVar('dimension-space-200')};
  border-left: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  // The children SidebarNavigationItems rely on this css property to set their display value, falling
  // back to flex if not inside an accordion
  --sidebar-navigation-accordion-children-display: flex;

  // The next two rules hide the child SidebarNavigationItems when the accordion is closed, and also
  // when the sidebar is neither docked nor open (hovered or focused).
  &[data-accordion-open='false'] {
    --sidebar-navigation-accordion-children-display: none;
  }

  [data-sidebar-docked='false'] nav:not(:hover, :focus-within) & {
    margin: 0;
    padding: 0;
    border-left: none;

    --sidebar-navigation-accordion-children-display: none;
  }
`;
AccordionItemPanel.displayName = 'AccordionItemPanel';
