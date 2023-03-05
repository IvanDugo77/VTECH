import { ErrorMessage } from "../components/ErrorMessage";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { ProductFull } from "../components/ProductFull";

export const ProductPage = () => {
    const {id} = useParams();
    const { product, loading, error } = useProduct(id);

  

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <ErrorMessage message={error}/>;

    return (
        <section>
            <ProductFull product={product}/>
        </section>
    );
};