import React, { useState, useEffect, useContext } from 'react';

import { DeviceContext } from 'context/DeviceContext';

import Recent from 'history/Recent';
import GridSection from 'components/GridSection';

export default function RecentLayout(props) {

    const { devices, getRecent } = useContext(DeviceContext)
    const [ recent, setRecent ] = useState([])

    useEffect(() => {
        getRecent().then(result=> setRecent(result)) 
    // eslint-disable-next-line 
    }, []);

    if (recent.length<1) { return null }

    return (  
        <GridSection name={"Recent Activity"} >
            { recent.map((dev, index) =>
                <Recent key={ index } item={dev} device={ devices[dev.event.endpoint.endpointId] } />
            )}
        </GridSection>
    )
};
