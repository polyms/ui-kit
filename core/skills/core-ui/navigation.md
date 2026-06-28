# Navigation

Menu, NavigationMenu, Toolbar, Tabs, Breadcrumb. Triggers with `Button` → [button.md](button.md#compose-button-through-render).

## Menu

Keep options as `Menu.Item` or `Menu.SubmenuTrigger` so keyboard navigation, disabled state, and variants work. Use `variant='danger'` for destructive actions. Style **`Menu.Trigger`** with **`render={<Button … />}`** — not hand-written `btn-*` classes.

```tsx
import { Button, Menu } from '@polyms/core-ui'

const actionsMenu = (
  <Menu>
    <Menu.Trigger render={<Button variant='primary' outlined />}>Actions</Menu.Trigger>
    <Menu.Content>
      <Menu.Item>Edit</Menu.Item>
      <Menu.Item>Duplicate</Menu.Item>
      <Menu.Separator />
      <Menu.Item variant='danger'>Delete</Menu.Item>
    </Menu.Content>
  </Menu>
)
```

Submenus use `Menu.SubmenuRoot`, `Menu.SubmenuTrigger`, and nested `Menu.Content`.

## NavigationMenu

Each `NavigationMenu.Item` owns its trigger/content, and one shared `NavigationMenu.Viewport` belongs at the end of the root.

```tsx
import { NavigationMenu } from '@polyms/core-ui'

const siteNavigation = (
  <NavigationMenu>
    <NavigationMenu.List variant='bare'>
      <NavigationMenu.Item value='products'>
        <NavigationMenu.Trigger size='lg'>
          Products
          <NavigationMenu.Icon />
        </NavigationMenu.Trigger>
        <NavigationMenu.Content>
          <NavigationMenu.Link href='/launchpad' variant='soft'>
            Launchpad
          </NavigationMenu.Link>
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link href='/pricing' size='lg' variant='trigger'>
          Pricing
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>

    <NavigationMenu.Viewport />
  </NavigationMenu>
)
```

Use `NavigationMenu.Link render={...}` for router integration. Use `active` for current page state.

Use `NavigationMenu.GroupLabel`, `NavigationMenu.Separator`, and `NavigationMenu.Footer` to structure mega menu content without raw utility bundles. `NavigationMenu.Icon` renders the default rotating chevron; pass children to swap the icon while preserving open-state rotation.

`NavigationMenu.Link` variants:

- `variant='soft'`: card-style row inside `NavigationMenu.Content`.
- `variant='danger'`: destructive row styling for sign-out, revoke, or delete actions.
- `variant='trigger'`: pill styling for static entries inside `NavigationMenu.List`.

```tsx
<NavigationMenu.Content>
  <NavigationMenu.GroupLabel>Products</NavigationMenu.GroupLabel>
  <NavigationMenu.Link href='/launchpad' variant='soft'>
    Launchpad
  </NavigationMenu.Link>
  <NavigationMenu.Separator />
  <NavigationMenu.Footer>
    <span>Postgres branching is now GA.</span>
    <a className='link link-primary' href='/changelog'>
      Read changelog
    </a>
  </NavigationMenu.Footer>
</NavigationMenu.Content>
```

## Toolbar

Wrap toolbar actions in `Toolbar.Button` for roving focus. Compose `Toggle`, `Menu.Trigger`, `Select.Trigger`, or `Button` through the `render` prop. Always provide `aria-label` on `Toolbar` and `Toolbar.Group`.

```tsx
import { Toggle, ToggleGroup, Toolbar } from '@polyms/core-ui'

const formattingToolbar = (
  <Toolbar aria-label='Formatting'>
    <Toolbar.Group aria-label='Text alignment'>
      <ToggleGroup className='toolbar-group' aria-label='Alignment'>
        <Toolbar.Button render={<Toggle />} value='left'>
          Left
        </Toolbar.Button>
        <Toolbar.Button render={<Toggle />} value='right'>
          Right
        </Toolbar.Button>
      </ToggleGroup>
    </Toolbar.Group>
  </Toolbar>
)
```

For tooltips, pass `Toolbar.Button` to `Tooltip.Trigger` through `render`. Place `Toolbar.Input` at the end of a horizontal toolbar so text-cursor keyboard behavior remains predictable.

## Tabs

**Tree:** `Tabs` → `Tabs.List` + `Tabs.Tab` … + matching `Tabs.Panel` per `value`.

```tsx
import { Tabs } from '@polyms/core-ui'

const accountTabs = (
  <Tabs defaultValue='profile'>
    <Tabs.List>
      <Tabs.Tab value='profile'>Profile</Tabs.Tab>
      <Tabs.Tab value='account'>Account</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value='profile'>
      <h3 className='h3'>Profile</h3>
      <p className='text-muted'>How others see you on this workspace.</p>
    </Tabs.Panel>
    <Tabs.Panel value='account'>
      <h3 className='h3'>Account</h3>
      <p className='text-muted'>Password and security.</p>
    </Tabs.Panel>
  </Tabs>
)
```

| Rule                | Detail                                                                                                                              |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Values**          | `Tabs.Tab` `value` must match its `Tabs.Panel` `value`                                                                              |
| **Controlled**      | `value` + `onValueChange` on `Tabs` root                                                                                            |
| **Panels required** | Every tab needs a `Tabs.Panel` — no tab labels without content                                                                      |
| **Long lists**      | Many sections → prefer `Tabs` over stacked `divide-y` blocks ([quality.md#lists-and-collections](quality.md#lists-and-collections)) |

## Breadcrumb

**Tree:** `Breadcrumb` → `Breadcrumb.Item` (list items).

```tsx
import { Breadcrumb } from '@polyms/core-ui'

const projectBreadcrumb = (
  <Breadcrumb>
    <Breadcrumb.Item href='/projects'>Projects</Breadcrumb.Item>
    <Breadcrumb.Item href='/projects/launchpad'>Launchpad</Breadcrumb.Item>
    <Breadcrumb.Item active>Settings</Breadcrumb.Item>
  </Breadcrumb>
)
```

| Rule             | Detail                                                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Current page** | `active` or omit `href` on the last crumb — sets `aria-current="page"` on that item only; ancestor links with `href` do not |
| **Router links** | `Breadcrumb.Item` `render` for client-side links — confirm props in `index.d.ts`                                            |
