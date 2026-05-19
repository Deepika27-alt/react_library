/**
 * @deepika27-alt/ui — Public API
 *
 * Everything exported from here is part of the library's public contract.
 * Internal modules should NOT be imported directly by consumers.
 */

// ── Theme ────────────────────────────────────────────────────────────────────
export { ThemeProvider, useTheme } from './theme';
export type {
  Theme,
  ResolvedTheme,
  ThemeContextValue,
  ThemeProviderProps,
  DeepPartial,
} from './theme';

// ── Tokens ───────────────────────────────────────────────────────────────────
export {
  tokens,
  tokensToCss,
  colorPrimary,
  colorNeutral,
  colorSuccess,
  colorWarning,
  colorDanger,
  colorInfo,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
  borderRadius,
  motionDuration,
  motionEasing,
  shadow,
} from './tokens';
export type {
  Tokens,
  ColorScale,
  FontSize,
  FontWeight,
  Spacing,
  BorderRadius,
  MotionDuration,
  MotionEasing,
} from './tokens';

// ── Utilities ────────────────────────────────────────────────────────────────
export { cn } from './utils';

// ── Components ───────────────────────────────────────────────────────────────
export { Button, buttonVariants } from './components/Button';
export type { ButtonProps } from './components/Button';

export { Input, inputVariants } from './components/Input';
export type { InputProps } from './components/Input';

export { Textarea, textareaVariants } from './components/Textarea';
export type { TextareaProps } from './components/Textarea';

export { Label, labelVariants } from './components/Label';
export type { LabelProps } from './components/Label';

export {
  FormField,
  FormFieldLabel,
  FormFieldControl,
  FormFieldDescription,
  FormFieldError,
  useFormField,
} from './components/FormField';
export type {
  FormFieldProps,
  FormFieldLabelProps,
  FormFieldControlProps,
  FormFieldDescriptionProps,
  FormFieldErrorProps,
} from './components/FormField';

export { Checkbox, checkboxVariants } from './components/Checkbox';
export type { CheckboxProps } from './components/Checkbox';

export {
  RadioGroup,
  RadioGroupItem,
  radioGroupVariants,
  radioItemVariants,
} from './components/Radio';
export type { RadioGroupProps, RadioGroupItemProps } from './components/Radio';

export { Switch, switchVariants, switchThumbVariants } from './components/Switch';
export type { SwitchProps } from './components/Switch';

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  selectTriggerVariants,
} from './components/Select';
export type {
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
  SelectLabelProps,
} from './components/Select';

export { Badge, badgeVariants } from './components/Badge';
export type { BadgeProps } from './components/Badge';

export { Tag, tagVariants } from './components/Tag';
export type { TagProps } from './components/Tag';

export { Avatar, AvatarGroup, avatarVariants } from './components/Avatar';
export type { AvatarProps, AvatarGroupProps } from './components/Avatar';

// ── Complex Components ───────────────────────────────────────────────────────
export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  modalContentVariants,
} from './components/Modal';
export type {
  ModalProps,
  ModalTriggerProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalTitleProps,
  ModalDescriptionProps,
  ModalSize,
} from './components/Modal';

export { Tooltip, TooltipProvider } from './components/Tooltip';
export type { TooltipProps, TooltipProviderProps } from './components/Tooltip';

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverAnchor,
} from './components/Popover';
export type {
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps,
  PopoverCloseProps,
} from './components/Popover';

export { ToastProvider, useToast } from './components/Toast';
export type {
  ToastAPI,
  ToastData,
  ToastType,
  ToastPosition,
  ToastOptions,
  ToastProviderProps,
} from './components/Toast';

export { DataTable, getSelectColumn } from './components/DataTable';
export type { DataTableProps } from './components/DataTable';

export { Card, cardVariants } from './components/Card';
export type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
} from './components/Card';

export { Stat } from './components/Stat';
export type { StatProps, TrendDirection } from './components/Stat';

export {
  SkeletonText,
  SkeletonCircle,
  SkeletonRect,
} from './components/Skeleton';
export type {
  SkeletonTextProps,
  SkeletonCircleProps,
  SkeletonRectProps,
} from './components/Skeleton';
