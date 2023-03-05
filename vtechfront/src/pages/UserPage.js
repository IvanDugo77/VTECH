import { ErrorMessage } from "../components/ErrorMessage";
import useUser from "../hooks/useUser";
import { useParams } from "react-router";
import { User } from "../components/User";
import { CreateProduct } from "../components/CreateProduct";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ModifyUser } from "../components/ModifyUser";
import useProducts from "../hooks/useProducts";
import { ProductList } from "../components/ProductList";
import "./UserPage.css"



export const UserPage =  () => {
   
    const {id} = useParams();
    const { usuario, loading, error } = useUser(id);
    const { user } = useContext(AuthContext);
    const {products} = useProducts();
    
    const myProducts = products.filter (products=> products.usuario_id === user[0].id);
    const userProducts = products.filter (products => products.usuario_id == id);
    const disponibles = userProducts.filter (useProducts => useProducts.estado_venta == "Disponible");
    const pV = products.filter (products => products.estado_venta === "Vendido");
    const misCompras = pV.filter(pV => pV.comprador_id == id);
    
    const [click, setClick] = useState(false);

    if (loading) return <p>Cargando perfil...</p>;
    if (error) return <ErrorMessage message={error}/>;
    return (
        
        <section className="userpage">
            {user && user[0].id === usuario[0].id ? <button className="subir" onClick={()=>{setClick(true)}}>Quiero subir un producto</button> : null}
            {click && user[0].id === usuario[0].id ? <CreateProduct boton={click}/> : null}
            <User usuario={usuario}/>
            {user && user[0].id === usuario[0].id ? <ModifyUser/> : null}
            {user && user[0].id === usuario[0].id ? <><h2 className="Titulo">Estos son tus productos</h2>
            <ProductList products={myProducts}/> </> : <><h2  className="Titulo">Productos del usuario</h2>
            <ProductList products={disponibles}/> </>}
        <section className="tuC">
            {misCompras ? <> <h2 className="Titulo">Tus ultimas Compras</h2><ProductList products={misCompras}/> </>: null}
        </section>
        </section>
    );
};
