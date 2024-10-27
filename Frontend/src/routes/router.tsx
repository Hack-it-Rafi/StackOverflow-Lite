import { createBrowserRouter } from "react-router-dom";


import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/HomePage.tsx/Home";
import Login from "../pages/LoginPage";
import Signup from "../pages/SignupPage";
import App from "../App";
import CreatePost from "../pages/CreatePost";
import PostDetails from "../pages/PostDetails";



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
      {
        path: "/create-post",
        element: <CreatePost />,
      },
      {
        path: "/post/:id",
        element: <PostDetails />,
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