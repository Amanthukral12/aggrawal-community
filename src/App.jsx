import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Home from "./components/dashboard/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
