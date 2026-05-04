import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({ variant = "primary", size = "md", children, className = "", ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-light-primary dark:bg-dark-primary text-white hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover border border-transparent",
    secondary: "bg-light-surface2 dark:bg-dark-surface2 text-light-text-primary dark:text-dark-text-primary border border-light-border dark:border-dark-border hover:bg-light-border dark:hover:bg-dark-border",
    ghost: "bg-transparent text-light-primary dark:text-dark-primary hover:bg-light-surface2 dark:hover:bg-dark-surface2"
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-11 px-8 text-base"
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
