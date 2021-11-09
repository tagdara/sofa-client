import React from 'react';
import { makeStyles } from '@mui/styles';

import { endpointIdsByDisplayCategory, sortByName } from 'store/deviceHelpers';
import List from '@mui/material/List';
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
    const matrix = sortByName(endpointIdsByDisplayCategory('MATRIX'))

    return (
        <List className={classes.flex}>
            { matrix.map(device =>
                <Matrix key={ device } endpointId={device} nested={true} itemType={"listItem"} />
            )}
        </List>
    )
}
