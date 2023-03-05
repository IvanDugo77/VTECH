
import { Link } from "react-router-dom";
import "./Product.css";



export const Product = ({ product }) => {

    return (
    <Link to={`/productoId/${product.id}`}>

    <article className="producto">
      <div className="producto">
       {product.imagen ? (
            <img className="producto"
            src={`${process.env.REACT_APP_BACKEND}/uploads/${product.imagen}`} 
            alt={product.text}/>
            ) : null} 
            </div>
            <p className="productoPrecio">{product.precio} EUR</p>
            <p className="producto">{product.nombre}</p>
            
               
               {product.estado_venta === "Disponible" ? 
               <p className="Disponible">{product.estado_venta}</p> : <p className="Pendiente">{product.estado_venta}</p>}
            
            
    </article>
    </Link>
 );
};