import React from "react";
import { makeStyles } from '@material-ui/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Dialog from '@material-ui/core/Dialog';
import Slide from  '@material-ui/core/Slide';

const useStyles = makeStyles({

    dialog: { height : "100%", },

});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function SofaDialog(props) {

    const classes = useStyles();
    
    return (
        <Dialog className={classes.dialog}
            fullScreen={props.fullScreen}
            fullWidth={props.fullWidth}
            maxWidth={props.maxWidth}
            open={props.open}  
            onClose={props.close}
            TransitionComponent={Transition}
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
}

export default withMobileDialog()(SofaDialog);
