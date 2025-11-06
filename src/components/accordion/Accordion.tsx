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
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { cssVar } from '~utils/design-tokens';
import { IconChevronDown, IconChevronRight } from '../icons';

export interface AccordionProps {
  /**
   * aria-label is not required by the ARIA spec for <details> elements, but has been included for backward compatibility
   */
  ariaLabel?: string;
  children: React.ReactNode;
  className?: string;
  header: React.ReactNode;
  /**
   * isOpen and onOpenChange can be used for bi-directional control of the accordion.
   */
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const Accordion = forwardRef<HTMLDetailsElement, AccordionProps>((props, ref) => {
  const { ariaLabel, children, className, header, isOpen, onOpenChange } = props;

  const [internalOpen, setInternalOpen] = useState(isOpen ?? false);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setInternalOpen(isOpen);
      onOpenChange?.(isOpen);
    },
    [onOpenChange],
  );

  useEffect(() => {
    if (isOpen !== undefined) {
      setInternalOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <AccordionWrapper
      aria-label={ariaLabel}
      className={className}
      onToggle={(event) => handleOpenChange(event.currentTarget.open)}
      open={internalOpen}
      ref={ref}>
      <summary>
        {header}
        <OpenCloseIndicator open={internalOpen} />
      </summary>
      <div className="accordion-content">{children}</div>
    </AccordionWrapper>
  );
});
Accordion.displayName = 'Accordion';

function OpenCloseIndicator({ open }: { open: boolean }) {
  return open ? <IconChevronDown /> : <IconChevronRight />;
}

const AccordionWrapper = styled.details`
  border: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  border-radius: ${cssVar('border-radius-400')};
  width: 100%;

  & > summary {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${cssVar('dimension-space-200')};
  }

  &[open] summary {
    border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  }

  & .accordion-content {
    padding: ${cssVar('dimension-space-200')};
  }

  /* Hide the default marker */
  & > summary::marker {
    content: none;
  }
`;

export { Accordion };
