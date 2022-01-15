import React from 'react';
import useMode from 'device-model/property/mode/useMode'
import SegmentPopover from 'components/SegmentPopover'
import PlugPopover from 'devices/Plug/PlugPopover'
import { ZapOff, ChevronDown, ChevronUp, ChevronsUp, Minus} from 'react-feather'

export default function EnergyLevelModeSegment(props) {

    const { modeLabel } = useMode(props.endpointId, "Energy Level", props.value, props.directive)

    switch (true) {
        case (modeLabel === "Off"):  
            return <SegmentPopover size={props.size} icon={ <ZapOff size={16} /> } popOver={<PlugPopover endpointId={props.endpointId} />} />
        case (modeLabel === "Standby"):  
            return <SegmentPopover size={props.size} icon={ <Minus size={16} /> } popOver={<PlugPopover endpointId={props.endpointId} />} />
        case (modeLabel === "Low"): 
            return <SegmentPopover size={props.size} icon={ <ChevronDown size={16} /> } popOver={<PlugPopover endpointId={props.endpointId} />} />
        case (modeLabel === "Medium"): 
            return <SegmentPopover size={props.size} icon={ <ChevronUp size={16} /> } popOver={<PlugPopover endpointId={props.endpointId} />} />
        case (modeLabel === "High"): 
            return <SegmentPopover size={props.size} icon={ <ChevronsUp size={16} /> } popOver={<PlugPopover endpointId={props.endpointId} />} />
        default:
            return <SegmentPopover size={props.size} value={"?"}  popOver={<PlugPopover endpointId={props.endpointId} />} />
    }

}

