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

import { render as rtlRender, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { EchoesProvider } from '../EchoesProvider';
import { useNonce } from '../NonceContext';

describe('EchoesProvider', () => {
  it('should render children without nonce', () => {
    rtlRender(
      <IntlProvider defaultLocale="en-us" locale="en-us">
        <EchoesProvider>
          <div>Test content</div>
        </EchoesProvider>
      </IntlProvider>,
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render children with nonce', () => {
    const testNonce = 'test-nonce-12345';

    rtlRender(
      <IntlProvider defaultLocale="en-us" locale="en-us">
        <EchoesProvider nonce={testNonce}>
          <div>Test content with nonce</div>
        </EchoesProvider>
      </IntlProvider>,
    );

    expect(screen.getByText('Test content with nonce')).toBeInTheDocument();
  });

  it('should provide nonce through context', () => {
    const testNonce = 'test-nonce-67890';
    let capturedNonce: string | undefined;

    function TestComponent() {
      capturedNonce = useNonce();

      return <div>Test</div>;
    }

    rtlRender(
      <IntlProvider defaultLocale="en-us" locale="en-us">
        <EchoesProvider nonce={testNonce}>
          <TestComponent />
        </EchoesProvider>
      </IntlProvider>,
    );

    expect(capturedNonce).toBe(testNonce);
  });

  it('should provide undefined nonce when not specified', () => {
    let capturedNonce: string | undefined = 'initial-value';

    function TestComponent() {
      capturedNonce = useNonce();

      return <div>Test</div>;
    }

    rtlRender(
      <IntlProvider defaultLocale="en-us" locale="en-us">
        <EchoesProvider>
          <TestComponent />
        </EchoesProvider>
      </IntlProvider>,
    );

    expect(capturedNonce).toBeUndefined();
  });
});
