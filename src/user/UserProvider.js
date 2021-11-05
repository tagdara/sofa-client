import React, {useState, useEffect, createContext} from 'react';
import { deviceByEndpointId } from 'store/deviceHelpers';
import useUserStore from 'store/userStore'
const serverUrl = "https://"+window.location.hostname;

export const UserContext = createContext();

export default function UserProvider(props) {

    const [ userData, setUserData ] = useState({});
    const [ favorites, setFavorites] = useState([])
    const [ userCamera, setUserCamera] = useState(undefined)
    const [ userTheme, setUserTheme] = useState(undefined)
    const [ userPlayer, setUserPlayer] = useState(undefined)
    const [ userArea, setUserArea] = useState("logic:area:Main")
    const loggedIn = useUserStore(state => state.loggedin)
    const accessToken = useUserStore(state => state.access_token)
    useEffect(() => {
         
        if (loggedIn) {
            getUserData()
        } else {
            setUserData({})
        }
    // eslint-disable-next-line 
    }, [ loggedIn] )

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

    const getUserData = async () => {
        const headers = { authorization : accessToken }
        const response = await fetch(serverUrl+"/user", { headers: headers })
        var result = await response.json()
        parseResult(result)       
    }
    
    const saveUserData = async data => {
        const headers = { authorization : accessToken }
        const body = data
        const response = await fetch(serverUrl+"/user/save", { headers: headers, method: "post", body: JSON.stringify(body)})
        var result = await response.json()
        console.log('saved user setting change', result)

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
