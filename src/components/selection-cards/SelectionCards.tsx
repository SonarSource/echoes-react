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
import * as RadioGroup from '@radix-ui/react-radio-group';
import { forwardRef, useId } from 'react';
import { isDefined, isStringDefined } from '~common/helpers/types';
import { GroupAlignment } from '~types/GroupAlignment';
import { PropsAriaLabel, PropsAriaLabelledBy } from '~types/utils';
import { RadioButtonGroupProps, RadioOption } from '../radio-button-group/RadioButtonTypes';
import { HelperText, Label } from '../typography';

export type SelectionCardOption = RadioOption & {
  /**
   * Illustration to display at the top (optional)
   */
  illustration?: React.ReactNode;
};

interface BaseProps
  extends Pick<
    RadioButtonGroupProps,
    'alignment' | 'className' | 'isDisabled' | 'onChange' | 'value'
  > {
  /**
   * Callback fired when the selected card changes.
   *
   * @param value - The value of the newly selected card.
   */
  onChange: (value: string) => void;

  /**
   * Array of options to display as Cards.
   */
  options: SelectionCardOption[];

  /**
   * The currently selected value (controlled).
   */
  value: string;
}

export type SelectionCardsProps = BaseProps & (PropsAriaLabel | PropsAriaLabelledBy);

/**
 * This component works like Radio Buttons, but isn't meant for forms.
 * It shows a card for each option.
 *
 * Example:
 *
 * ```
 *  <SelectionCards
 *    alignment: GroupAlignment.Horizontal,
 *    ariaLabel: 'Choose your favorite number',
 *    onChange: setFavoriteNumber
 *    options: [
 *      { label: 'One', value: '1' },
 *      { label: 'Two', value: '2' },
 *      { label: 'Three', value: '3' },
 *    ],
 *    value: favoriteNumber
 *  />
 * ```
 */
export const SelectionCards = forwardRef<HTMLDivElement, SelectionCardsProps>((props, ref) => {
  const {
    alignment = GroupAlignment.Vertical,
    ariaLabel,
    ariaLabelledBy,
    className,
    id,
    isDisabled: disabled,
    onChange,
    options,
    value,
    ...radixRadioGroupProps
  } = props;

  const defaultId = `${useId()}selection-cards`;

  return (
    <SelectionCardsRoot
      {...radixRadioGroupProps}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={className}
      data-alignment={alignment}
      disabled={disabled}
      id={id ?? defaultId}
      onValueChange={onChange}
      ref={ref}
      value={value}>
      {options.map(({ isDisabled: disabledOption, ...o }) => (
        <SelectionCard
          isDisabled={disabled ? true : disabledOption} // Group disabled takes precedence
          key={o.value}
          {...o}
        />
      ))}
    </SelectionCardsRoot>
  );
});

SelectionCards.displayName = 'SelectionCards';

function SelectionCard(props: Readonly<SelectionCardOption>) {
  const { ariaLabel, helpText, illustration, isDisabled, label, value } = props;

  /*
   * Although the HTML spec defines buttons as valid targets for labels,
   * some Screen Readers have issues with those:
   * https://github.com/dequelabs/axe-core/issues/3696#issuecomment-1665575742
   * So here we force an aria-label:
   */
  const inputLabel = ariaLabel ?? (typeof label === 'string' ? label : undefined);

  return (
    <StyledSelectionCard aria-label={inputLabel} disabled={isDisabled} value={value}>
      {illustration && <IllustrationContainer>{illustration}</IllustrationContainer>}
      <SelectionCardContentWrapper hasIllustration={isDefined(illustration)}>
        <Label>{label}</Label>
        {isDefined(helpText) && (typeof helpText !== 'string' || isStringDefined(helpText)) && (
          <StyledHelperText {...(isDisabled ? { 'data-disabled': true } : {})}>
            {helpText}
          </StyledHelperText>
        )}
      </SelectionCardContentWrapper>
    </StyledSelectionCard>
  );
}

SelectionCard.displayName = 'SelectionCard';

const SelectionCardsRoot = styled(RadioGroup.Root)`
  gap: var(--echoes-dimension-space-200);
  display: inline-flex;
  flex-direction: column;

  &[data-alignment='horizontal'] {
    flex-direction: row;
  }
`;
SelectionCardsRoot.displayName = 'SelectionCardsRoot';

const StyledHelperText = styled(HelperText)`
  &[data-disabled] {
    color: var(--echoes-color-text-disabled);
  }
`;
StyledHelperText.displayName = 'StyledHelperText';

const SelectionCardContentWrapper = styled.div<{ hasIllustration: boolean }>`
  display: inline-flex;
  flex-direction: column;
  align-items: start;
  gap: var(--echoes-dimension-space-100);

  padding: var(--echoes-dimension-space-200);

  [data-state='checked'] & {
    /* Remove the extra width of the border from the padding */
    padding: calc(
      var(--echoes-dimension-space-200) -
        (var(--echoes-focus-border-width-default) - var(--echoes-border-width-default))
    );

    ${(props) => props.hasIllustration && 'padding-top: var(--echoes-dimension-space-200);'}
  }
`;
SelectionCardContentWrapper.displayName = 'SelectionCardContentWrapper';

const StyledSelectionCard = styled(RadioGroup.Item)`
  appearence: none;

  display: inline-flex;
  flex-direction: column;

  flex: 1;

  text-align: start;

  background: var(--echoes-color-background-default);
  border: var(--echoes-border-width-default) solid var(--echoes-color-border-bold);
  border-radius: var(--echoes-border-radius-400);

  box-shadow: var(--echoes-box-shadow-xsmall);

  padding: 0;

  cursor: pointer;

  & label {
    cursor: inherit;
  }

  &:hover {
    background-color: var(--echoes-color-background-default-hover);
    box-shadow: var(--echoes-box-shadow-small);
  }

  &[data-state='checked'] {
    border-color: var(--echoes-color-background-accent-default);
    border-width: var(--echoes-focus-border-width-default);
    box-shadow: var(--echoes-box-shadow-small);

    &:not(:disabled):hover {
      border-color: var(--echoes-color-background-selected-bold-hover);
    }
  }

  &:focus-visible {
    outline: var(--echoes-color-focus-default) solid var(--echoes-focus-border-width-default);
    outline-offset: var(--echoes-focus-border-offset-default);
  }

  &:disabled {
    cursor: default;
    background-color: var(--echoes-color-background-disabled);
    border-color: var(--echoes-color-border-disabled);
    box-shadow: none;
  }
`;

StyledSelectionCard.displayName = 'StyledSelectionCard';

const IllustrationContainer = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  justify-content: center;
  width: 100%;

  border-radius: calc(var(--echoes-border-radius-400) - var(--echoes-border-width-default))
    calc(var(--echoes-border-radius-400) - var(--echoes-border-width-default)) 0 0;

  [data-state='checked'] & {
    border-radius: calc(var(--echoes-border-radius-400) - var(--echoes-focus-border-width-default))
      calc(var(--echoes-border-radius-400) - var(--echoes-focus-border-width-default)) 0 0;
  }

  overflow: hidden;
  box-sizing: content;

  & img,
  & svg {
    height: 100%;
    object-fit: contain;
    width: 100%;
  }

  /* Compensate the wider border when selected */
  [data-state='checked'] & > *,
  [data-state='checked'] & > * {
    margin-top: -1px;
  }
`;

IllustrationContainer.displayName = 'IllustrationContainer';
