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

import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Aside,
  BannerContainer,
  Button,
  ContentWrapper,
  Header,
  Layout,
  PageContent,
  PageFooter,
  PageHeader,
  PageWrapper,
  Sidebar,
} from '../../src';

const meta: Meta<typeof Layout> = {
  component: Layout,
  title: 'Echoes/Layout',
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  args: {},
  render: () => (
    // Compensate storybook's padding
    <div style={{ margin: '-1rem' }}>
      <Layout>
        <BannerContainer />
        <Header>Header</Header>
        <Sidebar isCollapsed={false}>Sidebar</Sidebar>
        <ContentWrapper fixed>
          <Aside>
            <div
              style={{
                height: '4309px',
                background: 'linear-gradient(rgb(122, 108, 108), rgb(130, 44, 44))',
              }}
            />
          </Aside>
          <PageWrapper>
            <PageHeader sticky>
              <h1>asdf</h1>
              <Button
                style={{ float: 'right', marginTop: '20px', position: 'sticky', top: '16px' }}>
                Action!
              </Button>
              <div
                style={{
                  marginTop: '100px',
                  position: 'sticky',
                  top: '16px',
                  height: '30px',
                  width: '100%',
                  background: 'lightgrey',
                }}
              />
            </PageHeader>
            <PageContent>
              {text}
              {text}
              {text}
              {text}
            </PageContent>
            <PageFooter />
          </PageWrapper>
        </ContentWrapper>
      </Layout>
    </div>
  ),
};

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non enim vel justo porttitor laoreet. Proin quis lobortis orci. Sed convallis tortor nec ullamcorper interdum. Integer massa augue, tempus nec accumsan vel, tincidunt in augue. Suspendisse mollis bibendum erat vitae vestibulum. Nunc aliquam mollis velit eu congue. Vestibulum viverra metus faucibus orci laoreet interdum. Suspendisse potenti. Sed id enim sagittis nunc porttitor egestas a a turpis. Cras venenatis nibh vitae purus blandit congue. Aenean sapien diam, aliquet sit amet venenatis vel, rutrum nec nunc. Phasellus varius congue sem non sodales. Sed mattis ante et scelerisque fermentum. Aenean elementum viverra ultricies. Integer accumsan, diam in pulvinar lobortis, quam turpis vulputate elit, ut eleifend mauris tellus et quam. Nullam sed leo non augue venenatis imperdiet.

Nam venenatis purus at risus condimentum laoreet. Nulla varius ultrices mi et mollis. Praesent pulvinar tincidunt turpis et lobortis. Duis pulvinar pellentesque magna, vitae semper magna vulputate eu. Morbi molestie ultrices iaculis. Nulla a felis semper, vehicula ipsum eget, iaculis mi. Pellentesque leo sem, rhoncus sit amet consequat ac, tempor ut erat. Etiam volutpat ligula gravida dictum placerat. Etiam mollis eros eget vehicula faucibus. Phasellus id justo porta, pellentesque libero ac, tincidunt nibh.

Maecenas finibus gravida molestie. Suspendisse sed ex dictum, dictum neque vel, commodo purus. Aliquam ultricies facilisis tortor eu malesuada. Nulla at risus suscipit, porttitor quam sit amet, maximus tortor. Aenean venenatis augue in nulla ultricies, quis iaculis sem rhoncus. Sed vel ante et sem porttitor porttitor. Mauris dolor turpis, finibus et facilisis vel, luctus vel mi. Etiam congue id metus ut tristique. Vestibulum quis nibh et nisi dignissim lobortis. Proin rutrum nisi lorem, aliquam lobortis lacus semper nec. Duis rhoncus enim id elit pretium, vitae bibendum ex accumsan. Aenean vitae velit dui. Pellentesque magna tellus, condimentum sed rhoncus nec, condimentum at nisi. Morbi id euismod velit. Mauris orci nunc, molestie molestie purus sed, vehicula semper nisi.

Nam erat nibh, tincidunt vel cursus et, facilisis quis risus. Donec congue vel dui eget fermentum. Ut commodo fermentum metus a elementum. Aenean malesuada arcu quam, vel blandit lacus bibendum eu. Vestibulum ornare rhoncus libero hendrerit maximus. Sed sed efficitur arcu. Nulla ut ipsum sed tellus commodo egestas. Sed aliquam blandit purus. Phasellus faucibus et nulla at semper. Donec massa risus, aliquam sed eros a, molestie tristique felis. Nam sed justo pulvinar, tincidunt sapien ac, tincidunt ipsum. Duis commodo imperdiet dui nec faucibus. Pellentesque nec leo id odio fermentum pulvinar. Aliquam eu ex ultrices, mollis diam non, maximus nibh. Phasellus sed faucibus magna, vel malesuada ligula.

Morbi imperdiet sollicitudin turpis, eu varius sem tempus et. Sed posuere egestas malesuada. Morbi dolor enim, laoreet nec consectetur sed, tempus vel odio. Quisque venenatis neque sapien, nec porttitor nisl elementum quis. Fusce id vulputate velit. Etiam ac auctor erat. Morbi ac nisi felis. Curabitur sed eros at augue varius molestie. Mauris pharetra, orci ut ornare posuere, odio orci bibendum felis, non ornare risus arcu eu purus. Duis dignissim lacus turpis, vitae blandit turpis pretium sed. Duis quis nunc ac libero imperdiet ultrices. Morbi id dictum sem, ac feugiat urna. Vestibulum maximus turpis sapien, in eleifend metus lobortis vitae.`;
