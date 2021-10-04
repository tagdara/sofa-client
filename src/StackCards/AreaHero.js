import React, { useEffect, useContext, useState } from 'react';
import { DataContext } from 'DataContext/DataProvider';
import { LayoutContext } from 'layout/LayoutProvider';

import AreaLine from 'devices/Area/AreaLine';
import AreaSummaryLine from 'devices/Area/AreaSummaryLine';
import AreaSummary from 'devices/Area/AreaSummary';
import CardBase from 'components/CardBase';
import CardControl from 'components/CardControl';
import PlaceholderCard from 'layout/PlaceholderCard';


export default function AreaHero(props) {

    const { cardReady, devices, deviceState, getEndpointIdsByCategory, unregisterDevices, setArea, area } = useContext(DataContext);
    const { selectPage } = useContext(LayoutContext);
    const thisarea = 'logic:area:'+area
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
        //selectPage('AreaLayout',{"name": name})
    }
    
    function getAreaAreas() {

        var areas=[]
        if (area==='All') { 
            return allAreas
        }
        if (!area || thisarea===undefined) { return [] }
        try {
            var children=deviceState(thisarea).AreaController.children.value
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
            return []
        }
        if (!area || thisarea===undefined) { return [] }

        var children=deviceState(thisarea).AreaController.children.value
        if (children) {
            
            for (var i = 0; i < children.length; i++) {
                
                var child=deviceState(children[i])
                if (child && devices[children[i]].displayCategories.includes('LIGHT')) {
                    if (child.hasOwnProperty('ColorController')) {
                        
                        colorLights[children[i]]=deviceState(children[i])
                    }
                }
            }
        }

        return colorLights
    }

    
    function hasShortcuts() {
        
        try {
            if (deviceState(thisarea).AreaController.shortcuts.value.length>0) {
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
        selectPage('AreaLayout',{"name": areaname})
    }
    
    if (!cardReady('AreaHero')) {
        return <PlaceholderCard count={ 6 } />
    }

    return (
        <CardBase>
            <CardControl name={area} back={backArea} home={homeArea} expand={expandArea}/>
            <>
                { hasShortcuts() &&
                    <AreaSummaryLine device={devices[thisarea]} deviceState={ deviceState(thisarea) } area={thisarea} colorLights={ getAreaColor() } />
                }
            
            {   getAreaAreas().map((anarea) => 
                <AreaLine device={devices[anarea]} deviceState={ deviceState(anarea) }  area={ anarea } key={ anarea } selectArea={selectArea} ></AreaLine>
            )}
            { thisarea &&
                <AreaSummary    device={devices[thisarea]} deviceState={deviceState(thisarea)} showDetail={true} area={ thisarea } 
                                name={ devices[thisarea].friendlyName } shortcuts={deviceState(thisarea).shortcuts} 
                                selectArea={selectArea} noGrid={true} summaryLine={false} />
            }
            </>
        </CardBase>
    );
}
