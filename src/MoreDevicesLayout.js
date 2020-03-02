import React, { useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';
import ErrorBoundary from './ErrorBoundary';
import VirtualList from './other/VirtualList';
//import ComputerList from './other/ComputerList';
import ModeList from './other/ModeList';
import DeviceList from './other/DeviceList';
import GridSection from './GridSection';

export default function MoreDevicesLayout(props) {

    const { deviceStatesByFriendlyName, deviceStatesByCategory, directive } = useContext(DataContext);
    const switches=deviceStatesByFriendlyName(['Bathroom Fan','Bathroom Heat Fan'], false, 'SWITCH')
    const modes = deviceStatesByCategory('MODE')
 
    return (
        <React.Fragment>
            <GridSection name={'Shades'}>
                <ErrorBoundary wide={props.wide}>
                    <VirtualList directive={directive} />
                </ErrorBoundary>
            </GridSection>
            { switches &&
            <GridSection name={"Other Devices"} >
                <ErrorBoundary wide={props.wide}>
                    <DeviceList devices={ switches } directive={directive} />
                </ErrorBoundary>

            </GridSection>
            }
            { modes && 
            <GridSection name={"Modes"} show={false}>
                <ErrorBoundary wide={props.wide}>
                    <ModeList devices={ modes } />
                </ErrorBoundary>

            </GridSection>
            }
        </React.Fragment>
    )
}

