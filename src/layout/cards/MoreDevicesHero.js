import React from 'react';
import StackCard from 'components/StackCard';
import Fan from 'devices/Fan/Fan';
import Shade from 'devices/Shade/Shade';
import { endpointIdsByFriendlyName, endpointIdsByDisplayCategory, sortByName } from 'store/deviceHelpers'
import { Stack } from '@mantine/core'

const MoreDevicesHero = props => {
    
    const shades = sortByName(endpointIdsByDisplayCategory('INTERIOR_BLIND'))    
    const fans = endpointIdsByFriendlyName(['Bathroom Fan', 'Bathroom Heat Fan'])
    
    return (
        <StackCard>
            <Stack spacing="xl">
                { shades.map( shade => (
                    <Shade key={shade} endpointId={shade} itemType={"listItem"} />
                ))}
                { fans.map(fan =>
                    <Fan key={fan} endpointId={fan} nested={true} itemType={"listItem"} />
                )}
            </Stack>
        </StackCard>
    );
}

MoreDevicesHero.defaultProps = {
    showDetail: true,
}

export default MoreDevicesHero;
