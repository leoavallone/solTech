import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { router } from "./router";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme="colored"
        />
      </div>
    </AuthProvider>
  );
}

