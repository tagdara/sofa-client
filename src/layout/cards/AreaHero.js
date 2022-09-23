import React from 'react';
import StackCard from 'layout/components/StackCard'
import AreaSummary from 'devices/Area/AreaSummary';

const AreaHero = props => {

    return (
        <StackCard >
            <AreaSummary {...props} />
        </StackCard>
    );
}

export default AreaHero
