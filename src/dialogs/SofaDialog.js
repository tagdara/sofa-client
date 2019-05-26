import React from "react";
import { makeStyles } from '@material-ui/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Dialog from '@material-ui/core/Dialog';
import Slide from  '@material-ui/core/Slide';
import SofaDialogTitle from './SofaDialogTitle';

const useStyles = makeStyles({

    dialog: { height : "100%", },

});

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

function SofaDialog(props) {

    const classes = useStyles();
    
    return (
        <Dialog className={classes.dialog}
            fullScreen={props.fullScreen}
            fullWidth={true}
            maxWidth={props.maxWidth}
            open={props.open}  
            onClose={props.close}
            TransitionComponent={Transition}
        >
            <SofaDialogTitle title={props.title} tabs={props.tabs} tabValue={props.tabValue} tabChange={props.tabChange} />
            {props.children}
        </Dialog>
    )
}

SofaDialog.defaultProps = {
    maxWidth: 'sm',
    tabs: '',
    tabValue: '',
    tabChange: '',
}

export default withMobileDialog()(SofaDialog);
