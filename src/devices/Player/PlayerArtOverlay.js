import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

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
            padding: "8px 8px 8px 16px",
            margin: 0,
        },
        songImageAspect: {
            position: "relative",
            margin: 0,
            width: "100%",
            paddingTop: "100%", /* 1:1 Aspect Ratio */
        },
        songTextButtonsHolder: {
            padding: 8,
            boxSizing: "border-box",
            display: "flex",
            //justifyContent: "center",
            flexDirection: "row",
            position: "relative",
        },

        songTextHolder: {
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            position: "relative",
        },
        songButtonHolder: {
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
        xsongText: {
            width: "100%",
            textWrap: "false",
            maxLines: 1,
        },
        songText: {
            display: "flex",
            whiteSpace: "wrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1,
            paddingBottom: 2,
            fontSize: 18,
        },
        artistText: {
            display: "flex",
            whiteSpace: "wrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1,
            paddingBottom: 2,
            paddingTop: 4,
        },
        topbox: {
            paddingBottom: 8,
            borderBottom: "0px solid",
            borderBottomColor: theme.palette.divider,
        },
        spinner: {
            color: theme.palette.layer.itemHighlight,
            position: "absolute",
            margin: "auto",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
        hidden: {
            borderRadius: 4,
            position: "relative",
            width: "100%",
            paddingTop: '56.25%', // 16:9
            boxSizing: "border-box",
        },
    }
});

export default function PlayerArtOverlay(props) {
    
    const classes = useStyles();
    //const [imageLoaded, setImageLoaded] = useState(false)
    const serverurl="https://"+window.location.hostname;
    const data = props.deviceState && props.deviceState.MusicController ? props.deviceState.MusicController : {}
    var coverDefault = ""
    const art = data.art ? data.art.value : coverDefault
    const title = data.title ? data.title.value : "Jukebox is idle"
    const artist = data.artist ? data.artist.value : ""
    const artUrl = art.startsWith('http') ? art : serverurl + art + "?title="+title

    return ( 
        <Grid container className={classes.topbox} >
            <Grid item xs={4} className={classes.songImageHolder}>
                <div className={classes.songImageAspect} >
                { art ?
                    <img
                        className={classes.bigcover}
                        src={ artUrl }
                        title={ title }
                        alt={ title }
                        onClick={ (e) => props.cover(e)}
                        //onLoad={ () => setImageLoaded(true) }
                    />
                    :
                    <div className={classes.bigcover}>
                        <CircularProgress className={classes.spinner} size={50} />
                    </div>
                }
                </div>
            </Grid>
            <Grid item container xs={8} className={classes.songTextButtonsHolder} >
                <Grid item xs={12} className={classes.songTextHolder}  onClick={()=> props.setMini(true)}>
                    <Typography variant="subtitle1" className={classes.songText}>{title}</Typography>
                    <Typography variant="subtitle1" className={classes.artistText}>{artist}</Typography>
                </Grid>
                <Grid item xs={12} className={classes.songButtonHolder}>
                    {props.children}
                </Grid>
            </Grid>
        </Grid>
    );
}

