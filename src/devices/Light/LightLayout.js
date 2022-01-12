import React, { useState, useCallback }  from 'react';

import { SegmentedControl } from '@mantine/core';
import LightLine from 'devices/Light/LightLine';
import useDeviceStore from 'store/deviceStore'
import { sortByName } from 'store/deviceHelpers'

import SectionFooter from 'layout/SectionFooter';
import SectionHeader from 'layout/SectionHeader';
import SectionFrame from 'layout/SectionFrame'
import SectionGrid from 'layout/SectionGrid'
import PageFrame from 'layout/PageFrame'
import HomeButton from 'layout/HomeButton';

const LightLayout = props => {

    const [filter, setFilter] = useState(props.filter);
    const lights = sortByName(useDeviceStore(useCallback(state => Object.keys(state.devices).filter( dev => state.devices[dev].displayCategories.includes('LIGHT')), [])))

    const selections= [
        { value: "ALL", "label": "All" },
        { value: "ON",  "label": "On"  }, 

    ]

    return (  
        <PageFrame>
            <SectionHeader title={"Lights"} >
                <SegmentedControl 
                        fullWidth 
                        onChange={setFilter} 
                        value={filter} 
                        data={selections} 
                />
            </SectionHeader >
            <SectionFrame padScroll>
                <SectionGrid>
                { lights.map( endpointId =>
                    <LightLine  key={ endpointId } endpointId={endpointId}  small={true} filter={filter} remove={props.remove}
                    />
                )}
                </SectionGrid>
            </SectionFrame>
            <SectionFooter>
                <HomeButton />
            </SectionFooter>
        </PageFrame>
    )
}


export default LightLayout;

LightLayout.defaultProps = {
    filter: "ON",
}