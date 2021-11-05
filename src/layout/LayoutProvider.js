import React, { useState, useEffect, createContext, useReducer } from 'react';
import PlaceholderCard from 'layout/PlaceholderCard';
import ErrorBoundary from 'error/ErrorBoundary';
import useUserStore from 'store/userStore'

export const stackModuleReducer = (state, data) => {

    function addSuspenseModule(modulepath) {
        try {
            return ( React.lazy(() => 
                        import("layout/cards/"+modulepath)
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
                newmodules[modulename]=addSuspenseModule(item)
            }
        })
        return newmodules
    }
    return addModules(data)
}

export const moduleReducer = (state, data) => {

    function addSuspenseModule(modulepath) {
        try {
            return ( React.lazy(() => 
                        import("layout/pages/"+modulepath)
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

    const serverUrl = "https://"+window.location.hostname;
    const accessToken = useUserStore(state => state.access_token)
    const loggedIn = useUserStore(state => state.logged_in)
    const mobileBreakpoint = 800
    const maxScreenWidth = Math.min(1800, window.innerWidth)
    const minStackWidth = 320
    const maxStacks = Math.min(4, Math.round(maxScreenWidth / minStackWidth))
    
    const isMobile = window.innerWidth <= mobileBreakpoint;
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [rightDrawerOpen, setRightDrawerOpen] = useState(false)

    const [ modules, moduleDispatch ] = useReducer(moduleReducer, []);
    const [ stackModules, stackModuleDispatch] = useReducer(stackModuleReducer, []);
    const [ stacks, setStacks] = useReducer((state, newState) => ({...state, ...newState}), {})

    const [ stackLayout, setStackLayout ] = useState([])

    const [ currentPage, setCurrentPage ] = useState('Stacks')
    const [ currentProps, setCurrentProps ] = useState({})

    const [ breadcrumbs, setBreadcrumbs ] = useState([])
    const [ currentStack, setCurrentStack ]=useState(undefined)

    useEffect(() => {
        if (loggedIn) {
            getDefaultLayout()
        }
    // eslint-disable-next-line 
    }, [ loggedIn] )

    const getDefaultLayout = async () => {
        const headers = { authorization : accessToken }
        const response = await fetch(serverUrl + "/layout/default", { headers: headers })
        var result =  await response.json()
        setStackLayout(result) 
    }

    function goHome() {
        setCurrentPage('Stacks')
    }

    function goBack() {
        try {
            if (breadcrumbs.length>0) {
                var bc=[...breadcrumbs]
                var last=bc.pop()
                setCurrentPage(last.page)
                setCurrentProps(last.props)
                setBreadcrumbs(bc)
                return
            }
        }
        catch {
            console.log('could not go back in',breadcrumbs)
        }
        selectPage('Stacks')
    }

    function loadStack(stack) {
        if (stack.cards.length>0) {
            for (var x = 0; x < stack.cards.length; x++) {
                //console.log('adding ',stack.cards[x].module)
                addStackModule(stack.cards[x].module)
            }
        }
    }
    
    function getStack(stackName) {
        if (stacks && stacks.hasOwnProperty(stackName)) {
            var promise1 = new Promise(function(resolve, reject) {
                resolve(stacks[stackName]);});
            return promise1;
        }
        //console.log('cache miss',stackName, stacks)
        return getLayoutStack(stackName)
    }

    const getLayoutStack = async (stackName) => {
        const headers = { authorization : accessToken }
        const response = await fetch(serverUrl + "/layout/stack/"+stackName, { headers: headers })
        var result =  await response.json()
        loadStack(result)
        setStacks({[stackName] : result})
        return result
    }


    function toggleDrawer(newState) {
        if (newState!==undefined) {
            setDrawerOpen(newState)
        } else {
            setDrawerOpen(!drawerOpen)
        }
    }    

    function toggleRightDrawer(newState) {
        if (newState!==undefined) {
            setRightDrawerOpen(newState)
        } else {
            setRightDrawerOpen(!rightDrawerOpen)
        }
    }    
    
    function selectPage(pagename,pageprops={}) {
        if (currentPage!=="Stacks" && !breadcrumbs.includes(currentPage) )  {
            var bc=[...breadcrumbs]
            bc.push({ "page":currentPage, "props":currentProps })
            setBreadcrumbs(bc)
        }
        toggleDrawer(false)
        toggleRightDrawer(false)
        setCurrentStack(undefined)
        setCurrentPage(pagename)
        setCurrentProps(pageprops)
    }

    function selectStack(stackName,pageprops={}) {
        console.log('setting stack to',stackName)
        setCurrentStack(stackName)
        if (currentPage!=="Stacks") {
            setCurrentPage("Stacks")
            setCurrentProps(pageprops)
        }
    }


    function addModule(modulename) {
        var newModules=[]
        newModules.push(modulename)
        moduleDispatch(newModules)
        return true
    }     

    function addStackModule(modulename) {
        var newStackModules = []
        newStackModules.push(modulename)
        stackModuleDispatch(newStackModules)
        return true
    }     

    function renderSuspenseModule( modulename, moduleprops ) {
        
        try {
            if (modules.hasOwnProperty(modulename)) {
                let Module = modules[modulename]
                //moduleprops['wide']=true
                return  <ErrorBoundary>
                            <React.Suspense fallback={<PlaceholderCard name={ modulename } />}>
                                <Module key={ modulename } {...moduleprops} />
                            </React.Suspense>
                        </ErrorBoundary>
            } else {
                console.log('module not in modules', modulename, modules)
            }
        }
        catch {
            console.log('render error')
        }
        return null
    }

    function renderStackModule( modulename, moduleprops ) {
        
        try {
            if (stackModules.hasOwnProperty(modulename)) {
                let Module = stackModules[modulename]
                //moduleprops['wide']=true
                return  <ErrorBoundary>
                            <React.Suspense fallback={<PlaceholderCard name={ modulename } />}>
                                <Module key={ modulename } {...moduleprops} />
                            </React.Suspense>
                        </ErrorBoundary>
            } else {
                console.log('module not in modules', modulename, stackModules)
            }
        }
        catch {
            console.log('render error')
        }
        return null
    }

    return (
        <LayoutContext.Provider
            value={{
                isMobile: isMobile,
                maxStacks: maxStacks,
                maxScreenWidth: maxScreenWidth,
                
                modules: modules,
                renderSuspenseModule: renderSuspenseModule,
                addModule: addModule,

                addStackModule : addStackModule,
                stackModules : stackModules,
                stacks : stacks,
                setStacks : setStacks,
                renderStackModule: renderStackModule,     
                getStack: getStack,

                goBack: goBack,
                goHome: goHome,
                
                stackLayout: stackLayout,
                currentStack: currentStack,
                selectStack: selectStack,
                currentPage: currentPage,
                currentProps: currentProps,
                selectPage: selectPage,
                breadcrumbs: breadcrumbs,
                
                drawerOpen: drawerOpen,
                setDrawerOpen: setDrawerOpen,
                toggleDrawer: toggleDrawer,

                rightDrawerOpen: rightDrawerOpen,
                setRightDrawerOpen: setRightDrawerOpen,
                toggleRightDrawer: toggleRightDrawer,
            }}
        >
            {props.children}
        </LayoutContext.Provider>
    );
}
