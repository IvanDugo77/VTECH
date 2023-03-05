import { ErrorMessage } from "../components/ErrorMessage";
import { ProductList } from "../components/ProductList";
import useProducts from "../hooks/useProducts";
import useFilterName from "../hooks/useFilterName";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "./HomePage.css";




export const HomePage = () => {
  const {user} = useContext(AuthContext);
  const [text,setText] = useState('');
  const [desplegable,setDesplegable] = useState(false);
  const [localidad,setLocalidad] = useState('');
  const [categoria,setCategoria] = useState('');
  const [precio,setPrecio] = useState('');
  

  const {products, loading, error} = useProducts();
  const {filter} = useFilterName(text);
  

  const productosDisponiblesHome = products.filter (products => products.estado_venta == "Disponible");

  const pD = filter.filter (filter => filter.estado_venta == "Disponible");
  
  const priceFilter = pD.filter(pD => pD.precio <= precio);
  
  const categoryFilter = pD.filter(pD => pD.categoria == categoria)
  
  const localidadFilter = pD.filter(pD => pD.localidad === localidad);





  if (loading) return <p>Cargando productos...</p>;
  if (error) return <ErrorMessage message={error}/>;
 
 
  const handleForm = (e) => {
    e.preventDefault();
    setText(e.target.value);
  }

    return (<>
      <section>
        <div className="Slogan">
        <h1>Haz que tus recuerdos vuelvan a cobrar vida</h1>
        <h2>Solo en VTECH</h2>
        </div>
        
      <form onChange={handleForm}>
            <fieldset >
                <label htmlFor="nombre"></label>
                <input className="Buscador" placeholder="Buscar en todas las categorias" type="text" id="nombre" name="nombre" required onChange={(e) => setText(e.target.value)}/>
            </fieldset>
      </form>
      </section>
            { desplegable ? null : <button onClick = {()=>{setDesplegable(true)}}>Busqueda avanzada</button>}

       {desplegable ? 
        
          <form >
            <section>
            <fieldset>
                <label htmlFor="precio">Precio</label>
                <input type="number" id="precio" name="precio" required onChange={(e) => setPrecio(e.target.value)}/>
            </fieldset>
            <fieldset>
                <label htmlFor="categoria">Categoria</label>
                <select onChange={(e) => {setCategoria(e.target.value)}} name="categoria" id="categoria">
                    <option value="Foto">Foto</option>
                    <option value="Video">Video</option>
                    <option value="Ordenadores">Ordenadores</option>
                    <option value="Televisiones">Televisiones</option>
                    <option value="Radios">Radios</option>
                    <option value="Moviles">Móviles</option>
                    <option value="Consolas">Consolas</option>
                    <option value="Otros">Otros</option>
            </select>    
            </fieldset>
            <fieldset>
                <label htmlFor="localidad">Localidad</label>
                <select onChange={(e) => setLocalidad(e.target.value)} name="localidad" id="localidad">
                    <option value="Albacete">Albacete</option>
                    <option value="Alicante">Alicante</option>
                    <option value="Almeria">Almería</option>
                    <option value="Araba">Araba</option>
                    <option value="Asturias">Asturias</option>
                    <option value="Avila">Avila</option>
                    <option value="Badajoz">Badajoz</option>
                    <option value="Baleares">Baleares</option>
                    <option value="Barcelona">Barcelona</option>
                    <option value="Bizkaia">Bizkaia</option>
                    <option value="Burgos">Burgos</option>
                    <option value="Caceres">Cáceres</option>
                    <option value="Cadiz">Cádiz</option>
                    <option value="Cantabria">Cantabria</option>
                    <option value="Castellon">Castellón</option>
                    <option value="Ceuta">Ceuta</option>
                    <option value="Ciudad Real">Ciudad Real</option>
                    <option value="Cordoba">Córdoba</option>
                    <option value="Coruña">Coruña</option>
                    <option value="Cuenca">Cuenca</option>
                    <option value="Guipuzkoa">Guipuzkoa</option>
                    <option value="Girona">Girona</option>
                    <option value="Granada">Granada</option>
                    <option value="Guadalajara">Guadalajara</option>
                    <option value="Huelva">Huelva</option>
                    <option value="Huesca">Huesca</option>
                    <option value="Jaen">Jaén</option>
                    <option value="Leon">León</option>
                    <option value="Lugo">Lugo</option>
                    <option value="Lleida">Lleida</option>
                    <option value="Madrid">Madrid</option>
                    <option value="Malaga">Málaga</option>
                    <option value="Melilla">Melilla</option>
                    <option value="Murcia">Murcia</option>
                    <option value="Navarra">Navarra</option>
                    <option value="Ourense">Ourense</option>
                    <option value="Palencia">Palencia</option>
                    <option value="Palmas,Las">Palmas,Las</option>
                    <option value="Pontevedra">Pontevedra</option>
                    <option value="Rioja,La">Rioja,La</option>
                    <option value="Salamanca">Salamanca</option>
                    <option value="Santa Cruz de Tenerife">Santa Cruz de Tenerife</option>
                    <option value="Segovia">Segovia</option>
                    <option value="Sevilla">Sevilla</option>
                    <option value="Soria">Soria</option>
                    <option value="Tarragona">Tarragona</option>
                    <option value="Teruel">Teruel</option>
                    <option value="Toledo">Toledo</option>
                    <option value="Valencia">Valencia</option>
                    <option value="Valladolid">Valladolid</option>
                    <option value="Zamora">Zamora</option>
                    <option value="Zaragoza">Zaragoza</option>
            </select>
            </fieldset>
            <button onClick={()=> {setDesplegable(false)}}>Cerrar busqueda avanzada</button>
            </section> 
            </form>
           : null
        }
 { localidad ? (
    <section className="titulo" >
    <h2 className="titulo">Resultados de localidad {localidad}</h2>
    <ProductList products={localidadFilter}/>
   </section>) : null }


 { categoria ? (
    <section className="titulo">
    <h2 className="titulo">Resultados de categoria {categoria}</h2>
    <ProductList products={categoryFilter}/>
   </section>) : null }


{ precio ? (
    <section className="titulo">
    <h2 className="titulo">Resultados de precio {precio}</h2>
    <ProductList products={priceFilter}/>
   </section>) : null }
    
    { text ? (
    <section className="titulo">
      <h2 className="titulo">Resultados de {text}</h2>
      <ProductList products={pD}/>
    </section> ) : 

    (<section className="titulo">
        <h2 className="titulo">Echa un vistazo a nuestros nuevos productos</h2>
        <ProductList products={productosDisponiblesHome} />
    </section>)}

    </>
    );

};
