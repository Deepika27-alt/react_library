import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DataTable } from './DataTable';
import type { ColumnDef } from '@tanstack/react-table';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const mockData: User[] = [
  { id: '1', name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Bob Jones', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
  { id: '4', name: 'David Lee', email: 'david@example.com', role: 'Editor', status: 'Active' },
  { id: '5', name: 'Eve Ward', email: 'eve@example.com', role: 'User', status: 'Inactive' },
  { id: '6', name: 'Frank Harris', email: 'frank@example.com', role: 'Editor', status: 'Active' },
  { id: '7', name: 'Grace Miller', email: 'grace@example.com', role: 'User', status: 'Active' },
];

const columns: ColumnDef<User, any>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue<string>();
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            status === 'Active'
              ? 'bg-green-100 text-green-800'
              : 'bg-neutral-100 text-neutral-800'
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Complex/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    enableSorting: { control: 'boolean' },
    enablePagination: { control: 'boolean' },
    enableRowSelection: { control: 'boolean' },
    enableColumnVisibility: { control: 'boolean' },
  },
  args: {
    columns: columns as any,
    data: mockData,
    loading: false,
    enableSorting: true,
    enablePagination: true,
    enableRowSelection: false,
    enableColumnVisibility: false,
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  args: {},
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Selection: Story = {
  args: {
    enableRowSelection: true,
  },
};

export const ColumnVisibility: Story = {
  args: {
    enableColumnVisibility: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};
