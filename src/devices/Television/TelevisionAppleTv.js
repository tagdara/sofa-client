import React from "react";
import StackCard from 'components/StackCard'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import AppleTV from 'devices/AppleTV/AppleTV'
import useInput from 'endpoint-model/property/input/useInput'

const TelevisionAppleTv = props => {

    const { powerStateBool: on } = usePowerState(props.tvEndpointId)
    const { inputLabel } = useInput(props.tvEndpointId)

    if (!on || inputLabel !=="Apple TV") {
        return null
    }

    return (
        <StackCard>
            <AppleTV endpointId={props.endpointId} />
        </StackCard>
    );
}

export default TelevisionAppleTv;