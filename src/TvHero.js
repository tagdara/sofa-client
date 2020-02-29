import React, { useContext } from "react";
import Television from './devices/Television';
import { DataContext } from './DataContext/DataProvider';

export default function TvHero(props) {
 
    const { deviceStatesByCategory } = useContext(DataContext);
    const tvs= deviceStatesByCategory('TV')
    
    return (
        tvs.map(device => 
            <Television wide={props.wide} key={device.endpointId} device={ device } />
        )
    );
}
