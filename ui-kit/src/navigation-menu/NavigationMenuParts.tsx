import { NavigationMenu as Base } from '@base-ui/react/navigation-menu'
import clsx from 'clsx'
import { forwardRef } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────────────────────────────────

type NavigationMenuListProps = Base.List.Props & {
  /**
   * - default — rounded shell with border/background.
   * - `bare` — layout-only list for app headers that already provide their
   *   own chrome.
   */
  variant?: 'bare'
}

type NavigationMenuTriggerProps = Base.Trigger.Props & {
  /** `lg` matches roomy site-header navigation links. */
  size?: 'md' | 'lg'
}

type NavigationMenuLinkProps = Base.Link.Props & {
  /**
   * - `soft` — primary-tinted card with dashed→solid border on hover/focus/active.
   * - `trigger` — pill styling matching `NavigationMenu.Trigger`, for static entries
   *   (e.g. _Pricing_, _Login_) that sit alongside menu triggers in the same list.
   * - `danger` — destructive row styling for sign-out, revoke, or delete actions.
   */
  variant?: 'danger' | 'soft' | 'trigger'
  /** Applies to `variant='trigger'`; `lg` matches roomy site-header links. */
  size?: 'md' | 'lg'
}

type NavigationMenuSeparatorProps = React.HTMLAttributes<HTMLHRElement> & {
  orientation?: 'horizontal' | 'vertical'
}

// ── Components ─────────────────────────────────────────────────────────────────────────────────────────────

export const NavigationMenuList = forwardRef<HTMLUListElement, NavigationMenuListProps>(
  function NavigationMenuList({ className, variant, ...props }, ref) {
    return (
      <Base.List
        {...props}
        className={clsx('navigation-menu-list', variant && `navigation-menu-list-${variant}`, className)}
        ref={ref}
      />
    )
  }
)

export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  function NavigationMenuTrigger({ className, size, ...props }, ref) {
    return (
      <Base.Trigger
        {...props}
        className={clsx('navigation-menu-trigger', size === 'lg' && 'navigation-menu-trigger-lg', className)}
        ref={ref}
      />
    )
  }
)

export const NavigationMenuIcon = forwardRef<HTMLSpanElement, Base.Icon.Props>(function NavigationMenuIcon(
  { className, children, ...props },
  ref
) {
  return (
    <Base.Icon {...props} className={clsx('navigation-menu-icon', className)} ref={ref}>
      {children ?? <ChevronSvg />}
    </Base.Icon>
  )
})

export const NavigationMenuContent = forwardRef<HTMLDivElement, Base.Content.Props>(
  function NavigationMenuContent({ className, ...props }, ref) {
    return <Base.Content {...props} className={clsx('navigation-menu-content', className)} ref={ref} />
  }
)

export const NavigationMenuGroupLabel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function NavigationMenuGroupLabel({ className, ...props }, ref) {
    return <div {...props} className={clsx('navigation-menu-group-label', className)} ref={ref} />
  }
)

export const NavigationMenuSeparator = forwardRef<HTMLHRElement, NavigationMenuSeparatorProps>(
  function NavigationMenuSeparator({ className, orientation = 'horizontal', ...props }, ref) {
    return (
      <hr
        {...props}
        aria-orientation={orientation}
        className={clsx('navigation-menu-separator', className)}
        data-orientation={orientation}
        ref={ref}
      />
    )
  }
)

export const NavigationMenuFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function NavigationMenuFooter({ className, ...props }, ref) {
    return <div {...props} className={clsx('navigation-menu-footer', className)} ref={ref} />
  }
)

export const NavigationMenuLink = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  function NavigationMenuLink({ className, closeOnClick = true, size, variant, ...props }, ref) {
    const isTrigger = variant === 'trigger'
    return (
      <Base.Link
        {...props}
        className={clsx(
          isTrigger ? 'navigation-menu-trigger' : 'navigation-menu-link',
          isTrigger && size === 'lg' && 'navigation-menu-trigger-lg',
          variant && !isTrigger && `navigation-menu-link-${variant}`,
          className
        )}
        closeOnClick={closeOnClick}
        ref={ref}
      />
    )
  }
)

function ChevronSvg(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      aria-hidden='true'
      fill='none'
      height='10'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 10 10'
      width='10'
      {...props}
      style={{ display: 'block', ...props.style }}
    >
      <path d='M2 3.5 5 6.5 8 3.5' />
    </svg>
  )
}
