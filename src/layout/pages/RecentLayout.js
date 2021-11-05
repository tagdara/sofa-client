import React, { useState, useEffect } from 'react';

import { getRecent } from 'store/deviceHelpers';

import Recent from 'history/Recent';
import GridSection from 'components/GridSection';

export default function RecentLayout(props) {

    const [ recent, setRecent ] = useState([])

    useEffect(() => {
        getRecent().then(result=> setRecent(result)) 
    // eslint-disable-next-line 
    }, []);

    if (recent.length<1) { return null }
    
    return (  
        <GridSection name={"Recent Activity"} >
            { recent.map((dev, index) =>
                <Recent key={ index } item={dev} endpointId={ dev.event.endpoint.endpointId } />
            )}
        </GridSection>
    )
};
