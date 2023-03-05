import { useContext, useState } from "react";
import { AuthContext} from "../context/AuthContext";
import { toast } from "react-toastify";
import { modifyUser } from "../services";
import { useNavigate } from "react-router";
import "./ModifyUser.css";

export const ModifyUser = () => {
    const navigate = useNavigate()
    const {token} = useContext(AuthContext);
    const [image, setImage] = useState();
  
   
   

    const handleForm = async (e) => {
        e.preventDefault();
        
       
        try{
            const data = new FormData(e.target);
            await modifyUser({data,token});
           
            toast.success("Su perfil se ha actualizado correctamente"); 
            
        } catch(error){
            toast.error(error.message);
        }finally{
            navigate(`/`)
        }

    }
    return(
       <form className="formM" onSubmit={handleForm}>
            <fieldset className="formM">
                <label htmlFor="biografia">Biografia</label>
                <input type="text" id="biografia" name="biografia" required/>
            </fieldset>
            <fieldset className="formM">
                <label htmlFor="image">Imagen</label>
                <input type="file" id="image" name="image" required accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
                {image ? <figure><img src={URL.createObjectURL(image)} alt="Preview" style={{width: '100px'}}/></figure> : null}
            </fieldset>
            <button>Actualizar perfil</button>
        </form>
    )
    
};