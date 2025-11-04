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

import { FormEvent, forwardRef, useCallback, useId, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TextNodeOptional } from '~types/utils';
import { Button, ButtonVariety } from '../buttons';
import { Form, FormHeaderProps, FormRootProps } from '../form';
import { Modal, ModalProps } from './Modal';
import { ModalAlert, ModalAlertProps } from './ModalAlert';

type ExcludedModalProps =
  | 'content'
  | 'isOpen'
  | 'onOpenChange'
  | 'primaryButton'
  | 'secondaryButton';

type FormRootPropsSubset = Omit<FormRootProps, 'children' | 'onSubmit'>;

interface ModalFormBaseProps extends FormRootPropsSubset {
  /**
   * The content of the `Form`, can contain multiple `Form.Section` with their fields
   */
  content: FormRootProps['children'];
  /**
   * Optional content to display under the title/description, can be anything.
   */
  extraContent?: FormHeaderProps['extraContent'];

  /**
   * Whether the submit button should be disabled. If true, the submit button will be disabled.
   */
  isSubmitDisabled?: boolean;
  /**
   * Whether the form is currently submitting. If true, the submit button will be disabled and show a loading spinner.
   */
  isSubmitting?: boolean;
  /**
   * Callback to be called when the form submit event is triggered. If the callback returns a Promise, the modal will
   * only close when the promise is resolved.
   */
  onSubmit?: (event: FormEvent<HTMLFormElement>) => Promise<any> | void;
  /**
   * Allows to override the default text of the secondary button.
   */
  secondaryButtonLabel?: TextNodeOptional;
  /**
   * Allows to override the default text of the submit button.
   */
  submitButtonLabel?: TextNodeOptional;
}

interface ModalPropsSubset extends Omit<ModalProps, ExcludedModalProps> {
  isDestructive?: never;
}

interface ModalAlertPropsSubset extends Omit<ModalAlertProps, ExcludedModalProps> {
  /**
   * Switch from a Modal to a ModalAlert with a destructive action using a ButtonVariety.Danger primary button.
   */
  isDestructive: true;
}

export type ModalFormProps = ModalFormBaseProps & (ModalPropsSubset | ModalAlertPropsSubset);

/**
 * {@link ModalForm} is a helper component that wraps a {@link Form} component inside a {@link Modal}
 * component and simplify usage of forms inside modals.
 *
 * **Key points**
 *
 * Modal submitting forms need to be controlled by the parent to avoid having the modal close before the
 * form submission is completed. The ModalForm handles that for you.
 *
 * It also ties together the form and the submit/reset buttons of the modal.
 *
 * **Permitted Content**
 *
 * A Fragment with as many {@link Form.Section} as your form needs.
 *
 * **Example**
 *
 * ```tsx
 *  <ModalForm method="POST" onSubmit={onSubmit} title="Form title">
 *    <Form.Section>
 *      ...
 *    </Form.Section>
 *  </ModalForm>
 * ```
 */
export const ModalForm = forwardRef<HTMLDivElement, ModalFormProps>((props, ref) => {
  const {
    action,
    children,
    content,
    description,
    extraContent,
    id,
    isDestructive = false,
    isSubmitDisabled = false,
    isSubmitting = false,
    method,
    name,
    onClose,
    onReset,
    onSubmit,
    onInvalid,
    secondaryButtonLabel,
    enableBrowserValidation,
    submitButtonLabel,
    target,
    ...modalProps
  } = props;
  const [isOpen, setIsOpen] = useState(modalProps.isDefaultOpen ?? false);

  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      const submitResult = onSubmit?.(event);
      if (submitResult instanceof Promise) {
        return submitResult.then(
          () => {
            setIsOpen(false);
            onClose?.();
          },
          () => {
            // Do nothing on reject
          },
        );
      }
      setIsOpen(false);
      onClose?.();
      return undefined;
    },
    [onClose, onSubmit],
  );

  const onFormReset = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      onReset?.(event);
      setIsOpen(false);
      onClose?.();
    },
    [onClose, onReset],
  );

  const defaultId = `${useId()}modal-form`;
  const formId = id ?? defaultId;

  const ModalComponent = isDestructive ? ModalAlert : Modal;

  return (
    <ModalComponent
      // description prop is mandatory for ModalAlert but not for Modal, force typing to the most discriminant type to avoid duplicating a lot of code
      description={description as ModalAlertPropsSubset['description']}
      ref={ref}
      {...modalProps}
      content={
        <Form
          action={action}
          enableBrowserValidation={enableBrowserValidation}
          id={formId}
          method={method}
          name={name}
          onInvalid={onInvalid}
          onReset={onFormReset}
          onSubmit={onFormSubmit}
          target={target}>
          {extraContent}
          {content}
        </Form>
      }
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={setIsOpen}
      primaryButton={
        <Button
          form={formId}
          isDisabled={isSubmitting || isSubmitDisabled}
          isLoading={isSubmitting}
          type="submit"
          variety={isDestructive ? ButtonVariety.Danger : ButtonVariety.Primary}>
          {submitButtonLabel ?? (
            <FormattedMessage
              defaultMessage="Submit"
              description="Label for the submit action of the Modal Form"
              id="modal_form.submit"
            />
          )}
        </Button>
      }
      secondaryButton={
        <Button form={formId} type="reset">
          {secondaryButtonLabel ?? (
            <FormattedMessage
              defaultMessage="Cancel"
              description="Label for the secondary action of the Modal Form"
              id="modal_form.cancel"
            />
          )}
        </Button>
      }>
      {children}
    </ModalComponent>
  );
});
ModalForm.displayName = 'ModalForm';
