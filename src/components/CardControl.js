import React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';


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
                { props.currentArea !== "logic:area:all" ?
                    <IconButton size="small" className={classes.backButton} onClick={()=>props.selectArea("logic:area:all")}><ArrowBackIcon className={classes.tinyIcon} /></IconButton>
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