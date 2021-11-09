import React, { Suspense, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { directives } from 'store/directive'

const useStyles = makeStyles({
        
    flex: {
        padding: "0px 4px",
        display: "flex",
        alignItems: "center",
    },
 
});

export default function PropertyValue(props) {
    
    const classes = useStyles();
    const [propMod, setPropMod] = useState(undefined)
    const [modName, setModName] = useState(undefined)

    useEffect(() => {

        function propertyFromDirective(controller, directive) {
            if (controller===undefined || directive===undefined) {
                return undefined
                }
                if (controller.includes('.')) {
                    controller = controller.split('.')[1]
                }
                if (directives.hasOwnProperty(controller) && directives[controller].hasOwnProperty(directive)) {
                    var actionValues = directives[controller][directive]
                    for (var av in actionValues) {
                        return av
                    }
                }
                return undefined
            }    

        try {
            var pfd=props.item.propertyName
            if (!props.item.hasOwnProperty('propertyName')) {
                pfd=propertyFromDirective(props.item.controller, props.item.command)
            }
            
            if (pfd!==modName) {
                setModName(pfd)
                setPropMod(loadPropMod(pfd))
            }
        }
        catch {
        }
    // eslint-disable-next-line
    }, [ props.item ])    
 
    function errorBlock(modulename) {
        return <Button disabled>{modulename ? modulename : "Error"}</Button>
    }
    
    function placeholder(modulename) {
        return <Button disabled>{modulename ? modulename : "Loading..."}</Button>
    }
    
    function loadPropMod(name) {
        let pmod=React.lazy(() => { 
                try { 
                    return import('../controllers/properties/'+name).catch(() => ({ default: () => errorBlock(name) }))
                }
                catch {
                    return <Button disabled>{name ? name : "Not available"}</Button>
                }
            })
        return pmod
    }

    function renderSuspenseModule( modulename ) {
        
        if (propMod!==undefined) {
            if (propMod===null) {
                return null
            }
            let Module=propMod
            return  <Suspense key={ modulename+props.index } fallback={ placeholder() }>
                        <Module index={props.index} item={props.item} interface={ props.interface } device={props.device} instance={props.item.instance} directive={props.directive} />
                    </Suspense>
        } else {
            return <Button disabled>Loading...</Button>
        }
    }

    return (
        (props.device!==undefined && modName!==undefined && props.item!==undefined && props.item.operator!=='Any') ?
            <Grid item xs={props.wide ? 12 : 4 } className={classes.flex} >
                <ListItem >
                { renderSuspenseModule(modName) }
                </ListItem>
            </Grid>
        :
        null
    )
}
