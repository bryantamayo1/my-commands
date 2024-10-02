import './LoginPage.css';
import { Checkbox , TextField }   from "@mui/material";
import { useFormik }              from 'formik';
import { useContext, useEffect }  from 'react';
import * as Yup                   from 'yup';
import { AuthContext }            from '../../auth/AuthContext';
import { LocalStorage }           from '../../utils/LocalStorage';
import CircularProgress           from '@mui/material/CircularProgress';
import Snackbar                   from '@mui/material/Snackbar';

export const LoginPage = () => {
  ////////
  // Hooks
  ////////
  const {errorMessage, login, status} = useContext(AuthContext);
  
  // Control of rememberMe me email and update title page
  useEffect(() => {
    // Update title
    document.title = "Login - mycommands";

    const email = LocalStorage.getItem('email');
    if(email){
      formik.setFieldValue("email", email);
      formik.setFieldValue("rememberMe", true);
    }
  }, []);

  // Define form with formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Debe introducir un email válido').required('Email requerido'),
      password: Yup.string().required('Contraseña requerida')
    }),
    onSubmit: async values => {
      await login(structuredClone(values));
      
      // Store email of user in localStorage
      if(values.rememberMe){
        LocalStorage.setItem('email', values.email);
      }
    }
  });

  /**
   * Handle input checkbox Remember Me
   * if check is false, email will be delete of sessionStorage
   */
  const handleRememberMe:React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    formik.setFieldValue("rememberMe", target.checked);
    if(!target.checked){
      LocalStorage.removeItem('email');
    }
  }

  return (
    <div className="login-container--box">
      <div className="login-container">
        <p className="title">My Commands</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="container-form">

            <div className="container-form-row">
              <TextField id="email" color="warning" fullWidth label="Email" variant="standard"
                name="email" type="email" 
                onChange={formik.handleChange} value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className='error-formik'>{formik.errors.email}</p>
              )}

              <TextField id="password" color="warning" fullWidth label="Contraseña" variant="standard"
                name="password"  type="password" style={{ marginTop: 10 }}
                onChange={formik.handleChange} value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <p className='error-formik'>{formik.errors.password}</p>
              )}
            </div>
            
            <div className='container-form-row__container-remember-me'>
              <Checkbox id="rememberMe" color="secondary" style={{ padding: "0 10px 0 0" }}
                onChange={handleRememberMe} checked={formik.values.rememberMe}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>


            {status === "error" && (
              <p className='error-formik error-msg'>{errorMessage}</p>
            )}

            <div className="container-form__container-btn-login">
              <button type={status === "checking"? "button" : "submit"}
                style={{ cursor: status === "checking"? "wait" : "auto" }}
              >
                {status === "checking"?
                    <CircularProgress size={20} color="inherit"/>
                  :
                    "Login"
                }
              </button>
            </div>

          </div>
        </form>

        {/* Info */}
        <Snackbar
          open={true}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center"}}
          message={
            <span style={{ color: "#c0c0c0" }}>
              Guest user: guest@guest.com. Password: guest-guest
            </span>
          }
        />
      </div>
    </div>
  )
}
