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

import { PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';
import ReactJoyride, { TooltipRenderProps } from 'react-joyride';
import { SpotlightModalForStep } from './SpotlightModalForStep';
import { SpotlightModalPlacement, SpotlightProps, SpotlightStep } from './SpotlightTypes';

/*--------------------------------------------------------------------------------------------------
 *   ^
 *  /!\  CAUTION! There is a "hack" in this component's implementation in order to circumvent an
 * -----
 *
 *  issue with the concurrent use of react-joyride and emotion.
 *
 *--------------------------------------------------------------------------------------------------
 *
 *  For each "step", ReactJoyride expects a required "content" (which we've renamed to "bodyText"
 *  for this component) and an optional "title" (renamed "helperText" here).
 *
 *  Without the hack, if any step has either of these attributes hold a value that is the return
 *  value of a "styled" call, the component render will result in a "Maximum call stack size
 *  exceeded" error.
 *
 *  For instance, using ReactJoyride directly instead of through this component:
 *
 *  const StyledP = styled.p`
 *    color: blue;
 *  `;
 *
 *  return (
 *    <ReactJoyride
 *      steps=[{
 *        content: <StyledP>Paragraph</StyledP>,
 *        target: '#the-target',
 *      }]
 *      { ...theOtherRequiredProps }
 *    />
 *  );
 *
 *  would result in a call stack size exception. Interestingly, wrapping the styled component inside
 *  another dummy component works. Doing this:
 *
 *  const StyledP = styled.p`
 *    color: blue;
 *  `;
 *
 *  const Wrapped = (props) => <StyledP {...props} />;
 *
 *  return (
 *    <ReactJoyride
 *      steps=[{
 *        content: <Wrapped>Paragraph</Wrapped>,
 *        target: '#the-target',
 *      }]
 *      { ...theOtherRequiredProps }
 *    />
 *  );
 *
 *  is OK, but not practical - we can't just decide to wrap the props, as the user might just as
 *  well pass a string, for instance.
 *
 *  We realized that if the "content" and "title" attributes for each step were not passed to
 *  ReactJoyride's "steps" prop, then the exception wasn't raised.
 *
 *  So we decided to do just that: pass a mapped "steps" array with an undefined "content" for each
 *  step ("title" is already optional), and retrieve the actual "bodyText" and "helperText" value
 *  for each step later from the "steps" prop passed to <Spotlight>, so they never go through
 *  ReactJoyride, and don't trigger the error.
 *
 -------------------------------------------------------------------------------------------------*/

export function Spotlight(props: Readonly<SpotlightProps>) {
  const {
    activeTargetClassName = 'active',
    backLabel,
    callback,
    closeLabel,
    image,
    isRunning = true,
    nextLabel,
    shouldDisableOverlayClose,
    skipLabel,
    stepIndex,
    steps,
    stepXofYLabel,
  } = props;

  const intl = useIntl();

  const labels = {
    back: intl.formatMessage({
      defaultMessage: 'Go back',
      description: 'The label for the Go back button on a Spotlight',
      id: 'spotlight.go_back',
    }),

    close: intl.formatMessage({
      defaultMessage: 'Close',
      description: 'The label for the Close button on a Spotlight',
      id: 'spotlight.close',
    }),

    next: intl.formatMessage({
      defaultMessage: 'Next',
      description: 'The label for the Next button on a Spotlight',
      id: 'spotlight.next',
    }),

    skip: intl.formatMessage({
      defaultMessage: 'Skip',
      description: 'The label for the Skip button on a Spotlight',
      id: 'spotlight.skip',
    }),
  };

  const hasMultipleSteps = steps.length > 1;

  return (
    <ReactJoyride
      callback={callback}
      continuous={hasMultipleSteps}
      disableOverlayClose={shouldDisableOverlayClose ?? hasMultipleSteps}
      disableScrolling
      floaterProps={{
        disableAnimation: true,
        hideArrow: true,
        offset: 0,
      }}
      locale={{
        back: backLabel ?? labels.back,
        close: closeLabel ?? labels.close,
        next: nextLabel ?? labels.next,
        nextLabelWithProgress: nextLabel ?? labels.next,
        skip: skipLabel ?? labels.skip,
      }}
      run={isRunning}
      stepIndex={stepIndex}
      /*--------------------------------------------------------------------------------------------
       *   ^
       *  /!\ CAUTION! Do *NOT* pass anything to any step's "content" or "title" properties here
       * -----
       *
       * but retrieve the values from the "steps" array later in the "tooltipComponent" prop below.
       *
       * See the explanation at the top of this file.
       *
       -------------------------------------------------------------------------------------------*/

      steps={steps.map(({ placement, target }: SpotlightStep) => ({
        content: undefined,
        disableBeacon: true,
        placement: placement ?? SpotlightModalPlacement.Left,
        target,
      }))}
      /*--
       * Have you read the warning above? Don't update unless you know what you're doing ;)
       --*/

      tooltipComponent={({
        step,
        ...stepModalPropsWithoutStep
      }: PropsWithChildren<TooltipRenderProps & { step: SpotlightStep }>) => (
        <SpotlightModalForStep
          {...{ activeTargetClassName, image, stepXofYLabel }}
          {...stepModalPropsWithoutStep}
          step={{
            ...step,
            /*--
             * We're getting the step's "bodytext" and "headerText" directly from the "steps" array
             * instead of the "step" prop that is passed to this component.
             *
             * See the explanation at the top of this file.
             --*/

            content: steps[stepModalPropsWithoutStep.index].bodyText,
            title: steps[stepModalPropsWithoutStep.index].headerText,

            /*--
             * Have you read the warning above? Don't update unless you know what you're doing ;)
             --*/
          }}
        />
      )}
    />
  );
}

Spotlight.displayName = 'Spotlight';
