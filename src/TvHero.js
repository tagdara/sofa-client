import React, { useContext } from "react";
import Television from './devices/Television';
import { DataContext } from './DataContext/DataProvider';

export default function TvHero(props) {
    
    const { devicesByCategory } = useContext(DataContext);

    return (
        <React.Fragment>
            { devicesByCategory('TV').map(device => 
                <Television wide={props.wide} key={device.endpointId} device={ device } />
            )}
        </React.Fragment>
    );
}
