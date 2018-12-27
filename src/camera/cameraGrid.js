import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Divider from '@material-ui/core/Divider';

import SecurityCamera from './securitycamera';
import CameraRecordingList from './cameraRecordingList';
import SofaDialog from '../sofaDialog';


const useStyles = makeStyles(theme => {  
    console.log(theme)
    return {
        lGrid: {
            display: "flex",
            flexWrap: "wrap",
            padding: 0,
            flex: "auto",
            flexGrow: 0,
            margin: "0 0 auto 0",
        },
        dialogTitle: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            color: theme.palette.primary.contrastText,
        },
        dialogActions: {
            paddingBottom: "env(safe-area-inset-bottom)",
        },
        gridPlaceholder: {
            height: 2,
            minWidth: 320,
            flexGrow: 1,
        },
        dialogContent: {
            height: "100%",
            padding: 8,
        },
        dialogMaxWidth: {
            height: "100%",
            padding:  0,
        },
        cameraSelect: {
            margin: 4,
            padding: 0,
            minWidth: 320,
        },
    }
});

export default function CameraGrid(props) {

    const classes = useStyles();
    const [frontTab, setFrontTab] = useState(0);

    function handleTab(event, tabno) {
        setFrontTab(tabno)
    };   

    return (
        <SofaDialog title={props.name} open={props.open} close={close} tabChange={handleTab} tabValue={frontTab}
                    tabs={ ['Live','Recorded']} >
            { frontTab==0 ?
                <DialogContent className={classes.dialogMaxWidth}>
                    <div className={classes.lGrid}>
                    {
                    props.cameras.map((name) => 
                        <Card key={name} className={classes.cameraSelect}>
                            <SecurityCamera name={ name } cameraSource={"dlink"}></SecurityCamera>
                        </Card>
                    )}
                        <div className={classes.gridPlaceholder}></div>
                    </div>
                </DialogContent>
            :
                <CameraRecordingList cameras={props.cameras} />
            }
            <Divider />
            <DialogActions className={classes.dialogActions} >
                <Button onClick={(e) => props.close(e)} color="primary" autoFocus>OK</Button>
            </DialogActions>
        </SofaDialog>
    )
}

