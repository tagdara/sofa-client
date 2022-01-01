import React, { useState, useCallback }  from 'react';

import LightLine from 'devices/Light/LightLine';
import useDeviceStore from 'store/deviceStore'
import { sortByName } from 'store/deviceHelpers'
import { Button, Group } from '@mantine/core';

import SectionHeader from 'components/SectionHeader';
import SectionFrame from 'layout/SectionFrame'
import SectionGrid from 'layout/SectionGrid'
import PageFrame from 'layout/PageFrame'
import HomeButton from 'layout/HomeButton';

const LightLayout = props => {

    const [filter, setFilter] = useState(props.filter);
    const lights = sortByName(useDeviceStore(useCallback(state => Object.keys(state.devices).filter( dev => state.devices[dev].displayCategories.includes('LIGHT')), [])))

    return (  
        <PageFrame>
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
            <SectionFrame>
                <SectionGrid>
                { lights.map( endpointId =>
                    <LightLine  key={ endpointId } endpointId={endpointId}  small={true} filter={filter} remove={props.remove}
                    />
                )}
                </SectionGrid>
            </SectionFrame>
            <SectionHeader>
                <HomeButton />
            </SectionHeader>
        </PageFrame>
    )
}


export default LightLayout;

LightLayout.defaultProps = {
    filter: "ON",
}