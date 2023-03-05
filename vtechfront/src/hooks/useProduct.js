import { useEffect, useState } from "react";
import { getSingleProductService } from "../services";

const useProduct = (id) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProduct = async () => {
            try{
                setLoading(true);
                const data = await getSingleProductService(id);
                setProduct(data);
            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }
        loadProduct();
    },[id])

    return {product, loading, error};
};


export default useProduct;
