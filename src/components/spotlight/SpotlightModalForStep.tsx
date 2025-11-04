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

import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { TooltipRenderProps } from 'react-joyride';
import { Button, ButtonGroup, ButtonVariety } from '../buttons';
import { SpotlightModal } from './SpotlightModal';
import { SpotlightProps } from './SpotlightTypes';

export type SpotlightModalForStepProps = TooltipRenderProps &
  Pick<SpotlightProps, 'image' | 'stepXofYLabel'> & {
    /**
     * The CSS class name to add to the target element when it becomes active
     */
    activeTargetClassName: string;
  };

export function SpotlightModalForStep(props: Readonly<SpotlightModalForStepProps>) {
  const {
    activeTargetClassName,
    backProps,
    closeProps,
    continuous: isContinuous,
    image,
    index,
    isLastStep,
    primaryProps,
    size,
    skipProps: { 'aria-label': skipPropsAriaLabel, ...skipProps },
    step,
    stepXofYLabel,
    tooltipProps: spotlightModalOtherProps,
  } = props;

  const intl = useIntl();

  useEffect(() => {
    const target =
      typeof step.target === 'string' ? document.querySelector(step.target) : step.target;

    target?.classList.add(activeTargetClassName);

    return () => {
      target?.classList.remove(activeTargetClassName);
    };
  }, [activeTargetClassName, step]);

  let helperText;

  if (stepXofYLabel || size > 1) {
    helperText =
      stepXofYLabel?.(index + 1, size) ??
      intl.formatMessage(
        {
          defaultMessage: '{currentStepNumber} of {totalNumberOfSteps}',
          description: 'The helper text showing the step progress on a Spotlight',
          id: 'spotlight.step_x_of_y',
        },
        { currentStepNumber: index + 1, totalNumberOfSteps: size },
      );
  }

  return (
    <SpotlightModal
      actions={
        <ButtonGroup>
          <Button onClick={skipProps.onClick} variety={ButtonVariety.DefaultGhost}>
            {skipProps.title}
          </Button>

          {index > 0 && (
            <Button variety={ButtonVariety.DefaultGhost} {...backProps}>
              {backProps.title}
            </Button>
          )}

          {isContinuous && !isLastStep && (
            <Button variety={ButtonVariety.Primary} {...primaryProps}>
              {primaryProps.title}
            </Button>
          )}

          {(!isContinuous || isLastStep) && (
            <Button variety={ButtonVariety.Primary} {...closeProps}>
              {closeProps.title}
            </Button>
          )}
        </ButtonGroup>
      }
      bodyText={step.content}
      headerText={step.title}
      helperText={helperText}
      image={image}
      {...spotlightModalOtherProps}
    />
  );
}

SpotlightModalForStep.displayName = 'SpotlightModalForStep';
