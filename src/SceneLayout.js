import React, {useContext, useState, useEffect } from 'react';
import { DataContext } from './DataContext/DataProvider';

import ButtonItem from './ButtonItem';
import Light from './light/Light';
import GridSection from './GridSection';
import SaveIcon from '@material-ui/icons/Save';

export default function SceneLayout(props) {

    const { saveSceneDetails, getSceneDetails, deviceStateByEndpointId } = useContext(DataContext);
    const [sceneDetails, setSceneDetails] = useState(undefined)
    const [sceneLights, setSceneLights] = useState([])
    
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
    
    function saveScene(){
        var workingDetail={...sceneDetails}
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

    return (    
        <React.Fragment>
            { sceneLights!==undefined &&
                <>
                    <GridSection name={props.scene.friendlyName}>
                        { sceneLights.map(device =>
                            <Light key={ device.endpointId } device={ device } directive={directive} nopaper={false} showAll={true}  />
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