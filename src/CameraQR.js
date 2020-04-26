import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

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
    }
});

export default function CameraQR(props) {
    
    const classes = useStyles();
    const serverurl="https://"+window.location.hostname;
    
    return ( 
            <Grid item xs={4} className={classes.songImageHolder}>

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

