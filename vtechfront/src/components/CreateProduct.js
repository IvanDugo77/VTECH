import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { createProductService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import "./CreateProduct.css";



export const CreateProduct = (click) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [sending,setSending] = useState(false);
    const [image,setImage] = useState();
    const {token} = useContext(AuthContext);
   

    const handleForm = async (e) => {
        e.preventDefault();
        
       
        try{
            
            setSending(true);
            const data = new FormData(e.target);
            await createProductService({data,token});
            
            toast.info("Su producto se ha subido con éxito"); 
            
        } catch(error){
            setError(error.message);
        }finally{
            setSending(false);
            setImage(null);
            click = false;
            navigate("/"); 
        }
    }

    return (
        <section className="Create">
            <button onClick={() => navigate("/")}>X</button>
        <form  className="Create" onSubmit={handleForm}>
            <fieldset className="Create">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" required/>
            </fieldset>
            <fieldset className="Create">
                <label htmlFor="decripcion">Descripción</label>
                <input type="text" id="descripcion" name="descripcion" required/>
            </fieldset>
            <fieldset className="Create">
                <label htmlFor="precio">Precio</label>
                <input type="number" id="precio" name="precio" required/>
            </fieldset>
            <fieldset className="Create">
                <label htmlFor="image">Imagen</label>
                <input className="input" type="file" id="image" name="image" required accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
                {image ? <figure><img src={URL.createObjectURL(image)} alt="Preview" style={{width: '100px'}}/></figure> : null}
            </fieldset>
            <fieldset className="Create">
            <label htmlFor="localidad">Localidad</label>
                <select name="localidad" id="localidad">
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
        <fieldset className="Create">
        <label htmlFor="categoria">Categoria</label>
            <select name="categoria" id="categoria">
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
        <button>Subir producto</button>
        {sending ? toast.success(sending) : null}
        {error ? toast.error(error.message) : null}
        </form>
        </section>
    )

    
}