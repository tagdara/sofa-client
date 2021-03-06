import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

import CoverDimmer from './CoverDimmer';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => {
    return {
        bigcover: {
            width: "100%",
            maxHeight: 480,
            position: "relative",
            padding: 0,
            borderRadius: "4px 4px 0px 0px",
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
        songTextHolder: {
            margin: "0 auto",
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
        }
    }
});

export default function PlayerArtOverlay(props) {
    
    const classes = useStyles();
    const [showOverlay, setShowOverlay] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false)
    const serverurl="https://"+window.location.hostname;
    
    function toggleOverlay() {
        setShowOverlay(!showOverlay)
    }

    return ( 
        <ListItem className={classes.imgItem} onClick={ () => toggleOverlay()} >
            <Fade in={ imageLoaded } >
            <img
                className={classes.bigcover}
                src={ serverurl+props.art+"?time="+Date.now() }
                title={ props.title }
                alt={ props.title }
                onClick={ () => toggleOverlay()}
                onLoad={ () => setImageLoaded(true) }
            />
            </Fade>
            { showOverlay &&
                <React.Fragment>
                    <CoverDimmer onClick={ () => toggleOverlay()} />
                    <div className={classes.songTextBox}>
                        <div className={classes.songTextHolder}>
                            <Typography className={classes.songTitle} variant="h3">{props.title}</Typography>
                            <Typography className={classes.songArtist} variant="h4">{props.artist}</Typography>
                        </div>
                    </div>
                </React.Fragment>
            }
            {props.children}
        </ListItem>
    );
}

