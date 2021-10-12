import React, {useContext, useState, useEffect } from 'react';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';

import { LayoutContext } from 'layout/LayoutProvider';
import { DeviceContext } from 'context/DeviceContext';
import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'
import GridSection from 'components/GridSection';

import SectionHeaderButton from 'components/SectionHeaderButton';
import DeviceDialog from 'dialogs/DeviceDialog';
import LightLayout from 'layout/pages/LightLayout';
import SceneLayout from 'layout/pages/SceneLayout';

const AreaLayout = React.memo(props => {

    const { selectPage } = useContext(LayoutContext);
    const { sortByName, hasDisplayCategory } = useContext(DeviceContext);
    const [addingDevice, setAddingDevice] = useState(false);
    const [deletingDevice, setDeletingDevice] = useState(false);
    const [editingScene, setEditingScene] = useState(false);
    const currentArea = props.endpointId

    useEffect(() => {
        props.addEndpointIds('id', currentArea, 'AreaHero')
        return function cleanup() {
            props.unregisterDevices('AreaHero');
        };
    // eslint-disable-next-line 
    }, [ currentArea ]) 

    if (isEmpty(props.deviceState) || !props.deviceState[currentArea] ) { return null }

    const children = sortByName(props.deviceState[currentArea].AreaController.children.value)
    const lights = children.filter(endpointId => hasDisplayCategory(endpointId, "LIGHT"))
    const scenes = children.filter(endpointId => hasDisplayCategory(endpointId, "SCENE_TRIGGER"))
    const name = props.devices[currentArea].friendlyName

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
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
}, deviceStatesAreEqual);

export default dataFilter(AreaLayout);