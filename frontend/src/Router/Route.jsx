import { createBrowserRouter, RouterProvider } from "react-router"
import App from '../App';
import Home from "../component/Home";
import Register from "../Pages/register";
import Login from '../Pages/login';

export default function Route() {
    const router = createBrowserRouter(
        [
            {
                path : '/',
                element : <App />,
                children : [

                    {
                        index : true,
                        element : <Home />,

                    },

                    {
                        path : 'user/register',
                        element : <Register />
                    },

                    {
                        path : 'user/login',
                        element : <Login />
                    },

                ]
            }
        ]
    )

    return (
        <RouterProvider router={router} />
    )
}