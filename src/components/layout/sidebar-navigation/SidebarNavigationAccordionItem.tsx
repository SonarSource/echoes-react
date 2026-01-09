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

const TOOLTIP_DELAY_IN_MS = 1000;

export interface SidebarNavigationAccordionItemProps {
  ariaLabel?: string;
  /**
   * List of SidebarNavigationItem that are displayed when the accordion is expanded.
   * Should ideally be maximum 5 items.
   */
  children: ReactNode;
  className?: string;
  /**
   * Whether to disable the tooltip on the accordion item or not.
   * By default the tooltip is enabled, it should only be disabled if you don't expect the content to be ellipsed.
   */
  disableTooltip?: boolean;
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
  const {
    children,
    disableTooltip = false,
    Icon,
    label,
    onClose,
    onOpen,
    suffix,
    ...htmlProps
  } = props;
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
      <Tooltip
        content={disableTooltip ? undefined : label}
        delayDuration={TOOLTIP_DELAY_IN_MS}
        side="right">
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
  margin-left: ${cssVar('dimension-space-200')};
  padding-left: ${cssVar('dimension-space-100')};
  padding-right: ${cssVar('dimension-space-100')};
  border-left: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  // The children SidebarNavigationItems rely on this css property to set their display value, falling
  // back to flex if not inside an accordion
  --sidebar-navigation-accordion-children-display: flex;
  --sidebar-navigation-accordion-children-visibility: visible;

  // The rule hide the child SidebarNavigationItems when the accordion is closed
  &[data-accordion-open='false'] {
    --sidebar-navigation-accordion-children-display: none;
  }

  // This rule hides the SidebarNavigationItems when the accordion is open but the sidebar is collapsed
  // using visibility to make sure it still takes space to avoid layout shift when hovering the sidebar
  [data-sidebar-docked='false'] nav:not(:hover, :focus-within) & {
    --sidebar-navigation-accordion-children-visibility: hidden;
    --sidebar-navigation-accordion-children-outline: ${cssVar('color-surface-default')} solid
      ${cssVar('focus-border-width-default')};
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

  [data-sidebar-docked='false'] nav:not(:hover, :focus-within) & {
    margin-left: calc(-1 * ${cssVar('dimension-space-300')});
    width: ${cssVar('dimension-width-400')};
  }
`;

AccordionItemsList.displayName = 'AccordionItemsList';
