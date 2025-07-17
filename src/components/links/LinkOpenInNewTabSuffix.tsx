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

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { FormattedMessage } from 'react-intl';
import { IconLinkExternal } from '../icons/IconLinkExternal';
import { LinkBaseProps } from './LinkTypes';

type Props = Pick<LinkBaseProps, 'enableOpenInNewTab'> & {
  hasUnbreakableSpace?: boolean;
};

export function LinkOpenInNewTabSuffix(props: Readonly<Props>) {
  const { enableOpenInNewTab, hasUnbreakableSpace = false } = props;

  if (!enableOpenInNewTab) {
    return null;
  }

  return (
    <>
      {hasUnbreakableSpace && <>&nbsp;</>}
      <IconLinkExternal data-testid="echoes-link-external-icon" />
      <VisuallyHidden.Root>
        <FormattedMessage
          defaultMessage="(opens in new tab)"
          description="Screen reader-only text to indicate that the link will open in a new tab"
          id="open_in_new_tab"
        />
      </VisuallyHidden.Root>
    </>
  );
}

LinkOpenInNewTabSuffix.displayName = 'LinkOpenInNewTabSuffix';
