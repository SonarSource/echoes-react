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

import { screen } from '@testing-library/react';
import { ComponentProps } from 'react';
import { renderWithMemoryRouter } from '~common/helpers/test-utils';
import { ContentHeader, PageHeader } from '..';
import {
  Button,
  ButtonIcon,
  ButtonVariety,
  DropdownMenu,
  IconArrowLeft,
  IconEdit,
  MessageCallout,
  MessageVariety,
} from '../../..';
import { PageHeaderScrollBehavior } from '../../LayoutTypes';

describe('[PageHeader]', () => {
  it('should display a full PageHeader properly', async () => {
    const { container } = setup();

    expect(
      screen.getByRole('button', {
        name: 'Primary action',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: 'Breadcrumb item 1',
      }),
    ).toBeInTheDocument();

    expect(screen.getByText('Page description')).toBeInTheDocument();
    expect(screen.getByText('Page metadata')).toBeInTheDocument();
    expect(screen.getByText('Page title')).toBeInTheDocument();
    expect(screen.getByText('More')).toBeInTheDocument();

    await expect(container).toHaveNoA11yViolations();
  });

  it('should display a minimal PageHeader properly', () => {
    renderWithMemoryRouter(<PageHeader title={<PageHeader.Title>Page title</PageHeader.Title>} />);

    expect(screen.getByText('Page title')).toBeInTheDocument();
  });

  describe('scroll behavior', () => {
    it.each([
      [PageHeaderScrollBehavior.collapse, false, 'sticky'],
      [PageHeaderScrollBehavior.collapse, true, ''],
      [PageHeaderScrollBehavior.scroll, false, ''],
      [PageHeaderScrollBehavior.scroll, true, ''],
      [PageHeaderScrollBehavior.sticky, false, ''],
      [PageHeaderScrollBehavior.sticky, true, ''],
    ])(
      '%s (sticky actions disabled = %s) behavior should work as expected',
      (scrollBehavior, disableStickyActions, expectedPosition) => {
        setup({
          actions: <Button>action!</Button>,
          scrollBehavior,
          disableStickyActions,
        });

        // eslint-disable-next-line testing-library/no-node-access
        expect(screen.getByRole('button', { name: 'action!' }).parentNode).toHaveStyle({
          position: expectedPosition,
        });
      },
    );
  });
});

function setup(props: Partial<ComponentProps<typeof PageHeader>> = {}) {
  return renderWithMemoryRouter(
    <PageHeader
      actions={
        <PageHeader.Actions>
          <Button>Secondary action</Button>
          <Button variety={ButtonVariety.Primary}>Primary action</Button>
        </PageHeader.Actions>
      }
      breadcrumbs={
        <PageHeader.Breadcrumbs
          items={[
            { linkElement: 'Breadcrumb item 1', to: 'https://sonarsource.com' },
            { linkElement: 'Breadcrumb item 2', to: '' },
          ]}
        />
      }
      callout={<MessageCallout variety={MessageVariety.Warning}>Watch out!</MessageCallout>}
      description={<PageHeader.Description>Page description</PageHeader.Description>}
      metadata={<PageHeader.Metadata>Page metadata</PageHeader.Metadata>}
      navigation={
        <PageHeader.Navigation>
          <PageHeader.NavigationItem to="/">Home</PageHeader.NavigationItem>

          <PageHeader.NavigationDropdownItem
            items={
              <>
                <DropdownMenu.ItemLink to="/option1">option 1</DropdownMenu.ItemLink>
                <DropdownMenu.ItemLink to="/option2">option 2</DropdownMenu.ItemLink>
              </>
            }>
            More
          </PageHeader.NavigationDropdownItem>
        </PageHeader.Navigation>
      }
      title={
        <PageHeader.Title
          headingLevel="h1"
          prefix={
            <ButtonIcon
              Icon={IconArrowLeft}
              ariaLabel="Go back"
              variety={ButtonVariety.DefaultGhost}
            />
          }
          suffix={
            <ButtonIcon Icon={IconEdit} ariaLabel="Edit" variety={ButtonVariety.DefaultGhost} />
          }>
          Page title
        </PageHeader.Title>
      }
      {...props}
    />,
  );
}

describe('[ContentHeader]', () => {
  it('should display a ContentHeader properly', async () => {
    const { container } = renderWithMemoryRouter(
      <ContentHeader title={<ContentHeader.Title>Awesome content header</ContentHeader.Title>} />,
    );

    await expect(container).toHaveNoA11yViolations();
  });
});
