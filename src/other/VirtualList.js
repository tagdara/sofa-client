import React, { useContext } from 'react';
import { DataContext } from '../DataContext/DataProvider';

import Shade from './Shade';

export default function VirtualList(props) {

    const { virtualDeviceStates } = useContext(DataContext);

    return (
        virtualDeviceStates ?
            <React.Fragment>
                { Object.keys(virtualDeviceStates).map((key, index) => (
                    virtualDeviceStates[key]['type']==='shade' ?
                        <Shade key={ index } name={ key } endpointId={ virtualDeviceStates[key].endpointId } commands={ virtualDeviceStates[key].commands } />
                        :null
                ))}
            </React.Fragment>
        : null 
    );
}
