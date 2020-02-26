import React, { useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';
import ErrorBoundary from './ErrorBoundary';
//import ComputerList from './other/ComputerList';
import DeviceList from './other/DeviceList';
import GridSection from './GridSection';
import MatrixList from './other/MatrixList';

export default function MoreDevicesLayout(props) {

    const { devicesByCategory } = useContext(DataContext);
    const switches = devsWithPowerState(devicesByCategory('SWITCH'))
    
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
                    <DeviceList devices={ switches } />
                </ErrorBoundary>

            </GridSection>
            }
            { devicesByCategory('MATRIX') &&
            <GridSection name={"Display Matrix"} >
                <ErrorBoundary wide={props.wide}>
                    <MatrixList devices={ devicesByCategory('MATRIX') }  />
                </ErrorBoundary>
            </GridSection>
            }
            { devicesByCategory('OTHER') &&
            <GridSection name={"Services"} show={false}>
                <ErrorBoundary wide={props.wide}>
                    <DeviceList devices={ devicesByCategory('OTHER') } />
                </ErrorBoundary>
            </GridSection>
            }

        </React.Fragment>
    )
}

