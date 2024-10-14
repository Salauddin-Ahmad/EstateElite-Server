import { Outlet } from "react-router-dom";
import Navbar from "../Compoents/Navbar";
import Footer from "../Compoents/Footer/Footer";

const Root = () => {
    return (
        <div>
             <div className="">
             <Navbar></Navbar>
             </div>
            <div >
            <Outlet></Outlet>
            </div>
         
            <Footer></Footer>
        </div>
    );
};

export default Root;