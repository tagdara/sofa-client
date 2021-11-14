import React, { useState } from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import CardLine from 'components/CardLine';
import CardLineTitle from 'components/CardLineTitle';

import AutomationAll from 'automation/AutomationAll';
import AutomationItem from 'automation/AutomationItem';

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

    if (!favorites) { return <AutomationAll /> }

    return (    
            <>
                <CardLine>
                    <CardLineTitle title={"Favorites"} />
                </CardLine>
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
            </>
    )
}

export default AutomationsFavorites;