import { createBrowserRouter } from "react-router-dom";
import { Screens } from "../Screens/Screens";

export const MainRouter = createBrowserRouter([
    {
        path:'/',
        element:<Screens/>
    }
])