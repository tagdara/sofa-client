import React, {useContext, useState, useEffect, createContext} from 'react';
import { NetworkContext } from '../NetworkProvider';

export const LayoutContext = createContext({});

export const LayoutProvider = (props) => {

    const { getJSON, loggedIn, connectError } = useContext(NetworkContext);
    const [layouts, setLayouts] = useState(undefined);     
    const [layout, setLayout] = useState(getLayoutCookie()); 
    const [returnPage, setReturnPage] = useState({"name":"", "props":{}})
    const [backPage, setBackPage] = useState({"name":"", "props":{}})
    const mobileBreakpoint = 800
    const isMobile = window.innerWidth <= mobileBreakpoint;
    const [masterButtonState, setMasterButtonState] = useState('System')
    
    const oldlayout={"name":"Home", "props":{}, "data":{}, "page":""}

    useEffect(() => {
      	getJSON('layout')
            .then(result=> { setLayouts(result) } );
    }, [])
            
    useEffect(() => {   
        
        if (layouts!==undefined) {
            if (layouts.hasOwnProperty('error')) {
                console.log('Error getting layout', layouts)
                setLayout(undefined)
                return
            }
            if (isMobile) {
                if (layouts['Home'].hasOwnProperty('mobile')) {
                    setMasterButtonState('Home')
                    return
                }
            }
            var newLayout={"name":"Home", "props":{}, "data":layouts["Home"] }
            setLayout(newLayout )
            writeLayoutCookie(newLayout)
            return
        }
        return
    },[layouts, isMobile]);
    
    function goHome() {
        var newLayout={"name":'Home', "props":{}, "data":layouts['Home'], "page":layouts['Home']['order'][0]}
        setLayout(newLayout)
        setLayout(newLayout )
        writeLayoutCookie(newLayout)
        if (isMobile) {
            if (layouts['Home'].hasOwnProperty('mobile')) {
                applyLayoutCard(layouts['Home']['mobile']) 
            }
        }
        setMasterButtonState('System')
    }
    
    function applyLayout(name, newProps={}) {
        if (name!=='Home') {
            setMasterButtonState('Home')
        } else {
            setMasterButtonState('System')
        }
        var newLayout={"name":name, "props":newProps, "data":layouts[name], "page":layout.page}
        setLayout(newLayout)
        writeLayoutCookie(newLayout)
    }

    function applyLayoutCard(name, newProps={}) {
        setMasterButtonState('Home')
        var newLayout={"name":name, "props":newProps, "data":{ type: "single" }, "page":layout.page}
        setLayout(newLayout)
        writeLayoutCookie(newLayout)
    }
    
    function applyReturnPage(returnName, returnProps={}) {
        setReturnPage({"name":returnName, "props":returnProps})
    }

    function applyBackPage(backName, backProps={}) {
        setBackPage({"name":backName, "props":backProps})
    }
    
    function goBack() {
        applyLayoutCard(backPage.name, backPage.props)
        applyBackPage("", {})
    }
    
    function applyLayoutPage(newPage) {
        var newLayout={"name":layout.name, "props":layout.props, "data":layout.data, "page":newPage}
        setLayout({"name":layout.name, "props":layout.props, "data":layout.data, "page":newPage})
        writeLayoutCookie(newLayout)
    }

    function applyHomePage(newPage) {
        setMasterButtonState('Home')
        var newLayout={"name":"Home", "props":layout.props, "data":layouts['Home'], "page":newPage}
        setLayout(newLayout)
        writeLayoutCookie(newLayout)
    }
    
    function getLayoutCookie() {
        var name = "layout=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return JSON.parse(c.substring(name.length, c.length));
            }
        }
        return {"name":"Home", "props":{}, "data":{}, "page":""}
    }    
    
    function writeLayoutCookie (value) {
        var date = new Date();
        // Default at 365 days.
        var days = 1;
        // Get unix milliseconds at current time plus number of days
        date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000
        window.document.cookie = "layout=" + JSON.stringify(value) + "; expires=" + date.toGMTString() + "; path=/";
        return value;
    };


    return (
        <LayoutContext.Provider
            value={{
                layouts: layouts,
                layout: layout,
                backPage: backPage,
                returnPage: returnPage,
                applyLayout: applyLayout,
                applyLayoutCard: applyLayoutCard,
                applyLayoutPage: applyLayoutPage,
                applyHomePage: applyHomePage,
                applyReturnPage: applyReturnPage,
                applyBackPage: applyBackPage,
                goBack: goBack,
                goHome: goHome,
                isMobile: isMobile,
                setMasterButtonState: setMasterButtonState,
                masterButtonState: masterButtonState,
            }}
        >
            {props.children}
        </LayoutContext.Provider>
    );
}
