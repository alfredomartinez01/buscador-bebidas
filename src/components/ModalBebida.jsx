import { Modal, Image } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import useBebidas from '../hooks/useBebidas'
import axios from 'axios'

const ModalBebida = () => {

    const [bebida, setBebida] = useState({});
    const { modal, handleModalClick, bebidaID, cargando, setCargando } = useBebidas();

    /* Consultando la bebida con su ID */
    useEffect(() => {
        const consultarBebida = async () => {
            try {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaID}`;
                const { data } = await axios.get(url);

                setBebida(data.drinks[0]);
            } catch (error) {
                console.log(error);
            } finally {
                setCargando(false);
            }
        }
        if (modal) consultarBebida();
    }, [bebidaID])

    /* Hacemos una función que comprueba que las propiedades referentes a los ingredientes no tengan null para mostrarlos */
    const mostrarIngredientes = () => {
        let ingredientes = [];

        for (let i = 1; i < 16; i++) {
            if (bebida[`strIngredient${i}`]) {
                ingredientes.push(
                    <li>{bebida[`strIngredient${i}`]} - {bebida[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredientes;
    }

    return (
        (
            !cargando && (
                <Modal show={modal} onHide={handleModalClick}>
                    <Image src={bebida.strDrinkThumb} alt={`Imagen de ${bebida.strDrink}`} fluid />

                    <Modal.Header>
                        <Modal.Title>{bebida.strDrink}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="p-3">
                            <h2 className="text-center">Instrucciones</h2>
                            <p>{bebida.strInstructions}</p>
                            <h2 className="mt-4">Ingredientes y cantidades</h2>
                            {mostrarIngredientes()}
                        </div>
                    </Modal.Body>
                </Modal>
            )
        )

    )
}

export default ModalBebida