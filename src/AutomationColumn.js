import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AutomationAction from "./automation/automationAction"
import AutomationCondition from "./automation/automationCondition"
import AutomationTrigger from "./automation/automationTrigger"
import AutomationSchedule from "./automation/automationSchedule"
import AutomationItemBase from "./automation/AutomationItemBase"

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

import GridItem from './GridItem';
import GridPage from './GridPage';
import GridBreak from './GridBreak';
import PlaceholderCard from './PlaceholderCard';
import ErrorBoundary from './ErrorBoundary'

const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    }

});

function cardLoading(props) {
    
    if (props.error) {
        console.log(props)
        return null;
    } else if (props.pastDelay) {
        return <PlaceholderCard />;
    } else {
        return null;
    }
}

function AutomationColumn(props) {

    const classes = useStyles();
    const [actions, setActions] = useState([])
    const [edit, setEdit] = useState(false)
    const [reorder, setReorder] = useState(false)
    const [remove, setRemove] = useState(false)
    const [module, setModule] = useState(null)
    const eventSources={ 'DoorbellEventSource': { "doorbellPress": {} }}
    const modmap={'Triggers':AutomationTrigger, 'Conditions':AutomationCondition, 'Actions':AutomationAction, 'Schedules':AutomationSchedule}
    const AutomationProperty = modmap[props.name]
    
    function getControllerProperties(item) {
        try {
            if (item.hasOwnProperty('propertyName')) {
                if (props.controllerProperties[item.controller].hasOwnProperty(item.propertyName)) {
                    item.type="property"
                    return props.controllerProperties[item.controller][item.propertyName]
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
    
    function getActionValues(controller, command) {

        return props.directives[controller][command]
    }

    function getActionValue(controller, command) {

        var payload=props.directives[controller][command]
        for (var prop in payload) {
            if (payload[prop].hasOwnProperty('value')) {
                return prop
            }
        } 
        return ''
    }
    
    function deleteItem(index) {
        console.log('deleting item',index,'from',props.name)
        var newitems=[...props.items]
        newitems.splice(index, 1);
        props.save(props.itemtype,newitems)
    }

    function save(index, item) {
        console.log
        var newitems=[...props.items]
        newitems[index]=item
        props.save(props.itemtype, newitems)
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
        if (thisdate) {
            var longdate=thisdate
        } else {
            var longdate=new Date().toISOString().replace('Z','')
        }

        if (longdate.split(':').length>2) {
            longdate=longdate.split(':')[0]+":"+longdate.split(':')[1]
        }

        return longdate
    }

    function addItem() {
        if (props.itemtype=='schedule') {
            addInPlace()
        } else {
            setRemove(false); 
            setReorder(false) 
            props.applyReturnPage("AutomationLayout", {'name': props.automationName, 'type':props.itemtype })
            props.applyBackPage("AutomationLayout",{'name': props.automationName })
            props.applyLayoutCard(props.selector)
        }
    }
    
    function addInPlace() {
        var newItem={'type':'interval', 'interval':1, 'unit':'days', 'start':shortTimeFormat()}
        setRemove(false); 
        setReorder(false)
        props.save(props.itemtype,[...props.items, newItem])
    }   
    
    const mobileBreakpoint = 800
    const isMobile = window.innerWidth <= mobileBreakpoint;
    
    return (    
        <GridPage wide={true} >
            <GridBreak label={props.name} size="h6" >
                { props.saved &&
                    <IconButton onClick={ () => addItem() } className={classes.button }>
                        <AddIcon fontSize="small" />
                    </IconButton>
                }
                { Object.keys(props.items).length>0 &&
                <IconButton onClick={ () => { setRemove(!remove); setReorder(false); }} className={classes.button }>
                    <RemoveIcon fontSize="small" />
                </IconButton>
                }
                { (props.itemtype!='trigger' && Object.keys(props.items).length>1) &&
                <IconButton onClick={ () => { setRemove(false); setReorder(!reorder) }} className={classes.button }>
                    <UnfoldMoreIcon fontSize="small" />
                </IconButton>
                }
            </GridBreak>
            { Object.keys(props.items).length>0 ?
                <React.Fragment>
                    { props.items.map((item,index) =>
                        <ErrorBoundary key={props.itemtype+index} >
                        { props.itemtype=='schedule' ?
                            <AutomationProperty key={props.itemtype+index} save={save} remove={remove} delete={deleteItem} 
                                index={index} item={item} />
                        
                        :
                            <AutomationProperty moveUp={moveUp} moveDown={moveDown} save={save} remove={remove} reorder={reorder} delete={deleteItem} 
                                index={index} item={item} device={ props.deviceByEndpointId(item.endpointId) } name={props.deviceByEndpointId(item.endpointId).friendlyName} 
                                directives={props.directives} controllerProperties={ getControllerProperties(item)} wide={isMobile} 
                                />
                        }
                        </ErrorBoundary>
                    )}
                </React.Fragment>
                :
                <GridItem elevation={0} wide={true}>
                    <ListItem>
                        <ListItemText primary={"There are no "+props.name+" defined."} />
                    </ListItem>
                </GridItem>
            }
        </GridPage>
    )

};

export default withData(withLayout(AutomationColumn));