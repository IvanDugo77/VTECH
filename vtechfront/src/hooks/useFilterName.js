import { useEffect, useState } from "react";
import { getByNameService } from "../services";

const useFilterName = (text) => {
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    

    useEffect(() => {
        const loadProduct = async () => {
            try{
                setLoading(true);
                const data = await getByNameService(text);
                setFilter(data);
                

            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }
        loadProduct();
    },[text])
   
  
return {filter, loading ,error}
};


export default useFilterName;