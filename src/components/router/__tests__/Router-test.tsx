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

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createContext, ReactElement, useContext, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { EchoesProvider } from '../../echoes-provider';
import { IconBranch } from '../../icons';
import { SidebarNavigationItem } from '../../layout/sidebar-navigation/SidebarNavigationItem';
import { Link } from '../../links';
import { EchoesRouter, EchoesRouterLinkProps, LinkTo } from '../RouterTypes';
import { isPathActive, toHref } from '../RouterUtils';

describe('isPathActive', () => {
  it.each<[string, LinkTo, boolean, boolean]>([
    ['/settings', '/settings', false, true],
    ['/settings/tokens', '/settings', false, true],
    ['/settings/tokens', '/settings', true, false],
    ['/settingsx', '/settings', false, false],
    ['/Settings/', '/settings', true, true],
    ['/settings', '/settings/', true, true],
    ['/settings///', '/settings', true, true],
    ['///', '/', true, true],
    ['/', '///', true, true],
    ['/anything', '/', false, false],
    ['/anything', '/', true, false],
    ['/settings', '/settings?tab=1#top', true, true],
    ['/settings', { pathname: '/settings', search: '?tab=1' }, true, true],
    ['/settings', { search: '?tab=1' }, false, false],
    ['/settings/tokens', 'tokens', false, false],
    ['/settings', '', false, false],
    ['/settings', 'https://sonarsource.com/settings', false, false],
  ])('matches %s against %j (end: %s) as %s', (current, to, end, expected) => {
    expect(isPathActive(current, to, { end })).toBe(expected);
  });
});

describe('toHref', () => {
  it('serializes strings and partial locations', () => {
    expect(toHref('/a?b#c')).toBe('/a?b#c');
    expect(toHref({ hash: '#c', pathname: '/a', search: '?b' })).toBe('/a?b#c');
    expect(toHref({ search: '?b' })).toBe('?b');
  });

  it('adds missing prefixes and drops empty search and hash', () => {
    expect(toHref({ hash: 'c', pathname: '/a', search: 'b' })).toBe('/a?b#c');
    expect(toHref({ hash: '#', pathname: '/a', search: '?' })).toBe('/a');
    expect(toHref({ hash: '', pathname: '/a', search: '' })).toBe('/a');
  });
});

describe('native fallback', () => {
  afterEach(() => {
    globalThis.history.replaceState({}, '', '/');
  });

  it('renders plain anchors without leaking router-only props', async () => {
    const { container } = renderWithRouter(
      null,
      <>
        <Link state={{ from: 'test' }} to={{ pathname: '/a', search: '?b' }}>
          Object
        </Link>
        <Link reloadDocument to="/c#d">
          String
        </Link>
      </>,
    );

    expect(screen.getByRole('link', { name: 'Object' })).toHaveAttribute('href', '/a?b');
    expect(screen.getByRole('link', { name: 'String' })).toHaveAttribute('href', '/c#d');
    expect(screen.getByRole('link', { name: 'String' })).not.toHaveAttribute('reloadDocument');
    expect(screen.getByRole('link', { name: 'Object' })).not.toHaveAttribute('state');
    await expect(container).toHaveNoA11yViolations();
  });

  it('works without any router provided', () => {
    renderWithoutProvider(null, <Link to="/a">Link</Link>);

    expect(screen.getByRole('link', { name: 'Link' })).toHaveAttribute('href', '/a');
  });

  it('reads the active route from the document location', () => {
    globalThis.history.replaceState({}, '', '/settings/tokens');

    renderWithRouter(
      null,
      <ul>
        <SidebarNavigationItem Icon={IconBranch} to="/settings">
          Settings
        </SidebarNavigationItem>
        <SidebarNavigationItem Icon={IconBranch} isMatchingFullPath to="/settings">
          Settings exact
        </SidebarNavigationItem>
      </ul>,
    );

    expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Settings exact' })).not.toHaveAttribute(
      'aria-current',
    );
  });
});

describe('custom router', () => {
  it('delegates links to the router and passes router-only props', () => {
    const { linkSpy, router } = createFakeRouter();

    renderWithRouter(
      router,
      <Link reloadDocument state={{ from: 'test' }} to="/a">
        Link
      </Link>,
    );

    expect(screen.getByRole('link', { name: 'Link' })).toHaveAttribute('href', '/fake/a');
    expect(linkSpy).toHaveBeenCalledWith(
      expect.objectContaining({ reloadDocument: true, state: { from: 'test' }, to: '/a' }),
    );
  });

  it('updates the active state when the router pathname changes', async () => {
    const { router } = createFakeRouter();
    const { user } = renderWithRouter(
      router,
      <ul>
        <SidebarNavigationItem Icon={IconBranch} to="/settings">
          Settings
        </SidebarNavigationItem>
        <SidebarNavigationItem Icon={IconBranch} isActive={false} to="/other">
          Other
        </SidebarNavigationItem>
      </ul>,
    );

    const settings = screen.getByRole('link', { name: 'Settings' });
    expect(settings).not.toHaveAttribute('aria-current');
    expect(settings).not.toHaveClass('active');

    await user.click(screen.getByRole('button', { name: 'Go to /settings/tokens' }));

    expect(settings).toHaveAttribute('aria-current', 'page');
    expect(settings).toHaveClass('active');
    expect(screen.getByRole('link', { name: 'Other' })).not.toHaveAttribute('aria-current');
  });

  it('lets keyboard users activate links', async () => {
    const { router } = createFakeRouter();
    const onClick = jest.fn((event) => event.preventDefault());
    const { user } = renderWithRouter(
      router,
      <Link onClick={onClick} to="/a">
        Link
      </Link>,
    );

    // The first tab stop is the FakeLocation button.
    await user.tab();
    await user.tab();
    expect(screen.getByRole('link', { name: 'Link' })).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalled();
  });
});

const FakeLocationContext = createContext('/');

function createFakeRouter() {
  const linkSpy = jest.fn();

  function FakeLink(props: Readonly<EchoesRouterLinkProps>) {
    linkSpy(props);
    const { reloadDocument: _reloadDocument, state: _state, to, ...restProps } = props;

    return <a href={`/fake${toHref(to)}`} {...restProps} />;
  }

  const router: EchoesRouter = {
    Link: FakeLink,
    usePathname: () => useContext(FakeLocationContext),
  };

  return { linkSpy, router };
}

function FakeLocation({ children }: Readonly<{ children: ReactElement }>) {
  const [pathname, setPathname] = useState('/');

  return (
    <FakeLocationContext.Provider value={pathname}>
      <button onClick={() => setPathname('/settings/tokens')} type="button">
        Go to /settings/tokens
      </button>
      {children}
    </FakeLocationContext.Provider>
  );
}

function renderWithRouter(router: EchoesRouter | null, ui: ReactElement) {
  return {
    ...render(
      <IntlProvider locale="en">
        <EchoesProvider router={router}>
          <FakeLocation>{ui}</FakeLocation>
        </EchoesProvider>
      </IntlProvider>,
    ),
    user: userEvent.setup(),
  };
}
