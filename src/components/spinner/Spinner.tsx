/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import classNames from 'classnames';
import { ReactNode, forwardRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { screenReaderOnly } from '~common/helpers/styles';

interface Props {
  ariaLabel?: string;
  className?: string;
  children?: ReactNode;
  hasPlaceholder?: boolean;
  isLoading?: boolean;
  label?: ReactNode;
  wrapperClassName?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, Props>((props, ref) => {
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

  return (
    <>
      <SpinnerWrapper className={wrapperClassName} inline={children === undefined}>
        <SpinnerInner
          {...radixProps}
          aria-live="polite"
          className={classNames({
            it__loading: isLoading,
          })}
          isLoading={isLoading}
          ref={ref}
          role="status">
          <SpinnerStyled className={className} />
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
        (children ?? (hasPlaceholder && <Placeholder className={className} />) ?? null)}
    </>
  );
});

Spinner.displayName = 'Spinner';

const SpinnerWrapper = styled.span<{ inline: boolean }>`
  display: ${(props) => (props.inline ? 'inline-block' : 'block')};
  position: relative;
  ${(props) => (props.inline ? 'margin: 0 var(--echoes-dimension-space-50);' : '')}
`;

const SpinnerInner = styled.span<{ isLoading: boolean }>`
  position: relative;
  display: inline-block;
  height: var(--echoes-dimension-size-200);
  ${({ isLoading }) => (isLoading ? '' : screenReaderOnly)}
`;

const SpinnerAriaLabel = styled.span`
  ${screenReaderOnly};
`;

const SpinnerLabel = styled.span`
  margin-left: var(--echoes-dimension-space-50);
`;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-360deg);
  }
`;

const SpinnerStyled = styled.span`
  border: 2px solid transparent;
  background:
    linear-gradient(0deg, var(--echoes-color-background-accent-default) 50%, transparent 50% 100%)
      border-box,
    linear-gradient(90deg, var(--echoes-color-background-accent-default) 25%, transparent 75% 100%)
      border-box;
  mask:
    linear-gradient(#fff 0 0) padding-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: ${spinAnimation} 1s infinite linear;

  display: inline-block;
  box-sizing: border-box;
  height: var(--echoes-dimension-size-200);
  width: var(--echoes-dimension-size-200);
  border-radius: var(--echoes-border-radius-full);
  vertical-align: text-bottom;
`;

const Placeholder = styled.div`
  display: inline-block;
  vertical-align: text-bottom;
  visibility: hidden;
  height: var(--echoes-dimension-size-200);
  width: var(--echoes-dimension-size-200);
`;
