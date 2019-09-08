import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import GridBreak from './GridBreak';
import AreaLine from './AreaLine';
import GridItem from './GridItem';

export default function AreasLayout(props) {
    
    const { applyLayout } = useContext(LayoutContext);
    const { setArea, devicesByCategory } = useContext(DataContext);

    function selectArea(name) {
        setArea(name);
        applyLayout('Home');
    }

    return (    
        <React.Fragment>
            <GridBreak label={"Areas"} />
            { devicesByCategory('AREA').map((area) =>
                <GridItem wide={props.wide} key={ area.endpointId } >
                    <AreaLine area={ area } name={ area.friendlyName } shortcuts={area.shortcuts} selectArea={selectArea} ></AreaLine>
                </GridItem>
            )}
        </React.Fragment>
    )

};
