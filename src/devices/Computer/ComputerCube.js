import React from 'react';
import useEndpointHealth from 'endpoint-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import useMode from 'endpoint-model/property/mode/useMode'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import EnergyLevelModeIcon from 'endpoint-model/instance/EnergyLevelModeIcon'
import { IconMoon } from '@tabler/icons';
import usePullUp from 'layout/pullup/usePullUp'
import ComputerPullUp from 'devices/Computer/ComputerPullUp'
import WideAvatar from 'layout/components/WideAvatar'

const ComputerCube = props => {
    const name = friendlyNameByEndpointId(props.endpointId)
    const { showPullUp } = usePullUp('ComputerHero', name)

    const { reachable } = useEndpointHealth(props.endpointId)
    const { powerStateBool } = usePowerState(props.endpointId)
    const { modeLabel } = useMode(props.outlet, "Energy.Level", props.value, props.directive)

    const outletOffStates = ["Off", "Standby"]
    const outletOn = !outletOffStates.includes(modeLabel)
    const on = reachable && powerStateBool && outletOn
    const nameLabel = name.replace('pc','')

    return (
        <>
            <WideAvatar 
                color={ on ? "primary" : undefined }
                onClick={ showPullUp }
                size="md"
                left={ on ? <EnergyLevelModeIcon size={16} endpointId={props.outlet} /> : <IconMoon size={12} />}
                right={nameLabel}
            />
            <ComputerPullUp name={name} endpointId={props.endpointId} outlet={props.outlet}/>
        </>
    )

}

export default ComputerCube;
