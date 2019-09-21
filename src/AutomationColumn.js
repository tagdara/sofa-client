import React, { useState, useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';

import AutomationAction from "./automation/automationAction"
import AutomationCondition from "./automation/automationCondition"
import AutomationTrigger from "./automation/automationTrigger"
import AutomationSchedule from "./automation/automationSchedule"

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

import GridSection from './GridSection';
import ErrorBoundary from './ErrorBoundary'

const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    }

});

export default function AutomationColumn(props) {

    const classes = useStyles();
    const { isMobile } = useContext(LayoutContext);
    const { deviceByEndpointId, controllerProperties, directives } = useContext(DataContext);

    const [reorder, setReorder] = useState(false)
    const [remove, setRemove] = useState(false)
    const eventSources={ 'DoorbellEventSource': { "doorbellPress": {} }}
    const modmap={'Triggers':AutomationTrigger, 'Conditions':AutomationCondition, 'Actions':AutomationAction, 'Schedules':AutomationSchedule}
    const AutomationProperty = modmap[props.name]
    
    function getControllerProperties(item) {
        try {
            if (item.hasOwnProperty('propertyName')) {
                if (controllerProperties[item.controller].hasOwnProperty(item.propertyName)) {
                    item.type="property"
                    return controllerProperties[item.controller][item.propertyName]
                } else if (eventSources.hasOwnProperty(item.propertyName)) {
                    item.type="event"
                    return eventSources[item.propertyName]
                }
            }
        }
        catch(err) {
            console.log('Error getting properties for',item)
            return {'error': 'Invalid property: '+item.controller+"/"+item.propertyName}
        }
        return {}
    }    

    function deleteItem(index) {
        console.log('deleting item',index,'from',props.name)
        var newitems=[...props.items]
        newitems.splice(index, 1);
        props.save(props.itemtype,newitems)
    }

    function save(index, item) {
        var newitems=[...props.items]
        newitems[index]=item
        props.save(props.itemtype, newitems)
        //console.log('Column value',props.itemtype,'is now:',newitems)
    }
    
    function moveUp(index) {
        if (index-1>=0) {
            var newitems=[...props.items]
            var element = newitems[index];
            newitems.splice(index, 1);
            newitems.splice(index-1, 0, element);
            props.save(props.itemtype, newitems)
        }
    }

    function moveDown(index) {
        if (index+1<=props.items.length) {
            var newitems=[...props.items]
            var element = newitems[index];
            newitems.splice(index, 1);
            newitems.splice(index+1, 0, element);
            props.save(props.itemtype, newitems)
        }
    }
    
    function shortTimeFormat(thisdate) {
        var longdate=new Date().toISOString().replace('Z','')
        
        if (thisdate) {
            longdate=thisdate
        }

        if (longdate.split(':').length>2) {
            longdate=longdate.split(':')[0]+":"+longdate.split(':')[1]
        }

        return longdate
    }

    function addItem() {
        var newItem={}
        if (props.itemtype==='schedule') {
            newItem={'type':'interval', 'interval':1, 'unit':'days', 'start':shortTimeFormat()}
            props.save(props.itemtype,[...props.items, newItem])
        } else if (props.itemtype==='action') {
            newItem={
                "type": "command",
                "endpointId": undefined,
                "controller": undefined,
                "command": undefined,
                "deviceName": undefined
            }
            props.save(props.itemtype,[...props.items, newItem])
        } else if (props.itemtype==='condition') {
            newItem={
                "type": "property",
                "endpointId": undefined,
                "value": undefined,
                "propertyName": undefined,
                "controller": undefined,
                "deviceName": undefined
            }
            props.save(props.itemtype,[...props.items, newItem])
        } else if (props.itemtype==='trigger') {
            newItem={
                "type": "property",
                "endpointId": undefined,
                "value": undefined,
                "propertyName": undefined,
                "controller": undefined,
                "deviceName": undefined
            }
            props.save(props.itemtype,[...props.items, newItem])
        }
    }

    return (    

            <GridSection name={props.name} secondary={ <>
                <IconButton onClick={ () => addItem() } className={classes.button }>
                    <AddIcon fontSize="small" />
                </IconButton>
                { Object.keys(props.items).length>0 &&
                <IconButton onClick={ () => { setRemove(!remove); setReorder(false); }} className={classes.button }>
                    <RemoveIcon fontSize="small" />
                </IconButton>
                }
                { (props.itemtype!=='trigger' && Object.keys(props.items).length>1) &&
                <IconButton onClick={ () => { setRemove(false); setReorder(!reorder) }} className={classes.button }>
                    <UnfoldMoreIcon fontSize="small" />
                </IconButton>
                }
                </>
            } >

            { Object.keys(props.items).length>0 &&
                <React.Fragment>
                    { props.items.map((item,index) =>
                        <ErrorBoundary key={props.itemtype+index} >
                        { props.itemtype==='schedule' ?
                            <AutomationProperty key={props.itemtype+index} save={save} remove={remove} delete={deleteItem} index={index} item={item} />
                        :
                            <AutomationProperty moveUp={moveUp} moveDown={moveDown} save={save} remove={remove} reorder={reorder} delete={deleteItem} 
                                index={index} item={item} device={ item.endpointId===undefined ? undefined : deviceByEndpointId(item.endpointId) } directives={directives} controllerProperties={ getControllerProperties(item)} wide={isMobile} 
                                />
                        }
                        </ErrorBoundary>
                    )}
                </React.Fragment>
            }
            </GridSection>
    )
};