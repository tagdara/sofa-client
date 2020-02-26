import React from 'react';

import Matrix from './Matrix';

export default function MatrixList(props) {

    return (
        <React.Fragment>
            { props.devices.map(device =>
                <Matrix key={ device.endpointId } device={ device } />
            )}
        </React.Fragment>
    )
}
