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
import { cssVar } from '~utils/design-tokens';
import { ButtonStyled } from '../buttons/ButtonStyles';
import { ButtonCommonProps } from '../buttons/ButtonTypes';

const MARGIN_INDICATOR_HEIGHT = 20;
const MARGIN_INDICATOR_WIDTH = 6;

export enum MarginIndicatorType {
  Duplication = 'duplication',
  Covered = 'covered',
  PartiallyCovered = 'partiallycovered',
  UnCovered = 'uncovered',
}

interface MarginIndicatorBaseProps {
  ariaLabel: string;
  indicatorType: `${MarginIndicatorType}`;
}

type MarginIndicatorStaticProps = MarginIndicatorBaseProps & {
  isInteractive?: false;
  ref?: React.Ref<SVGSVGElement>;
};

type InheritedButtonProps = Pick<ButtonCommonProps, 'onClick'>;

type MarginIndicatorInteractiveProps = MarginIndicatorBaseProps & {
  isInteractive: true;
  ref?: React.Ref<HTMLButtonElement>;
} & InheritedButtonProps;

export type MarginIndicatorProps = MarginIndicatorStaticProps | MarginIndicatorInteractiveProps;

const PATTERN = {
  [MarginIndicatorType.Duplication]: (
    <rect fill={cssVar('margin-indicator-colors-background-duplication')} height="20" width="6" />
  ),
  [MarginIndicatorType.Covered]: (
    <rect fill={cssVar('margin-indicator-colors-background-covered')} height="20" width="6" />
  ),
  [MarginIndicatorType.PartiallyCovered]: (
    <path
      d="M0 15L6 20H0V15ZM0 5L6 10V15L0 10V5ZM6 5L0 0H6V5Z"
      fill={cssVar('margin-indicator-colors-background-partially-covered')}
    />
  ),
  [MarginIndicatorType.UnCovered]: (
    <>
      <rect fill={cssVar('margin-indicator-colors-background-uncovered')} height="20" width="2" />
      <rect
        fill={cssVar('margin-indicator-colors-background-uncovered')}
        height="20"
        width="2"
        x="4"
      />
    </>
  ),
};

interface MarginIndicatorSvgProps {
  ariaLabel?: string;
  indicatorType: `${MarginIndicatorType}`;
  ref?: React.Ref<SVGSVGElement>;
}

function MarginIndicatorSvg({
  ariaLabel,
  indicatorType,
  ref,
  ...radixProps
}: Readonly<MarginIndicatorSvgProps>) {
  return (
    <svg
      {...radixProps}
      fill="none"
      height={MARGIN_INDICATOR_HEIGHT}
      ref={ref}
      viewBox={`0 0 ${MARGIN_INDICATOR_WIDTH} ${MARGIN_INDICATOR_HEIGHT}`}
      width={MARGIN_INDICATOR_WIDTH}
      xmlns="http://www.w3.org/2000/svg">
      {ariaLabel && <title>{ariaLabel}</title>}
      {PATTERN[indicatorType]}
    </svg>
  );
}

MarginIndicatorSvg.displayName = 'MarginIndicatorSvg';

export function MarginIndicator(props: MarginIndicatorProps) {
  const { ariaLabel, indicatorType, isInteractive, ref, ...radixProps } = props;

  if (isInteractive) {
    return (
      <IndicatorButton
        aria-label={ariaLabel}
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        {...radixProps}>
        <MarginIndicatorSvg indicatorType={indicatorType} />
      </IndicatorButton>
    );
  }

  return (
    <MarginIndicatorSvg
      ariaLabel={ariaLabel}
      indicatorType={indicatorType}
      ref={ref as React.Ref<SVGSVGElement>}
      {...radixProps}
    />
  );
}
MarginIndicator.displayName = 'MarginIndicator';

const IndicatorButton = styled(ButtonStyled)`
  display: block;
  border: none;
  border-radius: unset;
  padding: 0;
  height: ${MARGIN_INDICATOR_HEIGHT}px;
  width: ${MARGIN_INDICATOR_WIDTH}px;

  &:focus-visible {
    border-radius: ${cssVar('border-radius-400')};

    position: relative;
    z-index: 1;
  }
`;
IndicatorButton.displayName = 'IndicatorButton';
