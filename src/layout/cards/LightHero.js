import React from 'react';
import { selectPage } from 'store/layoutHelpers'

import CardBase from 'components/CardBase';
import LightSummary from 'devices/Light/LightSummary';

export default function LightHero(props) {

    return (
        <CardBase >
            <LightSummary onClick={ ()=> selectPage('LightPage') } />
        </CardBase>
    );
}
