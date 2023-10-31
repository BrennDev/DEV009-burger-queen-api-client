import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { Product } from '../../pages/Waiter/OrdersList';
import Table from 'react-bootstrap/Table';
import style from './MainOrder.module.css'
import { useState, useEffect } from 'react';
import IconoDelete from '../../assets/IconoDelete.png'


type MainOrderProps = {
  selectedProducts: Product[];
  setSelectedProducts: (products: Product[]) => void; // Agregar función para actualizar selectedProducts
}

const MainOrder: React.FC<MainOrderProps> = ({ selectedProducts, setSelectedProducts }) => {
  const [order, setOrder] = useState<Product[]>(selectedProducts);


  useEffect(() => {
    setOrder(selectedProducts);
  }, [selectedProducts]);

  const addProduct = (product: Product) => {
    const index = order.findIndex((p) => p.id === product.id);
    if (index === -1) {
      setOrder([...order, { ...product, quantity: 1 }]);
    } else {
      const updatedOrder = [...order];
      updatedOrder[index].quantity += 1;
      setOrder(updatedOrder);
    }

    // Actualizar selectedProducts
    const updatedSelectedProducts = selectedProducts.map((p) =>
      p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
    );
    setSelectedProducts(updatedSelectedProducts);
  };

  const removeProduct = (product: Product) => {
    const index = order.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      const updatedOrder = [...order];
      if (updatedOrder[index].quantity > 1) {
        updatedOrder[index].quantity -= 1;
      } else {
        updatedOrder.splice(index, 1);
      }
      setOrder(updatedOrder);
    }

    // Actualizar selectedProducts
    const updatedSelectedProducts = selectedProducts.map((p) =>
      p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
    );
    setSelectedProducts(updatedSelectedProducts);
  };

  const calculateTotal = () => {
    return selectedProducts.reduce(
      (total, product) => total + (product.price * product.quantity),
      0
      );
    };
    
  

    return (
      <>
        <Container className={style.Container_order}>
          <section>
            <Form>
              <Row>
                <Col>
                  <Form.Label>Client</Form.Label>
                  <Form.Control placeholder="Client name" />
                </Col>
                <Col>
                  <Form.Label>Table</Form.Label>
                  <Form.Control placeholder="# Table" />
                </Col>
              </Row>
            </Form>
          </section>
          <section>
            <div>
              <h2>ORDER</h2>
              <Table striped size="sm">
                <thead>
                  <tr>
                    <th></th>
                    <th>+</th>
                    <th></th>
                    <th>-</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {order.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeProduct(product)}
                        >
                          -
                        </Button>
                      </td>
                      <td>{product.quantity}</td>
                      <td width='10px'>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => addProduct(product)}
                        >
                          +
                        </Button>
                      </td>
                      <td>${(product.price * product.quantity).toFixed(2)}</td>
                      <td><img src={IconoDelete} alt="Delete" width="30px" height="25px" /></td>
                    </tr>
                  ))}
                  <tr> <td colSpan={6}>
                    <strong>TOTAL: ${calculateTotal()}</strong>
                  </td>
                  </tr>
                </tbody>
              </Table>
              <Button type="submit" size="sm" data-testid="send_order">
                Send
              </Button>
            </div>
          </section>
        </Container>
      </>
    );
  };

  export default MainOrder;