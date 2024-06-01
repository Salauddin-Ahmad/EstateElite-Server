import { Outlet } from "react-router-dom";
import Navbar from "../Compoents/Navbar";

const Root = () => {
    return (
        <div>
             <div className=" ">
             <Navbar></Navbar>
             </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;