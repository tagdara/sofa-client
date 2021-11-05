import React, { useEffect } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SyncAltIcon from '@material-ui/icons/SyncAlt';

import GridSection from 'components/GridSection';
import GridItem from 'components/GridItem';
import ToggleAvatar from 'components/ToggleAvatar';

import useActivationStore from 'store/activationStore'


export default function ApiRegistration(props) {

    const activations = useActivationStore(state => state.activations)
    const refreshActivations = useActivationStore(state => state.refreshActivations)
    const removeActivation = useActivationStore(state => state.removeActivation)
    const approveActivation = useActivationStore(state => state.approveActivation)


    useEffect(() => {
        refreshActivations()
    // eslint-disable-next-line 
    }, []);
    
    function approveAndRefresh(command, name, short_key) {
        if (command==='remove') {
            removeActivation(name, short_key)
        } else {
            approveActivation(name, short_key)
        }

    }

    return (    
        <React.Fragment>
            {activations.hasOwnProperty('pending') &&
                <GridSection name={"Pending Keys"} >
                    { activations.pending.map(activation =>
                    <GridItem key={activation.name} onClick={ () => approveAndRefresh('approve', activation.name, activation.key) }>
                        <ListItem>
                            <ToggleAvatar avatarState={ 'open'} > 
                                <SyncAltIcon />
                            </ToggleAvatar>
                            <ListItemText primary={activation.name} secondary={activation.key} />
                        </ListItem>
                    </GridItem >
                    )}
                </GridSection>
            }
            { activations.hasOwnProperty('activated') &&
            <GridSection name={"Approved Keys"} >
                { activations.activated.map(activation =>
                <GridItem key={activation.name} onClick={ () => approveAndRefresh('remove',activation.name, activation.key) }>
                    <ListItem>
                        <ToggleAvatar avatarState={ 'closed'} > 
                            <SyncAltIcon />
                        </ToggleAvatar>
                        <ListItemText primary={activation.name} secondary={activation.key} />
                    </ListItem>
                </GridItem>
                )}
            </GridSection>
            }
        </React.Fragment>
    )
};
