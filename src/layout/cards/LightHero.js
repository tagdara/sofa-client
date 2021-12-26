import React from 'react';
import { selectPage } from 'helpers/layoutHelpers';
import StackCard from 'components/StackCard'
import LightSummary from 'devices/Light/LightSummary';

export default function LightHero(props) {

    return (
        <StackCard>
            <LightSummary onClick={ ()=> selectPage('LightPage') } />
        </StackCard>
    );
}
