import { useContext }       from 'react';
import { AuthContext }      from '../auth/AuthContext';
import { GeneralProps }     from '../interfaces/General';
import { Navigate }         from 'react-router-dom';

export const ProtectedRoute = ({ children }:GeneralProps) => {
  ////////
  // Hooks
  ////////
  const {logged} = useContext(AuthContext);

  if(logged){
    return <>{children}</>
  }
  return <Navigate to ="/login"/>
}
