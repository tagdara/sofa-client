import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';


const useStyles = makeStyles(theme => {
    return {        
        backButton: {
            height: 24,
            width: 24,
        },
        tinyIcon: {
            height: 18,
            width: 18,
        },
        controlLine: {
            display: "flex",
            flexDirection: "row",
            flexGrow: 0,
            width: "100%",
            padding: "0 16px",
            margin: 0,
            justifyContent: "space-between",
            height: 48,
            alignItems: "center",
        },
        tinyButton: {
            height: 24,
            padding: 0,
            minWidth: 150,
        }
    }
});

export default function CardControl(props) {

    const classes = useStyles();

    return (
            <div className={classes.controlLine}>
                <IconButton size="small" className={classes.backButton} onClick={props.back}><ArrowBackIcon className={classes.tinyIcon} /></IconButton>
                <Button className={classes.tinyButton} onClick={() => props.expand(props.name)} ><Typography variant="body2" className={classes.label} >{props.name}</Typography></Button>
                <IconButton size="small" className={classes.backButton}  onClick={props.home}><HomeIcon className={classes.tinyIcon} /></IconButton>
            </div>

    )

};