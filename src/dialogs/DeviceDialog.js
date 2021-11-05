import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { directives } from 'store/directive'
import { devicesByDisplayCategory } from 'store/deviceHelpers';
import List from '@material-ui/core/List';
import SearchIcon from '@material-ui/icons/Search';

import GridSearch from 'components/GridSearch';
import Device from 'deviceSelect/Device';
import CompositeDevice from 'devices/CompositeDevice';
import SofaDialog from "dialogs/SofaDialog";

import { Scrollbar } from 'react-scrollbars-custom';
import CircularProgress from '@material-ui/core/CircularProgress';

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

    const controllers = undefined // Couldn't figure out where this comes from
    const classes = useStyles();

    const [mode] = useState('all');
    const [limit, setLimit] = useState(50);
    const [nameFilter, setNameFilter] = useState('')
    const [showDevice, setShowDevice] = useState(null)
    const [loading, setLoading] = useState(false);
    const devs = devicesByDisplayCategory ('ALL', nameFilter)
    const [displayDevs, setDisplayDevs]=useState([])
    
    useEffect(() => {
        var devs = devicesByDisplayCategory ('ALL', nameFilter)
        setDisplayDevs(devs.slice(0, limit))
    // eslint-disable-next-line 
    }, [ limit, nameFilter ])

    //function filterByType(devtype) {

    //    if (devtype==='all' || devtype==='') {
    //        var devs=devicesByCategory('ALL', nameFilter)
            //return devs
    //        return devs.slice(0, limit)
    //    }
        
    //    return devicesByCategory(devtype)
    //}
    
    function closeDevice() {
        setShowDevice(null)
    }
    
    function handleLoadMore() {
        if ( limit < devs.length ) { 
            setLoading(true)
            setLimit(limit+50)
            setLoading(false)
        }
    }

    function handleScroll(e) {
        const bottom = e.scrollHeight - e.scrollTop === e.clientHeight;
        if (bottom) {
            handleLoadMore()
        }
    }

    return (
        <SofaDialog open={props.open} close={props.close} maxWidth={'md'} >
            <DialogTitle>
                <GridSearch small={true} wide={true} searchValue={nameFilter} setSearchValue={setNameFilter} startIcon={<SearchIcon />} />
            </DialogTitle>
            <DialogContent className={classes.scroller}>
                <Scrollbar  contentProps={{ style: {'display': 'flex', 'flexDirection': 'column'} }} className={classes.scrollContent} onScroll={ handleScroll } noScrollX translateContentSizeYToHolder >
                    <List>
                    { displayDevs.map((device) =>
                        <Device key={ 'XX'+device.endpointId } small={true} device={device} mode={mode} 
                                controllers={controllers} select={props.select ? props.select : () => setShowDevice(device.endpointId)} 
                                directives={directives} showDevice={setShowDevice} />
                    )}
                    { showDevice && 
                        <CompositeDevice endpointId={showDevice} close={closeDevice} directives={directives} />
                    }
                    { loading &&
                        <CircularProgress size={24} />
                    }
                    </List>
                </Scrollbar>
            </DialogContent>
        </SofaDialog>
    )

};

export default DeviceDialog;