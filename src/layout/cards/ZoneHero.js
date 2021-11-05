import React from 'react';
import { selectPage } from 'store/layoutHelpers'

import ItemBase from 'components/ItemBase';
import ZoneSummary from 'devices/Zone/ZoneSummary';

export default function ZoneHero(props) {

    return (
        <ItemBase >
            <ZoneSummary onClick={ ()=> selectPage('ZoneLayout') } />
        </ItemBase>
    );
}
