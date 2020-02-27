import React, { useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';
import ErrorBoundary from './ErrorBoundary';
import VirtualList from './other/VirtualList';
//import ComputerList from './other/ComputerList';
import ModeList from './other/ModeList';
import DeviceList from './other/DeviceList';
import GridSection from './GridSection';

export default function MoreDevicesLayout(props) {

    const { deviceStatesByCategory } = useContext(DataContext);
    const switches = devsWithPowerState(deviceStatesByCategory('SWITCH'))   
    const modes = deviceStatesByCategory('MODE')
    
    
    function devsWithPowerState(devs) {
        var outdevs=[]
        for (var j = 0; j < devs.length; j++) {
            if (devs[j].hasOwnProperty('PowerController')) {
                outdevs.push(devs[j])
            }
        }
        return outdevs
    }
 
    return (
        <React.Fragment>
            <GridSection name={'Shades'}>
                <ErrorBoundary wide={props.wide}>
                    <VirtualList />
                </ErrorBoundary>
            </GridSection>
            { switches &&
            <GridSection name={"Other Devices"} >
                <ErrorBoundary wide={props.wide}>
                    <DeviceList devices={ switches } />
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

