import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";

 export const router = createBrowserRouter([
    {
     path: '/',
     element: <Root></Root>,
     children: [
        {
            path: '/',
        }
     ]
    },
  ]);