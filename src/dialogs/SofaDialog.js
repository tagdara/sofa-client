import React from "react";
import { makeStyles } from '@material-ui/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Dialog from '@material-ui/core/Dialog';
import Slide from  '@material-ui/core/Slide';
const useStyles = makeStyles({

    dialogPaperFull: {
        minHeight: '90vh',
        maxHeight: '90vh',
        overflowX: "hidden",
        display: "flex",
    },
    dialogPaper: {
        maxHeight: '90vh',
        overflowX: "hidden",
        display: "flex",
    },
});


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function SofaDialog(props) {

    const classes = useStyles();
    
    return (
        <Dialog
            fullScreen={props.fullScreen}
            fullWidth={props.fullWidth}
            maxWidth={props.maxWidth}
            open={props.open}  
            onClose={props.close}
            TransitionComponent={Transition}
            classes={{ paper: props.fullHeight ? classes.dialogPaperFull : classes.dialogPaper }}
        >
            {props.children}
        </Dialog>
    )
}

SofaDialog.defaultProps = {
    maxWidth: 'sm',
    tabs: '',
    tabValue: '',
    tabChange: '',
    fullWidth: true,
    fullHeight: true,
}

export default withMobileDialog()(SofaDialog);
