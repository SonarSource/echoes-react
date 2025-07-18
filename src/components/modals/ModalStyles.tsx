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
import { ModalSize } from './ModalTypes';

const SIZES = {
  [ModalSize.Default]: 'var(--echoes-sizes-overlays-width-default)',
  [ModalSize.Wide]: 'var(--echoes-sizes-overlays-width-wide)',
};

export const styleModalOverlay = styled.div`
  position: fixed;
  inset: 0;

  background: var(--echoes-color-overlays-back-drop-default);
`.withComponent;

export const styleModalWrapper = styled.div<{ size: `${ModalSize}` }>`
  display: flex;
  flex-direction: column;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  max-height: var(--echoes-sizes-overlays-max-height-default);
  width: ${(props) => SIZES[props.size]};

  border-radius: var(--echoes-border-radius-400);
  background: var(--echoes-color-surface-default);
  box-shadow: var(--echoes-box-shadow-large);
`.withComponent;

export const styleModalTitle = styled.h2`
  flex: 0 0 auto;

  font: var(--echoes-typography-heading-large);
  letter-spacing: var(--echoes-letter-spacing-decreased);
  color: var(--echoes-color-text-strong);

  min-height: var(--echoes-dimension-height-800);
  line-height: var(--echoes-dimension-height-800);
  margin: var(--echoes-dimension-space-0);
  padding: var(--echoes-dimension-space-300);
  padding-bottom: var(--echoes-dimension-space-0);
  overflow-wrap: break-word;
`.withComponent;

export const styleModalDescription = styled.div`
  font: var(--echoes-typography-text-default);

  margin: var(--echoes-dimension-space-0);
`.withComponent;

export const ModalContent = styled.div`
  font: var(--echoes-typography-text-default);
`;
ModalContent.displayName = 'ModalContent';

export const ModalFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: var(--echoes-dimension-space-300);
  padding-top: var(--echoes-dimension-space-150);
`;
ModalFooter.displayName = 'ModalFooter';
