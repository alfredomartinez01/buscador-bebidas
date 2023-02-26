import { Button, Form, Row, Col, Alert } from 'react-bootstrap';
import useCategorias from '../hooks/useCategorias';
import useBebidas from '../hooks/useBebidas';
import { useState } from 'react'

function Formulario() {

    const [busqueda, setBusqueda] = useState({
        bebida: '',
        categoria: ''
    });
    const [alerta, setAlerta] = useState("");

    const { categorias } = useCategorias();
    const { consultarBebida } = useBebidas();

    const handleSubmit = e => {
        e.preventDefault();
        
        if(Object.values(busqueda).includes('')) {
            setAlerta('Todos los campos son obligatorios');
            return;
        }
        setAlerta("");
        consultarBebida(busqueda);
    }

    return (
        <Form onSubmit={handleSubmit}>

            {
                alerta && <Alert variant="danger" className="text-center">{alerta}</Alert>
            }
            {/* Usando media-queries con componentes de bootstrap */}
            <Row>
                <Col md={6}>
                    {/* Creamos un input usando el componente de Form */}
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor='bebida'>Nombre de bebida</Form.Label>
                        <Form.Control type="text" placeholder="Buscar bebida" name='bebida' id="bebida" value={busqueda.nombre} onChange={e => setBusqueda({
                            ...busqueda,
                            [e.target.name]: e.target.value
                        })} />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor='categoria'>Categoría</Form.Label>
                        <Form.Select name='categoria' id="categoria" value={busqueda.categoria} onChange={e => setBusqueda({
                            ...busqueda,
                            [e.target.name]: e.target.value
                        })} >
                            <option value="">-- Selecciona una categoría --</option>

                            {
                                categorias.map(categoria => (
                                    <option key={categoria.strCategory} value={categoria.strCategory}>{categoria.strCategory}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-end">
                <Col md={3}>
                    <Button variant="danger" type="submit" className="text-uppercase w-100">
                        Buscar bebidas
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default Formulario