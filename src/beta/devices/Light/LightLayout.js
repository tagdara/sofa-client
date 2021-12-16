import React, { useState, useCallback }  from 'react';

import LightLine from 'beta/devices/Light/LightLine';
import useDeviceStore from 'store/deviceStore'
import { sortByName } from 'store/deviceHelpers'
import { Button, Group } from '@mantine/core';
import PageFrame from 'beta/components/PageFrame'
import SectionHeader from 'beta/components/SectionHeader';

const LightLayout = props => {

    const [filter, setFilter] = useState(props.filter);
    const lights = sortByName(useDeviceStore(useCallback(state => Object.keys(state.devices).filter( dev => state.devices[dev].displayCategories.includes('LIGHT')), [])))

    //const lights = props.lights ? props.lights : sortByName(endpointIdsByCategory('LIGHT'))
    console.log('filter', filter)

    return (    
        <Group direction="column">
            <SectionHeader title={"Lights"} >
                <Group spacing="xs">
                    <Button compact variant={ filter==='ALL' ? undefined : "light"}  size="sm" onClick={ () => setFilter('ALL') }  >
                        All
                    </Button>
                    <Button compact variant={ filter==='ON' ? undefined : "light"} size="sm" onClick={ () => setFilter('ON')}>
                        On
                    </Button>
                </Group>
            </SectionHeader >
            <PageFrame>
                { lights.map( endpointId =>
                    <LightLine  key={ endpointId } endpointId={endpointId}  small={true} filter={filter} remove={props.remove}
                    />
                )}
            </PageFrame>
        </Group>
    )
}

export default LightLayout;

LightLayout.defaultProps = {
    filter: "ON",
}