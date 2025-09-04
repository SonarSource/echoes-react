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
import { forwardRef, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { isDefined } from '~common/helpers/types';
import { useButtonClickHandler } from '../buttons/Button';
import { ButtonIconProps } from '../buttons/ButtonIcon';
import { ButtonIconStyled, ButtonText } from '../buttons/ButtonStyles';
import { ButtonBaseProps } from '../buttons/ButtonTypes';
import {
  IconChevronDown,
  IconInfo,
  IconSeverityBlocker,
  IconSeverityHigh,
  IconSeverityLow,
  IconSeverityMedium,
} from '../icons';
import { IconFilledProps } from '../icons/IconWrapper';
import { SpinnerOverrideColor } from '../spinner/SpinnerOverrideColor';
import { Tooltip } from '../tooltip';

import { cssVar } from '~utils/design-tokens';

export enum BadgeSeverityLevel {
  Blocker = 'blocker',
  High = 'high',
  Medium = 'medium',
  Low = 'low',
  Info = 'info',
}

export enum BadgeSeverityVariety {
  Clickable = 'clickable',
  Dropdown = 'dropdown',
  Static = 'static',
}

type excludedButtonProps = 'isLoading' | 'size' | 'variety' | 'isDisabled';
type InheritedButtonProps = Omit<ButtonBaseProps, excludedButtonProps> &
  Pick<ButtonIconProps, 'isIconFilled' | 'tooltipContent' | 'tooltipOptions'>;

export interface BadgeSeverityProps extends InheritedButtonProps {
  /**
   * Optional React component to render an icon on the left side of the badge.
   */
  IconLeft?: React.ForwardRefExoticComponent<
    IconFilledProps & React.RefAttributes<HTMLSpanElement>
  >;

  /**
   * The ARIA label for the button. Should include the quality & severity values.
   */
  ariaLabel: string;

  /**
   * Indicates whether the badge is in a loading state, which will replace the button's icon with the spinner
   */
  isLoading?: boolean;

  /**
   * Text content of the badge
   */
  quality: string;

  /**
   * Specifies the severity level of the badge, to style it accordingly.
   * Must match `BadgeSeverityLevel`.
   */
  severity: `${BadgeSeverityLevel}`;

  /**
   * The variety of the badge.
   */
  variety?: `${BadgeSeverityVariety}`;
}

/**
 * BadgeSeverity is a visual indicator used to quickly communicate an issue's categorizations and severity.
 * It can be used as a static badge, or clickable with a popover explaining the severity or as a dropdown
 * to change the severity of an issue.
 */
export const BadgeSeverity = forwardRef<HTMLButtonElement, BadgeSeverityProps>((props, ref) => {
  const {
    IconLeft,
    ariaLabel,
    className,
    hasAutoFocus = false,
    isIconFilled = false,
    isLoading = false,
    onClick,
    quality,
    severity,
    enablePreventDefault = false,
    enableStopPropagation = false,
    tooltipContent = props.ariaLabel,
    tooltipOptions = {},
    variety = BadgeSeverityVariety.Clickable,
    ...htmlProps
  } = props;

  const isDisabled = variety === BadgeSeverityVariety.Static;

  const handleClick = useButtonClickHandler({
    ...props,
    isDisabled,
  });

  const { formatMessage } = useIntl();

  const SeverityIcon = BADGE_SEVERITY_ICON[severity];
  const BADGE_SEVERITY_LABEL = {
    [BadgeSeverityLevel.Blocker]: formatMessage({
      id: 'severity_impact.BLOCKER',
      defaultMessage: 'Blocker',
      description: 'Label for blocker severity level',
    }),
    [BadgeSeverityLevel.High]: formatMessage({
      id: 'severity_impact.HIGH',
      defaultMessage: 'High',
      description: 'Label for high severity level',
    }),
    [BadgeSeverityLevel.Info]: formatMessage({
      id: 'severity_impact.INFO',
      defaultMessage: 'Info',
      description: 'Label for info severity level',
    }),
    [BadgeSeverityLevel.Low]: formatMessage({
      id: 'severity_impact.LOW',
      defaultMessage: 'Low',
      description: 'Label for low severity level',
    }),
    [BadgeSeverityLevel.Medium]: formatMessage({
      id: 'severity_impact.MEDIUM',
      defaultMessage: 'Medium',
      description: 'Label for medium severity level',
    }),
  };
  const severityLabel = BADGE_SEVERITY_LABEL[severity];

  return (
    <StyledWrapper
      className={className}
      css={useMemo(
        () => ({
          ...BADGE_SEVERITY_STYLES[severity],
        }),
        [severity],
      )}>
      <StyledContent>
        {isDefined(IconLeft) && <IconLeft isFilled={isIconFilled} />}

        <ButtonText>{quality}</ButtonText>
      </StyledContent>

      <Tooltip content={tooltipContent} {...tooltipOptions}>
        <StyledButtonIconStyled
          aria-label={ariaLabel}
          // Everything above this line can be overridden by the `htmlProps` object
          {...htmlProps}
          autoFocus={hasAutoFocus}
          css={useMemo(
            () => ({
              '--button-padding': cssVar('dimension-space-75'),
              '--button-height': 'auto',
              '--button-width': 'auto',

              '--button-border': `inherit solid ${cssVar('border-width-default')}`,
              '--button-background': 'var(--badge-severity-icon-background-color)',
              '--button-background-focus': 'var(--badge-severity-icon-background-color)',
              '--button-background-disabled': 'var(--badge-severity-icon-background-color)',
              '--button-background-hover': 'var(--badge-severity-icon-background-color-hover)',
              '--button-background-active': 'var(--badge-severity-icon-background-color-hover)',
            }),
            [],
          )}
          disabled={isDisabled}
          onClick={handleClick}
          ref={ref}
          type="button">
          <StyledSeverityContent>
            <SpinnerOverrideColor
              css={{
                marginRight: cssVar('dimension-space-50'),
              }}
              isLoading={isLoading}>
              <StyledSeverityIcon>
                <SeverityIcon />
              </StyledSeverityIcon>
            </SpinnerOverrideColor>
            <StyledSeverityText>{severityLabel}</StyledSeverityText>
            {variety === BadgeSeverityVariety.Dropdown && (
              <StyledDropdownIndicator>
                <IconChevronDown />
              </StyledDropdownIndicator>
            )}
          </StyledSeverityContent>
        </StyledButtonIconStyled>
      </Tooltip>
    </StyledWrapper>
  );
});

BadgeSeverity.displayName = 'BadgeSeverity';

const StyledWrapper = styled.div`
  isolation: isolate; // Prevents the z-index changes of the items inside from affecting layers outside the BadgeSeverity

  display: inline-flex;
  flex-direction: row;
  box-sizing: border-box;

  color: var(--badge-severity-color);
  background-color: var(--badge-severity-background-color);

  font: ${cssVar('typography-text-small-medium')};

  // Using outline so that the border doesn't take space in the flow
  outline: var(--badge-severity-border-color) solid ${cssVar('border-width-default')};
  border-radius: ${cssVar('border-radius-200')};
`;
StyledWrapper.displayName = 'StyledWrapper';

const StyledContent = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${cssVar('dimension-space-50')} ${cssVar('dimension-space-75')};
  gap: ${cssVar('dimension-space-50')};
`;
StyledContent.displayName = 'StyledContent';

const StyledSeverityContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > *:not(:first-child):not(:last-child) {
    margin-right: ${cssVar('dimension-space-50')};
  }
`;
StyledSeverityContent.displayName = 'StyledSeverityContent';

const StyledSeverityText = styled.span`
  font: ${cssVar('typography-text-small-medium')};
`;
StyledSeverityText.displayName = 'StyledSeverityText';

const StyledSeverityIcon = styled.span`
  color: var(--badge-severity-icon-color);
`;
StyledSeverityIcon.displayName = 'StyledSeverityIcon';

const StyledDropdownIndicator = styled.div`
  margin-left: calc(${cssVar('dimension-space-25')} * -1);
  margin-right: calc(${cssVar('dimension-space-25')} * -1);
`;
StyledDropdownIndicator.displayName = 'StyledDropdownIndicator';

const StyledButtonIconStyled = styled(ButtonIconStyled)`
  border-radius: ${cssVar('border-radius-none')} ${cssVar('border-radius-200')}
    ${cssVar('border-radius-200')} ${cssVar('border-radius-none')};

  // This allows the outline to appear above the wrapper's border, and with uniform radii
  z-index: 1;
  &:focus,
  &:focus-visible {
    border-radius: ${cssVar('border-radius-200')};
  }

  // Prevent disabled-specific styles
  &:disabled,
  &:disabled:has(:hover, :active, :focus, :focus-visible) {
    color: var(--button-color);
    background-color: var(--button-background-disabled);

    border: var(--button-border);
  }
`;
StyledButtonIconStyled.displayName = 'StyledButtonIconStyled';

const BADGE_SEVERITY_ICON = {
  [BadgeSeverityLevel.Blocker]: IconSeverityBlocker,
  [BadgeSeverityLevel.High]: IconSeverityHigh,
  [BadgeSeverityLevel.Info]: IconInfo,
  [BadgeSeverityLevel.Low]: IconSeverityLow,
  [BadgeSeverityLevel.Medium]: IconSeverityMedium,
};

const BADGE_SEVERITY_STYLES = {
  [BadgeSeverityLevel.Blocker]: {
    '--badge-severity-color': cssVar('severity-badge-colors-foreground-blocker-text-default'),
    '--badge-severity-border-color': cssVar('severity-badge-colors-borders-blocker-default'),
    '--badge-severity-background-color': cssVar(
      'severity-badge-colors-background-severity-blocker-prefix-default',
    ),
    '--badge-severity-icon-background-color': cssVar(
      'severity-badge-colors-background-severity-blocker-suffix-default',
    ),
    '--badge-severity-icon-background-color-hover': cssVar(
      'severity-badge-colors-background-severity-blocker-suffix-hover',
    ),
    '--badge-severity-icon-color': cssVar('severity-badge-colors-foreground-blocker-icon-default'),
  },
  [BadgeSeverityLevel.High]: {
    '--badge-severity-color': cssVar('severity-badge-colors-foreground-high-text-default'),
    '--badge-severity-border-color': cssVar('severity-badge-colors-borders-high-default'),
    '--badge-severity-background-color': cssVar(
      'severity-badge-colors-background-severity-high-prefix-default',
    ),
    '--badge-severity-icon-background-color': cssVar(
      'severity-badge-colors-background-severity-high-suffix-default',
    ),
    '--badge-severity-icon-background-color-hover': cssVar(
      'severity-badge-colors-background-severity-high-suffix-hover',
    ),
    '--badge-severity-icon-color': cssVar('severity-badge-colors-foreground-high-icon-default'),
  },
  [BadgeSeverityLevel.Info]: {
    '--badge-severity-color': cssVar('severity-badge-colors-foreground-info-text-default'),
    '--badge-severity-border-color': cssVar('severity-badge-colors-borders-info-default'),
    '--badge-severity-background-color': cssVar(
      'severity-badge-colors-background-severity-info-prefix-default',
    ),
    '--badge-severity-icon-background-color': cssVar(
      'severity-badge-colors-background-severity-info-suffix-default',
    ),
    '--badge-severity-icon-background-color-hover': cssVar(
      'severity-badge-colors-background-severity-info-suffix-hover',
    ),
    '--badge-severity-icon-color': cssVar('severity-badge-colors-foreground-info-icon-default'),
  },
  [BadgeSeverityLevel.Low]: {
    '--badge-severity-color': cssVar('severity-badge-colors-foreground-low-text-default'),
    '--badge-severity-border-color': cssVar('severity-badge-colors-borders-low-default'),
    '--badge-severity-background-color': cssVar(
      'severity-badge-colors-background-severity-low-prefix-default',
    ),
    '--badge-severity-icon-background-color': cssVar(
      'severity-badge-colors-background-severity-low-suffix-default',
    ),
    '--badge-severity-icon-background-color-hover': cssVar(
      'severity-badge-colors-background-severity-low-suffix-hover',
    ),
    '--badge-severity-icon-color': cssVar('severity-badge-colors-foreground-low-icon-default'),
  },
  [BadgeSeverityLevel.Medium]: {
    '--badge-severity-color': cssVar('severity-badge-colors-foreground-medium-text-default'),
    '--badge-severity-border-color': cssVar('severity-badge-colors-borders-medium-default'),
    '--badge-severity-background-color': cssVar(
      'severity-badge-colors-background-severity-medium-prefix-default',
    ),
    '--badge-severity-icon-background-color': cssVar(
      'severity-badge-colors-background-severity-medium-suffix-default',
    ),
    '--badge-severity-icon-background-color-hover': cssVar(
      'severity-badge-colors-background-severity-medium-suffix-hover',
    ),
    '--badge-severity-icon-color': cssVar('severity-badge-colors-foreground-medium-icon-default'),
  },
};
