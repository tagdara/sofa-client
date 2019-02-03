import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import SofaDialog from "./SofaDialog"

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
        height: 96,
        alignItems: "flex-end",
        display: "flex",
    }
});

export default function PinDialog(props) {
    
    const classes = useStyles();
    const [pin, setPin] = useState([]);

    function addNumberToPin(dig) {
        setPin(pin+dig);
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
        <SofaDialog maxWidth={'xs'} title="Enter PIN" open={props.open} close={clearAndClose} >
           <DialogContent>
                <Grid container item spacing={8}  xs={12} >
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
                    <Grid item xs={4} >
                        <Button className={classes.bigButton} variant="outlined" color="primary" size={"large"} onClick={() => addNumberToPin('1')}>1</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button className={classes.bigButton} variant="outlined" color="primary" size={"large"} onClick={() => addNumberToPin('2')}>2</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button className={classes.bigButton} variant="outlined" color="primary" size={"large"} onClick={() => addNumberToPin('3')}>3</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button className={classes.bigButton} variant="outlined" color="primary" size={"large"} onClick={() => addNumberToPin('4')}>4</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button className={classes.bigButton} variant="outlined" color="primary" size={"large"} onClick={() => addNumberToPin('5')}>5</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button className={classes.bigButton} variant="outlined" color="primary" size={"large"} onClick={() => addNumberToPin('6')}>6</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button className={classes.bigButton} variant="outlined" color="primary" size={"large"} onClick={() => addNumberToPin('7')}>7</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button className={classes.bigButton} variant="outlined" color="primary" size={"large"} onClick={() => addNumberToPin('8')}>8</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button className={classes.bigButton} variant="outlined" color="primary" size={"large"} onClick={() => addNumberToPin('9')}>9</Button>
                    </Grid>
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
