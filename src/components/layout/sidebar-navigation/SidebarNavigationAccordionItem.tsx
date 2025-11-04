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
import { IconChevronDown, IconChevronRight, IconFilledProps } from '../../icons';
import { Tooltip } from '../../tooltip';
import {
  sidebarNavigationBaseItemStyles,
  sidebarNavigationItemIconStyles,
  SidebarNavigationItemLabel,
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
   * Whether to display the tooltip on the accordion item or not.
   * By default the tooltip is disabled, it should only be enabled if you expect the content to be ellipsed.
   */
  enableTooltip?: boolean;
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
   * Optional content to display on the right, before the chevron. Typically badges, item count and similar metadata.
   */
  suffix?: ReactNode;
  /**
   * The icon component to display at the start of the SidebarNavigationAccordionItem.
   * Must be an Echoes Icon component.
   */
  Icon: ForwardRefExoticComponent<IconFilledProps & React.RefAttributes<HTMLSpanElement>>;
}

export const SidebarNavigationAccordionItem = forwardRef<
  HTMLButtonElement,
  SidebarNavigationAccordionItemProps
>((props, ref) => {
  const { children, enableTooltip, Icon, label, onClose, onOpen, suffix, ...htmlProps } = props;
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
      <Tooltip content={enableTooltip ? label : undefined} side="right">
        <AccordionItem
          {...htmlProps}
          aria-controls={accordionPanelId}
          aria-expanded={open}
          id={accordionId}
          onClick={handleClick}
          ref={ref}>
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
        id={accordionPanelId}>
        <AccordionItemsList>{children}</AccordionItemsList>
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
  margin-left: ${cssVar('dimension-space-300')};
  padding-left: ${cssVar('dimension-space-100')};
  padding-right: ${cssVar('dimension-space-100')};
  border-left: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  // The children SidebarNavigationItems rely on this css property to set their display value, falling
  // back to flex if not inside an accordion
  --sidebar-navigation-accordion-children-display: flex;
  --sidebar-navigation-accordion-children-gap: ${cssVar('dimension-space-50')};

  // The next two rules hide the child SidebarNavigationItems when the accordion is closed, and also
  // when the sidebar is neither docked nor open (hovered or focused).
  &[data-accordion-open='false'] {
    --sidebar-navigation-accordion-children-display: none;
    --sidebar-navigation-accordion-children-gap: ${cssVar('dimension-space-0')};
  }

  [data-sidebar-docked='false'] nav:not(:hover, :focus-within) & {
    margin: 0;
    padding: 0;
    border-left: none;

    --sidebar-navigation-accordion-children-display: none;
    --sidebar-navigation-accordion-children-gap: ${cssVar('dimension-space-0')};
  }
`;
AccordionItemPanel.displayName = 'AccordionItemPanel';

export const AccordionItemsList = styled.ul`
  all: unset;

  display: flex;
  flex-direction: column;
  gap: var(--sidebar-navigation-accordion-children-gap);
`;
AccordionItemsList.displayName = 'AccordionItemsList';
