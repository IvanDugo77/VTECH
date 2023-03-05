import { Link } from "react-router-dom";
import "./NotFoundPage.css"
import gif from "../notFound/gif.gif"
export const NotFoundPage = () => {
    return (
    <section className="notfound">
        <h1>ERROR 404</h1>
        <h2 className="notfound">Te has perdido verdad ?</h2>
        <img src={gif} alt="pulp fiction"/>
        <Link to={'/'}><button>Volver a la pagina de inicio</button></Link>
    </section>
    );
};