import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../services";
import "./RegisterPage.css";


export const RegisterPage = () => {
   const navigate = useNavigate()
    
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [error,setError] = useState('');
   
    const handleForm = async (e) => {
        e.preventDefault();
        setError("");

        if(pass1!==pass2){
            setError('Las contraseñas no coindiden');
            return;
        }

        try{
            await registerUserService({user,email,password:pass1});
            navigate("/login");

        }catch(error){
            setError(error.message);
            

        }
    };


    return <section>
        
        <form className="register" onSubmit={handleForm}>
        <h2 className="Register">Regístrate</h2>
            <fieldset className="register">
                <label htmlFor="user">Nombre de usuario</label>
                <input className="register" type="text" id="user" name="user" required onChange={(e) => setUser(e.target.value)}/> 
            </fieldset>
           
            <fieldset className="register">
                <label htmlFor="email">Email</label>
                <input className="register" type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)}/> 
            </fieldset>
           
            <fieldset className="register">
                <label htmlFor="pass1">Contraseña</label>
                <input className="register" type="password" id="pass1" name="pass1" required minlength="6" maxLength="15" onChange={(e) => setPass1(e.target.value)}/> 
            </fieldset>
           
            <fieldset className="register">
                <label htmlFor="pass2">Repite la contraseña</label>
                <input className="register" type="password" id="pass2" name="pass2" required minlength="6" maxLength="15" onChange={(e) => setPass2(e.target.value)}/> 
            </fieldset>
            
            <button>Enviar</button>
            {error ? (error) : null}
            
        </form>
    </section>

};