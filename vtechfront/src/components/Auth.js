import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Auth.css";

export const Auth = () => {
    const { user, logout } = useContext(AuthContext);
    return user ? (
        <p className="auth" >Ha iniciado sesión como <Link to={`/usuario/${user[0].id}`}>{user[0].usuario}</Link> <button onClick= {() => logout()}>Desconectarse</button> </p> 
         ) : (
    <ul className="auth">
        <li className="Register">
            <Link to ="/register"><p className="auth">Registrarse</p></Link>
        </li>
        <li className="Login">
            <Link to ="/login"><p className="auth">Iniciar sesión</p></Link>
        </li>
    </ul>
    ); 
};