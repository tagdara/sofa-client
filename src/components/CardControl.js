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
        },
        placeholder: {
            width: 18,
        }
    }
});

export default function CardControl(props) {

    const classes = useStyles();

    return (
            <div className={classes.controlLine}>
                { props.currentArea !== "logic:area:All" ?
                    <IconButton size="small" className={classes.backButton} onClick={()=>props.selectArea("logic:area:All")}><ArrowBackIcon className={classes.tinyIcon} /></IconButton>
                    :
                    <div className={classes.placeholder} />
                }
                <Button className={classes.tinyButton} onClick={() => props.expand(props.currentArea)} ><Typography variant="body2" className={classes.label} >{props.name}</Typography></Button>
                { props.currentArea !== props.home ?
                    <IconButton size="small" className={classes.backButton} onClick={()=>props.selectArea(props.home)}><HomeIcon className={classes.tinyIcon} /></IconButton>
                    :
                    <div className={classes.placeholder} />
                }
            </div>

    )

};