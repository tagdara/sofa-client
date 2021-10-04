import React, { useState, useEffect, useContext } from 'react';
import { LayoutContext } from 'layout/LayoutProvider';
import { DataContext } from 'DataContext/DataProvider';
import { NetworkContext } from 'network/NetworkProvider';
import { UserContext } from './user/UserProvider';

import AutomationItem from './automation/automationItem';
import ScheduleItem from './automation/ScheduleItem';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import ScheduleIcon from '@material-ui/icons/Schedule';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import GridSection from 'components/GridSection';


export function AutomationsLayout(props) {

    const { selectPage } = useContext(LayoutContext);
    const { directive, deviceState, getEndpointIdsByCategory, unregisterDevices } = useContext(DataContext);
    const { getJSON, postJSON } = useContext(NetworkContext);
    const { makeFavorite, isFavorite} = useContext(UserContext)
    const [ automations, setAutomations ] = useState([])
    const editing = false
    const [remove, setRemove] = useState(false)
    const [favorites, setFavorites] = useState(props.favorites)
    const [scheduled, setScheduled] = useState(false)

    useEffect(() => {
        getEndpointIdsByCategory('ACTIVITY_TRIGGER','AutomationsLayout')
        return function cleanup() {
            unregisterDevices('AutomationsLayout');
        };
    // eslint-disable-next-line 
    }, [ ] )

    useEffect(() => {
        getJSON('list/logic/automations')
            .then(result=>fixAutomations(result))
    // eslint-disable-next-line 
    }, []);
    
    function fixAutomations(autos) {

        var sections=['actions','schedules','triggers','conditions'] 
        
        //for (var auto in autos) {
        for (var i = 0; i < autos.length; i++) {
            for (var j = 0; j < sections.length; j++) {
                if (!autos[i].hasOwnProperty(sections[j])) {
                    console.log('warning', autos[i], 'does not have a',sections[j],'entry')    
                    autos[i][sections[j]]=[]
                }
            }
        }
        setAutomations(autos)
    }
    
    function selectAutomation(automation) {
        console.log('endpointId',automation)
        selectPage('AutomationLayout', {'endpointId':automation, 'noBottom':true } )
    }    
    
    
    function deleteAutomation(endpointId) {

        var automationName=undefined
        console.log('Deleting', endpointId)
        // TODO/CHEESE - Automations are listed by name, but the delete command now uses endpoint ids
        // This all needs to be sorted out
        for (var auto in automations) {
            if (automations[auto].endpointId===endpointId) {
                automationName=auto
                break
            }
        }

        if (automationName) {
            delete automations[automationName]
            postJSON('del/logic/automation/'+endpointId, [])
                .then(setAutomations(automations));
        } else {
            console.log('did not find', endpointId, 'in',automations)
        }
    } 
        
    function runAutomation(endpointId) {
        directive(endpointId, 'SceneController', 'Activate').then(result=> { console.log('result of run', result)})
        return true
    }

    function newAutomation() {
        selectPage('AutomationLayout', {'noBottom':true})        
    }

    function toggleFavorites() {
        setFavorites(!favorites)
    }

    function toggleScheduled() {
        setScheduled(!scheduled)
        if (!scheduled) {
            setFavorites(false)
        }
    }

    //console.log('automations', automations)

    return (    
        <React.Fragment>
            <GridSection scroll={true} name={"Automations"} secondary={
                <>
                    <IconButton onClick={ () => newAutomation() } >
                        <AddIcon fontSize="small" />
                    </IconButton>
                        { Object.keys(automations).length>0 &&
                        <IconButton color={ remove ? "primary" : "inherit" } onClick={ () => { setRemove(!remove); }} >
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        }
                    <IconButton onClick={ () => toggleScheduled() } >
                        <ScheduleIcon color={ scheduled ? "primary" : "inherit" } fontSize="small" />
                    </IconButton>
                    <Button color={ !favorites ? "primary" : "inherit" } onClick={ () => toggleFavorites() }>ALL</Button>
                </> }
            >
            { automations.map(automation => 
                ( (isFavorite(automation.endpointId) || !favorites) &&
                    <React.Fragment key={ automation.id_code+'-reg' }>
                        { (scheduled && automation.schedules.length>0 ) &&
                            <ScheduleItem name={automation.name} automation={ automation } endpointId={ automation.endpointId}
                                            select={selectAutomation} run={runAutomation} />
                        }
                        { !scheduled &&
                            <AutomationItem favorite={isFavorite(automation.endpointId)} endpointId={automation.endpointId} id_code={ automation.id_code } name={automation.name}
                                            automation={ automation } deviceState={ deviceState(automation.endpointId) }
                                            makeFavorite={makeFavorite} deleting={remove} select={selectAutomation} edit={editing} delete={deleteAutomation} run={runAutomation} />
                        }
                    </React.Fragment>
                )
            )}
            </GridSection>
        </React.Fragment>
    )
};

AutomationsLayout.defaultProps = {
    favorites: false,
}

export default React.memo(AutomationsLayout);

