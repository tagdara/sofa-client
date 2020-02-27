import React, { useContext } from "react";
import Television from './devices/Television';
import { DataContext } from './DataContext/DataProvider';

export default function TvHero(props) {
 
    const { deviceStatesByCategory } = useContext(DataContext);
    
    return (
        deviceStatesByCategory('TV').map(device => 
            <Television wide={props.wide} key={device.endpointId} device={ device } />
        )
    );
}
