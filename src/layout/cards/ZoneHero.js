import React, { useContext } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';

import ItemBase from 'components/ItemBase';
import ZoneSummary from 'devices/Zone/ZoneSummary';

export default function ZoneHero(props) {

    const { selectPage } = useContext(LayoutContext);

    return (
        <ItemBase >
            <ZoneSummary onClick={ ()=> selectPage('ZoneLayout') } />
        </ItemBase>
    );
}
