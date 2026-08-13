import { createBrowserRouter, RouterProvider } from "react-router"
import App from "../App";
import Login from '../Pages/login';
import Register from "../Pages/register";

export default function Route() {
    const router = createBrowserRouter([
        {
            path : '/',
            element : <App />,
        },
        {
            path : 'user-acc/login',
            element : <Login />
        },
        {
            path : 'user-acc/register',
            element : <Register />
        }
    ])


    return (
        <RouterProvider router={router} />
    )
}