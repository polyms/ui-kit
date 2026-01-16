# Copilot Instructions for Core-UI

Welcome to the Core-UI codebase! This document provides essential guidelines for AI coding agents to be productive in this project. It covers the architecture, workflows, conventions, and integration points specific to this repository.

---

## Project Overview

Core-UI is a modular, component-driven UI library built with React and TypeScript. It uses the Nx monorepo framework to manage multiple projects and libraries efficiently. The repository is structured into two main areas:

- **`core/`**: Contains reusable UI components and styles.
- **`docs/`**: Hosts documentation and example usage of the components with MDX.

### Key Technologies

- **React**: For building UI components (functional components + hooks only).
- **TypeScript**: For type safety (strict mode).
- **Nx**: For monorepo management.
- **Vite**: For fast bundling and HMR.
- **TanStack Router**: For file-based routing in docs.
- **MDX**: For documentation with live component examples.
- **Vitest**: For testing.
- **PNPM**: For package management.

---

## Developer Workflows

### Running the Development Server

To start the development server for the `docs` app:

```bash
npx nx serve docs
```

To start the development server for the `core` app:

```bash
npx nx serve core
```

### Building the Project

To create a production build for core:

```bash
npx nx build core
```

To build the docs:

```bash
npx nx build docs
```

### Testing

To run tests: 4. Add corresponding styles in `core/src/styles/_component-name.css`.

### Adding Documentation Pages

1. Create a new `.mdx` file in `docs/src/pages/` directory.
2. Add frontmatter with `title` field:
   ```mdx
   ---
   title: Component Name
   ---
   ```
3. The page will automatically appear in sidebar navigation via `virtual:mdx-navigation`.
4. Use folders to group components into sections (e.g., `pages/forms/input.mdx`).

```bash
npx nx test <project-name>
```

Replace `<project-name>` with the specific project (e.g., `core`).

### Adding New Components

1. Navigate to the `core/src/` directory.
2. Follow the existing folder structure (e.g., `button/`, `modal/`).
3. Export the component in the `index.ts` file of the respective folder.

### Linking Local Libraries

To link the `core` library locally, add the following to your `package.json`:

```json
"@polyms/core": "file:./dist/core"
```

---

## Project-Specific Conventions

### Component Structure

Each component resides in its own folder under `core/src/`. A typical component folder includes:

- `ComponentName.tsx`: The main component file.
- `index.ts`: Barrel file for exports.
- `styles/`: Contains CSS files specific to the component.

### Styling

- **TailwindCSS**: For utility-first styling. Classes are organized with `clsx()`.
- **Component-specific CSS**: Each component has a corresponding `.css` file in `core/src/styles/_component-name.css`.

### Code Style & Format

All TypeScript/TSX files must follow this structure:

```tsx
import statements...

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface TypeName {}
export type CustomType = ...

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const Component = () => {}
```

**Separator Format Rules (CRITICAL):**

- Each separator is exactly **110 characters** total (including `//` and spaces)
- Format: `// ── SectionName ────────────────────────────────────────────────────────────────────────────────────────────`
- **Always include both Types and Components sections if file has code**
- **If file has NO types, omit the Types section entirely** (only show Components section)
- If file has no components (rare), omit the Components section
- Always use `// ──` (2 dashes with spaces) at start
- Fill the rest with dashes until total reaches exactly 110 characters
- Types section must come before Components section when both exist

**Examples:**

File with both Types and Components (ModalTrigger.tsx):

```tsx
// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────
// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────
```

File with only Components (no types, e.g., Button.test.tsx):

```tsx
// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────
```

**Editor Formatting:**

- Biome auto-format enabled on save (Cmd+S)
- Auto-organize imports with `source.organizeImports.biome`
- Auto-fix unused imports with `source.fixAll.biome`

### Testing

All tests are written using **Vitest** and **React Testing Library**. Follow these conventions:

**Test File Structure:**

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

// ── Components ──────────────────────────────────────────────────────────────────────────────────────────────

