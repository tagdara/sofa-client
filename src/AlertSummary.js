import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withLayout } from './layout/NewLayoutProvider';

import Button from '@material-ui/core/Button';
import GridItem from './GridItem';
import Message from '@material-ui/icons/Message';

const useStyles = makeStyles(theme => {
    return {        
        base: {
            width: 96,
        },
    }
});

function AlertSummary(props) {
    
    const classes = useStyles();
    
    return (
        <GridItem wide={false} nopaper={true}>
            <Button variant="outlined" className={ classes.base} onClick={ () => props.applyLayoutCard('CameraLayout') }>
                <Message />
            </Button>
        </GridItem>
    );
}

export default withLayout(AlertSummary);
