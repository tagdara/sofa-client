import React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(theme => {
    return {        
        title: {
            display: "flex",
            flexGrow: 1,
            paddingBottom: 0,
        },
    }
});

export default function CardLineTitle(props) {
    
    const classes = useStyles();

    if (!props.title) { return null}

    return (
        <Typography variant={"h6"} className={classes.title} onClick={ props.onClick } sx={{ minWidth: props.width,  maxWidth: props.width }} >
            {props.title} 
        </Typography>
    )
}