describe('ComponentName', () => {
  it('should do something', () => {
    render(<Component />)
    expect(screen.getByText('text')).toBeInTheDocument()
  })
})
```

**Key Testing Patterns:**

1. **Always import from vitest**: `describe`, `expect`, `it`, `vi` (for mocking)
2. **Use screen queries over container**: Prefer `screen.getByRole()`, `screen.getByText()`, `screen.getByTestId()`
3. **Portal Elements (Floating-UI)**: Components using Floating-UI render in portals. Use:
   - `document.querySelector()` for DOM queries in portals
   - `screen.getByTestId()` for test IDs
   - `{ hidden: true }` option in `getByRole()` for hidden elements
4. **Test File Naming**: Follow `ComponentName.test.tsx` pattern
5. **User Interactions**: Use `userEvent.setup()` for realistic user interactions

**Example with Portal Elements:**

```typescript
it('renders close button in portal', () => {
  render(
    <OffcanvasContent>
      <OffcanvasClose />
    </OffcanvasContent>
  )
  // Use document.querySelector for portal elements
  const closeButton = document.querySelector('.offcanvas-close')
  expect(closeButton).toBeInTheDocument()
})
```

**Running Tests:**

```bash
npx nx test core
npx nx test core --watch
npx nx test core -- --coverage
```

- **`virtual:mdx-navigation`**: Auto-generated navigation from MDX files via `docs/plugins/mdxNavigation.plugin.ts`.
  - Scans `docs/src/pages/` directory for `.mdx` files.
  - Groups navigation by folder structure.
  - Extracts frontmatter `title` field for labels.
  - Type definitions in `docs/src/navigation.d.ts`.

### External Dependencies

- **Module Federation**: Used for dynamic imports and micro-frontend architecture. See `core/plugins/module-federation.plugin.ts`.
- **Vite**: Used for bundling. Configuration files are located in `vite.config.ts` and `vite.config.mts`.
- **TanStack Router**: File-based routing for docs site. Routes auto-generated in `routeTree.gen.ts`.

### Cross-Component Communication

- Use React Context for shared state management (e.g., `OffcanvasContext.ts`).
- Follow the `use<Feature>` naming convention for hooks (e.g., `useValidation.ts`, `useOffcanvas

---

## Integration Points

### External Dependencies

- **Module Federation**: Used for dynamic imports and micro-frontend architecture. See `core/plugins/module-federation.plugin.ts`.
- **Vite**: Used for bundling. Configuration files are located in `vite.config.ts`.

### Core Library

- `core/src/`: Source code for reusable components.
- `core/src/styles/`: Global styles and component-specific CSS.
- `core/plugins/`: Vite plugins (e.g., Module Federation).
- `core/vite.config.mts`: Vite configuration for core library.

### Documentation Site

- `docs/src/pages/`: MDX documentation pages (auto-generates navigation).
- `docs/src/layouts/`: Layout components (e.g., `AppSidebar.tsx`).
- `docs/plugins/`: Custom Vite plugins (e.g., `mdxNavigation.plugin.ts`).
- `docs/src/navigation.d.ts`: Type declarations for virtual modules.
- `docs/vite.config.mts`: Vite configuration for docs site.

### Root

- `nx.json`: Nx workspace configuration.
- `pnpm-workspace.yaml`: PNPM workspace configuration.
- `tsconfig.base.json`: Base TypeScript configuration.
- `biome.json`: Biome linter/formatter

---

## Key Files and Directories

- `core/src/`: Source code for reusable components.
- `docs/src/`: Documentation and examples.
- `nx.json`: Nx workspace configuration.
- `vite.config.ts`: Vite bundler configuration.
- `pnpm-workspace.yaml`: PNPM workspace configuration.

---

- [TanStack Router Documentation](https://tanstack.com/router)
- [MDX Documentation](https://mdxjs.com)
- [Vite Documentation](https://vitejs.dev)

---

## Important Notes for AI Agents

- Always use functional components with hooks (no class components unless absolutely necessary).
- TypeScript strict mode is enabled - ensure all types are properly defined.
- When adding new virtual modules, create corresponding `.d.ts` files in `docs/src/`.
- MDX navigation is auto-generated - just create `.mdx` files with proper frontmatter.
- Use `gray-matter` to parse MDX frontmatter in Vite plugins.
- Follow existing patterns for Vite plugins (virtual modules use `\0` prefix for resolved IDs).

## Useful Commands

- List all available tasks:
  ```bash
  npx nx show project core
  ```
- Generate a new library:
  ```bash
  npx nx g @nx/react:lib <library-name>
  ```
- Run the dependency graph:
  ```bash
  npx nx graph
  ```

---

## Additional Resources

- [Nx Documentation](https://nx.dev)
- [PNPM Documentation](https://pnpm.io)
- [Vitest Documentation](https://vitest.dev)

---

Feel free to update this document as the project evolves!
