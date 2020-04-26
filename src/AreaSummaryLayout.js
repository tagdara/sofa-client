import React, {useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import Light from './light/Light';
import GridItem from './GridItem';
import Scene from './Scene'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DotLevel from './DotLevel';


const useStyles = makeStyles(theme => {
    return {        
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
        halves: {
            flexGrow: 1,
            flexBasis: 1,
            boxSizing: "border-box",
        },
        dotLine: {
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 8px 8px 8px",
            alignItems: "center",
            height: 64,
        },
        dotLabel: {
            height: 48,
            maxWidth: "50%",
            flexGrow:1,
            '&:hover': {
                backgroundColor: theme.palette.background.hover,
            },
            borderRadius:4,
            padding: 8,
            boxSizing: "border-box",
            alignItems: "center",
            display: "flex",
        },
        details: {
            display: "flex",
            flexDirection: "column",
            padding: 0,
        },
        paper: {
            display: "flex",
            flexDirection: "column",
            flexGrow: 0,
            width: "100%",
        }
    }
});

export default function AreaLayout(props) {

    const classes = useStyles();
    const { deviceStateByEndpointId, directive } = useContext(DataContext);
    const { isMobile } = useContext(LayoutContext);;
    const [showDetail, setShowDetail] = useState(false);
    //const area = deviceStateByEndpointId('logic:area:'+layout.props.name)

    function runShortcut(level) {
        var scene=deviceStateByEndpointId(props.area.AreaController.shortcuts.value[level])
        directive(scene.endpointId, 'SceneController', 'Activate')
    }
    
    function currentLevel() {
        if (props.area.AreaController.shortcuts.value.includes(props.area.AreaController.scene.value)) {
            return props.area.AreaController.shortcuts.value.indexOf(props.area.AreaController.scene.value)
        }
        return 0
    }
    
    function hasShortcuts() {
        try {
            if (props.area.AreaController.shortcuts.value.length>0) {
                return true
            }
        }
        catch {
            return false
        }

        return false
    }
    function childrenByArea(filter) {

        var ads=[]
        try {
            var children=props.area.AreaController.children.value
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
        if (props.area.AreaController.shortcuts.value.indexOf(scene) >= 0) {
            return props.area.AreaController.shortcuts.value.indexOf(scene)
        } else {
            return 'x'
        }
    }

    function sortByShortcuts() {

        var outscenes=[]
        try {
            var allscenes=childrenByArea('SCENE_TRIGGER')
            var shortcutlist=[...props.area.AreaController.shortcuts.value].reverse()
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
    
    return (    
        <GridItem xs={isMobile ? 12 : 3} container={true} nopad={true} >
                <ListItem className={classes.dotLine}>
                    <ListItemText className={classes.dotLabel} onClick={ () => setShowDetail(!showDetail) }>
                        {props.area.friendlyName}
                    </ListItemText>
                    { hasShortcuts() &&
                        <DotLevel level={currentLevel()} select={runShortcut} />
                    }
                </ListItem>
                { showDetail && 
                <>
                        { filterByTypeState('LIGHT').map(device =>
                            <Light key={ device.endpointId } device={ device } directive={directive} noGrid={true} />
                        )}
                        { sortByShortcuts().map(scene => 
                            <Scene  scene={scene} key={scene.endpointId} shortcut={isAShortcut(scene.endpointId)} noGrid={true}
                                    computedLevel={props.area.AreaController.scene.value} directive={directive} small={true} />
                        )}
                </>
                }
        </GridItem>
    )
};