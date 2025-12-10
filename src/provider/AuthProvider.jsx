import React, { useState } from 'react'
import { Authcontext } from '../contextApi';

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});

    const handleAuth = (user) =>{
        setAuth(user);
    };
    return(
        <Authcontext.Provider value={{auth, handleAuth}}>
            {children}
        </Authcontext.Provider>
    );

};

export default AuthProvider