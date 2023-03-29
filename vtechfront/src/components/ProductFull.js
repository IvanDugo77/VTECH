import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { deleteProductService } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { buyProductService} from "../services";
import { useParams } from "react-router";
import { aceptProductService } from "../services";
import { noAceptProductService } from "../services";
import useUser from "../hooks/useUser";
import "./ProductFull.css";

export const ProductFull = ({product}) => {
    const {id} = useParams();
    const { user, token } = useContext(AuthContext);
    const [ error, setError] = useState("");
    const navigate = useNavigate();
    const { usuario } = useUser(product[0].comprador_id);
    

    if (!user){
        navigate("/");
        toast.error("Registrate primero");
        return
    }
    
    
   
    const deleteProduct = async (id) => {
        
        try{ 
            const delProduct = await deleteProductService({id, token})
            toast.success(delProduct);
        }catch(error){
            setError(error.message);
        }finally{
            navigate("/");
        }
    }

    const buyProduct = async (id,token) => {
        try{ 
            const buyProduct = await buyProductService({id,token})
            toast.success(buyProduct);
        }catch(error){
            setError(error.message);
        }finally{
            navigate("/");
        }
    }
    const acept = async (id,token) =>{
        try{
            const acept = await aceptProductService({id,token})
            toast.success(acept);
        }catch(error){
            setError(error.message);
        }finally{
            navigate(`/usuario/${user[0].id}`)
            
        }
    }

    const noAcept = async (id) =>{
        try{
            const noAcept = await noAceptProductService({id})
            toast.error(noAcept);
        }catch(error){
            setError(error.message);
        }finally{
            navigate(`/`);
        }
    }

return(
    <article className="productosT">
       
        <section className="productosusuario">
        <Link to={`/usuario/${product[0].usuario_id}`}>
           {product[0].avatar ? (
           <img className="productosavatar" 
           src={`${process.env.REACT_APP_BACKEND}/avatars/${product[0].avatar}`} 
           alt={product[0].nombre}/>
            ) : null}
            </Link>
            <p className="productos">{product[0].usuario}</p>
          </section>   
        {user && user[0].id === product[0].usuario_id ?(
        <section className="botonborrar">
             <button className="botonborrar" onClick={() => deleteProduct(product[0].id)}>Borrar Producto</button> {error ? <p>{error}</p> : null} 
        </section> ) : null}


       
       
        
        <section className="productoscontenido">
            
              {product[0].imagen? (
              <img className="productosuploads" 
               src={`${process.env.REACT_APP_BACKEND}/uploads/${product[0].imagen}`} 
               alt={product[0].nombre}/>
               ) : null}   

               <section className="productosEncabezado">
                    <div className="productosseparador">
                        <p className="productosprecio">{product[0].precio} EUR</p>
                        <p className="productostitulo">{product[0].nombre}</p>
                    </div>    
               </section>
               <section className="productosEncabezado">
                    <div className="productosseparador">
                        <p className="productosdescripcion">{product[0].descripcion}</p>
                    </div>
                </section>
                <section className="infoproducto">
                <div className="infoproducto">
                        <p className="ctitulo">Categoria</p>
                        <p className="cdescripcion">{product[0].categoria}</p>
                        <p className="ctitulo">Localidad de venta</p>
                        <p className="cdescripcion">{product[0].localidad}</p>
                         <p className="ctitulo">Fecha de publicación</p>
                        <p className="cdescripcion">{product[0].fecha}</p> 
                </div>
                </section>



        {usuario && product[0].estado_venta == "Pendiente aceptar" ? <>
        <p className="contacto">El Usuario {usuario[0].usuario} quiere comprar tu producto. Pongase en contacto a traves del email: <a href={`mailto:${usuario[0].email}`}>{usuario[0].email}</a> </p>
        <section className="botonaceptar">
        <button className="botonaceptar" onClick={() =>acept(id,token)}>Aceptar venta</button>
        <button className="botonaceptar" onClick={() => noAcept(id)}>Denegar venta</button> </section>
        </>
        : null }

        
        {product[0].estado_venta == "Disponible" && user[0].id !== product[0].usuario_id ? 
        <button onClick={()=>{buyProduct(id,token)}}>Comprar articulo</button>
         : null}
        </section>
    </article>

);
};