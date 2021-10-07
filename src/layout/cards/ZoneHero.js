import React, { useContext } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';

import CardBase from 'components/CardBase';
import ZoneSummary from 'devices/Zone/ZoneSummary';

export default function ZoneHero(props) {

    const { selectPage } = useContext(LayoutContext);

    return (
        <CardBase >
            <ZoneSummary onClick={ ()=> selectPage('ZoneLayout') } />
        </CardBase>
    );
}
