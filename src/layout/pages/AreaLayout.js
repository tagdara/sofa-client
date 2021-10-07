import React, {useContext, useState, useEffect } from 'react';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';

import { LayoutContext } from 'layout/LayoutProvider';
import { DeviceStateContext } from 'context/DeviceStateContext';

import GridSection from 'components/GridSection';
import AreaLayoutScenes from 'devices/Area/AreaLayoutScenes';
import AreaLayoutLights from 'devices/Area/AreaLayoutLights';

import ButtonItem from 'components/ButtonItem';
import DeviceDialog from 'dialogs/DeviceDialog';


export default function AreaLayout(props) {

    const { cardReady, devices, deviceStates, getEndpointIdsByFriendlyName, unregisterDevices, directive } = useContext(DeviceStateContext);
    const { selectPage, currentProps } = useContext(LayoutContext);
    const [edit, setEdit] = useState(false)
    const [addingDevice, setAddingDevice] = useState(false);
    const [deletingDevice, setDeletingDevice] = useState(false);
    const [editingScene, setEditingScene] = useState(false);
    const [area, setArea]=useState(undefined)

    
    useEffect(() => {
        setArea(getEndpointIdsByFriendlyName(currentProps.name, 'AreaLayout', true, 'AREA', true))
        return function cleanup() {
            unregisterDevices('AreaLayout');
        };
    // eslint-disable-next-line 
    }, [ currentProps ] )


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
        console.log('editing', editingScene)
        setEditingScene(!editingScene)
    }

    function editScene(scene) {
        selectPage('SceneLayout', {'scene':scene})
    }

    
    function closeDialog() {
        setAddingDevice(false)
    }
    
    function selectDevice(dev) {
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
            ac.splice(ac.indexOf(newDevice.endpointId), 1);
        }
        directive(area.endpointId, 'AreaController', 'SetChildren', { "children" : { "value": ac }}, {})
    }
    
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
                <ButtonItem label={"Add Device"} avatarIcon={<AddIcon />} action={addDevice} small={true} />
                <ButtonItem label={"Delete Device"} avatarIcon={<RemoveIcon />} action={removeDevice} small={true} />
                <ButtonItem label={"Create Scene"} avatarIcon={<AddIcon />} small={true} />
                <ButtonItem label={"Edit Scene"} avatarIcon={<EditIcon />} action={toggleEditScenes} small={true} />
            </GridSection>
            { addingDevice &&
                <DeviceDialog open={true} close={closeDialog} select={selectDevice} />
            }
        </React.Fragment>
        : null
    )
};