import type { TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export const Textarea = ({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={cn(
      'w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20',
      className
    )}
    {...props}
  />
)
