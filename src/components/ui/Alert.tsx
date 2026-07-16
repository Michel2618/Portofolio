import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import styles from "./Alert.module.css"

const alertVariants = cva(styles.alert, {
  variants: {
    variant: {
      default: styles.variantDefault,
      warning: styles.variantWarning,
      error: styles.variantError,
      success: styles.variantSuccess,
      info: styles.variantInfo,
    },
    size: {
      sm: styles.sizeSm,
      lg: styles.sizeLg,
    },
    isNotification: {
      true: styles.isNotification,
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
    isNotification: false,
  },
})

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode
  action?: React.ReactNode
  layout?: "row" | "complex"
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      size,
      isNotification,
      icon,
      action,
      layout = "row",
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        alertVariants({ variant, size, isNotification }),
        className,
      )}
      {...props}
    >
      {layout === "row" ? (
        // Single row variant
        <div className={styles.rowLayout}>
          <div className={styles.rowLayoutGrow}>
            {icon && <span className={styles.rowLayoutIcon}>{icon}</span>}
            {children}
          </div>
          {action && <div className={styles.rowLayoutAction}>{action}</div>}
        </div>
      ) : (
        // Complex variant
        <div className={styles.complexLayout}>
          {icon && children ? (
            <div className={styles.complexLayoutInner}>
              <span className={styles.complexLayoutIcon}>{icon}</span>
              <div className={styles.complexLayoutGrow}>{children}</div>
            </div>
          ) : (
            <div className={styles.complexLayoutGrow}>
              {icon && <span className={styles.rowLayoutIcon}>{icon}</span>}
              {children}
            </div>
          )}
          {action && <div className={styles.complexLayoutAction}>{action}</div>}
        </div>
      )}
    </div>
  ),
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn(styles.title, className)} {...props} />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(styles.description, className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const AlertContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(styles.content, className)} {...props} />
))
AlertContent.displayName = "AlertContent"

export { Alert, AlertTitle, AlertDescription, AlertContent }
