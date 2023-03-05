import { Auth } from "./Auth";
import { Link } from "react-router-dom";
import logo from "../Logo/logo.png";
import "./Header.css";


export const Header = () => {
    
    return (
        <header>
            <section className="header"> 
               <Link to = "/" >
                <img className="header" src={logo} alt="Logo"/>
            </Link>
            </section>
            <section className="nav">
                 <nav >
                   <Auth />
                 </nav>   
            </section>
        
        </header>
    )
};