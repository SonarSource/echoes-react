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
import { forwardRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { ScreenReaderPrefix } from '~common/components/ScreenReaderPrefix';
import { BannerProps, BannerType } from './BannerTypes';

type Props = Pick<BannerProps, 'screenReaderPrefix' | 'type'>;

export const BannerScreenReaderPrefix = forwardRef<HTMLSpanElement, Props>((props, ref) => {
  const { screenReaderPrefix, type, ...radixProps } = props;
  return (
    <ScreenReaderPrefix ref={ref} {...radixProps}>
      {screenReaderPrefix ?? <BannerScreenReaderDefaultPrefix type={type} />}{' '}
    </ScreenReaderPrefix>
  );
});
BannerScreenReaderPrefix.displayName = 'BannerScreenReaderPrefix';

function BannerScreenReaderDefaultPrefix({ type }: Readonly<Pick<BannerProps, 'type'>>) {
  switch (type) {
    case BannerType.Info:
      return (
        <FormattedMessage
          defaultMessage="Information banner:"
          description="Screen reader only text that expresses the type of the Info banner"
          id="banner.prefix.info"
        />
      );
    case BannerType.Danger:
      return (
        <FormattedMessage
          defaultMessage="Error banner:"
          description="Screen reader only text that expresses the type of the Danger banner"
          id="banner.prefix.danger"
        />
      );
    case BannerType.Warning:
      return (
        <FormattedMessage
          defaultMessage="Warning banner:"
          description="Screen reader only text that expresses the type of the Warning banner"
          id="banner.prefix.warning"
        />
      );
    case BannerType.Success:
      return (
        <FormattedMessage
          defaultMessage="Success banner:"
          description="Screen reader only text that expresses the type of the Success banner"
          id="banner.prefix.success"
        />
      );
    default:
      return null;
  }
}

BannerScreenReaderDefaultPrefix.displayName = 'BannerScreenReaderDefaultPrefix';
