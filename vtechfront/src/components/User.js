import { Link } from "react-router-dom";
import silueta from "../Silueta/silueta.png";
import "./User.css";
export const User =({usuario}) => {
    
    return (<>
    <section className="usuario">
        <section>
        {usuario[0].avatar ? (
            <img className="avatar"
            src={`${process.env.REACT_APP_BACKEND}/avatars/${usuario[0].avatar}`} 
            alt={usuario[0].usuario}/>
            ) : <img className="avatar" src={silueta} alt="silueta"/>}
        </section>
         <p className="usuarionombre">{usuario[0].usuario}</p>
            <p>{usuario[0].biografia}</p>
            

    </section>
    </>
    );
};