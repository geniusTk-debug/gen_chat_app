import { createBrowserRouter, RouterProvider } from "react-router"
import App from '../App';
import Home from "../component/Home";
import Register from "../Pages/register";
import Login from '../Pages/login';
import { AuthContextProvider } from '../Hooks/useAuthContext'
import ProtectedPages from "../middleware/protectedPages";

export default function Route() {
    const router = createBrowserRouter(
        [
            {
                path : '/',
                element : <App />,
                children : [

                    {
                        index : true,
                        element : (
                            <ProtectedPages>
                                <Home />
                            </ProtectedPages>
                        )

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
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    )
}