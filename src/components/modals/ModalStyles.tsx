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
import { cssVar } from '~utils/design-tokens';
import { ModalSize } from './ModalTypes';

const SIZES = {
  [ModalSize.Default]: cssVar('sizes-overlays-width-default'),
  [ModalSize.Wide]: cssVar('sizes-overlays-width-wide'),
};

export const styleModalOverlay = styled.div`
  position: fixed;
  inset: 0;

  background: ${cssVar('color-overlays-back-drop-default')};
`.withComponent;

export const styleModalWrapper = styled.div<{ size: `${ModalSize}` }>`
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  max-height: ${cssVar('sizes-overlays-max-height-default')};
  width: ${(props) => SIZES[props.size]};

  border-radius: ${cssVar('border-radius-400')};
  background: ${cssVar('color-surface-default')};
  box-shadow: ${cssVar('box-shadow-large')};
`.withComponent;

export const styleModalTitle = styled.h2`
  flex: 0 0 auto;

  font: ${cssVar('typography-heading-large')};
  letter-spacing: ${cssVar('letter-spacing-decreased')};
  color: ${cssVar('color-text-strong')};

  min-height: ${cssVar('dimension-height-800')};
  line-height: ${cssVar('dimension-height-800')};
  margin: ${cssVar('dimension-space-0')};
  padding: ${cssVar('dimension-space-300')};
  padding-bottom: ${cssVar('dimension-space-0')};
  overflow-wrap: break-word;
`.withComponent;

export const styleModalDescription = styled.div`
  font: ${cssVar('typography-text-default-regular')};

  margin: ${cssVar('dimension-space-0')};
`.withComponent;

export const ModalContent = styled.div`
  font: ${cssVar('typography-text-default-regular')};
`;
ModalContent.displayName = 'ModalContent';

export const ModalFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: ${cssVar('dimension-space-300')};
  padding-top: ${cssVar('dimension-space-150')};
`;
ModalFooter.displayName = 'ModalFooter';
