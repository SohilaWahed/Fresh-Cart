import { createContext, useEffect, useState } from "react";

export let UserContext = createContext()

export default function UserContextProvider({ children }) {

    const [userToken, setUserToken] = useState(null)

    /*
      - i use this hook because when reload in any time when i am login then context rerender then useToken is null
      - restore useToken from localstorage if exist 
      - if local storage is empty then goto login   
    */
    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            setUserToken(localStorage.getItem('userToken'))
        }
    }, [])

    return (
        <UserContext.Provider value={{ userToken, setUserToken }}>
            {children}
        </UserContext.Provider>
    )
}


