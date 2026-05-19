import * as React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
  type VisibilityState,
  type PaginationState,
  type Row,
  type TableOptions,
} from '@tanstack/react-table';
import { cn } from '../../utils/cn';
import { SkeletonText } from '../Skeleton';

// ── Icons ────────────────────────────────────────────────────────────────────
const SortIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 2v10M4 5l3-3 3 3M4 9l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SortAscIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 2v10M4 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SortDescIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 2v10M4 9l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// ── Types ────────────────────────────────────────────────────────────────────
export interface DataTableProps<TData> {
  /** Column definitions using TanStack's ColumnDef with TypeScript generics. */
  columns: ColumnDef<TData, unknown>[];
  /** Array of data rows. */
  data: TData[];
  /** Show loading skeleton rows. @default false */
  loading?: boolean;
  /** Number of skeleton rows to show when loading. @default 5 */
  skeletonRowCount?: number;
  /** Custom empty state component. */
  emptyState?: React.ReactNode;
  /** Handler for row clicks. */
  onRowClick?: (row: TData) => void;
  /** Enable row selection. @default false */
  enableRowSelection?: boolean;
  /** Controlled row selection state. */
  rowSelection?: RowSelectionState;
  /** Callback when row selection changes. */
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  /** Enable sorting. @default true */
  enableSorting?: boolean;
  /** Enable pagination. @default true */
  enablePagination?: boolean;
  /** Page size options. @default [10, 20, 50] */
  pageSizeOptions?: number[];
  /** Enable column visibility toggle. @default false */
  enableColumnVisibility?: boolean;
  /** Additional className for the wrapper. */
  className?: string;
  /** Additional table options passed to useReactTable. */
  tableOptions?: Partial<TableOptions<TData>>;
}

