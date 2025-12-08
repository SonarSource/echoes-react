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

import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  useMemo,
} from 'react';
import { isDefined } from '~common/helpers/types';
import { IconFilledProps } from '../icons/IconWrapper';
import { getShouldOpenInNewTabProps } from '../links/LinkBase';
import { SpinnerOverrideColor } from '../spinner/SpinnerOverrideColor';
import { Tooltip } from '../tooltip';
import { useButtonClickHandler } from './Button';
import {
  ButtonAsLinkBaseProps,
  ButtonIconAsLink,
  LinkPropsForbiddenForButton,
} from './ButtonAsLink';
import {
  BUTTON_VARIETY_STYLES,
  BUTTONICON_DIMENSIONS_STYLE,
  ButtonIconStyled,
} from './ButtonStyles';
import { ButtonBaseProps, ButtonSize, ButtonVariety } from './ButtonTypes';

type TooltipProps = ComponentPropsWithoutRef<typeof Tooltip>;
type TooltipOptions = Omit<TooltipProps, 'children' | 'content' | 'key'>;

interface CommonProps {
  /**
   * The icon component to display inside the button.
   * Must be an Echoes Icon component.
   */
  Icon: ForwardRefExoticComponent<IconFilledProps & React.RefAttributes<HTMLSpanElement>>;
  /**
   * Whether the icon should be displayed in its filled variant (optional).
   * Default is false, showing the outline version of the icon.
   */
  isIconFilled?: IconFilledProps['isFilled'];
  /**
   * Content to display in the tooltip of the button (optional).
   * Defaults to the ariaLabel value if not provided.
   */
  tooltipContent?: TooltipProps['content'];
  /**
   * Additional configuration options for the tooltip (optional).
   * Excludes properties that are managed internally by the ButtonIcon.
   */
  tooltipOptions?: TooltipOptions;
}

export interface ButtonIconAsButtonProps
  extends CommonProps, ButtonBaseProps, LinkPropsForbiddenForButton {
  /**
   * Accessible label for screen readers (required).
   * Since icon buttons have no visible text, this is essential for accessibility.
   */
  ariaLabel: string;
}

interface ButtonIconAsLinkProps extends CommonProps, ButtonAsLinkBaseProps {
  /**
   * Accessible label for screen readers (required).
   * Since icon buttons have no visible text, this is essential for accessibility.
   */
  ariaLabel: string;
}

export type ButtonIconProps = ButtonIconAsButtonProps | ButtonIconAsLinkProps;

/**
 * A compact button component that displays only an icon with integrated tooltip support.
 *
 * The ButtonIcon component provides a space-efficient alternative to regular buttons
 * when screen real estate is limited or when the action can be clearly communicated
 * through iconography alone. It automatically includes tooltip functionality to ensure
 * users understand the button's purpose, and like the regular Button component, it can
 * render as either an HTML button or anchor element based on the provided properties.
 *
 * **Dual Rendering Mode**
 *
 * - Renders as `<button>` for actions and form interactions
 * - Renders as `<a>` when `to` prop is provided and button is not disabled
 * - Maintains consistent visual appearance regardless of underlying element
 *
 * **Icon Support**
 *
 * - Accepts any Icon component from the Echoes design system
 * - Accepts the component itself and not an instance of it nor a JSX element
 * - Icons are automatically sized and positioned within the button
 * - Loading states replace the icon with a spinner while maintaining layout
 *
 * **Accessibility**
 *
 * Since icon buttons lack visible text, accessibility is critical:
 * - The `ariaLabel` prop is required and provides screen reader context
 * - Tooltips are automatically enabled to help sighted users
 * - Tooltip content defaults to the aria-label but can be customized
 */
export const ButtonIcon = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonIconProps>(
  (props, ref) => {
    const {
      Icon,
      ariaLabel,
      hasAutoFocus = false,
      isIconFilled = false,
      isDisabled = false,
      isLoading,
      onClick,
      size = ButtonSize.Large,
      enableOpenInNewTab = false,
      enablePreventDefault = false,
      enableStopPropagation = false,
      to,
      tooltipContent = props.ariaLabel,
      tooltipOptions = {},
      type = 'button',
      variety = ButtonVariety.Default,
      ...restProps
    } = props;

    const handleClick = useButtonClickHandler(props);

    const commonStyles = useMemo(
      () => ({
        ...BUTTON_VARIETY_STYLES[variety],
        ...BUTTONICON_DIMENSIONS_STYLE[size],
      }),
      [variety, size],
    );

    if (isButtonIconAsLink(props)) {
      const { to } = props;

      return (
        <Tooltip content={tooltipContent} {...tooltipOptions}>
          <ButtonIconAsLink
            aria-label={ariaLabel}
            // Everything above this line can be overridden by the `restProps` object
            {...restProps}
            {...getShouldOpenInNewTabProps({ enableOpenInNewTab, to })}
            autoFocus={hasAutoFocus}
            css={commonStyles}
            onClick={handleClick}
            ref={ref as ForwardedRef<HTMLAnchorElement>}
            to={to}>
            <ButtonIconContent Icon={Icon} isIconFilled={isIconFilled} isLoading={isLoading} />
          </ButtonIconAsLink>
        </Tooltip>
      );
    }

    // Extracting the rest of the link props to avoid passing them to the button element.
    const { download, reloadDocument, state, ...htmlProps } = restProps;

    return (
      <Tooltip content={tooltipContent} {...tooltipOptions}>
        <ButtonIconStyled
          aria-label={ariaLabel}
          // Everything above this line can be overridden by the `htmlProps` object
          {...htmlProps}
          autoFocus={hasAutoFocus}
          css={commonStyles}
          disabled={isDisabled}
          onClick={handleClick}
          ref={ref as ForwardedRef<HTMLButtonElement>}
          type={type}>
          <ButtonIconContent Icon={Icon} isIconFilled={isIconFilled} isLoading={isLoading} />
        </ButtonIconStyled>
      </Tooltip>
    );
  },
);
ButtonIcon.displayName = 'ButtonIcon';

function ButtonIconContent(
  props: Readonly<Pick<ButtonIconProps, 'Icon' | 'isIconFilled' | 'isLoading'>>,
) {
  const { isLoading, Icon, isIconFilled } = props;
  if (isDefined(isLoading)) {
    return (
      <SpinnerOverrideColor isLoading={isLoading}>
        <Icon isFilled={isIconFilled} />
      </SpinnerOverrideColor>
    );
  }

  return <Icon isFilled={isIconFilled} />;
}

ButtonIconContent.displayName = 'ButtonIconContent';

function isButtonIconAsLink(props: ButtonIconProps): props is ButtonIconAsLinkProps {
  // A link must have a 'to' prop and a link cannot be disabled.
  // Disabling a link will end up rendering a disabled button instead.
  return 'to' in props && !props.isDisabled;
}
