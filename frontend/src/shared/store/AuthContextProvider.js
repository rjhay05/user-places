import React, { useEffect, useState } from 'react'

import AuthContext from './auth-context'

function AuthContextProvider(props) {

    const [ isLoggedIn, setIsLoggedIn ] = useState(false)   
    const [ isLoading, setIsLoading ] = useState(false)



    useEffect(() => {
        const userIsLoggedIn = localStorage.getItem('isLoggedIn')
        if(userIsLoggedIn === '1'){
            setIsLoggedIn(true)
        }
    }, [])


    const loggedInHandler = (userId, token) => {
            setIsLoggedIn(true)
            localStorage.setItem('isLoggedIn', '1')
            localStorage.setItem('UserId' , userId)
            localStorage.setItem('Token', token)
    }

    const logoutHandler = () => {
        setIsLoading(true) 
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('UserId')
        setIsLoggedIn(false)
        window.location = '/auth/login'
    }

    const loadingHandler = (data) => {
        setIsLoading(data)
    }

    const initialVal = {
        loggedInHandler,
        logoutHandler,
        loadingHandler,
        isLoggedIn,
        isLoading,
    }
    return (
        <AuthContext.Provider value={initialVal}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider