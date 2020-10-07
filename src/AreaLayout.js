import React, {useContext, useState, useEffect } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import GridSection from './GridSection';
import AreaLayoutScenes from './AreaLayoutScenes';
import AreaLayoutLights from './AreaLayoutLights';

import ButtonItem from './ButtonItem'

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeviceDialog from './DeviceDialog';


export default function AreaLayout(props) {

    const { cardReady, devices, deviceStates, getEndpointIdsByFriendlyName, unregisterDevices, directive } = useContext(DataContext);
    const { isMobile, applyLayoutCard, layout } = useContext(LayoutContext);
    const [edit, setEdit] = useState(false)
    const [addingDevice, setAddingDevice] = useState(false);
    const [deletingDevice, setDeletingDevice] = useState(false);
    const [editingScene, setEditingScene] = useState(false);
    //const area = deviceStateByEndpointId('logic:area:'+layout.props.name)
    const [area, setArea]=useState(undefined)
    //const [areaChildren, setAreaChildren]=useState([])
    
    useEffect(() => {
        console.log(getEndpointIdsByFriendlyName(layout.props.name, 'AreaLayout', true, 'AREA', true))
        setArea(getEndpointIdsByFriendlyName(layout.props.name, 'AreaLayout', true, 'AREA', true))
        return function cleanup() {
            unregisterDevices('AreaLayout');
        };
    // eslint-disable-next-line 
    }, [ layout.props.name] )


    function getChildren(filter) {

        var ads=[]
        if (cardReady('AreaLayout')) {
            var children=deviceStates[area].AreaController.children.value
            for (var i = 0; i < children.length; i++) {
                var dev=devices[children[i]]
                if (!filter || filter==='ALL' || (dev && dev.displayCategories.includes(filter))) {
                    ads.push(children[i])
                }
            }
        }
        return ads    
    }

    function addDevice(){
        setAddingDevice(true)
    }
    
    function removeDevice() {
        setDeletingDevice(!deletingDevice)
    }

    function toggleEditScenes() {
        setEditingScene(!editingScene)
    }

    function editScene(scene) {
        applyLayoutCard('SceneLayout', {'scene':scene})
    }

    
    function closeDialog() {
        setAddingDevice(false)
    }
    
    function selectDevice(dev) {
        console.log('selected device', dev)
        console.log('current area', area.AreaController)
        addChild(dev)
        setAddingDevice(false)
    }
    
    function addChild(newDevice) {
        var ac=[...area.AreaController.children.value]
        ac.push(newDevice.endpointId)
        directive(area.endpointId, 'AreaController', 'SetChildren', { "children" : { "value": ac }}, {})
    }
    
    function removeChild(newDevice) {
        var ac=[...area.AreaController.children.value]
        if (ac.includes(newDevice.endpointId)) {
            console.log('Removing item',newDevice.endpointId,'from',ac)
            ac.splice(ac.indexOf(newDevice.endpointId), 1);
        }
        directive(area.endpointId, 'AreaController', 'SetChildren', { "children" : { "value": ac }}, {})
    }
    
    if (cardReady('AreaLayout')) { console.log(area); console.log( deviceStates[area]) }
    
    return (    
        cardReady('AreaLayout') ?
         <React.Fragment>
            <AreaLayoutLights   area={area} areaScene={ deviceStates[area].AreaController.scene.value } lights={ getChildren('LIGHT') } edit={edit}
                                    editing={editingScene} editScene={editScene}  setEdit={setEdit} removeChild={removeChild}
                            />
            <AreaLayoutScenes   area={area} areaScene={ deviceStates[area].AreaController.scene.value } scenes={ getChildren('SCENE_TRIGGER') } edit={edit}
                                editing={editingScene} editScene={editScene}  setEdit={setEdit} 
                            />

            <GridSection name={"Actions"} >
                <ButtonItem xs={isMobile ? 6 : 2} label={"Add Device"} avatarIcon={<AddIcon />} action={addDevice} noMargin={true} nopaper={true} nolist={true} />
                <ButtonItem xs={isMobile ? 6 : 2} label={"Delete Device"} avatarIcon={<RemoveIcon />} action={removeDevice} noMargin={true} nopaper={true} nolist={true} />
                <ButtonItem xs={isMobile ? 6 : 2} label={"Create Scene"} avatarIcon={<AddIcon />} noMargin={true} nopaper={true} nolist={true} />
                <ButtonItem xs={isMobile ? 6 : 2} label={"Edit Scene"} avatarIcon={<EditIcon />} action={toggleEditScenes} noMargin={true} nopaper={true} nolist={true} />
            </GridSection>
            { addingDevice &&
                <DeviceDialog open={true} close={closeDialog} select={selectDevice} />
            }
        </React.Fragment>
        : null
    )
};