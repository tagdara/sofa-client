import React, { Component } from "react";

import ButtonZone from './devices/buttonzone';
import ButtonGrid from './devices/buttonGrid';
import CameraSelect from './cameraselect';
import ZoneList from './zonelist';
import ThermostatHero from './thermostat/thermostatHero';
import { withData } from './dataContext';
import MiniCard from './miniCard';

class PageSecurity extends Component {

    render() {
        return (
            <div>
                <ZoneList filter='open' Category='ZONE' />
                <CameraSelect />
                <ButtonGrid>
                    <MiniCard name={'Front Gate'} />
                    <MiniCard name={'Garage Door'} />
                 </ButtonGrid>
                <ThermostatHero Category="THERMOSTAT" />
            </div>
        );
    }
}

export default withData(PageSecurity);
