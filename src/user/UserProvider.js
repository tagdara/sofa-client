import React, {useState, useEffect, createContext} from 'react';

export const UserContext = createContext();

export default function UserProvider(props) {

    const [userPlayer, setUserPlayer] = useState("");     
    const [userPlayerMini, setUserPlayerMini] = useState("");     

    return (
        <UserContext.Provider
            value={{
                userPlayer: userPlayer,
                setUserPlayer: setUserPlayer,
                setUserPlayerMini: setUserPlayerMini,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

export function withUser(Component) {
    return function DataComponent(props) {
        return (
            <UserContext.Consumer>
                { context => <Component {...props} {...context} context={context} 
                                userPlayer={context.userPlayer} setUserPlayer={context.setUserPlayer} 
                                userPlayerMini={context.userPlayerMini} setUserPlayerMini={context.setUserPlayerMini}
                            /> }
            </UserContext.Consumer>
        );
    };
}