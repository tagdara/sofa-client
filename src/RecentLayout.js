import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';
import { DeviceContext } from './DataContext/DeviceProvider';

import Recent from './devices/Recent';
import GridSection from './GridSection';

export default function RecentLayout(props) {

    const { devices } = useContext(DataContext);
    const { getRecent } = useContext(DeviceContext)
    //const { deviceStatesByController } = useContext(DataContext)
    const [recent, setRecent] = useState([])

    useEffect(() => {
        getRecent().then(result=> setRecent(result)) 
    // eslint-disable-next-line 
    }, []);
    

    return (  
        recent.length>0 ?
        <React.Fragment>
            <GridSection name={"Recent Activity"} >
                { recent.map((dev, index) =>
                    <Recent key={ index } item={dev} device={ devices[dev.event.endpoint.endpointId] } />
                )}
            </GridSection>
        </React.Fragment>
        : null
    )
};
