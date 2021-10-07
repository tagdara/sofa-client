import React, { useContext } from "react";
import { DeviceContext } from 'context/DeviceContext';
import Television from 'devices/Television/Television';

export default function TvHero(props) {
    const { devicesByCategory } = useContext(DeviceContext);
    const tvs =  devicesByCategory('TV')

    return (
        <>
        {
        tvs.map(tv => 
            <Television wide={props.wide} key={tv.endpointId} endpointId={tv.endpointId}/>
        )}
        </>
    );
}
