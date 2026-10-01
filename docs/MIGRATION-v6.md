# Migrating to Echoes React 6

Echoes no longer depends on `react-router-dom`. Routing goes through a router adapter that your app passes to `EchoesProvider`.

## Breaking changes

### `react-router-dom` is no longer a peer dependency

Echoes components do not import `react-router-dom` anymore. Keep it in your app if you use it, Echoes does not require it.

### `EchoesProvider` requires a `router` prop

Create the adapter once, at module scope (see the [README](../README.md#router-adapter) for react-router and Next.js recipes):

```tsx
import { Link, useLocation } from 'react-router-dom';
import type { EchoesRouter } from '@sonarsource/echoes-react';

export const reactRouterAdapter: EchoesRouter = {
  Link,
  usePathname: () => useLocation().pathname,
};
```

```diff
- <EchoesProvider>
+ <EchoesProvider router={reactRouterAdapter}>
```

Pass `router={null}` for apps without a client-side router: links render plain anchors and every navigation is a full page load.

`EchoesProviderForTests` accepts the same prop, but it is optional and defaults to `null`. Pass the adapter in test helpers that render a router (`MemoryRouter`, `createMemoryRouter`), so links navigate client-side and active states follow the test router.

### `to` is typed with the Echoes `LinkTo` type

`to` props now use `LinkTo` (`string | { pathname?, search?, hash? }`) instead of react-router's `To`. Both are structurally identical, so values typed with `To` or `Partial<Path>` keep compiling. Import `LinkTo` from `@sonarsource/echoes-react` if you need to type them without react-router. Use `toHref` to serialize a `LinkTo` into an href string, for instance in a router adapter.

### Automatic active state only applies to absolute destinations

`SidebarNavigation` items, `GlobalNavigation.Item`, `GlobalNavigation.DropdownItem` and `DropdownMenu.ItemLink` compute their active state from the adapter's `usePathname`. Only absolute destinations (`'/path'`, `{ pathname: '/path' }`) are matched. Relative (`'./child'`) or search-only (`{ search }`) destinations are never active automatically: pass `isActive` explicitly if needed.

Matching is unchanged otherwise: case-insensitive, trailing-slash tolerant, prefix match on path segments unless `isMatchingFullPath` is set.

### `GlobalNavigation.DropdownItem` no longer supports route patterns

Items are matched by exact pathname. Route patterns in `to` such as `:param` or `*` were supported through react-router's `matchPath` and are no longer interpreted.

### Navigation links no longer get react-router's `pending` and `transitioning` classes

Echoes still adds the `active` class and `aria-current="page"` to active links.
