import React, { Suspense, useState, useEffect, useContext } from 'react';
import { DeviceContext } from 'context/DeviceContext';

import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

export default function PropertyValue(props) {
    
    const { directives } = useContext(DeviceContext);
    const [propMod, setPropMod] = useState(undefined)
    const [modName, setModName] = useState(undefined)

    useEffect(() => {

        function propertyFromDirective(controller, directive) {
            if (controller===undefined || directive===undefined) {
                return undefined
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

    function renderCompactSuspenseModule( modulename ) {
        
        if (!modulename) { return null }
        
        if (propMod!==undefined) {
            if (propMod===null) {
                return null
            }
            let Module=propMod
            
            return  <Chip label=<Suspense key={ modulename } fallback={ placeholder() }>
                                    <Module compact={true} item={props.item} interface={ props.interface } device={props.device} instance={props.item.instance} directive={props.directive} />
                                </Suspense>
                    />
        } else {
            return <Button disabled>Loading...</Button>
        }
    }

    return renderCompactSuspenseModule(modName) 
}
