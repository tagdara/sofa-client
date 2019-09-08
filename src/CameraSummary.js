import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { makeStyles } from '@material-ui/styles';

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

export default function CameraSummary(props) {
    
    const classes = useStyles();
    const { applyLayoutCard } = useContext(LayoutContext);
    
    return (
        <GridItem wide={false} nopaper={true}>
            <Button variant="outlined" className={ classes.base} onClick={ () => applyLayoutCard('CameraLayout') }>
                <Videocam />
            </Button>
        </GridItem>
    );
}
