import React from 'react';
import { SplitButton } from 'layout/components/SplitButtonNew'
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import { deleteCachedEndpoint } from 'endpoint-model/endpoint/deleteCachedEndpoint';
import EndpointIcon from 'endpoint-model/endpoint/EndpointIcon'
import useEndpointHealth from 'endpoint-model/property/endpointHealth/useEndpointHealth'

export default function Endpoint(props) {

    const name = friendlyNameByEndpointId(props.endpointId)
    const { connectivityBool, hasEndpointHealth } = useEndpointHealth(props.endpointId)

    const select = (action) => {
        if (action === "delete") {
            deleteCachedEndpoint(props.endpointId)
        }
    }

    const selections = [ 
        { label: "Delete", value: "delete"},                              
    ]

    return (
        <SplitButton
            iconColor = { hasEndpointHealth ? (connectivityBool ? "green" : "red" ) : "gray" }
            icon = {<EndpointIcon endpointId={props.endpointId} />}
            selections = {selections}
            select={select}
            label = { name } secondary={props.endpointId}
        />
    )

}

