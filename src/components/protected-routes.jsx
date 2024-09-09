import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// import ProtectedRoute from './components/protected-routes.jsx'

const ProtectedRoute = ({children}) => {
   
  const{isSignedIn,user,isLoaded}  = useUser();
  const {pathname} = useLocation();

  if(isLoaded && !isSignedIn && isSignedIn !== undefined ){
    return <Navigate to='/?sign-in=true'></Navigate>
  }

  //checking on boarding status
  console.log(pathname)
  if(user !== undefined && !user?.unsafeMetadata?.role && pathname !== '/onboarding'){
    // console.log("inside the protected routes")
    return <Navigate to= '/onboarding'></Navigate>
  } 

  return children;
  
}

export default ProtectedRoute;
