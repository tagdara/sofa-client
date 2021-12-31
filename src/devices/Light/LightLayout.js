import React, { useState, useCallback }  from 'react';

import LightLine from 'devices/Light/LightLine';
import useDeviceStore from 'store/deviceStore'
import { sortByName } from 'store/deviceHelpers'
import { Button, Group } from '@mantine/core';
import { PageFrame } from 'device-model/instance/PageFrame'
import SectionHeader from 'components/SectionHeader';

const LightLayout = props => {

    const [filter, setFilter] = useState(props.filter);
    const lights = sortByName(useDeviceStore(useCallback(state => Object.keys(state.devices).filter( dev => state.devices[dev].displayCategories.includes('LIGHT')), [])))

    return (    
        <Group direction="column" noWrap style={{ width: "100%", overflow: "hidden"}}>
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