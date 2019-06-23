import React, {useState, useEffect, createContext} from 'react';

export const LayoutContext = createContext();

export default function LayoutProvider(props) {

    const [layouts, setLayouts] = useState({});     
    const [layout, setLayout] = useState({"name":"Home", "props":{}, "data":{}, "page":""}); 
    const [returnPage, setReturnPage] = useState({"name":"", "props":{}})
    const [backPage, setBackPage] = useState({"name":"", "props":{}})
    const mobileBreakpoint = 800
    const isMobile = window.innerWidth <= mobileBreakpoint;
    const [masterButtonState, setMasterButtonState] = useState('System')

    useEffect(() => {
  	    fetch('/layout')
 		    .then(result=>result.json())
            .then(result=> {
                setLayouts(result);
                setLayout({"name":layout.name, "props":{}, "data":result[layout.name], "page":result[layout.name]['order'][0]})
                if (isMobile) {
                    if (result[layout.name].hasOwnProperty('mobile')) {
                        applyLayoutCard(result[layout.name]['mobile']) 
                    }
                }
            })
    },[]);
    
    function goHome() {
        console.log(layouts, layout.name)
        setLayout({"name":'Home', "props":{}, "data":layouts['Home'], "page":layouts['Home']['order'][0]})
        if (isMobile) {
            if (layouts['Home'].hasOwnProperty('mobile')) {
                applyLayoutCard(layouts['Home']['mobile']) 
            }
        }
        setMasterButtonState('System')
    }
    
    function applyLayout(name, newProps={}) {
        if (name!='Home') {
            setMasterButtonState('Home')
        } else {
            setMasterButtonState('System')
        }
        setLayout({"name":name, "props":newProps, "data":layouts[name], "page":layout.page})
    }

    function applyLayoutCard(name, newProps={}) {
        setMasterButtonState('Home')
        setLayout({"name":name, "props":newProps, "data":{ type: "single" }, "page":layout.page})
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
        setLayout({"name":layout.name, "props":layout.props, "data":layout.data, "page":newPage})
    }

    function applyHomePage(newPage) {
        setMasterButtonState('Home')
        setLayout({"name":"Home", "props":layout.props, "data":layouts['Home'], "page":newPage})
    }


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

export function withLayout(Component) {
    return function DataComponent(props) {
        return (
            <LayoutContext.Consumer>
                { context => <Component {...props} {...context}
                                layouts={context.layouts} layout={context.layout} applyLayout={context.applyLayout} applyLayoutCard={context.applyLayoutCard}
                                applyLayoutPage={context.applyLayoutPage} applyReturnPage={context.applyReturnPage} applyBackPage={context.applyBackPage}
                                goBack={context.goBack} backPage={context.backPage} returnPage={context.returnPage} isMobile={context.isMobile}
                                setMasterButtonState={context.setMasterButtonState} masterButtonState={context.masterButtonState}
                                applyHomePage={context.applyHomePage} goHome={context.goHome}
                            /> }
            </LayoutContext.Consumer>
        );
    };
}