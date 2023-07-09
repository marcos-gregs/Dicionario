import { createBrowserRouter } from "react-router-dom";
import { Screens } from "../Screens/Screens";
import { ErroScreen } from "../ErrorScreen/ErrorScreen";
export const MainRouter = createBrowserRouter([
    {
        path:'/',
        element:<Screens/>,
        errorElement:<ErroScreen/>,
    }
])