import { createBrowserRouter, RouterProvider } from "react-router"
import Home from "../component/Home";
import Main from '../component/main'
import Register from "../Pages/register";
import Login from '../Pages/login';
import { AuthContextProvider } from '../Hooks/useAuthContext'
import ProtectedPages from "../middleware/protectedPages";
import Chatbox from "../component/chatRoom";

export default function Route() {
    const router = createBrowserRouter(
        [
            {
                path : '/',
                element : <Main />,
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
                        path : 'user/main-room',
                        element : <Chatbox />
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