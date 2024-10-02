import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { AppRouter }      from "./router/AppRouter";
import { AuthProvider }   from "./auth/AuthContext";
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary }  from './manageErrors/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
      <ToastContainer autoClose={4000} />
    </ErrorBoundary>
  );
}

export default App;
