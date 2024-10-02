import { useContext }   from 'react'
import { Navigate }     from 'react-router-dom'
import { AuthContext }  from '../auth/AuthContext';

export const ProtectedAnyRoute = () => {
  ////////
  // Hooks
  ////////
  const {logged} = useContext(AuthContext);

  if(!logged) {
    return <Navigate to ="/login"/>
  }else{
    return <Navigate to ="/home"/>
  }
}
