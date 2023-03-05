import { Product } from "./Product"; 
import "./ProductList.css";

export const ProductList = ({products}) => {
    return products.length ? (<section className="listaProductos">
         <ul className="liproductos">
            {products.map(product => <li key={product.id}><Product product={product}/> </li>)}
        </ul></section> 
        ) : ( 
            <p> Aún no hay productos..</p> 
        );
};