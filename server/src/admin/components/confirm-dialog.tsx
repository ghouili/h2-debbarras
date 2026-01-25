import { Modal } from './ui/modal'
import { Button } from './ui/button'

type ConfirmDialogProps = {
  open: boolean
  title: string
  description: string
  onConfirm: () => void
  onClose: () => void
}

export const ConfirmDialog = ({ open, title, description, onConfirm, onClose }: ConfirmDialogProps) => (
  <Modal
    open={open}
    onClose={onClose}
    title={title}
    description={description}
    footer={
      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose}>
          Annuler
        </Button>
        <Button onClick={onConfirm}>Confirmer</Button>
      </div>
    }
  >
    <p className="text-sm text-muted-foreground">{description}</p>
  </Modal>
)
