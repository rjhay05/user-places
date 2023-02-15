import React from "react"
const AuthContext = React.createContext({
    loggedInHandler: () => {},
    logoutHandler: () => {},
    loadingHandler: (data) => {},
    isLoggedIn: null,
    isLoading: null,

})

export default AuthContext;