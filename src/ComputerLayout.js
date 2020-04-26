import React, { useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';
import ErrorBoundary from './ErrorBoundary';
import ComputerList from './other/ComputerList';
import DeviceList from './other/DeviceList';
import GridSection from './GridSection';
import MatrixList from './other/MatrixList';
import ComputerIcon from '@material-ui/icons/Computer';

export default function MoreDevicesLayout(props) {

    const { deviceStatesByFriendlyName, deviceStatesByCategory, directive} = useContext(DataContext);
    //const switches = devsWithPowerState(deviceStatesByCategory('SWITCH'))
    const otherDevices=deviceStatesByCategory('OTHER')
    const switches=deviceStatesByFriendlyName(['PC1','PC2','PC3','PC4'], false, 'SWITCH')
    const computers=deviceStatesByCategory('PC')

    //const matrixDevices=deviceStatesByCategory('MATRIX') 
    const matrixDevices=deviceStatesByFriendlyName(['Living Room TV', 'Office 1', 'Office 2', 'Office 3', 'Office 4', 'Downstairs 1', 'Downstairs 2', 'Rack'], false)
 
    return (
        <React.Fragment>
            { switches &&
            <GridSection name={"Computers"} >
                <ErrorBoundary wide={props.wide}>
                    <DeviceList icon={<ComputerIcon />} devices={ switches } directive={directive} />
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
            { computers &&
            <GridSection name={"Computers"} show={false}>
                <ErrorBoundary wide={props.wide}>
                    <ComputerList devices={ computers } directive={directive} />
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

