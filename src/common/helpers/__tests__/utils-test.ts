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

import { throttle } from '../utils';

const TEST_DELAY = 100;
const TEST_NUMBER = 123;

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

it('should call the callback immediately on first call', () => {
  const callback = jest.fn();
  const throttledCallback = throttle(callback, TEST_DELAY);

  throttledCallback();

  expect(callback).toHaveBeenCalledTimes(1);
});

it('should not call the callback again during the delay period', () => {
  const callback = jest.fn();
  const throttledCallback = throttle(callback, TEST_DELAY);

  throttledCallback();
  throttledCallback();
  throttledCallback();

  expect(callback).toHaveBeenCalledTimes(1);
});

it('should call the callback again after the delay period', () => {
  const callback = jest.fn();
  const throttledCallback = throttle(callback, TEST_DELAY);

  throttledCallback();
  expect(callback).toHaveBeenCalledTimes(1);

  jest.advanceTimersByTime(TEST_DELAY);
  throttledCallback();

  expect(callback).toHaveBeenCalledTimes(2);
});

it('should pass arguments to the callback correctly', () => {
  const callback = jest.fn();
  const throttledCallback = throttle(callback, TEST_DELAY);

  throttledCallback('arg1', 'arg2', TEST_NUMBER);

  expect(callback).toHaveBeenCalledWith('arg1', 'arg2', TEST_NUMBER);
});

it('should ignore subsequent calls with different arguments during throttle period', () => {
  const callback = jest.fn();
  const throttledCallback = throttle(callback, TEST_DELAY);

  throttledCallback('first');
  throttledCallback('second');
  throttledCallback('third');

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith('first');
});

it('should maintain separate throttle states for different instances', () => {
  const callback1 = jest.fn();
  const callback2 = jest.fn();
  const throttledCallback1 = throttle(callback1, TEST_DELAY);
  const throttledCallback2 = throttle(callback2, TEST_DELAY);

  throttledCallback1('first');
  throttledCallback2('second');

  expect(callback1).toHaveBeenCalledTimes(1);
  expect(callback2).toHaveBeenCalledTimes(1);
  expect(callback1).toHaveBeenCalledWith('first');
  expect(callback2).toHaveBeenCalledWith('second');

  // Both should be throttled independently
  throttledCallback1('first-again');
  throttledCallback2('second-again');

  expect(callback1).toHaveBeenCalledTimes(1);
  expect(callback2).toHaveBeenCalledTimes(1);
});
