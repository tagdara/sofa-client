import React, { useState, useCallback }  from 'react';

import { Divider, SegmentedControl, Portal } from '@mantine/core';
import LightLine from 'devices/Light/LightLine';
import useDiscoveryStore from 'endpoint-model/discovery/discoveryStore'
import { sortByName } from 'endpoint-model/discovery'

import SectionHeader from 'layout/section/SectionHeader';
import SectionFrame from 'layout/section/SectionFrame'
import SectionGrid from 'layout/section/SectionGrid'
import PageFrame from 'layout/PageFrame'
import IsyLauncherButton from 'devices/Insteon/IsyLauncherButton'


const LightLayout = props => {

    const [filter, setFilter] = useState(props.filter);
    const lights = sortByName(useDiscoveryStore(useCallback(state => Object.keys(state.devices).filter( dev => state.devices[dev].displayCategories.includes('LIGHT')), [])))

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
            <SectionFrame padScroll={200}>
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
            <Portal target="#bottomPortal">
                <IsyLauncherButton />
            </Portal>
        </PageFrame>
    )
}


export default LightLayout;

LightLayout.defaultProps = {
    filter: "ON",
}