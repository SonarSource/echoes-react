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

import styled from '@emotion/styled';
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { PropsWithChildren, ReactElement, ReactNode, forwardRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, ButtonVariety } from '../buttons';

export enum AlertDialogSize {
  Default = 'default',
  Wide = 'wide',
}

interface BaseProps {
  children: ReactElement;
  description?: ReactNode;
  extraContent?: ReactNode;
  isOpen?: boolean;
  primaryButton?: ReactNode;
  size?: AlertDialogSize;
  title: string;
}

interface WithSecondaryButton extends BaseProps {
  secondaryButton?: ReactNode;
  secondaryButtonLabel?: never;
}

interface WithSecondaryButtonLabel extends BaseProps {
  secondaryButton?: never;
  secondaryButtonLabel?: string;
}

type Props = WithSecondaryButton | WithSecondaryButtonLabel;

const defaultPrimaryButton = (
  <Button variety={ButtonVariety.Primary}>
    <FormattedMessage
      defaultMessage="Confirm"
      description="Label for the primary action of the alert dialog"
      id="alertDialog.confirm"
    />
  </Button>
);

function DefaultSecondaryButton({ children }: PropsWithChildren<{}>) {
  return (
    <Button variety={ButtonVariety.Default}>
      {children ?? (
        <FormattedMessage
          defaultMessage="Cancel"
          description="Label for the secondary action of the alert dialog"
          id="alertDialog.cancel"
        />
      )}
    </Button>
  );
}

export const AlertDialog = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    children,
    description,
    extraContent,
    isOpen,
    size,
    title,
    primaryButton,
    secondaryButton,
    secondaryButtonLabel,
    ...radixProps
  } = props;

  return (
    <RadixAlertDialog.Root open={isOpen}>
      <RadixAlertDialog.Trigger asChild ref={ref} {...radixProps}>
        {children}
      </RadixAlertDialog.Trigger>
      <RadixAlertDialog.Portal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <RadixAlertDialog.Title>{title}</RadixAlertDialog.Title>

          {description && (
            <RadixAlertDialog.Description>{description}</RadixAlertDialog.Description>
          )}
          {extraContent && <div>{extraContent}</div>}
          <ButtonGroup>
            <RadixAlertDialog.Cancel asChild>
              {secondaryButton ?? (
                <DefaultSecondaryButton>{secondaryButtonLabel}</DefaultSecondaryButton>
              )}
            </RadixAlertDialog.Cancel>
            <RadixAlertDialog.Action asChild>
              {primaryButton ?? defaultPrimaryButton}
            </RadixAlertDialog.Action>
          </ButtonGroup>
        </AlertDialogContent>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
});

AlertDialog.displayName = 'AlertDialog';

const AlertDialogOverlay = styled(RadixAlertDialog.Overlay)`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.45);
`;

const AlertDialogContent = styled(RadixAlertDialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border: 1px;
  background: white;
  padding: 4px;
`;
