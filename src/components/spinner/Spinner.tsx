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

import classNames from 'classnames';
import { ReactNode, forwardRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { isDefined } from '~common/helpers/types';
import {
  SpinnerAriaLabel,
  SpinnerInner,
  SpinnerLabel,
  SpinnerPlaceholder,
  SpinnerStyled,
  SpinnerWrapper,
} from './SpinnerStyles';

export interface SpinnerProps {
  ariaLabel?: string;
  className?: string;
  children?: ReactNode;
  hasPlaceholder?: boolean;
  isLoading?: boolean;
  label?: ReactNode;
  wrapperClassName?: string;
}

export const Spinner = forwardRef<HTMLOutputElement, SpinnerProps>((props, ref) => {
  const {
    ariaLabel,
    className,
    children,
    hasPlaceholder,
    isLoading = true,
    label,
    wrapperClassName,
    ...radixProps
  } = props;

  const isInline = children === undefined;

  return (
    <>
      <SpinnerWrapper className={wrapperClassName} inline={isInline}>
        <SpinnerInner
          {...radixProps}
          aria-live="polite"
          className={classNames(
            {
              it__loading: isLoading,
            },
            className,
          )}
          /** Needs to also be inline if a visible label is present next to the Spinner icon */
          inline={isInline || isDefined(label)}
          isLoading={isLoading}
          ref={ref}>
          <SpinnerStyled
            /** Needs to also be inline if a visible label is present next to the Spinner icon */
            inline={isInline || isDefined(label)}
          />
          {isLoading &&
            (label ? (
              <SpinnerLabel>{label}</SpinnerLabel>
            ) : (
              <SpinnerAriaLabel>
                {ariaLabel ?? (
                  <FormattedMessage
                    defaultMessage="Loading..."
                    description="aria-label text, to indicate that there is a spinner rotating in this place"
                    id="loading"
                  />
                )}
              </SpinnerAriaLabel>
            ))}
        </SpinnerInner>
      </SpinnerWrapper>
      {!isLoading &&
        (children ?? (hasPlaceholder && <SpinnerPlaceholder className={className} />) ?? null)}
    </>
  );
});

Spinner.displayName = 'Spinner';
