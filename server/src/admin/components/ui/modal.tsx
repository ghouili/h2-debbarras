import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

type ModalProps = {
  title: string
  description?: string
  open: boolean
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
}

export const Modal = ({ title, description, open, onClose, children, footer }: ModalProps) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-soft">
        <div className="flex items-start justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          </div>
          <button
            className={cn('rounded-md px-2 py-1 text-muted-foreground hover:bg-muted')}
            onClick={onClose}
            aria-label="Fermer"
            type="button"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer ? <div className="border-t border-border px-6 py-4">{footer}</div> : null}
      </div>
    </div>
  )
}
