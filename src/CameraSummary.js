import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withLayout } from './layout/NewLayoutProvider';

import Button from '@material-ui/core/Button';
import GridItem from './GridItem';
import Videocam from '@material-ui/icons/Videocam';

const useStyles = makeStyles(theme => {
    return {        
        base: {
            width: 96,
        },
    }
});

function CameraSummary(props) {
    
    const classes = useStyles();
    
    return (
        <GridItem wide={false} nopaper={true}>
            <Button variant="outlined" className={ classes.base} onClick={ () => props.applyLayoutCard('CameraLayout') }>
                <Videocam />
            </Button>
        </GridItem>
    );
}

export default withLayout(CameraSummary);
