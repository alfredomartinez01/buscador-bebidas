import {createContext, useEffect, useState} from 'react'
import axios from 'axios';

const CategoriasContext = createContext();

const CategoriasProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]);

    const obtenerCategorias = async () => {
        try {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const {data} = await axios.get(url);

            setCategorias(data.drinks); // Asignamos el resultado a la variable categorias            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtenerCategorias();
    } , []);

    return(
        <CategoriasContext.Provider value={{
            categorias
            }}>
            {children}
        </CategoriasContext.Provider>
    )
}

export {CategoriasContext};

export default CategoriasProvider;