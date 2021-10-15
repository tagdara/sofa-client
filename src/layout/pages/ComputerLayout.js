import React, { useContext } from 'react';

import PowerIcon from '@material-ui/icons/Power';

import { DeviceContext } from 'context/DeviceContext';
import GridSection from 'components/GridSection';
import Computer from 'devices/Computer/Computer';
import Device from 'devices/Device';
import Matrix from 'devices/Matrix/Matrix';

export default function ComputerLayout(props) {

    const { endpointIdsByFriendlyName, endpointIdsByCategory, sortByName } = useContext(DeviceContext);
    const matrixDeviceNames=['Living Room TV', 'Office 1', 'Office 2', 'Office 3', 'Office 4', 'Downstairs 1', 'Downstairs 2', 'Rack']
    const plugNames=['PC1 outlet', 'PC2 outlet', 'PC3 outlet','PC4 outlet']
    const serviceNames=['3D Printer', 'Dishwasher outlet', 'NUC1 outlet', 'NUC2 outlet']
    const computers = sortByName(endpointIdsByCategory('COMPUTER'))    
    const plugs =  endpointIdsByFriendlyName(plugNames)
    const matrix = sortByName(endpointIdsByFriendlyName(matrixDeviceNames))
    const services = endpointIdsByFriendlyName(serviceNames)

    return (
        <>
            <GridSection name={"Computers"} show={true}>
                { computers.map((device) =>
                    <Computer key={ device } endpointId={device} />
                )}
            </GridSection>

            <GridSection name={"Plugs"} >
                { plugs.map(device =>
                    <Device key={ device } endpointId={ device } icon={ <PowerIcon />} />
                )}
            </GridSection>

            <GridSection name={"Display Matrix"} >
                { matrix.map(device =>
                    <Matrix key={ device } endpointId = { device } />
                )}
            </GridSection>

            <GridSection name={"Services"} show={false}>
                { services.map(device =>
                    <Device key={ device } endpointId = { device } icon={props.icon}  />
                )}
            </GridSection>
        </>
    )
}

