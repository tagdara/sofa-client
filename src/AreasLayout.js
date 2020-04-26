import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import GridSection from './GridSection';
import AreaSummary from './AreaSummary';

export default function AreasLayout(props) {
    
    const { applyLayout } = useContext(LayoutContext);
    const { setArea, deviceStatesByCategory } = useContext(DataContext);
    const areas = deviceStatesByCategory('AREA')

    function selectArea(name) {
        setArea(name);
        applyLayout('Home');
    }

    return (    
        <GridSection name={"Areas"}>
            { areas.map((area) =>
                <AreaSummary key={ area.endpointId } area={ area } name={ area.friendlyName } shortcuts={area.shortcuts} selectArea={selectArea} />
            )}
        </GridSection>
    )

};
