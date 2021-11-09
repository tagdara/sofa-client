import React from "react";
import { makeStyles } from '@mui/styles';

import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
//import Fade from '@mui/material/Fade';

import ToggleAvatar from 'components/ToggleAvatar';
import CardBase from 'components/CardBase';


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
    
    //function xisInset(children) {
    //    if (props.inset) {
    //        return <Fade in={true}> {children} </Fade>
    //    } else {
    //        return  <Fade in={true}>
    //                <CardBase wide={true} inset={props.inset} >
    //                    { children }
    //                </CardBase>
    //                </Fade>
    //    }
    //}

    function isInset(children) {
        if (props.inset) {
            return <div>{children} </div>
        } else {
            return  <CardBase wide={true} inset={props.inset} >
                        { children }
                    </CardBase>
        }
    }


    return (
        isInset(
            <div>
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
            </div>
        )
    );

}

PlaceholderCard.defaultProps={
    inset: false,
    count: 1,
}


