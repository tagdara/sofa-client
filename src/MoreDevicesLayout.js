import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ErrorBoundary from './ErrorBoundary';

import IconButton from '@material-ui/core/IconButton';

import List from '@material-ui/core/List';

import VirtualList from './other/VirtualList';
import ComputerList from './other/ComputerList';
import ModeList from './other/ModeList';
import DeviceList from './other/DeviceList';

import GridSection from './GridSection';

const useStyles = makeStyles({
        
    list: {
        minWidth: 320,
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    thermostatList: {
        width: "100%",
    },

    listItem: {
        padding: "16 0",
        width: '100%',
    },

});


function MoreDevicesLayout(props) {
    
    const classes = useStyles();
    const switches = devsWithPowerState(props.devicesByCategory('SWITCH'))
    
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
                    <VirtualList sendAlexaCommand={props.sendAlexaCommand} />
                </ErrorBoundary>
            </GridSection>
            {  props.devicesByCategory('SWITCH') &&
            <GridSection name={"Other Devices"} >
                <ErrorBoundary wide={props.wide}>
                    <DeviceList devices={ switches } />
                </ErrorBoundary>

            </GridSection>
            }
            { props.devicesByCategory('MODE') && 
            <GridSection name={"Modes"} >
                <ErrorBoundary wide={props.wide}>
                    <ModeList devices={ props.devicesByCategory('MODE') } />
                </ErrorBoundary>

            </GridSection>
            }
            { props.devicesByCategory('PC') &&
            <GridSection name={"Computers"} >
                <ErrorBoundary wide={props.wide}>
                    <ComputerList devices={ props.devicesByCategory('PC') }  />
                </ErrorBoundary>

            </GridSection>
            }

            { props.devicesByCategory('OTHER') &&
            <GridSection name={"Services"} >
                <ErrorBoundary wide={props.wide}>
                    <DeviceList devices={ props.devicesByCategory('OTHER') } />
                </ErrorBoundary>

            </GridSection>
            }

        </React.Fragment>
    )

}

export default withData(MoreDevicesLayout);
