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

import { forwardRef, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { DismissButton } from '~common/components/DismissButton';
import { useFollowScroll } from '~common/helpers/useFollowScroll';
import { BannerScreenReaderPrefix } from './BannerScreenReaderPrefix';
import {
  BANNER_TYPE_ICONS,
  BANNER_TYPE_STYLES,
  BannerContent,
  BannerContentText,
  BannerInner,
  BannerSkeleton,
  BannerWrapper,
} from './BannerStyles';
import { BannerProps } from './BannerTypes';

/**
 * The Banner is used to communicate system status or to promote a feature.
 * They are not related to a specific page or element. They are displayed at the top of the screen.
 *
 * /!\ This component must be used sparingly and only when truly necessary to commmunicate critical information.
 * To avoid disrupting the user experience, ensure banners are contextually relevant with clear, concise messaging.
 * Display only one banner at a time to prevent alert fatigue.
 *
 * **Varieties**
 *
 * - `info`: To provide neutral information about updates. Be careful not to overuse it.
 * - `success`: To provide a success message. e.g when a feature is activated to all org members.
 * - `warning`: For messages that need the user's attention or acknowledgment but might not cause errors.
 * - `danger`: For errors, system malfunctions, and critical issues, such as license expiration.
 *
 * **Behavior**
 *
 * - Content is ellipsized if too long to maintain single-line display
 * - Automatically follows horizontal scroll to remain visible (can be disabled)
 * - Dismiss button appears only when `onDismiss` callback is provided
 */
export const Banner = forwardRef<HTMLDivElement, BannerProps>((props, ref) => {
  const {
    children,
    disableFollowScroll = false,
    onDismiss,
    screenReaderPrefix,
    variety,
    zIndex = 1,
    ...htmlProps
  } = props;

  const intl = useIntl();
  const { left: leftScroll } = useFollowScroll(!disableFollowScroll);

  const wrapperLeftOffset = disableFollowScroll ? {} : { left: -leftScroll };

  const { icon: BannerIcon, iconColor } = BANNER_TYPE_ICONS[variety];

  return (
    <BannerSkeleton
      css={useMemo(
        () => ({
          ...BANNER_TYPE_STYLES[variety],
          '--banner-z-index': zIndex,
        }),
        [variety, zIndex],
      )}
      role="alert">
      <BannerWrapper style={wrapperLeftOffset}>
        <BannerInner ref={ref} {...htmlProps}>
          <BannerContent>
            <BannerIcon color={iconColor} />
            <BannerScreenReaderPrefix screenReaderPrefix={screenReaderPrefix} variety={variety} />
            <BannerContentText>{children}</BannerContentText>
          </BannerContent>

          {onDismiss && (
            <DismissButton
              ariaLabel={intl.formatMessage({
                id: 'banner.dismiss',
                defaultMessage: 'Dismiss',
                description:
                  'ARIA-label for the dismiss button in the top-right corner of the Banner.',
              })}
              onClick={onDismiss}
            />
          )}
        </BannerInner>
      </BannerWrapper>
    </BannerSkeleton>
  );
});

Banner.displayName = 'Banner';
