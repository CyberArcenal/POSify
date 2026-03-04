// components/UI/Button.tsx
import type { LucideIcon } from 'lucide-react';
import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'purple'
  | 'emerald'
  | 'outline'
  | 'ghost';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
  className?: string;
  title?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'sm',
  children,
  onClick,
  disabled = false,
  type = 'button',
  href,
  target,
  icon: Icon,
  iconPosition = 'left',
  iconOnly = false,
  className = '',
  title,
  loading = false
}) => {
  const baseClasses = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;

  const classes = [
    baseClasses,
    variantClass,
    sizeClass,
    iconOnly && 'btn-icon-only',
    loading && 'opacity-70 cursor-wait',
    className
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
      ) : (
        Icon && iconPosition === 'left' && (
          <Icon className="btn-icon btn-icon-left" size={getIconSize(size)} />
        )
      )}

      {!iconOnly && children}

      {Icon && iconPosition === 'right' && !loading && (
        <Icon className="btn-icon btn-icon-right" size={getIconSize(size)} />
      )}
    </>
  );

  // Helper function to get icon size based on button size
  function getIconSize(btnSize: ButtonSize): number {
    const sizeMap = {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18
    };
    return sizeMap[btnSize];
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={classes}
        title={title}
        onClick={onClick as any}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      title={title}
    >
      {content}
    </button>
  );
};

export default Button;



// // Example usage in your components
// import Button from '@/components/UI/Button';
// import { Plus, Edit, Trash2, Download, Search } from 'lucide-react';

// // Different variants and sizes
// <Button variant="primary" size="md" onClick={() => {}}>
//   Primary Button
// </Button>

// <Button variant="success" size="sm" icon={Plus} iconPosition="left">
//   Add Product
// </Button>

// <Button variant="danger" size="xs" icon={Trash2}>
//   Delete
// </Button>

// <Button variant="secondary" size="lg" icon={Download} iconPosition="right">
//   Export Data
// </Button>

// <Button variant="outline" size="sm">
//   Cancel
// </Button>

// <Button variant="ghost" size="xs" icon={Search} iconOnly />

// // With loading state
// <Button variant="primary" loading={true}>
//   Saving...
// </Button>

// // As link
// <Button variant="primary" href="/products" target="_blank">
//   Open Products
// </Button>