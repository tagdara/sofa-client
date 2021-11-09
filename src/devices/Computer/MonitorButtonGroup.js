import React from 'react';
import { makeStyles } from '@mui/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import MonitorButton from 'devices/Computer/MonitorButton';

const useStyles = makeStyles(theme => {
    return {    
        buttonGroup: {
            paddingRight: 8,
        }
    }
});

export default function MonitorButtonGroup(props) {
    
    const classes = useStyles();

    if (!props.buttonLayout) { return null }

    return (
        <>
            { Object.keys(props.buttonLayout).map( zone => 
                <ButtonGroup key={zone} className={classes.buttonGroup} size="small" variant="text"  >
                { props.buttonLayout[zone].map( btn =>
                    <MonitorButton key={btn.label} {...btn} />
                )}
                </ButtonGroup>
            )}
        </>
    );
}
 