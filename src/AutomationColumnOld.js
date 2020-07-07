import React, { useState, useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DeviceContext } from './DataContext/DeviceProvider';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';

import AutomationAction from "./automation/AutomationAction"
import AutomationCondition from "./automation/AutomationCondition"
import AutomationTrigger from "./automation/AutomationTrigger"
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
    const { deviceByEndpointId, getControllerProperties, controllerForProperty, directives } = useContext(DeviceContext);

    const [reorder, setReorder] = useState(false)
    const [remove, setRemove] = useState(false)
    const modmap={'Triggers': AutomationTrigger , 'Conditions':AutomationCondition, 'Actions':AutomationAction, 'Schedules':AutomationSchedule}
    const AutomationProperty = React.memo(modmap[props.name])

    function deleteItem(index) {
        console.log('deleting item',index,'from',props.name)
        var newitems=[...props.items]
        newitems.splice(index, 1);
        props.save(props.itemtype,newitems)
    }

    function save(index, item) {
        console.log('saving',index,item)
        var newitems=[...props.items]
        newitems[index]=item
        props.save(props.itemtype, newitems)
    }
    
    function moveUp(index) {
        if (index-1>=0) {
            console.log('moving up item',index,props.items[index], props.items)
            var newitems=[...props.items]
            var element = newitems[index];
            newitems.splice(index, 1);
            newitems.splice(index-1, 0, element);
            console.log('moved up item', newitems[index-1], newitems)
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
    
    const headerButtons = <>
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

    return (    

            <GridSection name={props.name} secondary={ headerButtons } >

            { Object.keys(props.items).length>0 &&
                <React.Fragment>
                    { props.items.map((item,index) =>
                        <ErrorBoundary key={props.itemtype+index} >
                        { props.itemtype==='schedule' ?
                            <AutomationProperty key={item.endpointId+item.value} save={save} remove={remove} delete={deleteItem} index={index} item={item} wide={isMobile}/>
                        :
                            <AutomationProperty key={item.endpointId+item.value} moveUp={moveUp} moveDown={moveDown} save={save} remove={remove} reorder={reorder} 
                                delete={deleteItem} index={index} item={item} device={ item.endpointId===undefined ? undefined : deviceByEndpointId(item.endpointId) } 
                                controllerForProperty={controllerForProperty}
                                directives={directives} controllerProperties={ getControllerProperties(item.endpointId)} wide={isMobile} 
                                />
                        }
                        </ErrorBoundary>
                    )}
                </React.Fragment>
            }
            </GridSection>
    )
};