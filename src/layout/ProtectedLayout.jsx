import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const ProtectedLayout = () => {
    const {auth} = useAuth();

    const navigate = useNavigate();
   useEffect(()=>
{
     if(!Object.keys(auth).length){
        return navigate("/login")
    };
});
  
  return <Outlet/>
};

export default ProtectedLayout