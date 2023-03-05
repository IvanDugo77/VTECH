import { useContext, useState } from "react"; 
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { loginUserService } from "../services";
import { toast } from "react-toastify";
import "./LoginPage.css";
export const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useContext(AuthContext)
    const navigate = useNavigate();
 
    const handleForm = async (e) => {
        e.preventDefault();
        setError('');
        
        try{
            const data = await loginUserService({email,password});

            login(data);
            navigate("/");
            toast.success("Te has logueado correctamente")

        }catch(error){
            setError(error.message);

        }
    }

    return <section className="login">
        <form  className="login" onSubmit={handleForm}>
        <h2 className="login">Inicia sesión</h2>
            <fieldset className="login">
                <label htmlFor ="email">Email</label>
                <input type="email" id="email" name="email" required onChange={(e)=> setEmail(e.target.value)} />
            </fieldset>
            <fieldset className="login">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" 
                required onChange={(e)=> setPassword(e.target.value)}/>
 
            </fieldset>
            <button>Enviar</button>
        {error ? <p>{error}</p> : null}
        </form>
    </section>
};