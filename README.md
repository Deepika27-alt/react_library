# Acme React Component Library 🚀

Welcome to the **Acme React Component Library**, a premium, robust, and state-of-the-art design system and component library built with **React**, **TypeScript**, **Tailwind CSS**, and **Radix UI Primitives**.

This repository is managed as a monorepo containing the core UI package and a dedicated Storybook workspace for development, documentation, and visual testing.

---

## 📦 Monorepo Structure

Our codebase is organized using npm workspaces to keep the package compilation separated from our documentation and testing environments.

```text
react_library/
├── apps/
│   └── storybook/          # Storybook sandbox environment (port 6006)
├── packages/
│   └── ui/                 # Core library source code, compiler setup, and unit tests
│       ├── src/
│       │   ├── components/ # 20 premium UI components built with Radix & CVA
│       │   ├── theme/      # ThemeProvider and active theme context logic
│       │   ├── tokens/     # Core design tokens (colors, spacing, typography)
│       │   └── utils/      # Shared utility helpers (e.g., tailwind merge helper)
│       └── tsup.config.ts  # tsup packaging configuration
├── eslint.config.js        # Workspace-wide ESLint rule configurations
├── package.json            # Root package configuration with global monorepo scripts
└── tsconfig.base.json      # Base TypeScript compiler options shared by workspaces
```

---

## ✨ Key Features & Design System

*   **Radix UI Primitives**: Standard-compliant accessibility, keyboard navigation, and screen reader compatibility.
*   **Tailwind CSS Integration**: Fully dynamic layouts with easy override capability using standard classes.
*   **Class Variance Authority (CVA)**: Beautiful, type-safe variant orchestration for components (e.g. variants, sizes, shapes).
*   **Dynamic Design Tokens**: Centralized token definitions automatically compiled into standard CSS Variables (`dist/tokens.css`) at build-time.
*   **Theme Provider**: Complete light and dark mode capability, fully customizable theme configuration.
*   **100% Type-Safe**: Built from the ground up with TypeScript for a superior developer experience.

---

## 🎨 Available Components (20+)

Our component suite is divided into cohesive design categories:

| Category | Components |
| :--- | :--- |
| **Form Controls** | `Button`, `Input`, `Textarea`, `Label`, `Checkbox`, `RadioGroup`, `Switch`, `Select`, `FormField` |
| **Data Display** | `DataTable` (TanStack Table), `Badge`, `Tag`, `Avatar`, `Stat`, `Skeleton` |
| **Feedback & Overlays** | `Modal`, `Tooltip`, `Popover`, `Toast` |
| **Containers** | `Card` |

---

## 🚀 Getting Started

### 1. Installation
Install the UI package and its peer dependencies into your consumer application:

```bash
npm install @deepika27-alt/ui
```

### 2. Setting Up the Theme Provider
Wrap your application's root component inside the `ThemeProvider` to hook up the styles and design tokens:

```tsx
import React from 'react';
import { ThemeProvider } from '@deepika27-alt/ui';

// Import CSS variables and global components styles
import '@deepika27-alt/ui/styles';

export default function App({ children }) {
  return (
    <ThemeProvider defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}
```

### 3. Usage Example

```tsx
import React from 'react';
import { Card, Button, Badge } from '@deepika27-alt/ui';

export function PremiumFeatureCard() {
  return (
    <Card className="max-w-sm">
      <Card.Header>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-neutral-900">Analytics Pro</h3>
          <Badge variant="success">Active</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-neutral-600">
          Unlock real-time data insights, custom dashboards, and predictive trend metrics.
        </p>
      </Card.Body>
      <Card.Footer>
        <Button className="w-full">Get Started</Button>
      </Card.Footer>
    </Card>
  );
}
```

For more detailed guides and complete code examples (including data tables, login forms, and modal dialogs), check out [GETTING_STARTED.md](./GETTING_STARTED.md).

---

## 🛠️ Local Development & Scripts

To get started with local development on this library, clone the repository and install all dependencies from the root directory:

```bash
npm install
```

We define global monorepo commands in the root `package.json` to make running and testing a breeze:

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `npm run dev --workspace=packages/ui` | Starts compiler in watch mode to rebuild components on the fly |
| `npm run build` | `npm run build --workspace=packages/ui` | Bundles the library for distribution inside `/dist` (ESM & CJS formats) |
| `npm run storybook` | `npm run storybook --workspace=apps/storybook` | Launches the interactive Storybook sandbox at `http://localhost:6006` |
| `npm run build-storybook`| `npm run build-storybook --workspace=apps/storybook` | Compiles Storybook into a static web application |
| `npm run test` | `npm run test --workspace=packages/ui` | Runs the full Vitest unit test suite |
| `npm run lint` | `eslint . --ext .ts,.tsx` | Inspects code quality with ESLint guidelines |
| `npm run format` | `prettier --write "**/*.{ts,tsx,json,md}"` | Formats codebase matching Prettier rules |
| `npm run typecheck` | `tsc --noEmit --project packages/ui/tsconfig.json` | Runs high-fidelity TypeScript compilation check |

---

## 🎨 Tokens & Styling Customization

Core design tokens are defined inside [packages/ui/src/tokens/index.ts](file:///e:/mbo/2026_q2/react_library/packages/ui/src/tokens/index.ts). 

When you build the library (`npm run build` or `npm run dev`), `tsup` automatically runs an `onSuccess` hook that flattens these TypeScript design tokens into CSS variables and writes them to:
*   `packages/ui/dist/tokens.css`

You can override these CSS Variables globally inside your consumer app's stylesheet to easily brand or skin the library:

```css
:root {
  --ui-color-primary-500: #6366f1; /* Indigo custom brand color */
  --ui-border-radius-md: 8px;      /* Custom smooth corners */
}
```

---

## 🤝 Contribution Guidelines

We welcome external and internal contributions to the Acme Component Library!

1.  **Check Storybook**: Before building a new component, check Storybook (`npm run storybook`) to see if an existing component can be configured or extended.
2.  **Ensure Quality**: Ensure all code changes are type-safe, linted, and fully tested.
3.  **Include Stories**: Every component must have a corresponding `.stories.tsx` file inside its directory for visual verification.
4.  **Add Unit Tests**: Component behavior, events, accessibility, and variants should be covered by unit tests using Vitest and React Testing Library.
5.  **Use Changesets**: For version tracking and change logging, create changesets by running:
    ```bash
    npx changeset
    ```

---

*Acme Design System — Built with ❤️ for outstanding user experiences.*
