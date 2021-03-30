import React from 'react'
import { Alert } from '@material-ui/lab';
import { Snackbar as SnackbarMUI } from '@material-ui/core';


const Snackbar = ({ open, handleClose, message, type = 'success' }) => {
    return (
        <SnackbarMUI
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            autoHideDuration={2500}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={type}>
                {message}
            </Alert>
        </SnackbarMUI>
    )
}

export default Snackbar;
