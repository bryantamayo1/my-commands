import { createContext }  from 'react';
import { GeneralProps }   from '../interfaces/General';
import { loginInputs }    from '../interfaces/Login';
import { useState }       from 'react';
import { ServicesLogin }  from '../services/ServicesLogin';
import { SessionStorage } from '../utils/SessionStorage';
import { LocalStorage }   from '../utils/LocalStorage';

type AuthState = {
  status: "checking" | "not-authenticated" | "authenticated" | "error",
  logged: boolean,
  errorMessage?: string
}

type AuthContextProps = AuthState & {
  login: (values: loginInputs) => void,
  logout: () => void,
}

const AuthStateInitial:AuthState = {
  status: "not-authenticated",
  logged: false
};

// Check authenticated user
if(LocalStorage.getItem("user_authenticated_mycommands")
&& SessionStorage.getItem("user")?.xen){
  AuthStateInitial.status = "authenticated";
  AuthStateInitial.logged = true;
}

export const AuthContext = createContext({} as AuthContextProps);

/**
 * Context to authentication
 */
export const AuthProvider = ( {children}: GeneralProps ) => {
  ////////
  // Hooks
  ////////
  const [authState, setAuthState] = useState(AuthStateInitial);

  const login = async(values: loginInputs) => {
    // Active spinner
    setAuthState(({ status: "checking", logged: false}));
    try{
      delete values.rememberMe;
      const data = await ServicesLogin(values);
      SessionStorage.setItem("user", data.data);
      setAuthState(({ status: "authenticated", logged: true}));
      LocalStorage.setItem("user_authenticated_mycommands", {active: true});
    }catch(error){
      // @ts-ignore
      if(error.status === "fail" || error.status === "error"){
        // @ts-ignore
        setAuthState(({ status: "error", logged: false, errorMessage: error.message}));
      }else{
        setAuthState(({ status: "error", logged: false, errorMessage: "Ha habido un error, vuelva a intentarlo más tarde"}));
      }
      throw error;
      ;
    }
  }

  const logout = () => {
    SessionStorage.removeAll();
    LocalStorage.removeItem("user_authenticated_mycommands");
    setAuthState({ status: "not-authenticated", logged: false });
  }

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout
      }}
    >
        {children}
    </AuthContext.Provider>
  )
}
