import React, { useState } from 'react';
import useEndpointHealth from 'endpoint-model/property/endpointHealth/useEndpointHealth'
import usePowerState from 'endpoint-model/property/powerState/usePowerState'
import useMode from 'endpoint-model/property/mode/useMode'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import EnergyLevelModeIcon from 'endpoint-model/instance/EnergyLevelModeIcon'
import { Button } from '@mantine/core'
import { IconMoon } from '@tabler/icons';
import useLayoutStore from 'layout/layoutStore'
import ComputerPullUp from 'devices/Computer/ComputerPullUp'

const ComputerCube = props => {

    const setStackCardHighlight = useLayoutStore( state => state.setStackCardHighlight)
    const setStackPullUp= useLayoutStore( state => state.setStackPullUp)
    const stackPullUp = useLayoutStore( state => state.stackPullUp)

    const name = friendlyNameByEndpointId(props.endpointId)
    const { reachable } = useEndpointHealth(props.endpointId)
    const { powerStateBool } = usePowerState(props.endpointId)
    const { modeLabel } = useMode(props.outlet, "Energy.Level", props.value, props.directive)
    const [showPopover, setShowPopover] = useState(props.showAll)

    const outletOffStates = ["Off", "Standby"]
    const outletOn = !outletOffStates.includes(modeLabel)
    const on = reachable && powerStateBool && outletOn
    const pullUpActive = stackPullUp === name
    const nameLabel = name.replace('pc','')


    const showOverlay = () => {
        setStackCardHighlight('ComputerHero')
        setStackPullUp(name,{})
        setShowPopover(!showPopover)
    }

    const buttonVariant = stackPullUp === name ? "filled" : ( on ? "outline" : "default" ) 

    return (  
        <>   
        <Button size="md" fullWidth variant={ buttonVariant }
            onClick={ showOverlay }
            leftIcon={ on ? <EnergyLevelModeIcon size={16} endpointId={props.outlet} /> : <IconMoon size={12} />}
        >
            {nameLabel}
        </Button>        

        { pullUpActive &&
            <ComputerPullUp name={name} endpointId={props.endpointId} />
        }
        </>
    )

}

export default ComputerCube;
