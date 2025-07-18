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
import { forwardRef, ReactNode, useCallback, useMemo } from 'react';
import { toast as sonnerToast } from 'sonner';
import {
  ButtonIcon,
  IconCheckCircle,
  IconError,
  IconInfo,
  IconWarning,
  IconX,
  Text,
} from '../../components';

import { css, Global } from '@emotion/react';
import { useIntl } from 'react-intl';
import { TextNode, TextNodeOptional } from '~types/utils';
import { ScreenReaderPrefix } from './ScreenReaderPrefix';

/**
 * Represents the available visual varieties for toast notifications.
 */
export enum ToastVariety {
  /**
   * Used for error messages and critical alerts.
   */
  Danger = 'danger',
  /**
   * Used for general information and neutral messages.
   */
  Info = 'info',
  /**
   * Used for successful actions and positive confirmations.
   */
  Success = 'success',
  /**
   * Used for cautionary messages and potential issues.
   */
  Warning = 'warning',
}

/**
 * Unique identifier type for toast instances.
 */
export type ToastId = string | number;

/**
 * Parameters passed to toast action functions.
 */
interface ToastActionsParams {
  /**
   * The unique identifier of the toast.
   */
  id: ToastId;
  /**
   * Function to programmatically dismiss the toast, after clicking an action we should normally also dismiss the toast.
   */
  dismiss: VoidFunction;
}

export interface ToastProps {
  /**
   * Custom actions to display in the toast (optional). Receives the toast ID
   * and dismiss function as parameters. It should be either one or more Buttons or Links.
   * If provided, the toast should also have the `isDismissable` prop set to true and it's duration set to infinite.
   */
  actions?: ({ id, dismiss }: ToastActionsParams) => ReactNode;
  /**
   * The main message content of the toast.
   */
  description: TextNode;
  className?: string;
  /**
   * Unique identifier for the toast instance.
   */
  id: ToastId;
  /**
   * When true, displays a dismiss button allowing users to manually close the toast (optional).
   * It must be set to true if the duration of the toast is set to infinite though.
   * The default is false.
   */
  isDismissable?: boolean;
  /**
   * Optional prefix text for screen readers, providing additional context.
   * If not provided, a default message based on the toast variety will be used.
   */
  screenReaderPrefix?: string;
  /**
   * Optional title text displayed above the description.
   */
  title?: TextNodeOptional;
  /**
   * The visual style and semantic meaning of the toast (info, success, warning, or danger).
   */
  variety: `${ToastVariety}`;
}

/**
 * Toasts provide brief notifications about app processes at the bottom of the screen.
 * They inform users about ongoing actions or errors.
 *
 * **Permitted Content**
 *
 * A toast must have a description and variety. It may optionally have a title,
 * custom actions, and dismissible behavior.
 *
 * **Example**
 *
 * ```tsx
 * <Toast
 *   id="toast-1"
 *   variety={ToastVariety.Success}
 *   title="Success!"
 *   description="Your changes have been saved."
 *   isDismissable
 *   actions={({ dismiss }) => (
 *     <Button onClick={dismiss}>
 *       Undo
 *     </Button>
 *   )}
 * />
 * ```
 */
export const Toast = forwardRef<HTMLDivElement, Readonly<ToastProps>>((props, ref) => {
  const {
    actions,
    description,
    id,
    isDismissable = false,
    screenReaderPrefix,
    title,
    variety,
    ...htmlProps
  } = props;
  const intl = useIntl();

  const handleDismiss = useCallback(() => {
    sonnerToast.dismiss(id);
  }, [id]);

  return (
    <ToastWrapper id={`echoes-toast-${id}`} ref={ref} {...htmlProps}>
      <Text>{TOAST_VARIETY_ICONS[variety]}</Text>
      <ToastBody>
        <ToastContent>
          <ScreenReaderPrefix>
            {screenReaderPrefix ?? <ToastPrefix variety={variety} />}
          </ScreenReaderPrefix>
          {title && <Text isHighlighted>{title}</Text>}
          <Text as="p">{description}</Text>
        </ToastContent>
        {actions?.({ id, dismiss: handleDismiss })}
      </ToastBody>
      {isDismissable && (
        <ToastDismissButton
          Icon={IconX}
          ariaLabel={intl.formatMessage({
            id: 'toast.dismiss',
            defaultMessage: 'Dismiss toast',
            description: 'ARIA-label for the dismiss button in the top-right corner of the Toast.',
          })}
          onClick={handleDismiss}
          variety="default-ghost"
        />
      )}
    </ToastWrapper>
  );
});
Toast.displayName = 'Toast';

const ToastWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--echoes-dimension-space-150);
  padding: var(--echoes-dimension-space-200);
  border-radius: var(--echoes-border-radius-400);
  width: var(--echoes-toast-sizes-width);

  background: var(--echoes-color-surface-default);
  box-shadow: var(--echoes-box-shadow-large);
  border: var(--echoes-border-width-default) solid var(--echoes-color-border-weak);
`;
ToastWrapper.displayName = 'ToastWrapper';

const ToastBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--echoes-dimension-space-150);
  flex: 1;
`;
ToastBody.displayName = 'ToastBody';

const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: var(--echoes-dimension-space-75);
`;
ToastContent.displayName = 'ToastContent';

const ToastDismissButton = styled(ButtonIcon)`
  --button-padding: var(--echoes-dimension-space-0);
  --button-height: var(--echoes-dimension-height-600);
  --button-width: var(--echoes-dimension-width-300);
`;
ToastDismissButton.displayName = 'ToastDismissButton';

const TOAST_VARIETY_ICONS = {
  [ToastVariety.Info]: <IconInfo color="echoes-color-icon-info" />,
  [ToastVariety.Danger]: <IconError color="echoes-color-icon-danger" />,
  [ToastVariety.Warning]: <IconWarning color="echoes-color-icon-warning" />,
  [ToastVariety.Success]: <IconCheckCircle color="echoes-color-icon-success" />,
};

function ToastPrefix({ variety }: Pick<ToastProps, 'variety'>) {
  const intl = useIntl();

  const messages: { [variety in ToastVariety]: string } = useMemo(
    () => ({
      [ToastVariety.Info]: intl.formatMessage({
        id: 'toast.prefix.info',
        defaultMessage: 'Information:',
      }),
      [ToastVariety.Danger]: intl.formatMessage({
        id: 'toast.prefix.danger',
        defaultMessage: 'Error:',
      }),
      [ToastVariety.Warning]: intl.formatMessage({
        id: 'toast.prefix.warning',
        defaultMessage: 'Warning:',
      }),
      [ToastVariety.Success]: intl.formatMessage({
        id: 'toast.prefix.success',
        defaultMessage: 'Success:',
      }),
    }),
    [intl],
  );

  return messages[variety];
}

ToastPrefix.displayName = 'ToastPrefix';

export function ToastGlobalStyles() {
  return (
    <Global
      styles={css`
        [data-sonner-toaster] {
          z-index: 0;
        }

        [data-sonner-toast] {
          border-radius: var(--echoes-border-radius-400);

          &:focus-visible {
            outline: var(--echoes-color-focus-default) solid
              var(--echoes-focus-border-width-default);
            outline-offset: var(--echoes-focus-border-offset-default);
            box-shadow: none;
          }
        }
      `}
    />
  );
}
ToastGlobalStyles.displayName = 'ToastGlobalStyles';
