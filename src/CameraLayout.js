import React from 'react';
import { useState, useEffect } from 'react';
import { withLayout } from './DataContext/withLayout';

import SecurityCamera from './camera/securitycamera';

function CameraLayout(props) {

    const [cameras, setCameraList] = useState([]);
    
    useEffect(() => {
        fetch('/data/cameras')
            .then(result=>result.json())
            .then(data=>setCameraList(data))
    }, []);

    return (
        <React.Fragment>
            { cameras.map(name => 
                <SecurityCamera key={name} name={ name } cameraSource={"dlink"} historyButton={true} setLayoutCard={props.setLayoutCard} />
            )}
        </React.Fragment>
    )
}

export default withLayout(CameraLayout)