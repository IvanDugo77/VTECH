import { useEffect, useState } from "react";
import { getAllProductsService } from "../services";

const useProducts= () => {
 const [products, setProducts] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');

 useEffect(() => {
    const loadProducts = async () => {
        try {
            setLoading(true);
           
            const data = await getAllProductsService();
            setProducts(data);
            
        } catch (error) {
            setError(error.message);
        
        } finally {
            setLoading(false);
        }
    }
    loadProducts();
  }, []);

 return { products, loading, error };
};

export default useProducts;