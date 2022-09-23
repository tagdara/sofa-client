import React from 'react';
import { ThemeIcon } from '@mantine/core';
import EndpointIcon from 'endpoint-model/endpoint/EndpointIcon'

const ActivityIcon = React.forwardRef( (props, ref) => {

    return (
        <ThemeIcon
            ref={ref}
            radius="xl"
            onClick={ () => { console.log('clicky')}}
        >
                { props.endpointId && <EndpointIcon size={16} endpointId={props.endpointId} /> }
        </ThemeIcon>
    )

})

export default ActivityIcon