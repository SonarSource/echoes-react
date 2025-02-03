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

import { FormEvent, forwardRef, useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TextNodeOptional } from '~types/utils';
import { Button, ButtonVariety } from '../buttons';
import { Form, FormHeaderProps, FormRootProps } from '../form';
import { Modal, ModalProps } from './Modal';

type FormRootPropsSubset = Omit<FormRootProps, 'children' | 'onSubmit'>;
type ModalPropsSubset = Omit<
  ModalProps,
  'primaryButton' | 'secondaryButton' | 'content' | 'isOpen' | 'onOpenChange'
>;

export interface ModalFormProps extends FormRootPropsSubset, ModalPropsSubset {
  /**
   * The content of the `Form`, can contain multiple `Form.Section` with their fields
   */
  content: FormRootProps['children'];
  /**
   * Optional content to display under the title/description, can be anything.
   */
  extraContent?: FormHeaderProps['extraContent'];
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

/**
 * {@link ModalForm} is a helper component that wraps a {@link Form | Form} component inside a {@link Modal | Modal}
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
 * A Fragment with as many {@link FormSection | Form.Section} as your form needs.
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
export const ModalForm = forwardRef<HTMLButtonElement, ModalFormProps>((props, ref) => {
  const {
    action,
    children,
    content,
    extraContent,
    id,
    isSubmitting = false,
    method,
    name,
    onReset,
    onSubmit,
    onInvalid,
    secondaryButtonLabel,
    shouldUseBrowserValidation,
    submitButtonLabel,
    target,
    ...modalProps
  } = props;
  const [isOpen, setIsOpen] = useState(modalProps.isDefaultOpen ?? false);

  const onFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      const submitResult = onSubmit?.(event);
      if (submitResult instanceof Promise) {
        return submitResult.then(() => setIsOpen(false));
      }
      setIsOpen(false);
    },
    [onSubmit],
  );

  const onFormReset = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      onReset?.(event);
      setIsOpen(false);
    },
    [onReset],
  );

  return (
    <Modal
      ref={ref}
      {...modalProps}
      content={
        <Form
          action={action}
          id="my-form-id"
          method={method}
          name={name}
          onInvalid={onInvalid}
          onReset={onFormReset}
          onSubmit={onFormSubmit}
          shouldUseBrowserValidation={shouldUseBrowserValidation}
          target={target}>
          {extraContent}
          {content}
        </Form>
      }
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      primaryButton={
        <Button
          form="my-form-id"
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
          variety={ButtonVariety.Primary}>
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
        <Button form="my-form-id" type="reset">
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
    </Modal>
  );
});
ModalForm.displayName = 'ModalForm';
