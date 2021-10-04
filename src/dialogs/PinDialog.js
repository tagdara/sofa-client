import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import SecurityCamera from 'devices/Camera/SecurityCamera'
import SofaDialog from "dialogs/SofaDialog"

const useStyles = makeStyles({
    
    content: {
        minWidth: 0,
        paddingBottom: 16,
    },
    gridList: { 
        maxWidth: 320,
        paddingTop: 16,
        margin: "0 auto !important",
    },
    gridButtonTile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridTitle: {
        margin: 1,
        alignItems: "center",
        display: "flex",
        paddingBottom: 16,
        justifyContent: "space-around",
    },
    bigButton: {
        width: "100%",
        height: 72,
    },
    nameInput: {
        height: 72,
        alignItems: "flex-end",
        display: "flex",
    },
    dialogContent: {
        padding: 16,
    },
});

export default function PinDialog(props) {
    
    const classes = useStyles();
    const [pin, setPin] = useState([]);

    function addNumberToPin(dig) {
        setPin(pin+dig.toString());
    };  
 
    function submitPin() {
        props.submitPin(pin)
        setPin('')
    }
    
    function clearAndClose() {
        setPin('')
        props.close()
    }

    return (
        <SofaDialog fullHeight={false} maxWidth={'xs'} open={props.open} close={clearAndClose} >
            <DialogContent className={classes.dialogContent} >
                <Grid container item spacing={1} xs={12} >
                    <SecurityCamera wide={true} camera={props.device.endpointId} selectButtons={false} directive={props.directive} />
                    <Grid item xs={12} className={classes.nameInput}>
                        <TextField
                            id="required"
                            fullWidth
                            margin="normal"
                            value={pin}
                            type="password"
                            onChange={(e) => setPin(e.target.value) }
                        />
                    </Grid>
                        { [...Array(9).keys()].map( digit =>
                        <Grid item xs={4} key={"dig"+digit} >
                            <Button className={classes.bigButton} variant="outlined" color="primary" size={"large"} onClick={() => addNumberToPin(digit+1)}>{digit+1}</Button>
                        </Grid>
                        )}

                    <Grid item xs={4}>
                        <Button className={classes.bigButton} size={"large"} onClick={() => clearAndClose() } ><CloseIcon/></Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button className={classes.bigButton} variant="outlined" color="primary" size={"large"} onClick={() => addNumberToPin('0')}>0</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button className={classes.bigButton} size={"large"} onClick={() => submitPin()} autoFocus><CheckIcon/></Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </SofaDialog>
    );
}
