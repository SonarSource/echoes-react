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

import { Meta, StoryObj } from '@storybook/react';
import { Footer, Link, LinkHighlight, LinkStandalone, LogoSize, LogoSonarQubeServer } from '../src';

const meta: Meta<typeof Footer> = {
  title: 'Echoes/Footer',
  component: Footer,
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    children: <LogoSonarQubeServer hasText size={LogoSize.Small} />,
  },
  render: ({ children, ...args }) => (
    <div style={{ minWidth: '980px' }}>
      <Footer {...args}>
        <Footer.Copyright>
          <span>
            SonarQube&trade; technology is powered by{' '}
            <Link
              highlight={LinkHighlight.CurrentColor}
              shouldOpenInNewTab
              to="https://www.sonarsource.com">
              SonarSource SA
            </Link>
          </span>
        </Footer.Copyright>
        <Footer.ExtraContent>
          <li>Data Center Edition</li>
          <>
            <li>
              <div
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'currentcolor',
                  display: 'inline-block',
                }}
              />
            </li>

            <li>v2025.1-SNAPSHOT</li>
          </>

          <li>
            <div
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'currentcolor',
                display: 'inline-block',
              }}
            />
          </li>

          <li>
            <LinkStandalone highlight={LinkHighlight.CurrentColor} to="/active">
              ACTIVE
            </LinkStandalone>
          </li>

          <li>
            <div
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'currentcolor',
                display: 'inline-block',
              }}
            />
          </li>

          <li>MQR MODE</li>
        </Footer.ExtraContent>
        <Footer.Navlist>
          <Footer.NavlistItem highlight={LinkHighlight.Subdued} shouldOpenInNewTab to="/near">
            SonarQube Server Terms & Conditions
          </Footer.NavlistItem>

          <Footer.NavlistItem highlight={LinkHighlight.Subdued} shouldOpenInNewTab to="/you">
            Community
          </Footer.NavlistItem>

          <Footer.NavlistItem highlight={LinkHighlight.Subdued} shouldOpenInNewTab to="/far">
            Documentation
          </Footer.NavlistItem>

          <Footer.NavlistItem highlight={LinkHighlight.Subdued} shouldOpenInNewTab to="/whereever">
            Plugins
          </Footer.NavlistItem>

          <Footer.NavlistItem highlight={LinkHighlight.Subdued} to="/web_api">
            Web API
          </Footer.NavlistItem>
        </Footer.Navlist>
      </Footer>
    </div>
  ),
};
