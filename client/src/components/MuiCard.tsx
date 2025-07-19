import { Card, CardContent, CardHeader, CardActions } from "@mui/material";
import type { CardProps } from "@mui/material/Card";
import clsx from "clsx";
import type { ReactNode } from "react";

interface MuiCardProps extends Omit<CardProps, "className"> {
  children: ReactNode;
  header?: ReactNode;
  actions?: ReactNode;
  className?: string;
  elevation?: number;
  variant?: "elevation" | "outlined";
}

export default function MuiCard({
  children,
  header,
  actions,
  className,
  elevation = 3,
  variant = "elevation",
  ...props
}: MuiCardProps) {
  return (
    <Card
      {...props}
      elevation={variant === "elevation" ? elevation : 0}
      variant={variant}
      className={clsx(
        // Material UI theme card styling
        "mui-card-theme",
        // Background and effects
        "bg-white/90 backdrop-blur-sm",
        // Transitions
        "transition-all duration-200",
        // Hover effects
        "hover:shadow-lg hover:scale-[1.01]",
        // Custom overrides
        className,
      )}
    >
      {header && (
        <CardHeader
          title={header}
          className={clsx(
            // Spacing
            "pb-2",
          )}
        />
      )}

      <CardContent
        className={clsx(
          // Spacing
          header ? "pt-0" : "pt-4",
          actions ? "pb-2" : "pb-4",
        )}
      >
        {children}
      </CardContent>

      {actions && (
        <CardActions
          className={clsx(
            // Spacing
            "pt-0 px-4 pb-4",
            // Layout
            "flex justify-end gap-2",
          )}
        >
          {actions}
        </CardActions>
      )}
    </Card>
  );
}
