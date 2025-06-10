import type { JSX } from 'react'
import React, { ReactNode } from 'react' // Added JSX import

interface ContainerProps {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements // This should now find the JSX namespace
  fluid?: boolean
}

/**
 * Container component for consistent boxed layout across the site
 *
 * @param children - The content to be displayed within the container
 * @param className - Additional CSS classes to apply
 * @param as - HTML element to render the container as (default: div)
 * @param fluid - Whether the container should have a fluid width on larger screens
 */
export function Container({ children, className = '', as: Component = 'div', fluid = false }: ContainerProps) {
  // Base classes for all containers
  let containerClasses = 'mx-auto px-4 sm:px-6 md:px-8 lg:px-10'

  // Add max-width constraint if not fluid
  if (!fluid) {
    containerClasses += ' max-w-screen-xl' // 1280px max width for desktop
  }

  return <Component className={`${containerClasses} ${className}`}>{children}</Component>
}
