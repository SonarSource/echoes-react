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
import React from 'react';

(window as any).React = React;

/*
 * ResizeObserver
 */
const MockResizeObserverEntries = [
  {
    contentRect: {
      width: 100,
      height: 200,
    },
  },
];

const MockResizeObserver = {
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
};

global.ResizeObserver = jest.fn().mockImplementation((callback) => {
  callback(MockResizeObserverEntries, MockResizeObserver);
  return MockResizeObserver;
});

/*
 * Pointer Capture API - required for Sonner toast library
 */
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = jest.fn();
}

if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = jest.fn();
}
