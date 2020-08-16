import React, {useContext, useState, useEffect, createContext, useReducer} from 'react';
import { NetworkContext } from '../NetworkProvider';
import PlaceholderCard from '../PlaceholderCard';
import ErrorBoundary from '../ErrorBoundary';

function getFromLocalStorage() {
    
    try { 
        return JSON.parse(localStorage.getItem('layout'))
    }
    catch {}
    return {}
    
}

export const moduleReducer = (state, data) => {

    function addSuspenseModule(modulepath) {
        try {
            return ( React.lazy(() => 
                        import("../"+modulepath)
                            .catch(err => {
                                console.error('Error during loading module: ' + err)
                            })
            ))
        }
        catch {
            return null
        }
    }

    function addModules(modulelist) {
        var newmodules = {...state}
        modulelist.forEach( item => {
            var moduleparts=item.split('/')
            var modulename=moduleparts[moduleparts.length-1]
            if (!newmodules.hasOwnProperty(modulename)) {
                //console.log('adding module', item)
                newmodules[modulename]=addSuspenseModule(item)
            }
        })
        return newmodules
    }
    
    return addModules(data)
}


export const LayoutContext = createContext({});

export const LayoutProvider = (props) => {

    const { getJSON, loggedIn } = useContext(NetworkContext);
    const mobileBreakpoint = 800
    const isMobile = window.innerWidth <= mobileBreakpoint;
    const [layouts, setLayouts] = useState(undefined);     
    const [layout, setLayout] = useState(undefined); 
    const [returnPage, setReturnPage] = useState({"name":"", "props":{}})
    const [backPage, setBackPage] = useState({"name":"", "props":{}})
    const [masterButtonState, setMasterButtonState] = useState('System')
    //const [modules, setModules] = useState([]);
    const [modules, moduleDispatch] = useReducer(moduleReducer, []);

    useEffect(() => {
        
        function updateLayout(result) {
            setLayouts(result)
            if (!getFromLocalStorage()) {
                var newLayout={"name":"Home", "props":{}, "data":result["Home"] }
                setLayout(newLayout)
            }
        }
        
        if (loggedIn) {
          	getJSON('layout')
                .then(result=> updateLayout(result) );
            if (getFromLocalStorage()) {
                setLayout(getFromLocalStorage())
            } else {
                console.log('no layout in local')
            }
                
        }
        // eslint-disable-next-line 
    }, [ loggedIn ])
            
    useEffect(() => {   
        
        if (layouts!==undefined) {
            if (layouts.hasOwnProperty('error')) {
                console.log('Error getting layout', layouts)
                setLayout(undefined)
                return
            }
            if (isMobile) {
                if (layout && layout.name==="Home" && layouts['Home'].hasOwnProperty('mobile') && layout.page===(layouts['Home'].mobile)) {
                    setMasterButtonState('System')
                } else {
                    setMasterButtonState('Home')
                }
                return
            }
            var newLayout={"name":"Home", "props":{}, "data":layouts["Home"] }
            setLayout(newLayout )
            saveLocalLayout(newLayout)
            return
        }
        return
    // eslint-disable-next-line 
    }, [ layouts, isMobile ] );


    useEffect(() => {    
        
        function addPageModules(page, currentLayout) {
            if (currentLayout.data.pages.hasOwnProperty(page)) {
                var pageData=currentLayout.data.pages[page]
                var newModules=[]
                if (pageData.hasOwnProperty('cards')) {
                    for(var i = 0; i <pageData.cards.length; i++) {
                        newModules.push(pageData.cards[i].module)
                    }
                }
                moduleDispatch(newModules)
            } else {
                console.log('Page',page,'not found in layout')
            }
        }
    
        function addPagesModules(page, currentLayout) {
            //console.log('Adding modules for pages', Object.keys(layout.data.pages))
            for (const key of Object.keys(currentLayout.data.pages)) {
                addPageModules(key, currentLayout)
            }
        }        
    
        function getModulesForLayout(currentLayout) {
            if (loggedIn) {
                if (!layout || !layout.data || !layout.data.type ) { return null }
                if (layout.data.type==='pages') {
                    if (isMobile) {
                        if (currentLayout.hasOwnProperty('page')) {
                            if (currentLayout.data.hasOwnProperty('mobile') && currentLayout.page===currentLayout.data.mobile) {
                                moduleDispatch([currentLayout.data.mobile])
                            } else {
                                addPageModules(currentLayout.page, currentLayout)
                            }
                        } else if (currentLayout.data.hasOwnProperty('mobile')) {
                            moduleDispatch([currentLayout.data.mobile])
                        } else {
                            addPageModules(Object.keys(currentLayout.data.pages)[0], currentLayout)
                        }
                    } else {
                        addPagesModules(layout.name, currentLayout)
                    }
                } else {
                    moduleDispatch([layout.name]) 
                }
            }
        }
        getModulesForLayout(layout)
    // eslint-disable-next-line    
    }, [ layout, isMobile ])
    
    function goHome() {
        var newLayout={"name":'Home', "props":{}, "data":layouts['Home'], "page":""}
        if (isMobile && layouts['Home'].hasOwnProperty('mobile')) {
            //console.log('setting home to mobile')
            newLayout.page=layouts['Home'].mobile
        }
        
        setLayout(newLayout)
        saveLocalLayout(newLayout)
//        if (isMobile) {
//            if (layouts['Home'].hasOwnProperty('mobile')) {
//                applyLayoutCard(layouts['Home']['mobile'],{},layouts['Home']) 
//            }
//        }
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
        saveLocalLayout(newLayout)
    }

    function applyLayoutCard(name, newProps={}, data={ type: "single" }) {
        setMasterButtonState('Home')
        var newLayout={"name":name, "props":newProps, "data":data, "page":layout.page}
        setLayout(newLayout)
        saveLocalLayout(newLayout)
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
        setLayout(newLayout)
        saveLocalLayout(newLayout)
    }

    function applyHomePage(newPage) {
        setMasterButtonState('Home')
        var newLayout={"name":"Home", "props":layout.props, "data":layouts['Home'], "page":newPage}
        setLayout(newLayout)
        saveLocalLayout(newLayout)
    }
    
    function saveLocalLayout(data) {
        localStorage.setItem('layout', JSON.stringify(data));
    }
    

    function renderSuspenseModule( modulename, moduleprops ) {
        
        try {
            if (modules.hasOwnProperty(modulename)) {
                let Module = modules[modulename]
                moduleprops['wide']=true
                return  <ErrorBoundary>
                            <React.Suspense fallback={<PlaceholderCard name={ modulename } />}>
                                <Module key={ modulename } {...moduleprops} />
                            </React.Suspense>
                        </ErrorBoundary>
            } else {
                //console.log('module not in modules', modulename, modules)
            }
        }
        catch {
        }
        return null
    }


    return (
        <LayoutContext.Provider
            value={{
                layouts: layouts,
                layout: layout,
                modules: modules,
                renderSuspenseModule: renderSuspenseModule,
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
