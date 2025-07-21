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
import * as radixTooltip from '@radix-ui/react-tooltip';
import { ReactElement, Ref, forwardRef, useContext } from 'react';
import { isDefined } from '~common/helpers/types';
import { TextNodeOptional } from '~types/utils';
import { cssVar } from '~utils/design-tokens';
import { THEME_DATA_ATTRIBUTE, ThemeContext } from '~utils/theme';
import { TextTypographyStyle } from '../typography/Text';

export enum TooltipAlign {
  Start = 'start',
  Center = 'center',
  End = 'end',
}

export enum TooltipSide {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}

export interface TooltipProps {
  /**
   * The preferred alignment against the trigger. May change when collisions occur.
   * @default 'center'
   */
  align?: `${TooltipAlign}`;
  /**
   * The component that triggers the tooltip. It must be an interactive element to ensure the tooltip is accessible.
   *
   * It must be a single child element, so it can be wrapped by the tooltip trigger and should forward the ref
   * to it's underlying DOM element as well as the extra props.
   */
  children: ReactElement;
  /**
   * The content of the tooltip.
   * It can be a string or JSX.Element, in the case of a JSX.Element it doens't need to be wrapped in
   * a `<Text>` component, the tooltip already handles the typography styling for you. You can use `<b>`,
   * `<strong>`, `<i>`, `<em>` and other typography HTML tags also supported in the `<Text>` component.
   */
  content: TextNodeOptional | undefined;
  /**
   * Used to control/override the visibility of the tooltip, optional and not needed in most cases.
   */
  isOpen?: boolean;
  /**
   * The preferred side of the trigger to render against when open. Will be reversed when collisions occur.
   * @default 'top'
   */
  side?: `${TooltipSide}`;
}

/* This is the distance between the point of the arrow and the trigger */
const TOOLTIP_OFFSET = 4;

/* This is the padding between the edge of the tooltip and the arrow. */
const ARROW_PADDING = 12;

/**
 * **Tooltips must be attached to an interactive element to be accessible.**
 * Using a non-interactive element is acceptable if the trigger element has an accessible label
 * (aria-label or aria-description) that contains the same information.
 *
 * ### Stacking Context
 *
 * In order to have tooltips appear above the rest of the UI, it is probably necessary to have a [Stacking Context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context) for your app. This means the root should define a new one, or be wrapped in a component that does it.
 *
 * The easiest way to start a new Stacking Context is to provide it with the following CSS properties:
 *
 * ```CSS
 *   isolation: isolate;
 *   position: relative;
 * ```
 *
 * Since the tooltips are appended to the body, they are in the root Stacking Context. If other elements are also there, the z-index will determine which appears on top. By creating a new Stacking Context for your app, it ensures that z-indexed elements will stay within that context, while tooltips will be painted on top, in the parent Stacking Context.
 */
export const Tooltip = forwardRef<HTMLElement, TooltipProps>((props, ref) => {
  const { align, children, content, isOpen, side, ...radixProps } = props;
  const theme = useContext(ThemeContext);
  const themeOverrideProp = isDefined(theme) ? { [THEME_DATA_ATTRIBUTE]: theme } : {};

  /*
   * Undefined content, Boolean false content or empty strings should not render a tooltip
   */
  if (
    !isDefined(content) ||
    (typeof content === 'string' && content.length === 0) ||
    (typeof content === 'boolean' && !content)
  ) {
    return <>{children}</>;
  }

  return (
    <radixTooltip.Root open={isOpen}>
      <radixTooltip.Trigger asChild ref={ref as Ref<HTMLButtonElement> | undefined} {...radixProps}>
        {children}
      </radixTooltip.Trigger>
      <radixTooltip.Portal>
        <TooltipContent
          {...themeOverrideProp}
          align={align}
          arrowPadding={ARROW_PADDING}
          side={side}
          sideOffset={TOOLTIP_OFFSET}>
          {content}
          <TooltipArrow />
        </TooltipContent>
      </radixTooltip.Portal>
    </radixTooltip.Root>
  );
});

Tooltip.displayName = 'Tooltip';

const StyledTooltipContent = styled(TextTypographyStyle)`
  box-sizing: border-box;
  max-width: ${cssVar('sizes-overlays-max-width-default')};
  padding: ${cssVar('dimension-space-50')} ${cssVar('dimension-space-150')};
  border-radius: ${cssVar('border-radius-200')};
  box-shadow: ${cssVar('box-shadow-medium')};

  background-color: ${cssVar('color-surface-inverse-default')};
  font: ${cssVar('typography-text-small-medium')};
  color: ${cssVar('color-text-on-color')};
`;
StyledTooltipContent.displayName = 'StyledTooltipContent';

const TooltipContent = StyledTooltipContent.withComponent(radixTooltip.Content);
TooltipContent.displayName = 'TooltipContent';

const TooltipArrow = styled(radixTooltip.Arrow)`
  fill: ${cssVar('color-surface-inverse-default')};
  height: 7px;
`;
TooltipArrow.displayName = 'TooltipArrow';
