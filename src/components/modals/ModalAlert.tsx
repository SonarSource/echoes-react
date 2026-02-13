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
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { ReactNode, SyntheticEvent, forwardRef, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { isDefined } from '~common/helpers/types';
import { TextNode, TextNodeOptional } from '~types/utils';
import { Button, ButtonGroup, ButtonVariety } from '../buttons';
import { isDropdownMenuItemComponent } from '../dropdown-menu/DropdownMenuItemBase';
import { ModalBody } from './ModalBody';
import { useModalPortalRef } from './ModalPortal';
import {
  ModalFooter,
  styleModalDescription,
  styleModalOverlay,
  styleModalTitle,
  styleModalWrapper,
} from './ModalStyles';
import { ModalCommonProps, ModalSize } from './ModalTypes';
import { onModalEscapeKeyDown } from './utils';

interface BaseProps {
  /** A mandatory accessible description to be announced when the ModalAlert is opened. */
  description: TextNode;
  primaryButton: ReactNode;
}

interface WithSecondaryButton extends BaseProps {
  secondaryButton?: ReactNode;
  secondaryButtonLabel?: never;
}

interface WithSecondaryButtonLabel extends BaseProps {
  secondaryButton?: never;
  secondaryButtonLabel?: TextNodeOptional;
}

export type ModalAlertProps = ModalCommonProps & (WithSecondaryButton | WithSecondaryButtonLabel);

export const ModalAlert = forwardRef<HTMLDivElement, ModalAlertProps>((props, ref) => {
  const {
    children,
    description,
    content,
    isDefaultOpen,
    isOpen,
    onClose,
    onOpenChange,
    title,
    primaryButton,
    secondaryButton,
    secondaryButtonLabel,
    ...radixProps
  } = props;

  const modalPortalRef = useModalPortalRef();

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

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      onOpenChange?.(isOpen);
      if (!isOpen && isDefined(onClose)) {
        onClose();
      }
    },
    [onClose, onOpenChange],
  );

  return (
    <RadixAlertDialog.Root
      defaultOpen={isDefaultOpen}
      onOpenChange={handleOpenChange}
      open={isOpen}>
      <RadixAlertDialog.Trigger
        asChild
        {...(isDropdownMenuItemComponent(children) && { onSelect: handleSelectForDropdownMenu })}>
        {children}
      </RadixAlertDialog.Trigger>
      <RadixAlertDialog.Portal container={modalPortalRef}>
        <ModalAlertOverlay />
        <ModalAlertWrapper
          onEscapeKeyDown={onModalEscapeKeyDown}
          ref={ref}
          size={ModalSize.Default}
          {...radixProps}>
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
