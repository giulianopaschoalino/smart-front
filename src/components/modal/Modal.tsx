import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect } from 'react';

const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({open, handleIsClose, children}: {open: boolean, handleIsClose: (value: any) => void, children:  React.ReactNode}) {
  const [openState, setOpenState] = React.useState(false);
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
