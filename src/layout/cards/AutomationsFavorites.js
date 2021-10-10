import React, { useContext, useState } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { LayoutContext } from 'layout/LayoutProvider';
import { UserContext } from 'user/UserProvider';
import AutomationAll from 'automation/AutomationAll';
import AutomationItem from 'automation/AutomationItem';
import GridSection from 'components/GridSection';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AutomationsFavorites = props => {

    const { applyBackPage, applyLayoutCard } = useContext(LayoutContext);
    const { getFavorites } = useContext(UserContext);
    const [ showResult, setShowResult] = useState(false)
    const [ resultMessage, setResultMessage] = useState('')
    const [ severity, setSeverity] = useState('info')

    function selectAutomation(automation) {
        applyBackPage('SystemLayout',{})
        applyLayoutCard('AutomationLayout', {'name':automation, 'noBottom':true } )
    }    
    
    function handleClose() {
        setShowResult(false)
    }

    function showResultSnackbar(message, severity) {
        setResultMessage(message); 
        setSeverity(severity)
        setShowResult(true);         
    }

    const favorites = getFavorites()

    return (    
            <GridSection name={"Automations"}>
            { favorites.map(endpointId => 
                <AutomationItem small={true} endpointId={endpointId} key={endpointId}
                                favorite={true} allowEdit={false} 
                                launcher={true} icon={"base"}
                                select={selectAutomation}
                                showResult={showResultSnackbar}
                />
            )}
            <AutomationAll />
            <Snackbar   anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}} 
                        open={showResult} autoHideDuration={6000} 
                        onClose={handleClose}
                    >
                <Alert severity={severity}>{resultMessage}</Alert>
            </Snackbar>

            </GridSection>
    )
}

export default AutomationsFavorites;