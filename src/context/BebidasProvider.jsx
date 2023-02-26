import {createContext, useEffect, useState} from 'react'
import axios from 'axios';

const BebidasContext = createContext();

const BebidasProvider = ({children}) => {
    const [bebidas, setBebidas] = useState([]);
    const [modal, setModal] = useState(false);
    const [bebidaID, setBebidaID] = useState(null);
    const [cargando, setCargando] = useState(false);

    const consultarBebida = async datos => {
        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`;
            const {data} = await axios.get(url);
            setBebidas(data.drinks);
        } catch (error) {
            console.log(error);
        }
    }

    const handleModalClick = e => {
        setModal(!modal);
    }

    const handleBebidaClick = id => {
        setBebidaID(id);
    }
    return(
        <BebidasContext.Provider value={{
            consultarBebida,
            bebidas,
            modal,
            handleModalClick,
            handleBebidaClick,
            bebidaID,
            cargando,
            setCargando
            }}>
            {children}
        </BebidasContext.Provider>
    )
}

export {BebidasContext};

export default BebidasProvider;