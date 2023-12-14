import { useState } from "react";
import { useEffect } from "react";
import CheckOut from "../CheckOut/CheckOut";
import style from "./UpdateOrder.module.css";
import { Button } from "react-bootstrap";

type Item = {
  id: number;
  quantity?: number;
};

type Product = {
  type: string,
  id: number,
  name: string,
  price: number,
  image: string,
  quantity: number,
  token: string,
  qty?: any;
};

interface UpdateOrderProps {
  selectedItems: (Product | Item)[];
  handleAddToSelectedItems: (item: Product | Item) => void;
  handleRemoveSelectedItems: (item: Product | Item) => void;
  handleEditOrder: (updatedOrderInfo: any) => void; 
  orderInfo: any; 
}

export default function UpdateOrder({
  selectedItems,
  handleAddToSelectedItems,
  handleRemoveSelectedItems,
  handleEditOrder,
  orderInfo,
}: UpdateOrderProps) {

  const [tableNumber, setTableNumber] = useState<string>("Table");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (orderInfo && orderInfo.table) {
      setTableNumber(orderInfo.table);
    }
  }, [orderInfo]);

  const tables = ["Table", "1", "2", "3", "4", "5", "TA"];
  const options = tables.map((item) => <option key={item}>{item}</option>);

  const calculateTotal = () => {
    const selectedItemsTotal = selectedItems.reduce(
      (total, item) => {
        if (isProduct(item)) {
          return total + parseFloat(String(item.price)) * (item.qty || 1);
        }
        return total;
      },
      0
    );
  

    const orderInfoTotal =
      orderInfo &&
      Array.isArray(orderInfo.products) &&
      orderInfo.products.reduce(
        (total:number, item:Product) => total + parseFloat(String(item.price)) * item.quantity,
        0
      );

    return selectedItemsTotal + (orderInfoTotal || 0);
  };

  const handleButtonClick = () => {
    const updatedOrderInfo = { ...orderInfo };

    updatedOrderInfo.products = [
      ...updatedOrderInfo.products,
      ...selectedItems,
    ];
    handleEditOrder(updatedOrderInfo);
  };


  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  

  return (

    <section className={style.order}>
      <div className={style.header}>
        <h1>Order</h1>
        <select
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
        >
          {options}
        </select>
      </div>
      <div className={style.items} >
      {orderInfo && orderInfo.products && orderInfo.products.length === 0 ? (
          <div className={style.emptyBasket}>Loading</div>
        ) : (          
          orderInfo &&
          Array.isArray(orderInfo.products) &&
          orderInfo.products.map((item: Product, index: number) => (
            <div key={index} className={style.item} >
              <div>
              {isProduct(item) && (
                <>
                {item.name}
                <br />${(item as Product).price}
                </>
              )}

              </div>
              <div className={style.container}>
                <Button  className={style.add_item} onClick={() => handleAddToSelectedItems(item)}>+</Button>
                <span className={style.qty}>{isProduct(item) ? item.quantity : ''}</span>
                <Button className={style.reduce_item} onClick={() => handleRemoveSelectedItems(item)}>-</Button>
              </div>
            </div>
          ))
        )}
      </div>
      <div  className={style.items}>
        {selectedItems.length === 0 && !orderInfo ? (
          <div className={style.emptyBasket} >No items selected</div>
        ) : (
          selectedItems.map((item, index) => (
            <div key={index} className={style.item}>
              <div>
              {isProduct(item) ? (
                  <>
                {item.name}
                <br />${item.price}
                </>
                ) : (
                  <>
                    Item {item.id}
                  </>
                  )}                

              </div>
              <div className={style.container}>
                <Button className={style.add_item} onClick={() => handleAddToSelectedItems(item as Product)}>+</Button>
                <span className={style.qty}>{isProduct(item) ? item.quantity : ''}</span>
                <Button className={style.reduce_item} onClick={() => handleRemoveSelectedItems(item as Product)}>-</Button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={style.buttons} >
        <div className={style.price}>
          <span>Total</span>
          <span className={style.total}>${calculateTotal()}</span>
        </div>
        <Button  className={style.button_send} onClick={handleButtonClick}>
          {orderInfo ? "Update Order" : "Send"}
        </Button>
        <Button className={style.button} onClick={handleOpenModal}>Check Out</Button>
        {showModal && (
          <CheckOut
            onClose={handleCloseModal}
            id={orderInfo.id}
          />
        )}
      </div>
    </section>
  );
}
function isProduct(item: Item | Product): item is Product {
  return (item as Product).type !== undefined;
}