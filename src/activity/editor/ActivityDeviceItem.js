import React from 'react';

import CardLine from 'components/CardLine'
import DeviceIcon from 'components/DeviceIcon';

const ActivityDeviceItem = props => {

    const name = props.device.friendlyName
    const category = props.device.displayCategories[0]

    var camelSentence = (str) => {
        return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
        {
            return chr.toUpperCase();
        });
    }

    return (
        <CardLine onClick={props.onClick} size={props.size ? props.size : "sm"}
            icon={ <DeviceIcon name={ category } /> }
            primary={ name } 
            secondary={ camelSentence(category) } 
        />
    )
}

export default ActivityDeviceItem
