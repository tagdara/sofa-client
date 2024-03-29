import React from 'react';
import useLayoutStore from 'layout/layoutStore'
import useLoginStore from 'login/loginStore'

import PlaceholderCard from 'layout/PlaceholderCard';
import { Text } from '@mantine/core'
import ErrorBoundary from 'error/ErrorBoundary'
import loadable from '@loadable/component'

const hostName = useLoginStore.getState().host_name
const serverUrl = useLoginStore.getState().server_url
const layoutUrl = serverUrl+ '/layout/default'

export const refreshStackLayout = async () => {
    const accessToken = useLoginStore.getState().access_token;
    const headers = { authorization : accessToken }
    const response = await fetch(layoutUrl, { headers: headers })
    const result = await response.json()
    useLayoutStore.setState({ stackLayout: result})
}

export const selectPage = (pagename, pageprops, hideHome) => {
    useLayoutStore.setState({ hideHome: hideHome})
    const currentPage = useLayoutStore.getState().currentPage
    const currentProps = useLayoutStore.getState().currentProps
    if (currentPage !== "Stacks") {
        const breadCrumbs = useLayoutStore.getState().breadCrumbs
        if (!breadCrumbs.includes(currentPage) )  {
            useLayoutStore.setState({ breadCrumbs: [...breadCrumbs, { "page":currentPage, "props":currentProps }] })
        }
    }
    useLayoutStore.setState({ drawerOpen: false, rightDrawerOpen: false, currentPage: pagename, currentProps: pageprops})
}


function addSuspenseModule(moduleName, inStack) {
    try {
        if (inStack) {
            return  loadable(moduleProps => import(`layout/cards/${moduleName}`))
            // return ( React.lazy(() => 
            // import("layout/cards/" + moduleName)
            //     .catch(err => { console.error('Error during loading module: ' + err)})
            // ))
        } else {
            return  loadable(moduleProps => import(`layout/pages/${moduleName}`))
            // return ( React.lazy(() => 
            //     import("layout/pages/" + moduleName)
            //         .catch(err => { console.error('Error during loading module: ' + err)})
            // ))
        }
    }
    catch {
        console.log('ooops')
        return null
    }
}

export const addModules = (moduleList, inStack) => {
    var newModules = {...useLayoutStore.getState().modules}
    moduleList.forEach( item => {
        var moduleParts=item.split('/')
        var moduleName=moduleParts[moduleParts.length-1]
        if (!newModules.hasOwnProperty(moduleName)) {
            newModules[moduleName] = addSuspenseModule(item, inStack)
        }
    })
    useLayoutStore.setState({ modules : newModules})
}


export const addModule = ( moduleName, inStack ) => {
    var newModules=[]
    newModules.push(moduleName)
    addModules(newModules, inStack)
    return true
}   

export const renderSuspenseModule = ( moduleName, moduleProps, key ) => {
    
    if (!moduleName) { console.log('no module specified'); return <Text>No Module</Text> }
    if (!useLayoutStore.getState().modules.hasOwnProperty(moduleName)) { 
        addModules([moduleName])
    }
    try {
        let Module = useLayoutStore.getState().modules[moduleName]
        return  <ErrorBoundary key={ moduleName+key } >
                    <React.Suspense fallback={<PlaceholderCard name={ moduleName } />}>
                        <Module {...moduleProps} />
                    </React.Suspense>
                </ErrorBoundary>
    }
    catch {
        console.log('render error')
    }
    console.log('module not in modules', moduleName)
    //return null
    return null
}

export const getStack = stackName =>  {
    const stacks = useLayoutStore.getState().stacks 
    if (stacks && stacks.hasOwnProperty(stackName)) {
        var promise1 = new Promise(function(resolve, reject) {
            resolve(stacks[stackName]);});
        return promise1;
    }
    //console.log('cache miss',stackName, stacks)
    return getLayoutStack(stackName)
}

const getLayoutStack = async (stackName) => {
    const accessToken = useLoginStore.getState().access_token
    const headers = { authorization : accessToken }
    const response = await fetch(serverUrl + "/layout/stack/"+stackName, { headers: headers })
    var result =  await response.json()
    loadStack(result)
    useLayoutStore.setState({ stacks: { [stackName] : result}})
    return result
}

function loadStack(stack) {
    if (stack && stack.cards && stack.cards.length>0) {
        for (var x = 0; x < stack.cards.length; x++) {
            //console.log('adding ',stack.cards[x].module)
            addModule(stack.cards[x].module, true)
        }
    }
}

export const goHome = () => {
    useLayoutStore.setState({ breadCrumbs: []})
    selectPage('Stacks')
}

export const goBack = () => {
    const breadCrumbs = useLayoutStore.getState().breadCrumbs
    try {
        if (breadCrumbs.length>0) {
            var bc = [...breadCrumbs]
            var last = bc.pop()
            useLayoutStore.setState({ breadCrumbs: bc, currentPage :last.page, currentProps :last.props })
            return
        }
    }
    catch {
        console.log('could not go back in',breadCrumbs)
    }
    selectPage('Stacks')
}

export const toggleDrawer = newState => {
    if (newState!==undefined) {
        useLayoutStore.setState({drawerOpen: newState})
    } else {
        const open = useLayoutStore.getState().drawerOpen
        useLayoutStore.setState({drawerOpen: !open})
    }
}     

export const toggleRightDrawer = newState => {
    if (newState!==undefined) {
        useLayoutStore.setState({rightDrawerOpen: newState})
    } else {
        const open = useLayoutStore.getState().rightDrawerOpen
        useLayoutStore.setState({rightDrawerOpen: !open})
    }
}   

export const selectStack = ( stackName, pageprops={} ) => {
    const previous = useLayoutStore.getState().currentStack
    useLayoutStore.setState({previousStack: stackName === "System" ? previous : stackName, currentStack: stackName, currentPage: "Stacks", currentProps: pageprops})
}

export const otherPort = (portnumber, tabname) => {
    var newurl = window.location.protocol + "//" + hostName + ":" +portnumber;
    window.open(newurl,tabname);
}