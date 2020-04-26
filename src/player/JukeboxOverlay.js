import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';
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
        bigcover: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            maxWidth: "100%",
            maxHeight: "100%",
            minWidth: "100%",
            minHeight: "100%",
        },
        songTextBox: {
            position: "absolute",
            padding: 16,
            top:0,
            bottom:64,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
        },
        songImageHolder: {
            position: "relative",
            padding: "16px 0 0 16px",
            margin: 0,
        },
        songImageAspect: {
            position: "relative",
            margin: 0,
            width: "100%",
            paddingTop: "100%", /* 1:1 Aspect Ratio */
        },
        songTextHolder: {
            paddingLeft: 16,
            paddingTop: 16,
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            position: "relative",
            height: "60%",
        },
        songButtonHolder: {
            paddingLeft: 16,
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "column",
            position: "relative",
            height: "40%",
        },
        songTitle: {
            fontSize:"3rem",
            paddingBottom:16,
            flexBasis: 0,
            flexGrow:2,
            display: "flex",
            overflow: "hidden",
        },
        songArtist: {
            fontSize:"2.2rem",
            fontWeight:200,
            flexBasis: 0,
            flexGrow:1,
            display: "flex",
            overflow: "hidden",
        },
        imgItem: {
            padding: 0,
            width: "100%",
            minWidth:"100%",
        },
        songText: {
            width: "100%",
        },
        topbox: {
            paddingBottom: 8,
            borderBottom: "0px solid",
            borderBottomColor: theme.palette.divider,
        },
    }
});

export default function PlayerArtOverlay(props) {
    
    const classes = useStyles();
    //const [imageLoaded, setImageLoaded] = useState(false)
    const serverurl="https://"+window.location.hostname;
    
    return ( 
        <Grid container className={classes.topbox} >
            <Grid item xs={4} className={classes.songImageHolder}>
                <div className={classes.songImageAspect} >
                <img
                    className={classes.bigcover}
                    src={ serverurl+props.art+"?title="+props.title }
                    title={ props.title }
                    alt={ props.title }
                    onClick={ (e) => props.cover(e)}
                    //onLoad={ () => setImageLoaded(true) }
                />
                </div>
            </Grid>
            <Grid item container xs={8} >
                <Grid item xs={12} className={classes.songTextHolder} onClick={()=> props.setMini(true)}>
                    <Typography variant="subtitle1" className={classes.songText}>{props.title}</Typography>
                    <Typography variant="subtitle2" className={classes.songText}>{props.artist}</Typography>
                </Grid>
                <Grid item xs={12} className={classes.songButtonHolder}>
                    {props.children}
                </Grid>
            </Grid>
        </Grid>
    );
}

