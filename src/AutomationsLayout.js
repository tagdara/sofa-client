import React, { useState, useEffect, useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DeviceContext } from './DataContext/DeviceProvider';
import { NetworkContext } from './NetworkProvider';
import { UserContext } from './user/UserProvider';

import { makeStyles } from '@material-ui/styles';

import AutomationItem from './automation/automationItem';
import ScheduleItem from './automation/ScheduleItem';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import ScheduleIcon from '@material-ui/icons/Schedule';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import GridSection from './GridSection';

const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    }

});

export function AutomationsLayout(props) {

    const classes = useStyles();
    const { selectPage } = useContext(LayoutContext);
    const { directive } = useContext(DeviceContext);
    const { getJSON, postJSON } = useContext(NetworkContext);
    const { makeFavorite, isFavorite} = useContext(UserContext)

    const [automations, setAutomations] = useState({})
    const editing = false
    const [remove, setRemove] = useState(false)
    const [favorites, setFavorites] = useState(props.favorites)
    const [scheduled, setScheduled] = useState(false)

    const serverurl="https://"+window.location.hostname;
    
    useEffect(() => {
        getJSON('list/logic/automations')
            .then(result=>fixAutomations(result))

    }, [getJSON, serverurl]);
    
    function fixAutomations(autos) {
        var sections=['actions','schedules','triggers','conditions'] 
        
        for (var auto in autos) {
            for (var j = 0; j < sections.length; j++) {
                if (!autos[auto].hasOwnProperty(sections[j])) {
                    console.log('warning', auto, 'does not have a',sections[j],'entry')    
                    autos[auto][sections[j]]=[]
                }
            }
        }
        setAutomations(autos)
    }
    
    function selectAutomation(automation) {
        selectPage('AutomationLayout', {'name':automation, 'noBottom':true } )
    }    
    
    
    function deleteAutomation(automationName) {

        console.log('Deleting',automationName,automations)
        delete automations[automationName]
        
        postJSON('del/logic/automation/'+automationName, [])
            .then(setAutomations(automations));
    } 
        
    function runAutomation(name) {
        directive('logic:activity:'+name, 'SceneController', 'Activate')
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

    return (    
        <React.Fragment>
            <GridSection scroll={true} name={"Automations"} secondary={
                <>
                    <IconButton onClick={ () => newAutomation() } className={classes.button }>
                        <AddIcon fontSize="small" />
                    </IconButton>
                        { Object.keys(automations).length>0 &&
                        <IconButton onClick={ () => { setRemove(!remove); }} className={classes.button }>
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        }
                    <IconButton onClick={ () => toggleScheduled() } className={classes.button }>
                        <ScheduleIcon fontSize="small" />
                    </IconButton>
                    <Button onClick={ () => toggleFavorites() }>ALL</Button>
                </> }
            >
            { Object.keys(automations).sort().map(automation => 
                ( (isFavorite('logic:activity:'+automation) || !favorites) &&
                    <React.Fragment key={ automation+'-reg' }>
                        { (scheduled && automations[automation].schedules.length>0 ) &&
                            <ScheduleItem name={automation} automation={ automations[automation] } select={selectAutomation} run={runAutomation} />
                        }
                        { !scheduled &&
                            <AutomationItem favorite={isFavorite('logic:activity:'+automation)} makeFavorite={makeFavorite} name={automation} deleting={remove} automation={ automations[automation] } select={selectAutomation} edit={editing} delete={deleteAutomation} run={runAutomation} />
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

