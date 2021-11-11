import React from 'react';
import TonalityIcon from '@mui/icons-material/Tonality';
import ItemBase from 'components/ItemBase';
import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineIcon from 'components/CardLineIcon'
import ShadeButtons from 'devices/Shade/ShadeButtons'

import { deviceByEndpointId } from 'store/deviceHelpers'

const Shade = props => {

    const device = deviceByEndpointId(props.endpointId)   

    return ( 
        <ItemBase itemType={props.itemType}>
            <CardLine inList={props.itemType === "listItem"}>
                <CardLineIcon on={false}>
                    <TonalityIcon />
                </CardLineIcon>
                <CardLineText primary={ device.friendlyName } />
                <ShadeButtons endpointId={props.endpointId} />
            </CardLine>
        </ItemBase>
    );
}

export default Shade;
