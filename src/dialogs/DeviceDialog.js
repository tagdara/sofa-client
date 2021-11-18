import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { directives } from 'store/directive'
import { filteredEndpointIdsByDisplayCategory, sortByName } from 'store/deviceHelpers';
import List from '@mui/material/List';

import DeviceSelectSearch from 'deviceSelect/DeviceSelectSearch';
import Device from 'deviceSelect/Device';
import CompositeDevice from 'devices/CompositeDevice';

//import { Scrollbars } from 'react-custom-scrollbars';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles({
    xscroller: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        padding: 0,
        borderRadius: 4,
        boxSizing: "border-box",
        overflow: "hidden",
        justifyContent: "flex-start",   
    },
    scroller: {
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxSizing: "border-box",
        width: "100%",
    },
    holder: {
        display: "flex",
        flexFlow: "wrap",
    },
    searchtitle: {
        display: "flex",
    },
    scrollHolder: {
        display: "flex",
        flex:3,
        boxSizing: "border-box",
        //padding: "0px 20px",
        paddingBottom: 0,
        marginBottom: 0,
        overflowY: "auto",
        overflowX: "hidden",
        //marginLeft: "calc(100vw - 20px - 100%)",
        alignContent: "flex-start",
        flexDirection: "column",
        //backgroundColor: theme.palette.layer.body,
    },
    scrollContent: {
        display: "flex",
    }
});

const DeviceDialog = props => {

    const theme = useTheme();
    const classes = useStyles();

    const [nameFilter, setNameFilter] = useState('')
    const [showDevice, setShowDevice] = useState(null)
    //const [ category, setCategory ] = useState(undefined)
    const category = undefined

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const endpointIds = filteredEndpointIdsByDisplayCategory(category,nameFilter)
    const sortedEndpointIds = sortByName(endpointIds)

    function closeDevice() {
        setShowDevice(null)
    }
    
    function select(selectedEndpointId) {
        if (props.select) {
            props.select(selectedEndpointId)
            props.close()
        } else {
            setShowDevice(selectedEndpointId)
        }
    }

    return (
        <Dialog open={props.open} close={props.close} fullScreen={fullScreen} fullWidth maxWidth={'md'} >
            <DialogTitle>
                <DeviceSelectSearch searchValue={nameFilter} setSearchValue={setNameFilter} />
            </DialogTitle>
            <DialogContent className={classes.scroller}>
                    <List>
                        { sortedEndpointIds.map( endpointId =>
                            <Device key={ 'select'+endpointId } endpointId={endpointId} small={true} 
                                    select={select} 
                                    showDevice={setShowDevice} />
                        )}
                    { showDevice && 
                        <CompositeDevice endpointId={showDevice} close={closeDevice} directives={directives} />
                    }
                    </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.close}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )

};

export default DeviceDialog;