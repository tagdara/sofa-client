import React from 'react';
import { selectPage } from 'store/layoutHelpers'

import StackCard from 'beta/components/StackCard';
import ZoneSummary from 'beta/devices/Zone/ZoneSummary';

export default function ZoneHero(props) {

    return (
        <StackCard >
            <ZoneSummary onClick={ ()=> selectPage('ZoneLayout') } />
        </StackCard>
    );
}
