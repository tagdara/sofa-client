import React, { useState } from 'react';

import CardLine from 'beta/components/CardLine'
import DeviceIcon from 'beta/components/DeviceIcon';
import DeviceSelect from 'beta/device-model/device/DeviceSelect'

const ActivityDeviceItem = props => {

    const name = props.device.friendlyName
    const category = props.device.displayCategories[0]
    const [ selecting, setSelecting] = useState(false)

    var camelSentence = (str) => {
        return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
        {
            return chr.toUpperCase();
        });
    }

    const onClick = () => {
        console.log('clicky')
        if (props.onClick) {
            props.onClick()
        } else {
            setSelecting(!selecting)
        }

    }

    return (
        selecting ?
            <DeviceSelect />
        :
            <CardLine onClick={onClick}
                icon={ <DeviceIcon name={ category } /> }
                primary={ name } 
                secondary={ camelSentence(category) } 
            />
    )
}

export default ActivityDeviceItem
