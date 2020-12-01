import React, { useContext, useState} from 'react';

import { DeviceContext } from './DataContext/DeviceProvider';
import { LayoutContext } from './layout/NewLayoutProvider';
import { UserContext } from './user/UserProvider';
import AutomationAll from './automation/AutomationAll';
import AutomationItem from './automation/automationItem';
import GridSection from './GridSection';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AutomationsFavorites(props) {

    const { applyBackPage, applyLayoutCard } = useContext(LayoutContext);
    const { directive, deviceByEndpointId } = useContext(DeviceContext);
    const { favorites } = useContext(UserContext);
    const [ launched, setLaunched] = useState('')
    const [ showResult, setShowResult]=useState(false)
    const [ resultMessage, setResultMessage]=useState('')
    const [ severity, setSeverity]=useState('info')
    
    function checkLaunch(response) {
        console.log('response',response)
        //if response.hasOwnPropety
        setTimeout(function() {
            setLaunched("")
        }, 500)
    }

    function runAutomation(endpointId, conditions=true) {
        setLaunched(endpointId)
        directive(endpointId, 'SceneController', 'Activate', {}, {"conditions": conditions})
            .then(result=> { parseResult(result) })
    }
    
    function parseResult(result) {
        try {
            if (result.event.header.name==='ErrorResponse') {
                setResultMessage(result.event.payload.message); 
                setSeverity('error')
                setShowResult(true); 
            }
            if (result.event.header.name==='ActivationStarted') {
                setResultMessage('Activation started'); 
                setSeverity('success')
                setShowResult(true); 
            }
        }
        catch {}
        checkLaunch(result)
    }

    function selectAutomation(automation) {
        applyBackPage('SystemLayout',{})
        applyLayoutCard('AutomationLayout', {'name':automation, 'noBottom':true } )
    }    
    
    function makeFavorite(automation, stat) {
        // this is a stub we don't really want to change it from here
    }
    
    function handleClose() {
        setShowResult(false)
    }

    return (    
        favorites &&
            <GridSection name={"Automations"}>
            { favorites.map(automation => 
                <AutomationItem small={true}
                                launched={automation===launched} makeFavorite={makeFavorite} favorite={true} allowEdit={false} 
                                launcher={true} key={automation} icon={"base"} name={deviceByEndpointId(automation).friendlyName} 
                                automation={ null } run={runAutomation} select={selectAutomation} endpointId={automation}
                />
            )}
            <AutomationAll />
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}} open={showResult} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity={severity}>{resultMessage}</Alert>
            </Snackbar>

            </GridSection>
    )
};