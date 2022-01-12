import React from 'react';
import { ThemeIcon } from '@mantine/core';
import DeviceIcon from 'components/DeviceIcon'

const ActivityIcon = React.forwardRef( (props, ref) => {

    return (
        <ThemeIcon
            ref={ref}
            radius="xl"
            onClick={ () => { console.log('clicky')}}
        >
                { props.endpointId && <DeviceIcon size={16} endpointId={props.endpointId} /> }
        </ThemeIcon>
    )

})

export default ActivityIcon