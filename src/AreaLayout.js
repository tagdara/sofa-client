import React, {useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import Button from '@material-ui/core/Button';
import Light from './light/Light';
import GridSection from './GridSection';

import Scene from './Scene'
import SceneAdd from './SceneAdd'
import ButtonItem from './ButtonItem'

import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import ColorLensIcon from '@material-ui/icons/ColorLens';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';
import CameraIcon from '@material-ui/icons/Camera';
import DeviceDialog from './DeviceDialog'


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
    buttonspacer: {
        minWidth: 36,
        marginRight: 18
    },

});

export default function AreaLayout(props) {

    const classes = useStyles();
    const { deviceStateByEndpointId, directive } = useContext(DataContext);
    const { isMobile, applyLayoutCard, layout } = useContext(LayoutContext);
    const [edit, setEdit] = useState(false)
    const [filter, setFilter] = useState('ALL');
    const [brightControl, setBrightControl] = useState(false)
    const [tempControl, setTempControl] = useState(false)
    const [colorControl, setColorControl] = useState(false)
    const [newScene, setNewScene] = useState(false);
    const [addingDevice, setAddingDevice] = useState(false);
    const [deletingDevice, setDeletingDevice] = useState(false);
    const [editingScene, setEditingScene] = useState(false);
    const area = deviceStateByEndpointId('logic:area:'+layout.props.name)

    function childrenByArea(filter) {

        var ads=[]
        try {
            var children=area.AreaController.children.value
            for (var i = 0; i < children.length; i++) {
                var dev=deviceStateByEndpointId(children[i])
                if (!filter || filter==='ALL' || (dev && dev.displayCategories.includes(filter))) {
                    ads.push(dev)
                }
            }
            return ads    
        } catch (e) {
            console.log('Error getting children by area', e)
        } finally {
            return ads
        }
}

    function nameSort(a,b) {
      if (a.friendlyName < b.friendlyName)
        return -1;
      if (a.friendlyName > b.friendlyName)
        return 1;
      return 0;
    }

    function filterByTypeState(deviceType, filter) {
        var lights=[]
        var all=childrenByArea(deviceType)
        if (filter.toUpperCase()==="ALL") { 
            return all.sort(nameSort) 
        }
        for (var j = 0; j < all.length; j++) {
            if (all[j].PowerController.powerState.value===filter.toUpperCase()) {
                lights.push(all[j])
            }
        }
        return lights.sort(nameSort)
    }

    function isAShortcut(scene) {
        if (area.AreaController.shortcuts.value.indexOf(scene) >= 0) {
            return area.AreaController.shortcuts.value.indexOf(scene)
        } else {
            return 'x'
        }
    }

    function sortByShortcuts() {

        var outscenes=[]
        try {
            var allscenes=childrenByArea('SCENE_TRIGGER')
            var shortcutlist=[...area.AreaController.shortcuts.value].reverse()
            for (var j = 0; j < shortcutlist.length; j++) {
                outscenes.push(deviceStateByEndpointId(shortcutlist[j]))
            }
    
            for (j = 0; j < allscenes.length; j++) {
                if (!shortcutlist.includes(allscenes[j].endpointId)) {
                    outscenes.push(allscenes[j])
                }
            }
        } catch (e) {
            console.log('Error getting children by area', e)
        } finally {
            return outscenes
        }
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
    
    return (    
        <React.Fragment>
            <GridSection name={layout.props.name+" Lights"} break={true}
                    secondary={
                        <>
                            <IconButton  size={"small"} onClick={ () => setBrightControl(!brightControl) } color={ brightControl ? "primary" : "default"} className={classes.button }>
                                <BrightnessLowIcon className={classes.smallicon } />
                            </IconButton>
                            <IconButton  size={"small"} onClick={ () => setTempControl(!tempControl) } color={ tempControl ? "primary" : "default"} className={classes.button }>
                                <AcUnitIcon className={classes.smallicon } />
                            </IconButton>
                            <IconButton  size={"small"} onClick={ () => setColorControl(!colorControl) } color={ colorControl ? "primary" : "default"} className={classes.buttonspacer }>
                                <ColorLensIcon className={classes.smallicon } />
                            </IconButton>
            
                            <Button onClick={ () => setFilter('ALL')} color={ filter==='ALL' ? "primary" : "default"} className={classes.button }>
                                All
                            </Button>
                            <Button onClick={ () => setFilter('ON')} color={ filter==='ON' ? "primary" : "default"} className={classes.button }>
                                On
                            </Button>
                        </>
                    } 
            >
                { filterByTypeState('LIGHT', filter).map(device =>
                    <Light key={ device.endpointId } device={ device } directive={directive} remove={removeChild} deleting={deletingDevice}
                        brightControl={brightControl} tempControl={tempControl} colorControl={colorControl}  noMargin={true} nopaper={true} noPad={true} noback={true}
                    />
                )}
            </GridSection>
            <GridSection name={"Scenes"} secondary={
                <>
                    <IconButton onClick={ () => setEdit(!edit) } className={classes.button }><RemoveIcon fontSize="small" /></IconButton> 
                    <IconButton onClick={ () => setNewScene(true) } className={classes.button }><CameraIcon fontSize="small" /></IconButton> 
                </>
            }>
                { newScene && <SceneAdd area={area} setNewScene={setNewScene} directive={directive} /> }
                { sortByShortcuts().map(scene => 
                    <Scene  remove={edit} scene={scene} key={scene.endpointId} shortcut={isAShortcut(scene.endpointId)}  noMargin={true} nopaper={true} noPad={true}
                            computedLevel={area.AreaController.scene.value} directive={directive} editing={editingScene} edit={editScene} />
                )}
            </GridSection>
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
    )
};