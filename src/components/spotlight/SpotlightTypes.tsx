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

import { ReactNode } from 'react';
import { Callback as JoyrideCallback } from 'react-joyride';
import { TextNodeOptional } from '~types/utils';

export type { CallBackProps as SpotlightCallbackProps } from 'react-joyride';

export enum SpotlightModalPlacement {
  Auto = 'auto',
  Bottom = 'bottom',
  BottomEnd = 'bottom-end',
  BottomStart = 'bottom-start',
  Center = 'center',
  Left = 'left',
  LeftEnd = 'left-end',
  LeftStart = 'left-start',
  Right = 'right',
  RightEnd = 'right-end',
  RightStart = 'right-start',
  Top = 'top',
  TopEnd = 'top-end',
  TopStart = 'top-start',
}

export interface SpotlightModalProps {
  /**
   * The actions at the bottom, grouped in a ButtonGroup
   */
  actions: ReactNode;

  /**
   * The text to display in the modal body
   */
  bodyText: ReactNode;

  /**
   * CSS class name(s) to apply to the modal (optional)
   */
  className?: string;

  /**
   * The text to display in the modal header
   */
  headerText: ReactNode;

  /**
   * The helper text to display at the top of the modal (optional)
   */
  helperText?: TextNodeOptional;

  /**
   * The image to display at the top of the modal (optional)
   */
  image?: ReactNode;
}

export interface SpotlightStep extends Pick<SpotlightModalProps, 'bodyText' | 'headerText'> {
  /**
   * The placement of the modal. It will re-position itself if there's no space available
   */
  placement?: `${SpotlightModalPlacement}`;

  /**
   * The target for the step. It can be a CSS selector or an HTMLElement directly (but using refs
   * created in the same render would require an additional render to be set).
   */
  target: HTMLElement | string;
}

export interface SpotlightProps {
  /**
   * The CSS class name to add to the target element when it becomes active - defaults to "active" (optional)
   */
  activeTargetClassName?: string;

  /**
   * The label for the Back button - defaults to "Back" (optional)
   */
  backLabel?: string;

  /**
   * A function called when the Spotlight state changes (optional) - see https://docs.react-joyride.com/props
   */
  callback?: JoyrideCallback;

  /**
   * The label for the Close button - defaults to "Close" (optional)
   */
  closeLabel?: string;

  /**
   * The image to display at the top of each spotlight modal (optional)
   */
  image?: ReactNode;

  /**
   * Is the Spotlight tour running? - defaults to true, set to false to stop (optional)
   */
  isRunning?: boolean;

  /**
   * The label for the Next button - defaults to "Next" (optional)
   */
  nextLabel?: string;

  /**
   * Shoud we disable closing the spotlight when clicking the overlay?
   * Defaults to false when there's only one step, true otherwise (optional)
   */
  shouldDisableOverlayClose?: boolean;

  /**
   * The label for the Skip button - defaults to "Skip" (optional)
   */
  skipLabel?: string;

  /**
   * The index of the step to display if you want to manually control the progression of the tour.
   * You can use information from the "callback" function to do this. You should not use this prop
   * unless the default automatic control of the tour's progression does not fit your need.
   * Defaults to undefined (optional)
   */
  stepIndex?: number;

  /**
   * The steps for this Spotlight tour
   */
  steps: SpotlightStep[];

  /**
   * A function to generate the step's helper text based on the current step number and the total
   * number of steps. Defaults to the Intl formatted message "{0} of {1}", pass `() => ""` to not
   * display any helper text (optional).
   */
  stepXofYLabel?: (currentStepNumber: number, totalNumberOfSteps: number) => string;
}
