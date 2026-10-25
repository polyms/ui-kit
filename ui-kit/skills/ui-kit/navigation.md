---
description: >-
  Menu, NavigationMenu, Toolbar, Tabs, Breadcrumb, and Toc rules. Triggers → button.md.
---

# Navigation

Read the matching page, then keep the trigger on `Button`.

| Surface        | Doc                                           | Rule                                                                                                                                                                    |
| -------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Menu           | https://ui.polyms.dev/docs/menu.md            | `Menu.Trigger` uses `render={<Button … />}`. Destructive rows use `variant='danger'` on `Menu.Item`. Submenus stay inside `Menu.SubmenuRoot`.                           |
| NavigationMenu | https://ui.polyms.dev/docs/navigation-menu.md | One shared `NavigationMenu.Viewport` for the root. Do not invent a flat `NavigationMenuLink` import.                                                                    |
| Toolbar        | https://ui.polyms.dev/docs/toolbar.md         | On a narrow viewport, scroll with `overflow-x-auto` and move secondary groups into a `Menu` triggered by `Toolbar.Button render={<Menu.Trigger />}` inside the toolbar. |
| Tabs           | https://ui.polyms.dev/docs/tabs.md            | `Tabs.Tab` and `Tabs.Panel` share `value`. A long tab list scrolls (`overflow-x-auto`); it does not wrap into a second row of controls.                                 |
| Breadcrumb     | https://ui.polyms.dev/docs/breadcrumb.md      | Use `Breadcrumb.Item`. The current page is not a link.                                                                                                                  |
| Toc            | https://ui.polyms.dev/docs/toc.md             | Use `Toc`, `Toc.List`, `Toc.Item`, and `Toc.Indicator`. Do not hand-roll scroll-spy.                                                                                    |
