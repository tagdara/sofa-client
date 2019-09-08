import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { makeStyles } from '@material-ui/styles';

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

export default function AlertSummary(props) {
    
    const classes = useStyles();
    const { applyLayoutCard } = useContext(LayoutContext);
    
    return (
        <GridItem wide={false} nopaper={true}>
            <Button variant="outlined" className={ classes.base} onClick={ () => applyLayoutCard('CameraLayout') }>
                <Message />
            </Button>
        </GridItem>
    );
}