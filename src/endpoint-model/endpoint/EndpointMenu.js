import React from 'react';
import { Avatar, Menu } from '@mantine/core';
import EndpointIcon from 'endpoint-model/endpoint/EndpointIcon'
import useEndpointHealth from 'endpoint-model/property/endpointHealth/useEndpointHealth'

const EndpointMenu = props => {

    const { connectivityBool, hasEndpointHealth } = useEndpointHealth(props.endpointId)

    const selections = [ 
        { label: "Delete", value: "delete"},                              
    ]
    
    return  <Menu   style={{ display: "flex", flexDirection: "column"}}>
                <Menu.Target>
                    <Avatar 
                        size="sm" 
                        color={ hasEndpointHealth ? (connectivityBool ? "green" : "red" ) : "gray" }
                        radius="xl"
                        styles={{ root: { marginRight: 8}}}
                        style={{ margin: "4px 8px 4px 0px" }} 
                    >
                        <EndpointIcon endpointId={props.endpointId} size={16} />
                    </Avatar>
                </Menu.Target>
                <Menu.Dropdown>
                { selections.map( item => 
                    <Menu.Item key={item.label} onClick={ () => props.select(item.value, props.endpointId)}>{item.label}</Menu.Item>
                )}  
                </Menu.Dropdown> 
            </Menu>

}

export default EndpointMenu
