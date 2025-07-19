import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material/Button";
import clsx from "clsx";
import type { ReactNode } from "react";

interface MuiButtonProps extends Omit<ButtonProps, "className"> {
  children: ReactNode;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
}

export default function MuiButton({
  children,
  variant = "contained",
  size = "medium",
  color = "primary",
  className,
  startIcon,
  endIcon,
  ...props
}: MuiButtonProps) {
  return (
    <Button
      {...props}
      variant={variant}
      size={size}
      color={color}
      startIcon={startIcon}
      endIcon={endIcon}
      className={clsx(
        // Material UI theme button styling
        "mui-btn-theme",
        // Effects
        "transition-all duration-200",
        // Interactive states
        "hover:scale-[1.02] active:scale-[0.98]",
        // Custom overrides
        className,
      )}
    >
      {children}
    </Button>
  );
}
