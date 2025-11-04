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
import * as RadixDialog from '@radix-ui/react-dialog';
import { forwardRef, ReactNode, SyntheticEvent, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { isDefined } from '~common/helpers/types';
import { TextNodeOptional } from '~types/utils';
import { cssVar } from '~utils/design-tokens';
import { ButtonGroup, ButtonIcon, ButtonSize, ButtonVariety } from '../buttons';
import { isDropdownMenuItemComponent } from '../dropdown-menu/DropdownMenuItemBase';
import { IconX } from '../icons';
import { ModalBody } from './ModalBody';
import {
  ModalContent,
  ModalFooter,
  styleModalDescription,
  styleModalOverlay,
  styleModalTitle,
  styleModalWrapper,
} from './ModalStyles';
import { ModalCommonProps, ModalSize } from './ModalTypes';

interface ModalBaseProps {
  /** An optional accessible description to be announced when the dialog is opened. */
  description?: TextNodeOptional;
  footerLink?: ReactNode;
  primaryButton?: ReactNode;
  secondaryButton?: ReactNode;
  size?: `${ModalSize}`;
}

export type ModalProps = ModalCommonProps & ModalBaseProps;

export const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const {
    children,
    description,
    content,
    footerLink,
    isDefaultOpen,
    isOpen,
    onClose,
    onOpenChange,
    primaryButton,
    secondaryButton,
    size = ModalSize.Default,
    title,
    ...radixProps
  } = props;

  const intl = useIntl();

  const hasActionButtons = isDefined(primaryButton) || isDefined(secondaryButton);
  const hasFooter = hasActionButtons || isDefined(footerLink);
  const isControlled = isDefined(isOpen) && isDefined(onOpenChange);

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
    <RadixDialog.Root defaultOpen={isDefaultOpen} onOpenChange={handleOpenChange} open={isOpen}>
      <RadixDialog.Trigger
        asChild
        {...(isDropdownMenuItemComponent(children) && { onSelect: handleSelectForDropdownMenu })}>
        {children}
      </RadixDialog.Trigger>
      <RadixDialog.Portal>
        <ModalOverlay />
        <ModalWrapper
          {...(!isDefined(description) && { 'aria-describedby': undefined })}
          ref={ref}
          size={size}
          {...radixProps}>
          <ModalTitle>{title}</ModalTitle>

          <ModalBody isLast={!hasFooter}>
            {description && <ModalDescription>{description}</ModalDescription>}
            {content && <ModalContent>{content}</ModalContent>}
          </ModalBody>

          {hasFooter && (
            <ModalFooter>
              <ModalFooterLinkWrapper>{footerLink}</ModalFooterLinkWrapper>
              {hasActionButtons && (
                <ButtonGroup>
                  {isControlled ? (
                    <>
                      {primaryButton}
                      {secondaryButton}
                    </>
                  ) : (
                    <>
                      {primaryButton && (
                        <RadixDialog.Close asChild>{primaryButton}</RadixDialog.Close>
                      )}
                      {secondaryButton && (
                        <RadixDialog.Close asChild>{secondaryButton}</RadixDialog.Close>
                      )}
                    </>
                  )}
                </ButtonGroup>
              )}
            </ModalFooter>
          )}

          <RadixDialog.Close asChild>
            <ModalButtonIconClose
              Icon={IconX}
              ariaLabel={intl.formatMessage({
                id: 'modal.close',
                defaultMessage: 'Close',
                description: 'ARIA-label for the close button at the top of the Modal.',
              })}
              size={ButtonSize.Medium}
              tooltipContent={null}
              variety={ButtonVariety.DefaultGhost}
            />
          </RadixDialog.Close>
        </ModalWrapper>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
});
Modal.displayName = 'Modal';

const ModalOverlay = styleModalOverlay(RadixDialog.Overlay);
ModalOverlay.displayName = 'ModalOverlay';

const ModalWrapper = styleModalWrapper(RadixDialog.Content);
ModalWrapper.displayName = 'ModalWrapper';

const ModalTitle = styled(styleModalTitle(RadixDialog.Title))`
  padding-right: calc(${cssVar('dimension-space-400')} + ${cssVar('sizes-buttons-medium')});
`;
ModalTitle.displayName = 'ModalTitle';

const ModalDescription = styleModalDescription(RadixDialog.Description);
ModalDescription.displayName = 'ModalDescription';

const ModalFooterLinkWrapper = styled.div`
  display: flex;
  align-items: center;
`;
ModalFooterLinkWrapper.displayName = 'ModalFooterLinkWrapper';

const ModalButtonIconClose = styled(ButtonIcon)`
  position: absolute;
  top: ${cssVar('dimension-space-300')};
  right: ${cssVar('dimension-space-300')};
`;
ModalButtonIconClose.displayName = 'ModalButtonIconClose';
