import React, { useState } from 'react';

import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { selectPage } from 'store/layoutHelpers'

import CardBase from 'components/CardBase';
import Spacer from 'components/Spacer';
import ComputerSummary from 'devices/Computer/ComputerSummary';
import MonitorButtonGroup from 'devices/Computer/MonitorButtonGroup';
import MatrixList from 'devices/Matrix/MatrixList';

export default function ComputerHero(props) {
    
    const [ expandMonitors, setExpandMonitors ]=useState()
     
    // This stuff really needs to be moved to config and autodetect, maybe solve with virtual device combining PC and plug
    const computerPlugs=["PC1 outlet", "PC2 outlet", "PC3 outlet", "PC4 outlet"]

    const buttonLayout = {
        upstairs:   [   
            { endpointId: "matrix:output:O1", label: "1", defaultInput: "Input.I1", outletEndpointId: "tplink:plug:8006A33CCFD62AE0DF1753D5A9BCD86E1AD7F78E00"},
            { endpointId: "matrix:output:O3", label: "2", defaultInput: "Input.I2", outletEndpointId: "tplink:plug:8006A33CCFD62AE0DF1753D5A9BCD86E1AD7F78E01"},
            { endpointId: "matrix:output:O6", label: "3", defaultInput: "Input.I3", outletEndpointId: "tplink:plug:8006A33CCFD62AE0DF1753D5A9BCD86E1AD7F78E02"},
            { endpointId: "matrix:output:O7", label: "4", defaultInput: "Input.I4", outletEndpointId: "tplink:plug:8006A33CCFD62AE0DF1753D5A9BCD86E1AD7F78E03"}
        ],
        downstairs: [   
            { endpointId: "matrix:output:O2", label: "D1", defaultInput: "Input.I1", outletEndpointId: "tplink:plug:8006A33CCFD62AE0DF1753D5A9BCD86E1AD7F78E00"},
            { endpointId: "matrix:output:O4", label: "D2", defaultInput: "Input.I2", outletEndpointId: "tplink:plug:8006A33CCFD62AE0DF1753D5A9BCD86E1AD7F78E01"},
        ]
    }


    return (
        <CardBase >
            <ComputerSummary outlets={computerPlugs} onClick={ () => selectPage('ComputerLayout') } />
            <ListItem>
                <MonitorButtonGroup buttonLayout={buttonLayout} />
                <Spacer />
                <IconButton size={"small"} onClick = { ()=> setExpandMonitors(!expandMonitors) }>{ expandMonitors ? <ExpandLessIcon/> : <ExpandMoreIcon />}</IconButton>
            </ListItem>
            { expandMonitors &&
                <MatrixList />
            }
        </CardBase>
    );
}
