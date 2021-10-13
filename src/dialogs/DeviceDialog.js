import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import DialogContent from '@material-ui/core/DialogContent';

import { DeviceContext } from 'context/DeviceContext';

import GridSearch from 'components/GridSearch';
import GridItem from 'components/GridItem';
import Device from 'deviceSelect/Device';
import CompositeDevice from 'devices/CompositeDevice';
import SofaDialog from "dialogs/SofaDialog";

import { useInfiniteScroll } from "react-infinite-scroll-hook"

const useStyles = makeStyles({

    scroller: {
        overflowY: "auto",
        position: "relative",
    },
    holder: {
        display: "flex",
        flexFlow: "wrap",
    },
    searchtitle: {
        display: "flex",
    },
});

const DeviceDialog = props => {

    const { devicesByCategory, controllers, directives } = useContext(DeviceContext);
    const classes = useStyles();

    const [mode] = useState('all');
    const [limit, setLimit] = useState(50);
    const [nameFilter, setNameFilter] = useState('')
    const [showDevice, setShowDevice] = useState(null)
    const [loading, setLoading] = useState(false);
    const devs=devicesByCategory('ALL', nameFilter)
    const [displayDevs, setDisplayDevs]=useState([])
    const hasNextPage = displayDevs.length!==devs.length
    
    useEffect(() => {
        var devs=devicesByCategory('ALL', nameFilter)
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
        console.log('handle it?')
        if (limit<devs.length) { 
            setLoading(true)
            setLimit(limit+50)
            setLoading(false)
        }
    }

    const infiniteRef = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: handleLoadMore,
        scrollContainer: 'parent'
    });    
 
    return (
        <SofaDialog open={props.open} close={props.close} maxWidth={'md'} >
            <GridItem wide={true} nopaper={true}>
                <GridSearch wide={true} searchValue={nameFilter} setSearchValue={setNameFilter} />
            </GridItem>
            <DialogContent className={classes.scroller}>
                <div ref={infiniteRef} className={classes.holder}>
                { displayDevs.map((device) =>
                    <Device key={ 'XX'+device.endpointId } small={true} device={device} mode={mode} 
                            controllers={controllers} select={props.select ? props.select : () => setShowDevice(device.endpointId)} 
                            directives={directives} showDevice={setShowDevice} />
                )}
                { showDevice && 
                    <CompositeDevice endpointId={showDevice} close={closeDevice} directives={directives} />
                }
                </div>
            </DialogContent>
        </SofaDialog>
    )

};

export default DeviceDialog;