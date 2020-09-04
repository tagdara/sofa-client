import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from './DataContext/DataProvider';
import { LayoutContext } from './layout/NewLayoutProvider';

import AreaLine from './AreaLine';
import AreaSummaryLine from './AreaSummaryLine';
import AreaSummary from './AreaSummary';
import GridItem from './GridItem';
import CardControl from './CardControl';
import PlaceholderCard from './PlaceholderCard';


export default function AreaHero(props) {

    const { cardReady, devices, deviceStates, getEndpointIdsByCategory, unregisterDevices, setArea, area } = useContext(DataContext);
    const { applyLayoutCard } = useContext(LayoutContext);
    //const thisarea = deviceStateByEndpointId('logic:area:'+area)
    const thisarea = 'logic:area:'+area
    //const allAreas = deviceStatesByCategory('AREA')
    const [ previousArea, setPreviousArea]=useState('All')
    const [ allAreas, setAllAreas]=useState([])
 
    useEffect(() => {
        setAllAreas(getEndpointIdsByCategory('AREA','AreaHero'))
        return function cleanup() {
            unregisterDevices('AreaHero');
        };
    // eslint-disable-next-line 
    }, [ ] )

    function selectArea(name) {
        setPreviousArea(area)
        setArea(name);
        //applyLayoutCard('AreaLayout',{"name": name})
    }
    
    function getAreaAreas() {

        var areas=[]
        if (area==='All') { 
            console.log('returning all areas', allAreas)
            return allAreas
        }
        if (!area || thisarea===undefined) { return [] }
        try {
            var children=deviceStates[thisarea].AreaController.children.value
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    var child=devices[children[i]]
                    if (child && child.displayCategories.includes('AREA')) {
                        areas.push(children[i])
                    }
                }
            }
        }
        catch {}
        return areas
    }

    function getAreaColor() {

        var colorLights={}
        if (area==='All') { 
            console.log('skip color in all areas', allAreas)
            return []
        }
        if (!area || thisarea===undefined) { return [] }

        var children=deviceStates[thisarea].AreaController.children.value
        if (children) {
            
            for (var i = 0; i < children.length; i++) {
                
                var child=deviceStates[children[i]]
                if (child && devices[children[i]].displayCategories.includes('LIGHT')) {
                    if (child.hasOwnProperty('ColorController')) {
                        
                        colorLights[children[i]]=deviceStates[children[i]]
                    }
                }
            }
        }

        return colorLights
    }

    
    function hasShortcuts() {
        
        try {
            if (deviceStates[thisarea].AreaController.shortcuts.value.length>0) {
                return true
            }
        }
        catch {
            return false
        }

        return false
    }
    
    function homeArea() {
        setPreviousArea('All')
        setArea('Main')
    }

    function backArea() {
        var pp=previousArea
        setPreviousArea(area)
        setArea(pp)
    }
    
    function expandArea(areaname) {
        applyLayoutCard('AreaLayout',{"name": areaname})
    }
    
    if (!cardReady('AreaHero')) {
        return <PlaceholderCard count={ 6 } />
    }

    return (
        <GridItem wide={props.wide}>
            <CardControl name={area} back={backArea} home={homeArea} expand={expandArea}/>
            <>
                { hasShortcuts() &&
                    <AreaSummaryLine device={devices[thisarea]} deviceState={ deviceStates[thisarea] } area={thisarea} colorLights={ getAreaColor() } />
                }
            
            {   getAreaAreas().map((anarea) => 
                <AreaLine device={devices[anarea]} deviceState={ deviceStates[anarea] }  area={ anarea } key={ anarea } selectArea={selectArea} ></AreaLine>
            )}
            { thisarea &&
                <AreaSummary    device={devices[thisarea]} deviceState={deviceStates[thisarea]} showDetail={true} area={ thisarea } 
                                name={ devices[thisarea].friendlyName } shortcuts={deviceStates[thisarea].shortcuts} 
                                selectArea={selectArea} noGrid={true} summaryLine={false} />
            }
            </>
        </GridItem>
    );
}
