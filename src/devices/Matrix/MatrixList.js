import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import { DeviceContext } from 'context/DeviceContext';
import List from '@material-ui/core/List';
import Matrix from './Matrix';


const useStyles = makeStyles(theme => {
    return {      
        flex: {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
        },
    }
});

export default function MatrixList(props) {

    const classes = useStyles();
    const { endpointIdsByCategory,sortByName } = useContext(DeviceContext);
    const matrix = sortByName(endpointIdsByCategory('MATRIX'))

    return (
        <List className={classes.flex}>
            { matrix.map(device =>
                <Matrix key={ device } endpointId={device} nested={true} />
            )}
        </List>
    )
}
