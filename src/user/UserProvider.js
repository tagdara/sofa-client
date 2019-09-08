import React, {useState, createContext} from 'react';

export const UserContext = createContext();

export default function UserProvider(props) {

    const [userPlayer, setUserPlayer] = useState("");

    return (
        <UserContext.Provider
            value={{
                userPlayer: userPlayer,
                setUserPlayer: setUserPlayer,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}
