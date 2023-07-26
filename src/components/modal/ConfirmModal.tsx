import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #254F7F',
  boxShadow: 24,
  p: 4,
};

interface ConfirmModalInterface{
  open: boolean,
  handleIsClose: (value: any) => void,
  children:  React.ReactNode
}

export default function ConfirmModal({open, handleIsClose, children}: ConfirmModalInterface) {
  const [openState, setOpenState] = useState(false);
  const handleOpen = () => setOpenState(true);
  const handleClose = () => {setOpenState(false); handleIsClose(false)}

  useEffect(() => {
    setOpenState(open)
  }, [open, openState])

  return (
    <Modal
      open={openState}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {children}
      </Box>
    </Modal>
  );
}
