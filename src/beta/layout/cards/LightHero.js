import React from 'react';
import { selectPage } from 'beta/helpers/layoutHelpers'
import StackCard from 'beta/components/StackCard'
import LightSummary from 'beta/devices/Light/LightSummary';

export default function LightHero(props) {

    return (
        <StackCard>
            <LightSummary onClick={ ()=> selectPage('LightPage') } />
        </StackCard>
    );
}
