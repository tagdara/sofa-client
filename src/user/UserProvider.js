import React, {useState, useEffect, useContext, createContext} from 'react';
import { NetworkContext } from 'network/NetworkProvider';
import { DeviceContext } from 'context/DeviceContext';

export const UserContext = createContext();

export default function UserProvider(props) {

    const [ userData, setUserData ] = useState({});
    const { getJSON, postJSON, loggedIn } = useContext(NetworkContext);
    const { deviceByEndpointId } = useContext(DeviceContext);
    const [ favorites, setFavorites] = useState([])
    const [ userCamera, setUserCamera] = useState(undefined)
    const [ userTheme, setUserTheme] = useState(undefined)
    const [ userPlayer, setUserPlayer] = useState(undefined)
    const [ userArea, setUserArea] = useState("logic:area:Main")
    
    useEffect(() => {
        
        function parseResult(result) {
            if (result) {
                if (result.hasOwnProperty('favorites')) {
                    setFavorites(result.favorites)
                }
                if (result.hasOwnProperty('camera')) {
                    setUserCamera(result.camera)
                }
                if (result.hasOwnProperty('player')) {
                    setUserPlayer(result.player)
                }
                
                if (result.hasOwnProperty('theme')) {
                    setUserTheme(result.theme)
                }
                if (result.hasOwnProperty('area')) {
                    setUserTheme(result.area)
                }
                setUserData(result)
            }
        }
        
        if (loggedIn) {
      	    getJSON('user')
                .then(result=>parseResult(result))
        } else {
            setUserData({})
        }
    // eslint-disable-next-line 
    }, [ loggedIn] )
    
    function saveUserData(data) {
        postJSON('user/save', data)
            .then(result=>console.log('saved user setting change',result))
    }
    
    function chooseUserCamera(cameraId) { 
        if (cameraId!==userCamera) {
            setUserCamera(cameraId)
            setUserData({...userData, camera: cameraId })
            saveUserData({...userData, camera: cameraId })
        }
    }

    function chooseUserPlayer(playerId) { 
        if (playerId!==userPlayer) {
            setUserPlayer(playerId)
            setUserData({...userData, player: playerId })
            saveUserData({...userData, player: playerId })
        }
    }


    function chooseUserTheme(themeName) { 

        if (themeName!==userTheme) {
            setUserTheme(themeName)
            setUserData({...userData, theme: themeName })
            saveUserData({...userData, theme: themeName })
        }
    }

    function chooseArea(areaName) {
        if (areaName !== userArea) {
            setUserArea(areaName)
            //saveUserData({...userData, area: areaName}) - Do we want to persist this change? Probably not
        }
    }
    
    function makeFavorite(deviceId, fav=true) {
        console.log('favoriting', deviceId, fav)
        var newfavorites=[...favorites]
        if (fav && !userData.favorites.includes(deviceId)) {
            newfavorites=[...newfavorites, deviceId]
            setFavorites(newfavorites)
            setUserData({...userData, favorites: newfavorites })
            saveUserData({...userData, favorites: newfavorites })
        } else if (!fav && userData.favorites.includes(deviceId)) {
            newfavorites=[...userData.favorites]
            newfavorites.splice( newfavorites.indexOf(deviceId), 1 );
            setFavorites(newfavorites)
            setUserData({...userData, favorites: newfavorites })
            saveUserData({...userData, favorites: newfavorites })
        }
    }
    
    function isFavorite(deviceId) {
        return getFavorites().includes(deviceId)
    }
    
    function getFavorites() {
        var validated=[]
        for (var i = 0; i < favorites.length; i++) {
            if (deviceByEndpointId(favorites[i])) {
                validated.push(favorites[i])
            }
        }
        return validated
    }

    return (
        <UserContext.Provider
            value={{
                userData: userData,
                makeFavorite: makeFavorite,
                isFavorite: isFavorite,
                favorites: favorites,
                getFavorites: getFavorites,
                userCamera: userCamera,
                chooseUserCamera: chooseUserCamera,
                userTheme: userTheme,
                chooseUserTheme: chooseUserTheme,
                userPlayer: userPlayer,
                chooseUserPlayer: chooseUserPlayer,
                userArea: userArea,
                chooseArea: chooseArea,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}
