import React, { useContext, useState } from "react";
import Table from "react-bootstrap/Table";
import PiecesField from "./PiecesField";
import { CartContext } from "../App";

function Cart({ handleTotalCost }) {
  const cart = useContext(CartContext);

  const [salesAmount, setSalesAmount] = useState({
    value: cart[0].pieces * cart[0].price,
    id: cart[0].id,
  });

  const handleSalesAmount = (x) => {
    setSalesAmount(x);
  };
  let result;
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Pieces</th>
          <th>Tax</th>
          <th>Sales amount</th>
          <th>Value after tax</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((x) => {
          return (
            <tr key={x.id}>
              <td>{x.id}</td>
              <td>{x.name}</td>
              <td>
                <img width={70} height={70} src={x.image} alt="img" />
              </td>
              <td>{x.price}</td>
              <td>
                <PiecesField
                  initialQuantity={x.pieces}
                  price={x.price}
                  xId={x.id}
                  handleSalesAmount={handleSalesAmount}
                />
              </td>
              <td>{x.tax} %</td>
              <td>{x.id === salesAmount.id && { ...salesAmount }.value} $</td>
              <td>
                {x.id === salesAmount.id &&
                  (x.tax / 100) * { ...salesAmount }.value +
                    { ...salesAmount }.value}
                $
              </td>
            </tr>
          );
        })}
        <tr>
          <td colSpan={8}>
            <span className="fs-3 px-4">Total</span> :
            <span className="fs-3 px-4">
              {cart
                .map(
                  (product) =>
                    (product.tax / 100) * salesAmount.value + salesAmount.value
                )
                .reduce((x, y) => x + y, 0)}
              $
            </span>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Cart;
