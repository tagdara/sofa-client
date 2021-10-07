import React, { useContext } from 'react';
import { DeviceContext } from 'context/DeviceContext';
import List from '@material-ui/core/List';
import Matrix from './Matrix';


export default function MatrixList(props) {

    const { endpointIdsByCategory,sortByName } = useContext(DeviceContext);
    const matrix = sortByName(endpointIdsByCategory('MATRIX'))

    console.log('matrix', matrix)
    return (
        <List>
            { matrix.map(device =>
                <Matrix key={ device } endpointId={device} nested={true} />
            )}
        </List>
    )
}
