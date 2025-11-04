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

import { forwardRef, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { DismissButton } from '~common/components/DismissButton';
import { BannerScreenReaderPrefix } from './BannerScreenReaderPrefix';
import {
  BANNER_TYPE_ICONS,
  BANNER_TYPE_STYLES,
  BannerContent,
  BannerContentText,
  BannerWrapper,
} from './BannerStyles';
import { BannerProps } from './BannerTypes';

export const Banner = forwardRef<HTMLDivElement, BannerProps>((props, ref) => {
  const { children, onDismiss, screenReaderPrefix, variety, ...htmlProps } = props;

  const intl = useIntl();

  const { icon: BannerIcon, iconColor } = BANNER_TYPE_ICONS[variety];

  return (
    <BannerWrapper
      css={useMemo(() => BANNER_TYPE_STYLES[variety], [variety])}
      {...htmlProps}
      ref={ref}
      role="alert">
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
            description: 'ARIA-label for the dismiss button in the top-right corner of the Banner.',
          })}
          onClick={onDismiss}
        />
      )}
    </BannerWrapper>
  );
});

Banner.displayName = 'Banner';
