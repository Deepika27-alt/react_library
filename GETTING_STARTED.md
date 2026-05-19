# Getting Started with Our React UI Library

Welcome to the internal UI component library! This guide will help you install the library, set up the theme, and start building interfaces.

## 1. Installation

First, install the library and its peer dependencies in your project:

```bash
npm install @acme/ui
```

*(Note: Replace `@acme/ui` with the actual package name of the library once published).*

## 2. Setting Up the Theme Provider

To ensure all components have the correct design tokens (colors, typography, spacing, etc.) and support dark/light modes, you must wrap your application root with the `ThemeProvider`.

In your main entry file (e.g., `App.tsx`, `index.tsx`, or `_app.tsx` for Next.js):

```tsx
import React from 'react';
import { ThemeProvider } from '@acme/ui';

// Import global styles if needed
import '@acme/ui/styles.css';

export default function App({ children }) {
  return (
    <ThemeProvider defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}
```

---

## 3. Usage Examples

Here are three common patterns to help you get started.

### Example 1: Login Form

A standard login form using `Card`, `Input`, and `Button` components.

```tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@acme/ui/Card';
import { Input } from '@acme/ui/Input';
import { Button } from '@acme/ui/Button';

export function LoginForm() {
  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <Input id="email" type="email" placeholder="name@example.com" />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Sign In</Button>
      </CardFooter>
    </Card>
  );
}
```

### Example 2: Data Table Page

Using the `DataTable` component to render a list of users.

```tsx
import React from 'react';
import { DataTable } from '@acme/ui/DataTable';

const data = [
  { id: '1', name: 'Alice Smith', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Bob Jones', role: 'User', status: 'Inactive' },
];

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'status', header: 'Status' },
];

export function UsersPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <DataTable data={data} columns={columns} />
    </div>
  );
}
```

### Example 3: Confirm Modal

A confirmation dialog using the `Modal` and `Button` components.

```tsx
import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from '@acme/ui/Modal';
import { Button } from '@acme/ui/Button';

export function DeleteAccountConfirm() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        Delete Account
      </Button>

      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Are you absolutely sure?</ModalTitle>
            <ModalDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => {
              // Add delete logic here
              setIsOpen(false);
            }}>
              Confirm Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
```

---

## 4. How to Request a New Component

If you need a component that doesn't currently exist in the library:
1. **Check Storybook**: Verify if an existing component can be customized for your use case.
2. **Open an Issue**: Go to our repository's Issues tab and create a "Component Request" issue.
3. **Provide Context**: Include the use case, required API (props), and any design mockups.

## 5. How to Contribute

We welcome contributions! If you've built a component you think would be useful to other teams, or if you want to fix a bug:
1. Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) guide.
2. Ensure you add unit tests and Storybook documentation for your component.
3. Submit a Pull Request following the developer workflow defined in the contributing guide.
