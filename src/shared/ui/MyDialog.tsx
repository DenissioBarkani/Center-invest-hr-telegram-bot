import React from 'react'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

interface MyDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: React.ReactNode;
  description?: React.ReactNode;
}


export const MyDialog: React.FC<MyDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description = '',
}) => (
  <Dialog disableEnforceFocus
    disableAutoFocus
    open={open} onClose={() => onClose}>
    <DialogTitle sx={{ minWidth: 250 }}>{title}</DialogTitle>
    {description && (
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
    )}
    <DialogActions>
      <Button
        onClick={onClose}
        color="primary"
      >
        Отмена
      </Button>
      <Button
        onClick={onConfirm}
        color='error'
      >
        Удалить
      </Button>
    </DialogActions>
  </Dialog>
)

