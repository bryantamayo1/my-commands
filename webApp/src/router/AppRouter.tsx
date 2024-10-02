import { BrowserRouter, Route, Routes }   from "react-router-dom";
import { ProtectedPage }                  from "./ProtectedPage";
import { HomePage }                       from "../components/HomePage/HomePage";
import { ProtectedAnyRoute }              from "./ProtectedAnyRoute";
import { ProtectedRoute }                 from "./ProtectedRoute";
import { AppPage }                        from "../components/AppPage";
import { CategoriesPage }                 from "../components/CategoriesPage/CategoriesPage";
import { UserPage }                       from "../components/UserPage/UserPage";
import { CommandsPage }                   from "../components/CommandsPage/CommandsPage";
import { toast }                          from "react-toastify";

export const AppRouter = () => {

  // Handle global errors
  window.addEventListener("unhandledrejection", ({reason}: any) => {
    // Handle error according response of API
    if(reason.error && (reason.error.statusCode >= 400 || reason.error.statusCode <=599) ){
    // Active toastify
    toast.success(reason.message, {
      position: toast.POSITION.BOTTOM_LEFT
    });
    }
  });

  return (
    <BrowserRouter>
      <Routes>

        {/* Not logged */}
        <Route path="/login" element={<ProtectedPage/>}/>
        <Route path="/" element={<ProtectedAnyRoute/>}/>

        {/* Logged */}
        <Route element={<AppPage/>}>
          <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
          <Route path="/categories" element={<ProtectedRoute><CategoriesPage/></ProtectedRoute>}/>
          <Route path="/commands" element={<ProtectedRoute><CommandsPage/></ProtectedRoute>}/>
          <Route path="/user" element={<ProtectedRoute><UserPage/></ProtectedRoute>}/>
        </Route>
        
        {/* Any route */}
        <Route path="*" element={<ProtectedAnyRoute/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}