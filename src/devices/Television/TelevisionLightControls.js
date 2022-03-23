import React from "react";
import { endpointIdByFriendlyName } from 'store/deviceHelpers';
import StackCard from 'components/StackCard'
import usePowerState from 'device-model/property/powerState/usePowerState'
import AreaSceneSelect from 'devices/Area/AreaSceneSelect'

const TelevisionLightControls = props => {

    const { powerStateBool: on } = usePowerState(props.endpointId)
    const area = endpointIdByFriendlyName('Living Room')
    const currentHour = new Date().getHours();
    const night = currentHour >= 17 || currentHour <= 6

    if (!on || !night ) { return null}

    return (
        <StackCard>
            <AreaSceneSelect label="Lighting" endpointId={area} />
        </StackCard>
    );
}

export default TelevisionLightControls;