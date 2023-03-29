export const getAllProductsService = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}`);
    
    const json = await response.json();

    if(!response.ok){
        throw new Error (json.message);
    }

    return json.data;
};

export const getSingleProductService = async (id) =>{
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/productoId/${id}`);

const json = await response.json();

    if(!response.ok){
        throw new Error(json.message);
    }

    return json.data;
}
export const getUserService = async (id) =>{
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/usuario/${id}`);

const json = await response.json();

    if(!response.ok){
        throw new Error (json.message);
    }

    return json.data;
}

export const registerUserService = async ({user, email, password}) => {
    const response = await fetch (`${process.env.REACT_APP_BACKEND}/register`,{
         method: 'POST',
         headers: {
            'Content-type':'application/json'
         },
         body: JSON.stringify({user, email, password}),
    });

    const json = await response.json();
    if(!response.ok){
        throw new Error(json.message);
    };
};

export const loginUserService = async ({email, password}) => {
    const response = await fetch (`${process.env.REACT_APP_BACKEND}/login`,{
         method: 'POST',
         headers: {
            'Content-type':'application/json'
         },
         body: JSON.stringify({email, password}),
    });

    const json = await response.json();
    if(!response.ok){
        throw new Error(json.message);
    }
    return json.data;
};

export const getMyUserDataService = async ({token}) => {
    const response = await fetch (`${process.env.REACT_APP_BACKEND}/user`,{
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();
    if(!response.ok){
        throw new Error(json.message);
    }
    return json.data;
};  

export const createProductService = async ({data,token}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/producto`,{
        method: 'POST',
        body: data,
        headers: {
            Authorization: token,
        },
    }) ;
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.message);
    }
    return json.data;
};

export const deleteProductService = async ({id,token}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/delproducto/${id}`,{
        method: 'DELETE',
        headers: {
            Authorization: token,
        },
    }) ;
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.message);
    }
   return json.message;
};

export const modifyUser = async ({data,token}) => {
    const response = await fetch (`${process.env.REACT_APP_BACKEND}/user/update`,{ method: 'POST',
    body: data,
    headers: {
        Authorization: token,
    },
}) ;
const json = await response.json();
if(!response.ok){
    throw new Error(json.message);
}
return json.data;
}

export const getByNameService = async (text) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/productoNombre/${text}`);
    
    const json = await response.json();


    if(!response.ok){
        throw new Error (json.message);
    }

    return json.data;

};
export const getByPriceService = async (precio) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/productoPrecio/${precio}`);
    
    const json = await response.json();



    if(!response.ok){
        throw new Error (json.message);
    }

    return json.data;

};
export const getUserProductsService = async (token) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/productoIdUser`, {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    }) ;
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.message);
    }
    console.log(json.data);
    return json.data;
    
};
export const buyProductService = async ({id,token}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/producto/compra/${id}`,{
        method: 'POST',
        headers: {
            Authorization: token,
        },
    }) ;
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.message);
    }
   return json.message;
};
export const aceptProductService = async ({id,token}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/producto/vendido/${id}`,{
        method: 'POST',
        headers: {
            Authorization: token,
        },
    }) ;
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.message);
    }
   return json.message;

}

export const noAceptProductService = async ({id}) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/producto/noVendido/${id}`,{
        method: 'POST'
    }) ;
    const json = await response.json();
    if(!response.ok){
        throw new Error(json.message);
    }
   return json.message;

}
