import React, { useState, useCallback }  from 'react';

import { Divider, SegmentedControl } from '@mantine/core';
import LightLine from 'devices/Light/LightLine';
import useDeviceStore from 'store/deviceStore'
import { sortByName } from 'store/deviceHelpers'

import SectionHeader from 'layout/SectionHeader';
import SectionFrame from 'layout/SectionFrame'
import SectionGrid from 'layout/SectionGrid'
import PageFrame from 'layout/PageFrame'


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
                { filter === "ON" &&
                    <>
                        <Divider variant="dotted" style={{ width: "100%", marginTop: 16, marginBottom: 8 }} label="Lights that are off" />
                        <SectionGrid>
                        { lights.map( endpointId =>
                            <LightLine  key={ endpointId } endpointId={endpointId} filter={"OFF"} small={true} remove={props.remove}
                            />
                        )}
                        </SectionGrid>
                    </>
                }
            </SectionFrame>
        </PageFrame>
    )
}


export default LightLayout;

LightLayout.defaultProps = {
    filter: "ON",
}