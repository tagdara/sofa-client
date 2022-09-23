export const compareState = (oldData, newData) => {
    for (var item in oldData) {
        if (!oldData[item].hasOwnProperty('last_update')) { console.log('state no last update', oldData[item])}
        if ((oldData[item].last_update !== newData[item].last_update)) { 
            //console.log(item, 'last update mismatch', oldData[item].last_update, newData[item].last_update )
            return false
        }
    }
    for (var dataItem in newData) {
        if (!oldData[dataItem]) {
            //console.log('missing state mismatch')
            return false
        }
    }    
    return true
}