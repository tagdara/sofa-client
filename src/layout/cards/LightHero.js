import React, { useContext } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';

import CardBase from 'components/CardBase';
import LightSummary from 'devices/Light/LightSummary';

export default function LightHero(props) {

    const { selectPage } = useContext(LayoutContext);

    return (
        <CardBase >
            <LightSummary onClick={ ()=> selectPage('LightLayout') } />
        </CardBase>
    );
}
