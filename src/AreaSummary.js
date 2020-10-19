import React, {useContext, useState } from 'react';
import { DataContext } from './DataContext/DataProvider';
import Light from './light/Light';
import GridItem from './GridItem';
import Scene from './Scene'
import AreaSummaryLine from './AreaSummaryLine';

export default function AreaSummary(props) {

    const { devices, deviceStates, directive } = useContext(DataContext);
    const [showDetail, setShowDetail] = useState(props.showDetail);
    //const area = deviceStateByEndpointId('logic:area:'+layout.props.name)

    function childrenByArea(filter) {

        var ads=[]
        try {
            var children=props.deviceState.AreaController.children.value
            for (var i = 0; i < children.length; i++) {
                if (!filter || filter==='ALL' || (devices[children[i]] && devices[children[i]].displayCategories.includes(filter))) {
                    ads.push(children[i])
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

    function filterByTypeState(deviceType, filter="") {

        var lights=[]
        var all=childrenByArea(deviceType)
        if (filter.toUpperCase()==="ALL") { 
            return all.sort(nameSort) 
        }
        for (var j = 0; j < all.length; j++) {
            if (filter==="" || all[j].PowerController.powerState.value===filter.toUpperCase()) {
                lights.push(all[j])
            }
        }
        return lights.sort(nameSort)
    }

    function isAShortcut(scene) {
        if (deviceStates[props.area].AreaController.shortcuts.value.indexOf(scene) >= 0) {
            return deviceStates[props.area].AreaController.shortcuts.value.indexOf(scene)
        } else {
            return 'x'
        }
    }

    function sortByShortcuts(skip) {

        var outscenes=[]
        
        try {
            var allscenes=childrenByArea('SCENE_TRIGGER')
            var shortcutlist=[...deviceStates[props.area].AreaController.shortcuts.value].reverse()
            if (!skip) { 
                for (var j = 0; j < shortcutlist.length; j++) {
                    outscenes.push( deviceStates[shortcutlist[j]] )
                }
            }
    
            for (j = 0; j < allscenes.length; j++) {
                if (!shortcutlist.includes(allscenes[j])) {
                    outscenes.push(allscenes[j])
                }
            }
        } catch (e) {
            console.log('Error getting children by area', e)
        } finally {
            return outscenes
        }
    }
    
    function toggleShowDetail() {
        setShowDetail(!showDetail)
    }

 
    var AreaObject = (    
        <>
            { props.summaryLine &&
                <AreaSummaryLine device={devices[props.area]} deviceState={ deviceStates[props.area] } area={props.area} clickName={props.clickName ? props.clickName : toggleShowDetail} />
            }
            { showDetail && 
            <>
                    { filterByTypeState('LIGHT').map(device =>
                        <Light key={ device } device={ devices[device] } deviceState={ deviceStates[device] } directive={directive} noGrid={true} small={true}  highlight={true} />
                    )}
                    { sortByShortcuts(true).map(scene => 
                        <Scene  scene={devices[scene]} key={scene} shortcut={isAShortcut(devices[scene].endpointId)} noGrid={true} noMargin={false} highlight={true}
                                computedLevel={deviceStates[props.area].AreaController.scene.value} directive={directive} small={true} />
                    )}
            </>
            }
        </>
    )
    
    return (
        <>
        { !props.noGrid ?
            <GridItem nopaper={props.nopaper} xs={props.xs} thinmargin={props.thinmargin} flex={true} inset={props.inset} nolist={true} noMargin={props.noMargin} >
                { AreaObject }
            </GridItem>
            :
            <> { AreaObject } </>
        }
        </>
    )
};

AreaSummary.defaultProps = {
    summaryLine: true,
    showDetail: false,
    clickName: undefined,
}
