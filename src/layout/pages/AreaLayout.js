import React, {useContext, useState, useEffect } from 'react';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';

import { LayoutContext } from 'layout/LayoutProvider';
import GridSection from 'components/GridSection';

import SectionHeaderButton from 'components/SectionHeaderButton';
import DeviceDialog from 'dialogs/DeviceDialog';
import LightLayout from 'layout/pages/LightLayout';
import SceneLayout from 'layout/pages/SceneLayout';

import useDeviceStateStore from 'store/deviceStateStore'
import useDeviceStore from 'store/deviceStore'
import { register, unregister, sortByName, hasDisplayCategory } from 'store/deviceHelpers'

const AreaLayout = props => {

    const { selectPage } = useContext(LayoutContext);
    const [addingDevice, setAddingDevice] = useState(false);
    const [deletingDevice, setDeletingDevice] = useState(false);
    const [editingScene, setEditingScene] = useState(false);
    const currentArea = props.endpointId
    const device = useDeviceStore( state => state.devices[props.endpointId] )
    const deviceState  = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const name = device.friendlyName


    useEffect(() => {
        register(props.endpointId, 'arealayout-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'arealayout-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [])  

    if (deviceState)  { return null }

    const children = sortByName(deviceState.AreaController.children.value)
    const lights = children.filter(endpointId => hasDisplayCategory(endpointId, "LIGHT"))
    const scenes = children.filter(endpointId => hasDisplayCategory(endpointId, "SCENE_TRIGGER"))

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
        selectPage('SceneLayout', {'scene':scene})
    }

    
    function closeDialog() {
        setAddingDevice(false)
    }
    
    function selectDevice(dev) {
        addChild(dev)
        setAddingDevice(false)
    }
    
    function addChild(endpointId) {
        if (!children.includes(endpointId)) {
            var updateChildren = [...children, endpointId ]
            props.directive(currentArea, 'AreaController', 'SetChildren', { "children" : { "value": updateChildren }}, {})
        }
    }
    
    function removeChild(endpointId) {
        if (children.includes(endpointId)) {
            var updateChildren = [...children]
            updateChildren.splice(updateChildren.indexOf(endpointId), 1);
            props.directive(currentArea, 'AreaController', 'SetChildren', { "children" : { "value": updateChildren }}, {})
        }
    }

    const remove = deletingDevice ? removeChild : undefined
    const edit = editingScene ? editScene : undefined

    return (    
        <GridSection name={name} 
            secondary={
                <>
                    <SectionHeaderButton onClick={addDevice} > 
                        <AddIcon />
                    </SectionHeaderButton>
                    <SectionHeaderButton on={deletingDevice} onClick={removeDevice} >
                        <RemoveIcon />
                    </SectionHeaderButton>
                    <SectionHeaderButton onClick={toggleEditScenes} >
                        <EditIcon />
                    </SectionHeaderButton>
                </>
            }
        >
            <LightLayout lights={ lights } remove={remove} filter={"ALL"} />
            <SceneLayout scenes={ scenes } remove={remove} edit={edit} />
            { addingDevice &&
                <DeviceDialog open={true} close={closeDialog} select={selectDevice} />
            }
        </GridSection>
    )
}

export default AreaLayout;