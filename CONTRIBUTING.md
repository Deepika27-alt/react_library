# Contributing Guidelines 🤝

Thank you for contributing to the **Acme React Component Library**! To maintain design system consistency, strict quality control, and robust releases, please follow these guidelines.

---

## 🛠️ Developer Setup

This repository is managed as an **npm workspaces monorepo**.

1.  **Clone the repository** and install dependencies at the root:
    ```bash
    npm install
    ```
2.  **Start development watch mode** (runs the compiler for changes in `packages/ui`):
    ```bash
    npm run dev
    ```
3.  **Start the Storybook sandbox** (isolated environment to test and preview components):
    ```bash
    npm run storybook
    ```

---

## 📐 Component Checklist & Coding Standards

Before opening a pull request, ensure every new component or modification fulfills these requirements:

### 1. Isolated Component Structure
Every component must reside in its own folder under `packages/ui/src/components/[ComponentName]/` with the following structure:
```text
ComponentName/
├── ComponentName.tsx        # Source implementation
├── ComponentName.test.tsx   # React Testing Library unit tests
├── ComponentName.stories.tsx # Storybook visual test cases
└── index.ts                 # Local barrel export mapping
```
Ensure you register public exports inside `packages/ui/src/index.ts`.

### 2. Accessibility (a11y) & Behavior
*   Always use unstyled **Radix UI Primitives** for interactive, complex components (e.g. Modals, Selects, Tooltips) to ensure WAI-ARIA compliance, screen reader support, and full keyboard navigation.
*   Test focus indicators and hover states using standard browsers.

### 3. Styling & Variants
*   Use **Tailwind CSS** utility classes inside components.
*   Orchestrate colors, shapes, and sizes using **Class Variance Authority (CVA)** to enable type-safe component properties.
*   Merge and deduplicate consumer overrides using our standard custom utility:
    ```tsx
    import { cn } from '../../utils';
    ```

---

## 🧪 Testing Guidelines

We have strict coverage requirements. Code with untested components will not be merged.

1.  **Run the Vitest suite**:
    ```bash
    npm run test
    ```
2.  **Ensure Stories exist**: Every new component or variant requires active stories inside `ComponentName.stories.tsx` to enable visual testing.

---

## 📦 Versioning & Changesets

We use **Changesets** to track changes, bump versions, and automate publication.

1.  When your work is ready, generate a changeset file by running:
    ```bash
    npx changeset
    ```
2.  Select the package (`@deepika27-alt/ui`), choose the semantic version bump (major/minor/patch), and write a summary of what changed.
3.  Commit the generated `.changeset/*.md` file alongside your code changes.

---

*Thank you for helping us maintain a premium, state-of-the-art developer experience!*
