import React, {useState, useEffect, createContext} from 'react';

export const LayoutContext = createContext();

export default function LayoutProvider(props) {

    const [layouts, setLayouts] = useState({});     
    const [layout, setLayout] = useState({"name":"Home", "props":{}, "data":{}, "page":""}); 
    const [returnPage, setReturnPage] = useState({"name":"", "props":{}})
    const [backPage, setBackPage] = useState({"name":"", "props":{}})
    const mobileBreakpoint = 800
    const isMobile = window.innerWidth <= mobileBreakpoint;

    useEffect(() => {
  	    fetch('/layout')
 		    .then(result=>result.json())
            .then(result=> {
                setLayouts(result);
                setLayout({"name":"Home", "props":{}, "data":result[layout.name], "page":""})
            })
    },[]);
    
    function applyLayout(name, newProps={}) {
        setLayout({"name":name, "props":newProps, "data":layouts[name], "page":layout.page})
    }

    function applyLayoutCard(name, newProps={}) {
        setLayout({"name":name, "props":newProps, "data":{ type: "single" }, "page":layout.page})
    }
    
    function applyReturnPage(returnName, returnProps={}) {
        setReturnPage({"name":returnName, "props":returnProps})
    }

    function applyBackPage(backName, backProps={}) {
        setBackPage({"name":backName, "props":backProps})
    }
    
    function goBack() {
        applyLayoutCard({"name":backPage.name, "props":backPage.props})
        applyBackPage({"name":"", "props":{}})
    }
    
    function applyLayoutPage(newPage) {
        setLayout({"name":layout.name, "props":layout.props, "data":layout.data, "page":newPage})
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
                applyReturnPage: applyReturnPage,
                applyBackPage: applyBackPage,
                goBack: goBack,
                isMobile: isMobile,
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
                            /> }
            </LayoutContext.Consumer>
        );
    };
}