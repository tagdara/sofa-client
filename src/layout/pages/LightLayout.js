import React, { useState, useCallback }  from 'react';
import { makeStyles } from '@mui/styles';

import ColorLensIcon from '@mui/icons-material/ColorLens';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';

import Light from 'devices/Light/Light';
import GridSection from 'components/GridSection';
import Spacer from 'components/Spacer';
import SectionHeaderButton from 'components/SectionHeaderButton';

import useDeviceStore from 'store/deviceStore'
import { sortByName } from 'store/deviceHelpers'

const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    },
    button: {
        minWidth: 36
    },
    smallicon: {
        width: 18,
    }
});

const LightLayout = props => {

    const classes = useStyles();
    const [filter, setFilter] = useState(props.filter);
    const [brightControl, setBrightControl] = useState(false)
    const [tempControl, setTempControl] = useState(false)
    const [colorControl, setColorControl] = useState(false)
    const lights = sortByName(useDeviceStore(useCallback(state => Object.keys(state.devices).filter( dev => state.devices[dev].displayCategories.includes('LIGHT')), [])))

    //const lights = props.lights ? props.lights : sortByName(endpointIdsByCategory('LIGHT'))

    return (    
        <GridSection name={"Lights"} scroll={true}
                secondary={
                    <>
                        <SectionHeaderButton on={brightControl} onClick={ () => setBrightControl(!brightControl) } > 
                            <BrightnessLowIcon className={classes.smallicon } />
                        </SectionHeaderButton>
                        <SectionHeaderButton on={tempControl} onClick={ () => setTempControl(!tempControl) } >
                            <AcUnitIcon className={classes.smallicon } />
                        </SectionHeaderButton>
                        <SectionHeaderButton on={colorControl} onClick={ () => setColorControl(!colorControl) }>
                            <ColorLensIcon className={classes.smallicon } />
                        </SectionHeaderButton>
                        <Spacer width={18} />
                        <SectionHeaderButton onClick={ () => setFilter('ALL') } on={ filter==='ALL'} >
                            All
                        </SectionHeaderButton>
                        <SectionHeaderButton onClick={ () => setFilter('ON')} on={ filter==='ON'} >
                            On
                        </SectionHeaderButton>
                    </>
                }
        >
            { lights.map( endpointId =>
                <Light  key={ endpointId } endpointId={endpointId} brightControl={brightControl} small={true}
                        tempControl={tempControl} colorControl={colorControl} filter={filter} remove={props.remove}
                />
            )}
        </GridSection>
    )
}

export default LightLayout;

LightLayout.defaultProps = {
    filter: "ON",
}