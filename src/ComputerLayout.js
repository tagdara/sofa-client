import React, { useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';
import ErrorBoundary from './ErrorBoundary';
//import ComputerList from './other/ComputerList';
import DeviceList from './other/DeviceList';
import GridSection from './GridSection';
import MatrixList from './other/MatrixList';

export default function MoreDevicesLayout(props) {

    const { deviceStatesByCategory, directive} = useContext(DataContext);
    const switches = devsWithPowerState(deviceStatesByCategory('SWITCH'))
    const otherDevices=deviceStatesByCategory('OTHER')
    const matrixDevices=deviceStatesByCategory('MATRIX') 
    
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
            { switches &&
            <GridSection name={"Other Devices"} >
                <ErrorBoundary wide={props.wide}>
                    <DeviceList devices={ switches } directive={directive} />
                </ErrorBoundary>

            </GridSection>
            }
            { matrixDevices &&
            <GridSection name={"Display Matrix"} >
                <ErrorBoundary wide={props.wide}>
                    <MatrixList devices={ matrixDevices } directive={directive}  />
                </ErrorBoundary>
            </GridSection>
            }
            { otherDevices &&
            <GridSection name={"Services"} show={false}>
                <ErrorBoundary wide={props.wide}>
                    <DeviceList devices={ otherDevices } directive={directive} />
                </ErrorBoundary>
            </GridSection>
            }

        </React.Fragment>
    )
}

