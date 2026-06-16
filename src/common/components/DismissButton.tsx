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
import { Ref } from 'react';
import { cssVar } from '~utils/design-tokens';
import { useButtonClickHandler } from '../../components/buttons/Button';
import { ButtonStyled } from '../../components/buttons/ButtonStyles';
import { ButtonBaseProps } from '../../components/buttons/ButtonTypes';
import { IconX } from '../../components/icons';
import { Tooltip } from '../../components/tooltip';

export enum DismissButtonSize {
  /** Standard 24×24 px icon button (default). */
  Medium = 'medium',
  /** Compact 16×16 px icon button. */
  Small = 'small',
}

interface DismissButtonProps extends Pick<ButtonBaseProps, 'className' | 'onClick'> {
  /** The aria-label for the dismiss button. */
  ariaLabel: string;
  /**
   * Whether the dismiss button has visible hover/focus states or not.
   * @defaultValue false
   */
  hasVisibleStateStyles?: boolean;
  /** React ref forwarded to the root button element. */
  ref?: Ref<HTMLButtonElement>;
  /**
   * The size of the dismiss button.
   * @defaultValue DismissButtonSize.Medium
   */
  size?: `${DismissButtonSize}`;
}

export function DismissButton(props: Readonly<DismissButtonProps>) {
  const {
    ariaLabel,
    hasVisibleStateStyles = false,
    onClick,
    ref,
    size = DismissButtonSize.Medium,
    ...htmlProps
  } = props;

  const handleClick = useButtonClickHandler(props);

  return (
    <Tooltip content={ariaLabel}>
      <DismissButtonStyled
        aria-label={ariaLabel}
        // Everything above this line can be overridden by the `htmlProps` object
        {...htmlProps}
        css={DISMISS_BUTTON_SIZE_STYLES[size]}
        data-visible-state={hasVisibleStateStyles || undefined}
        onClick={handleClick}
        ref={ref}
        type="button">
        <IconX />
      </DismissButtonStyled>
    </Tooltip>
  );
}
DismissButton.displayName = 'DismissButton';

const DISMISS_BUTTON_SIZE_STYLES = {
  [DismissButtonSize.Small]: {
    '--dismiss-button-height': cssVar('dimension-height-400'),
    '--dismiss-button-width': cssVar('dimension-width-200'),
    '--dismiss-button-font-size': cssVar('font-size-10'),
  },
  [DismissButtonSize.Medium]: {
    '--dismiss-button-height': cssVar('dimension-height-600'),
    '--dismiss-button-width': cssVar('dimension-width-300'),
    '--dismiss-button-font-size': cssVar('font-size-20'),
  },
};

const DismissButtonStyled = styled(ButtonStyled)`
  flex: 0 0 auto;

  height: var(--dismiss-button-height);
  width: var(--dismiss-button-width);
  font-size: var(--dismiss-button-font-size);

  justify-content: center;

  background-color: ${cssVar('color-background-utility-transparent')};
  border-radius: ${cssVar('border-radius-200')};

  &[data-visible-state='true'] {
    background-color: ${cssVar('color-surface-default')};

    &:hover {
      background-color: ${cssVar('color-surface-hover')};
    }

    &:focus,
    &:focus-visible {
      background-color: ${cssVar('color-surface-active')};
      outline: none;
    }
  }
`;
DismissButtonStyled.displayName = 'DismissButtonStyled';
