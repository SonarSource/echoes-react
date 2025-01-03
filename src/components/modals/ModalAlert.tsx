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
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { ReactNode, SyntheticEvent, forwardRef, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { isDefined } from '~common/helpers/types';
import { Button, ButtonGroup, ButtonVariety } from '../buttons';
import { isDropdownMenuItemComponent } from '../dropdown-menu/DropdownMenuItemBase';
import { ModalBody } from './ModalBody';
import {
  ModalFooter,
  styleModalDescription,
  styleModalOverlay,
  styleModalTitle,
  styleModalWrapper,
} from './ModalStyles';
import { ModalCommonProps, ModalSize } from './ModalTypes';

interface BaseProps {
  /** A mandatory accessible description to be announced when the ModalAlert is opened. */
  description: ReactNode;
  primaryButton: ReactNode;
}

interface WithSecondaryButton extends BaseProps {
  secondaryButton?: ReactNode;
  secondaryButtonLabel?: never;
}

interface WithSecondaryButtonLabel extends BaseProps {
  secondaryButton?: never;
  secondaryButtonLabel?: string;
}

type ModalAlertProps = WithSecondaryButton | WithSecondaryButtonLabel;

type Props = ModalCommonProps & ModalAlertProps;

export const ModalAlert = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    children,
    description,
    content,
    isOpen,
    onOpenChange,
    title,
    primaryButton,
    secondaryButton,
    secondaryButtonLabel,
    ...radixProps
  } = props;

  const isControlled = isDefined(isOpen) && isDefined(onOpenChange);

  const actualSecondaryButton = secondaryButton ?? (
    <Button variety={ButtonVariety.Default}>
      {secondaryButtonLabel ?? (
        <FormattedMessage
          defaultMessage="Cancel"
          description="Label for the secondary action of the Modal Alert"
          id="modal_alert.cancel"
        />
      )}
    </Button>
  );

  const handleSelectForDropdownMenu = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
  }, []);

  return (
    <RadixAlertDialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <RadixAlertDialog.Trigger
        asChild
        ref={ref}
        {...(isDropdownMenuItemComponent(children) && { onSelect: handleSelectForDropdownMenu })}
        {...radixProps}>
        {children}
      </RadixAlertDialog.Trigger>
      <RadixAlertDialog.Portal>
        <ModalAlertOverlay />
        <ModalAlertWrapper size={ModalSize.Default}>
          <ModalAlertTitle>{title}</ModalAlertTitle>

          <ModalBody>
            <ModalAlertDescription>{description}</ModalAlertDescription>

            {content && <div>{content}</div>}
          </ModalBody>

          <ModalAlertFooter>
            <ButtonGroup>
              {isControlled ? (
                primaryButton
              ) : (
                <RadixAlertDialog.Action asChild>{primaryButton}</RadixAlertDialog.Action>
              )}
              <RadixAlertDialog.Cancel asChild>{actualSecondaryButton}</RadixAlertDialog.Cancel>
            </ButtonGroup>
          </ModalAlertFooter>
        </ModalAlertWrapper>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
});
ModalAlert.displayName = 'ModalAlert';

const ModalAlertOverlay = styleModalOverlay(RadixAlertDialog.Overlay);
ModalAlertOverlay.displayName = 'ModalAlertOverlay';

const ModalAlertWrapper = styleModalWrapper(RadixAlertDialog.Content);
ModalAlertWrapper.displayName = 'ModalAlertWrapper';

const ModalAlertTitle = styleModalTitle(RadixAlertDialog.Title);
ModalAlertTitle.displayName = 'ModalAlertTitle';

const ModalAlertDescription = styleModalDescription(RadixAlertDialog.Description);
ModalAlertDescription.displayName = 'ModalAlertDescription';

const ModalAlertFooter = styled(ModalFooter)`
  justify-content: end;
`;
ModalAlertFooter.displayName = 'ModalAlertFooter';
