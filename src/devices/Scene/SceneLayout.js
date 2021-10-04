import React, {useContext, useState, useEffect } from 'react';
import { DataContext } from 'DataContext/DataProvider';

import ButtonItem from 'components/ButtonItem';
import Light from './light/Light';
import GridSection from 'components/GridSection';
import SaveIcon from '@material-ui/icons/Save';
import AutomationTitle from "./automation/automationTitle"
import CardBase from 'components/CardBase';

export default function SceneLayout(props) {

    const { saveSceneDetails, getSceneDetails, deviceStateByEndpointId } = useContext(DataContext);
    const [ sceneDetails, setSceneDetails ] = useState(undefined)
    const [ sceneLights, setSceneLights ] = useState([])
    
    useEffect(() => {
        getSceneDetails(props.scene.friendlyName)
            .then(res=>{ setSceneDetails(res); fakeLights(res); })
    // eslint-disable-next-line 
    }, []);
    
    function fakeLights(detail) {
        var working=[]
        for (var light in detail.children ) {
            var fakelight=deviceStateByEndpointId(light)
            if (detail.children[light].hasOwnProperty('powerState')) {
                fakelight.PowerController.powerState.value=detail.children[light]['powerState']
            }
            if (detail.children[light].hasOwnProperty('brightness')) {
                fakelight.BrightnessController.brightness.value=detail.children[light]['brightness']
            }
            if (detail.children[light].hasOwnProperty('hue')) {
                fakelight.ColorController.color.value.hue=detail.children[light]['hue']
                fakelight.ColorController.color.value.saturation=detail.children[light]['saturation']
                fakelight.ColorController.color.value.brightness=detail.children[light]['brightness']/100
            }

            working.push(fakelight)
        }
        setSceneLights(working)
    }
    
    
    function directive (endpointId, controllerName, command, payload={}, cookie={}) {

        for (var i = 0; i < sceneLights.length; i++) {
            if (sceneLights[i].endpointId===endpointId) {
                var workingLights=[...sceneLights]
                if (command==='TurnOn') { payload={"powerState": "ON"} }
                if (command==='TurnOff') { payload={"powerState": "OFF"}  }     
                for (var key in payload) {
                    if (payload.hasOwnProperty(key)) {
                        workingLights[i][controllerName][key]['value']=payload[key]
                    }
                }
                
                setSceneLights(workingLights)
                break
            }
        }
    }
    
    function removeLight(endpointId) {
        var workingLights=[...sceneLights]
        for (var i = 0; i < workingLights.length; i++) {
            if (workingLights[i].endpointId===endpointId) {
                workingLights.splice(i, 1);
                break
            }
        }
        setSceneLights(workingLights)
    }
    
    function saveScene(){
        var workingDetail={...sceneDetails}
        workingDetail.children={}
        for (var i = 0; i < sceneLights.length; i++) {
            var workingItem={}
            if (sceneLights[i].hasOwnProperty('PowerController')) {
                workingItem.powerState=sceneLights[i].PowerController.powerState.value
            }
            if (sceneLights[i].hasOwnProperty('BrightnessController')) {
                workingItem.brightness=sceneLights[i].BrightnessController.brightness.value
            }
            if (sceneLights[i].hasOwnProperty('ColorController')) {
                workingItem.hue=sceneLights[i].ColorController.color.value.hue
                workingItem.saturation=sceneLights[i].ColorController.color.value.saturation
            }
            workingDetail.children[sceneLights[i].endpointId]={...workingItem}
        }
        
        console.log('would save:', workingDetail)
        saveSceneDetails(props.scene.friendlyName, workingDetail)
            
    }
    
    console.log('scenelights',sceneLights)

    return (    
        <React.Fragment>
            { sceneLights!==undefined &&
                <>
                    <GridSection>
                        <CardBase wide={true}>
                            <AutomationTitle name={props.scene.friendlyName} save={props.save} />
                        </CardBase>
                    </GridSection>
                    <GridSection>
                        { sceneLights.map(device =>
                            <Light key={ device.endpointId } device={ device } deviceState={ device } directive={directive} nopaper={false} showAll={true} remove={removeLight} />
                        )}
                    </GridSection>
                    <GridSection>
                        <ButtonItem action={saveScene} avatarIcon={<SaveIcon/>} label={"Save Scene"} />
                    </GridSection>
                </>
            }
        </React.Fragment>
    )
};