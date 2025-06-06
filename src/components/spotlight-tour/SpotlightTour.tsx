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

import { forwardRef } from 'react';
import { useIntl } from 'react-intl';
import { TextNode } from '~types/utils';
import { Button, ButtonGroup, ButtonVariety } from '../buttons';
import { SpotlightTourModal, SpotlightTourModalProps } from './SpotlightTourModal';

export interface SpotlightTourProps extends SpotlightTourModalProps {
  /**
   * The label for the Back button - defaults to "Back" (optional)
   */
  backLabel?: TextNode;

  /**
   * The label for the Dismiss button - defaults to "Dismiss" (optional)
   */
  dismissLabel?: TextNode;

  /**
   * The label for the Next button - defaults to "Next" (optional)
   */
  nextLabel?: TextNode;

  /**
   * The callback function to call when the tour is dismissed
   */
  onDismiss: () => void;
}

export const SpotlightTour = forwardRef<HTMLDivElement, Readonly<SpotlightTourProps>>(
  (
    {
      backLabel,
      cardBodyText,
      cardHeaderText,
      dismissLabel,
      helperText,
      image,
      nextLabel,
      onDismiss,
      ...otherProps
    },
    ref,
  ) => {
    const intl = useIntl();

    return (
      <span ref={ref} {...otherProps}>
        <SpotlightTourModal
          actions={
            <ButtonGroup>
              <Button onClick={onDismiss} variety={ButtonVariety.DefaultGhost}>
                {dismissLabel ||
                  intl.formatMessage({
                    defaultMessage: 'Dismiss',
                    description:
                      'Label for the dismiss button at the bottom of a spotligh tour modal.',
                    id: 'spotlight_tour.dismiss',
                  })}
              </Button>
            </ButtonGroup>
          }
          {...{
            cardBodyText,
            cardHeaderText,
            helperText,
            image,
          }}
        />
      </span>
    );
  },
);

SpotlightTour.displayName = 'SpotlightTour';
