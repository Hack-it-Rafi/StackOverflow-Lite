import { createBrowserRouter } from "react-router-dom";


import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/HomePage.tsx/Home";
import Login from "../pages/LoginPage";
import Signup from "../pages/SignupPage";
import App from "../App";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);
export default router;