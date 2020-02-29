import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import GridBreak from './GridBreak';
import AreaLine from './AreaLine';
import GridItem from './GridItem';

export default function AreasLayout(props) {
    
    const { applyLayout } = useContext(LayoutContext);
    const { setArea, deviceStatesByCategory } = useContext(DataContext);
    const areas = deviceStatesByCategory('AREA')

    function selectArea(name) {
        setArea(name);
        applyLayout('Home');
    }

    console.log('Areas',areas)

    return (    
        <React.Fragment>
            <GridBreak label={"Areas"} />
            { areas.map((area) =>
                <GridItem wide={props.wide} key={ area.endpointId } >
                    <AreaLine area={ area } name={ area.friendlyName } shortcuts={area.shortcuts} selectArea={selectArea} ></AreaLine>
                </GridItem>
            )}
        </React.Fragment>
    )

};