// ── Checkbox column helper ───────────────────────────────────────────────────
export function getSelectColumn<TData>(): ColumnDef<TData, unknown> {
  return {
    id: '__select',
    header: ({ table }) => (
      <input
        type="checkbox"
        className="acme-datatable-checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        aria-label="Select all rows"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="acme-datatable-checkbox"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
        aria-label="Select row"
      />
    ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
  };
}

// ── Default empty state ──────────────────────────────────────────────────────
const DefaultEmptyState: React.FC = () => (
  <div className="acme-datatable-empty flex flex-col items-center justify-center py-12 text-neutral-400">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="6" y="10" width="36" height="28" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M6 18h36" stroke="currentColor" strokeWidth="2" />
      <path d="M18 26h12M22 32h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
    <p className="mt-3 text-sm font-medium">No data available</p>
    <p className="text-xs mt-1">There are no rows to display.</p>
  </div>
);

// ── Column Visibility Toggle ─────────────────────────────────────────────────
const ColumnVisibilityToggle: React.FC<{
  columns: { id: string; getIsVisible: () => boolean; toggleVisibility: (v: boolean) => void; columnDef: { header?: unknown } }[];
}> = ({ columns }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const toggleableColumns = columns.filter((col) => col.id !== '__select');

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5',
          'text-xs font-medium text-neutral-600',
          'border border-neutral-200 rounded-md',
          'hover:bg-neutral-50 transition-colors',
        )}
        aria-label="Toggle column visibility"
      >
        <EyeIcon className="shrink-0" />
        Columns
      </button>
      {open && (
        <div
          className={cn(
            'absolute right-0 top-full mt-1 z-50',
            'min-w-[160px] p-2',
            'bg-white border border-neutral-200 rounded-lg shadow-lg',
          )}
        >
          {toggleableColumns.map((col) => {
            const label = typeof col.columnDef.header === 'string'
              ? col.columnDef.header
              : col.id;
            return (
              <label
                key={col.id}
                className={cn(
                  'flex items-center gap-2 px-2 py-1.5 rounded',
                  'text-xs text-neutral-700',
                  'cursor-pointer hover:bg-neutral-50',
                )}
              >
                <input
                  type="checkbox"
                  checked={col.getIsVisible()}
                  onChange={(e) => col.toggleVisibility(e.target.checked)}
                />
                {label}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ── DataTable Component ──────────────────────────────────────────────────────
export function DataTable<TData>({
  columns,
  data,
  loading = false,
  skeletonRowCount = 5,
  emptyState,
  onRowClick,
  enableRowSelection = false,
  rowSelection: controlledRowSelection,
  onRowSelectionChange,
  enableSorting = true,
  enablePagination = true,
  pageSizeOptions = [10, 20, 50],
  enableColumnVisibility = false,
  className,
  tableOptions,
}: DataTableProps<TData>) {
  // ── Internal state ─────────────────────────────────────────────────────────
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [internalRowSelection, setInternalRowSelection] = React.useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSizeOptions[0] ?? 10,
  });

  const currentRowSelection = controlledRowSelection ?? internalRowSelection;
  const handleRowSelectionChange = onRowSelectionChange
    ? (updater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)) => {
        const newState = typeof updater === 'function' ? updater(currentRowSelection) : updater;
        onRowSelectionChange(newState);
      }
    : setInternalRowSelection;

  // Prepend select column if row selection is enabled
  const finalColumns = React.useMemo(() => {
    if (!enableRowSelection) return columns;
    return [getSelectColumn<TData>(), ...columns];
  }, [columns, enableRowSelection]);

  const table = useReactTable({
    data,
    columns: finalColumns,
    state: {
      sorting,
      rowSelection: currentRowSelection,
      columnVisibility,
      ...(enablePagination ? { pagination } : {}),
    },
    onSortingChange: setSorting,
    onRowSelectionChange: handleRowSelectionChange as never,
    onColumnVisibilityChange: setColumnVisibility,
    ...(enablePagination ? { onPaginationChange: setPagination } : {}),
    getCoreRowModel: getCoreRowModel(),
    ...(enableSorting ? { getSortedRowModel: getSortedRowModel() } : {}),
    ...(enablePagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
    enableRowSelection,
    ...tableOptions,
  });

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className={cn('acme-datatable', 'w-full overflow-auto', className)}>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-neutral-200">
              {finalColumns.map((col, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider"
                >
                  <SkeletonText className="w-20 h-3" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: skeletonRowCount }, (_, rowIdx) => (
              <tr key={rowIdx} className="border-b border-neutral-100">
                {finalColumns.map((_, colIdx) => (
                  <td key={colIdx} className="px-4 py-3">
                    <SkeletonText className="h-4" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // ── Empty state ────────────────────────────────────────────────────────────
  const rows = table.getRowModel().rows;
  const isEmpty = rows.length === 0;

  return (
    <div className={cn('acme-datatable', 'w-full', className)}>
      {/* Toolbar */}
      {enableColumnVisibility && (
        <div className="flex items-center justify-end mb-3">
          <ColumnVisibilityToggle
            columns={table.getAllLeafColumns() as never[]}
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-auto rounded-lg border border-neutral-200">
        <table className="w-full border-collapse text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-neutral-50 border-b border-neutral-200">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      className={cn(
                        'px-4 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider',
                        canSort && 'cursor-pointer select-none hover:text-neutral-700',
                      )}
                      style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <span className="inline-flex items-center gap-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && !sorted && <SortIcon className="text-neutral-300" />}
                        {sorted === 'asc' && <SortAscIcon className="text-primary-500" />}
                        {sorted === 'desc' && <SortDescIcon className="text-primary-500" />}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {isEmpty ? (
              <tr>
                <td colSpan={finalColumns.length}>
                  {emptyState ?? <DefaultEmptyState />}
                </td>
              </tr>
            ) : (
              rows.map((row: Row<TData>) => (
                <tr
                  key={row.id}
                  className={cn(
                    'border-b border-neutral-100 transition-colors',
                    'hover:bg-neutral-50',
                    row.getIsSelected() && 'bg-primary-50',
                    onRowClick && 'cursor-pointer',
                  )}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-neutral-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {enablePagination && !isEmpty && (
        <div className="flex items-center justify-between mt-4 px-1">
          {/* Selection info */}
          <div className="text-xs text-neutral-500">
            {enableRowSelection && (
              <span>
                {table.getFilteredSelectedRowModel().rows.length} of{' '}
                {table.getFilteredRowModel().rows.length} row(s) selected
              </span>
            )}
            {!enableRowSelection && (
              <span>
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Page size selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-neutral-500">Rows:</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                className={cn(
                  'text-xs border border-neutral-200 rounded px-1.5 py-1',
                  'focus:outline-none focus:ring-1 focus:ring-primary-500',
                )}
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className={cn(
                  'inline-flex items-center justify-center',
                  'w-8 h-8 rounded-md border border-neutral-200',
                  'text-neutral-600 hover:bg-neutral-50',
                  'transition-colors',
                  'disabled:opacity-40 disabled:pointer-events-none',
                )}
                aria-label="Previous page"
              >
                <ChevronLeftIcon />
              </button>
              <span className="px-2 text-xs font-medium text-neutral-600 tabular-nums">
                {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
              </span>
              <button
                type="button"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className={cn(
                  'inline-flex items-center justify-center',
                  'w-8 h-8 rounded-md border border-neutral-200',
                  'text-neutral-600 hover:bg-neutral-50',
                  'transition-colors',
                  'disabled:opacity-40 disabled:pointer-events-none',
                )}
                aria-label="Next page"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

DataTable.displayName = 'DataTable';
