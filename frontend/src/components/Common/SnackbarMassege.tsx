import { useState } from 'react';
import { Snackbar } from '@mui/material';

function SnackbarMassege() {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message="Какое-то сообщение"
      />
    </>
  );
}

export default SnackbarMassege;
