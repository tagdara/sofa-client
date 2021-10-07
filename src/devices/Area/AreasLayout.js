import React, { useContext } from 'react';

import { LayoutContext } from 'layout/LayoutProvider';
import { DeviceStateContext } from 'context/DeviceStateContext';

import GridSection from 'components/GridSection';
import AreaSummary from '../archive/AreaSummary';

export default function AreasLayout(props) {
    
    const { applyLayout } = useContext(LayoutContext);
    const { setArea, deviceStatesByCategory } = useContext(DeviceStateContext);
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
