import React, { useContext, useState } from 'react';
import { DataContext } from './DataContext/DataProvider';
import { LayoutContext } from './layout/NewLayoutProvider';

import AreaLine from './AreaLine';
import AreaSummaryLine from './AreaSummaryLine';
import AreaSummary from './AreaSummary';
import GridItem from './GridItem';
import CardControl from './CardControl';

export default function AreaHero(props) {

    const { setArea, deviceStatesByCategory, deviceStateByEndpointId, area } = useContext(DataContext);
    const { applyLayoutCard } = useContext(LayoutContext);
    const thisarea = deviceStateByEndpointId('logic:area:'+area)
    const allAreas = deviceStatesByCategory('AREA')
    const [ previousArea, setPreviousArea]=useState('All')

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

        var children=thisarea.AreaController.children.value
        if (children) {
            for (var i = 0; i < children.length; i++) {
                var child=deviceStateByEndpointId(children[i])
                if (child && child.displayCategories.includes('AREA')) {
                    areas.push(child)
                }
            }
        }
        return areas
    }
    
    function hasShortcuts() {
        try {
            if (thisarea.AreaController.shortcuts.value.length>0) {
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


    return (
            <GridItem wide={props.wide}>
                <CardControl name={area} back={backArea} home={homeArea} expand={expandArea}/>
                <>
                    { hasShortcuts() &&
                        <AreaSummaryLine area={thisarea} />
                    }
                
                {   getAreaAreas().map((anarea) => 
                    <AreaLine area={ anarea } key={ anarea.endpointId } selectArea={selectArea} ></AreaLine>
                )}
                { thisarea &&
                    <AreaSummary showDetail={true} area={ thisarea } name={ thisarea.friendlyName } shortcuts={thisarea.shortcuts} selectArea={selectArea} noGrid={true} summaryLine={false} />
                }
                </>
            </GridItem>
    );
}
