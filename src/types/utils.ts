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

import { JSX } from 'react';

/**
 * Represents text content that can be a JSX element, string, or iterable of TextNode.
 * Used for rendering text content in components.
 */
export type TextNode = JSX.Element | string | Iterable<TextNode>;

/**
 * Optional version of TextNode that also accepts boolean, null values, or iterables of TextNodeOptional.
 * Useful for conditional rendering where content might be empty or falsy.
 */
export type TextNodeOptional = TextNode | boolean | null | Iterable<TextNodeOptional>;

/**
 * Props interface for using a visible text label.
 * Provides standard labeling with optional ARIA label override and ID.
 */
export interface PropsLabel {
  /**
   * Custom ARIA label to override the visible label for screen readers (optional).
   */
  ariaLabel?: string;
  /**
   * Forbidden to use with label or ariaLabel.
   */
  ariaLabelledBy?: never;
  /**
   * HTML ID attribute for the component (optional).
   */
  id?: string;
  /**
   * The visible text label content.
   */
  label: TextNode;
}

/**
 * Props interface that extends PropsLabel with optional help text.
 * Combines visible labeling with supplementary help information.
 */
export interface PropsLabelAndHelpText extends PropsLabel {
  /**
   * Additional help text to provide guidance or context (optional).
   */
  helpText?: TextNodeOptional;
}

/**
 * Props interface uses only ARIA labeling without visible text.
 * Used when the component doesn't need a visible label but requires accessibility support.
 */
export interface PropsAriaLabel {
  /**
   * ARIA label for screen readers and accessibility tools.
   */
  ariaLabel: string;
  /**
   * Forbidden to use with ariaLabel.
   */
  ariaLabelledBy?: never;
  /**
   * HTML ID attribute for the component (optional).
   */
  id?: string;
  /**
   * Cannot be used with ARIA only labeling.
   */
  label?: never;
}

/**
 * Props interface that extends PropsAriaLabel and forbids helpText usage without a visible label text.
 */
export interface PropsAriaLabelAndHelpText extends PropsAriaLabel {
  /**
   * Help text is not supported with ARIA-only labeling.
   */
  helpText?: never;
}

/**
 * Props interface for components labeled by referencing another element's ID.
 * Used when the label content exists elsewhere in the DOM.
 */
export interface PropsAriaLabelledBy {
  /**
   * Forbidden to use with ariaLabelledBy.
   */
  ariaLabel?: never;
  /**
   * ID of the element that labels this component.
   */
  ariaLabelledBy: string;
  /**
   * HTML ID attribute for the component (optional).
   */
  id?: string;
  /**
   * Forbidden to use with ariaLabelledBy.
   */
  label?: never;
}

/**
 * Props interface that extends PropsAriaLabelledBy and forbids helpText usage without a visible label text.
 */
export interface PropsAriaLabelledByAndHelpText extends PropsAriaLabelledBy {
  /**
   * Help text is not supported without a visible label text.
   */
  helpText?: never;
}

/**
 * Props interface for components that rely on external labeling via ID association.
 * Used when the component is labeled by form labels or other external elements.
 */
export interface PropsAriaLabelViaId {
  /**
   * Forbidden to use with ID-based labeling.
   */
  ariaLabel?: never;
  /**
   * Forbidden to use with ID-based labeling.
   */
  ariaLabelledBy?: never;
  /**
   * HTML ID attribute for the component (required for external labeling).
   */
  id: string;
  /**
   * Forbidden to use with ID-based labeling.
   */
  label?: never;
}

/**
 * Props interface that extends PropsAriaLabelViaId and forbids helpText usage without a visible label text.
 */
export interface PropsAriaLabelViaIdAndHelpText extends PropsAriaLabelViaId {
  /**
   * Help text is not supported without a visible label text.
   */
  helpText?: never;
}

/**
 * Union type for component props that support labeling and forbids helpText usage without a visible label text.
 *
 * **Labeling Options:**
 * - `PropsLabelAndHelpText`: Visible text label with optional helpText
 * - `PropsAriaLabelAndHelpText`: ARIA label only (no helpText support)
 * - `PropsAriaLabelledByAndHelpText`: Referenced labeling (no helpText support)
 * - `PropsAriaLabelViaIdAndHelpText`: ID-based external labeling (no helpText support)
 *
 * @template T - The base props interface to extend with labeling capabilities
 */
export type PropsWithLabelsAndHelpText<T> = T &
  (
    | PropsLabelAndHelpText
    | PropsAriaLabelAndHelpText
    | PropsAriaLabelledByAndHelpText
    | PropsAriaLabelViaIdAndHelpText
  );

/**
 * Union type for component props that support labeling and manage themselves allowing or not helpText usage.
 *
 * Useful when helpText should not be authorized at all. Or when helpText should always be authorized.
 *
 * **Labeling Options:**
 * - `PropsLabel`: Visible text label
 * - `PropsAriaLabel`: ARIA label only
 * - `PropsAriaLabelledBy`: Referenced labeling via element ID
 * - `PropsAriaLabelViaId`: ID-based external labeling
 *
 * @template T - The base props interface to extend with labeling capabilities
 */
export type PropsWithLabels<T> = T &
  (PropsLabel | PropsAriaLabel | PropsAriaLabelledBy | PropsAriaLabelViaId);
