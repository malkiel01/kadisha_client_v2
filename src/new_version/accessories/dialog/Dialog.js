import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import { Grid } from '@mui/material';
// import Button from '@mui/joy/Button';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
                padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
                padding: theme.spacing(1),
        },
}))
const LeftToRightTextInRtlApp = styled('div')`
  /* @noflip */
  text-align: left;
`;
const RightToLeftTextInRtlApp = styled('div')`
  /* @noflip */
  text-align: right;
`;

export default function CustomizedDialogs({ title = '', children, onSubmit = () => { }, open, onClose = () => {} }) {
        // const [open, setOpen] = React.useState(onClose)

        // const handleClickOpen = () => {
        //         onClose()
        // };
        // const handleClose = () => {
        //         setOpen(false);
        // };

        return (
                <React.Fragment>
                        <RightToLeftTextInRtlApp>
                                <BootstrapDialog
                                        onClose={onClose}
                                        aria-labelledby="customized-dialog-title"
                                        open={open}
                                >
                                        <DialogTitle sx={{ m: 0, p: 2, 
                                                rigth: 0,
                                                // border: '1px solid red',
                                                textAlign: 'right'
                                                }} id="customized-dialog-title">
                                                {title}
                                        </DialogTitle>
                                        <IconButton
                                                aria-label="close"
                                                onClick={onClose}
                                                sx={{
                                                        position: 'absolute',
                                                        left: 8,
                                                        top: 8,
                                                        color: (theme) => theme.palette.grey[500],
                                                }}
                                        >
                                                <CloseIcon />
                                        </IconButton>
                                        <form onSubmit={onSubmit}>
                                        <DialogContent dividers style={{backgroundColor: '#F1F5FA'}}>
                                                {children}
                                        </DialogContent>
                                        <DialogActions>
                                                <Button type="submit" autoFocus >
                                                        שמור
                                                </Button>
                                        </DialogActions>
                                        </form>
                                </BootstrapDialog>
                        </RightToLeftTextInRtlApp>
                </React.Fragment>
        );
}
