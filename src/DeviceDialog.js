import React, { useState,useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { DeviceContext } from './DataContext/DeviceProvider';
import { useInfiniteScroll } from "react-infinite-scroll-hook"

import GridSearch from './GridSearch';
import GridItem from './GridItem';

import Device from './deviceSelect/Device';
import CompositeDevice from './CompositeDevice';

import SofaDialog from "./dialogs/SofaDialog";
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles({

    scroller: {
        overflowY: "auto",
    },
    holder: {
        display: "flex",
        flexFlow: "wrap",
    },
    searchtitle: {
        display: "flex",
    }
});

export default function DeviceDialog(props) {

    const { devicesByCategory, controllers, directives } = useContext(DeviceContext);
    const classes = useStyles();

    const [mode] = useState('all');
    const [limit, setLimit] = useState(50);
    const [nameFilter, setNameFilter] = useState('')
    const [showDevice, setShowDevice] = useState(null)
    const [loading, setLoading] = useState(false);
    const devs=devicesByCategory('ALL', nameFilter)
    //useEffect(() => {
    //    function handleScroll() {
    //        //var lastDiv = document.querySelector("#scroll-content > div:last-child");
    //        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    //        console.log('Fetch more devices', limit, limit+24);
    //        setLimit(limit+24)
    //    }   
    //    console.log('adding scroll handler')
    //    window.addEventListener('scroll', handleScroll, true);
    //    return () => window.removeEventListener('scroll', handleScroll);
    //}, []);

    function filterByType(devtype) {

        if (devtype==='all' || devtype==='') {
            var devs=devicesByCategory('ALL', nameFilter)
            //return devs
            return devs.slice(0, limit)
        }
        
        return devicesByCategory(devtype)
    }

    function executeDirective(iface, idir) {
        if (Object.keys(props.directives[iface][idir]).length===0) {
            props.device[iface].directive(idir)
        } else {
            console.log('directive requires parameters', props.directives[iface][idir])
        }
    }
    
    function closeDevice() {
        setShowDevice(null)
    }
    
    function handleLoadMore() {
        if (limit<devs.length) { 
            setLoading(true)
            setLimit(limit+50)
            setLoading(false)
        }
    }

    const infiniteRef = useInfiniteScroll({
        loading,
        hasNextPage: true,
        onLoadMore: handleLoadMore,
        scrollContainer: 'parent'
    });    
 
    return (
        <SofaDialog open={props.open} close={props.close} maxWidth={'lg'} >
            <GridItem wide={true} nopaper={true}>
                <GridSearch wide={true} searchValue={nameFilter} setSearchValue={setNameFilter} />
            </GridItem>
            <DialogContent className={classes.scroller}>
                <div ref={infiniteRef} className={classes.holder}>
                { filterByType('all').map((device) =>
                    <Device key={ device.endpointId } device={device} mode={mode} controllers={controllers} select={props.select ? props.select : executeDirective} directives={directives} showDevice={setShowDevice} />
                )}
                { showDevice && 
                    <CompositeDevice device={showDevice} close={closeDevice} directives={directives} />
                }
                </div>
            </DialogContent>
        </SofaDialog>
    )

};