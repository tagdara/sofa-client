import React from 'react';
import { selectPage } from 'helpers/layoutHelpers';

import StackCard from 'layout/components/StackCard';
import ZoneSummary from 'devices/Zone/ZoneSummary';

export default function ZoneHero(props) {

    return (
        <StackCard >
            <ZoneSummary onClick={ ()=> selectPage('ZoneLayout') } />
        </StackCard>
    );
}
