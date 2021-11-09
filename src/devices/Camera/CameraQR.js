import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles(theme => {
    return {
        oldbigcover: {
            width: "100%",
            maxHeight: 480,
            position: "relative",
            padding: 0,
            height: "auto",
            minHeight:100,
        },
        overlay: {
            position: "absolute",
            top: 4,
            bottom:4,
            left: 4,
        }
    }
});

export default function CameraQR(props) {
    
    const classes = useStyles();
    const serverurl="https://"+window.location.hostname;
    
    return ( 
            <Grid item xs={4} className={props.overlay ? classes.overlay : classes.normal}>

            <img
                className={classes.bigcover}
                src={ serverurl+"/image/homekitcamera/qrcode/"+props.cameraId+"?width=1024" }
                title={ props.name }
                alt={ props.name }
            />
            <div>{props.name}</div>
            </Grid>
            
    );
}

