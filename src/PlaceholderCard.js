import React from "react";
import { makeStyles } from '@material-ui/styles';
import ToggleAvatar from './ToggleAvatar'
import CardBase from './CardBase';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => {
    
    return {    
        greek: {
            background: theme.palette.layer.item,
            borderRadius: 2,
            minWidth: "75%",
            width: "75%",
            height: 8,
            minHeight: 4,
            padding: 0,
            margin: 6,
        },
        greekSub: {
            background: theme.palette.layer.item,
            borderRadius: 2,
            minWidth: "50%",
            width: "50%",
            height: 8,
            minHeight: 4,
            padding: 0,
            margin: 6,
        },
        greekBox: {
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
        },
        place: {
            padding: "8px 16px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
        },
        insetPlace: {
            padding: "0 16px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
        }        
    }

});

export default function PlaceholderCard(props){
    
    const classes = useStyles();
    
    function isInset(children) {
        if (props.inset) {
            return <Fade in={true}> {children} </Fade>
        } else {
            return  <Fade in={true}>
                    <CardBase wide={true} inset={props.inset} >
                        { children }
                    </CardBase>
                    </Fade>
        }
    }
    
    return (
        isInset(
            <>
            { [...Array(props.count).keys()].map( index =>
                <div key={index} className={props.inset ? classes.insetPlace : classes.place}>
                        <ToggleAvatar avatarState={ "off" } noback={true} >
                            { index===0 &&<HourglassEmptyIcon /> }
                        </ToggleAvatar>
                    <div className={classes.greekBox}>
                        <div className={classes.greek} />
                        <div className={classes.greekSub} />
                    </div>
                </div>
            )}
            </>
        )
    );

}

PlaceholderCard.defaultProps={
    inset: false,
    count: 1,
}


