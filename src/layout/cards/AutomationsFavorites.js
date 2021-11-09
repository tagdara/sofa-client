import React, { useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import AutomationAll from 'automation/AutomationAll';
import AutomationItem from 'automation/AutomationItem';
import GridSection from 'components/GridSection';
import useUserStore from 'store/userStore'
import { selectPage } from 'store/layoutHelpers';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AutomationsFavorites = props => {

    const favorites = useUserStore(state => state.preferences.favorites )
    const [ showResult, setShowResult] = useState(false)
    const [ resultMessage, setResultMessage] = useState('')
    const [ severity, setSeverity] = useState('info')

    function selectAutomation(automation) {
        selectPage('AutomationLayout', {'name':automation, 'noBottom':true } )
    }    
    
    function handleClose() {
        setShowResult(false)
    }

    function showResultSnackbar(message, severity) {
        setResultMessage(message); 
        setSeverity(severity)
        setShowResult(true);         
    }

    return (    
            <GridSection name={"Favorites"}>
            { favorites &&
                <>
                    { favorites.map(endpointId => 
                        <AutomationItem small={true} endpointId={endpointId} key={endpointId}
                                        favorite={true} allowEdit={false} 
                                        launcher={true} icon={"base"}
                                        select={selectAutomation}
                                        showResult={showResultSnackbar}
                        />
                    )}
                </>
            }
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