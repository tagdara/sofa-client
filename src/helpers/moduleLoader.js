import React from 'react';
import useLayoutStore from 'store/useLayoutStore'

export const renderSuspenseModule = ( modulename, moduleprops ) => {
        
    try {
        var modules = useLayoutStore.get().modules
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

export const renderStackModule = ( modulename, moduleprops ) => {
    
    try {
        var stackModules = useLayoutStore.get().stackModules
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

export const addModule(moduleName) => {
    var modules = useLayoutStore.get().modules
    const newModule = addSuspenseModule(moduleName)
    modules.push(modulename)



    useLayoutStore.set({ modules: modules })
    return true
}     

function addStackModule(modulename) {
    var newStackModules = []
    newStackModules.push(modulename)
    stackModuleDispatch(newStackModules)
    return true
}    

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