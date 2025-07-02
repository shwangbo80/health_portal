"use client"

import * as React from "react"

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    value?: string
    onValueChange?: (value: string) => void
    children?: React.ReactNode
  }
>(({ className, children, value, onValueChange, ...props }, ref) => (
  <select
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
    ref={ref}
    value={value}
    onChange={(e) => onValueChange?.(e.target.value)}
    {...props}
  >
    {children}
  </select>
))
Select.displayName = "Select"

const SelectContent = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
)

const SelectItem = React.forwardRef<
  HTMLOptionElement,
  React.OptionHTMLAttributes<HTMLOptionElement>
>(({ className, children, ...props }, ref) => (
  <option
    ref={ref}
    className={className}
    {...props}
  >
    {children}
  </option>
))
SelectItem.displayName = "SelectItem"

const SelectTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
    {...props}
  >
    {children}
  </div>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ placeholder }: { placeholder?: string }) => (
  <span className="block truncate">{placeholder}</span>
)

export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
}
