import React from 'react';
import { makeStyles } from '@mui/styles';
import ButtonGroup from '@mui/material/ButtonGroup';
import MonitorButton from 'devices/Computer/MonitorButton';
import Spacer from 'components/Spacer';

const useStyles = makeStyles(theme => {
    return {    
        buttonGroup: {
            paddingRight: 16,
        }
    }
});

export default function MonitorButtonGroup(props) {
    
    const classes = useStyles();

    if (!props.buttonLayout) { return null }

    const sectionCount = Object.keys(props.buttonLayout).length;

    return (
        <>
            { Object.keys(props.buttonLayout).map( (zone,i) => 
                <React.Fragment key={zone}>
                    <ButtonGroup className={classes.buttonGroup} size="small" variant="contained"  >
                    { props.buttonLayout[zone].map( btn =>
                        <MonitorButton key={btn.label} {...btn} />
                    )}
                    </ButtonGroup>
                    { i < sectionCount &&
                        <Spacer />
                    }
                </React.Fragment>
            )}
        </>
    );
}
 