import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../store/actions/actionTypes';
import { Slide, SlideProps } from '@mui/material';
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="left" />;
}

function SnackbarInformation() {
    const dispatch = useDispatch();
    const snackInformation = useSelector((state: any) => state.snackInformation);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        const information = { open: false, message: "", type: "error" }
        dispatch({ type: actions.SHOW_INFORATION, payload: information })
    };
    return (
        <>
            <Snackbar
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
                TransitionComponent={SlideTransition}
                open={snackInformation?.open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackInformation?.type} sx={{ width: '100%' }}>
                    {snackInformation?.message}
                </Alert>
            </Snackbar>
        </>
    );
}
export default SnackbarInformation;