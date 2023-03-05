import { useEffect,useState } from "react";
import { getUserService } from "../services";
const useUser = (id) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadUser = async () => {
            try{
                setLoading(true);
                const data = await getUserService(id);
                setUsuario(data);
            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }
        loadUser();
    },[id])

    return {usuario, loading, error};
};

export default useUser;




