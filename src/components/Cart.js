import React, { useContext, useState } from "react";
import Table from "react-bootstrap/Table";
import PiecesField from "./PiecesField";
import { CartContext } from "../App";
import { TotalCostContext } from "./Form";

function Cart({ handleTotalCost }) {
  const cart = useContext(CartContext);

  const salesAmountOfProd = cart.map((x) => {
    return { value: x.pieces * x.price, id: x.id };
  });

  const getSalesAmount = (x) => {
    return (
      salesAmountOfProd.find((y) => y.id === x.id) &&
      salesAmountOfProd.find((y) => y.id === x.id).value
    );
  };

  // console.log(salesAmountOfProd.find((y) => y.id === 3345).value);

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
          <th>Total after tax</th>
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
                  getSalesAmount={getSalesAmount}
                />
              </td>
              <td>{x.tax} %</td>
              <td>{getSalesAmount(x)} $</td>
              <td>{(x.tax / 100) * getSalesAmount(x) + getSalesAmount(x)} $</td>
            </tr>
          );
        })}
        <tr>
          <td colSpan={8}>
            <span className="fs-3 px-4">Total</span> :
            <span className="fs-3 px-4">
              {cart.reduce((x, y) => {
                let cost =
                  (x.tax / 100) * getSalesAmount(x) +
                  getSalesAmount(x) +
                  (y.tax / 100) * getSalesAmount(y) +
                  getSalesAmount(y);
                handleTotalCost(cost);
                return cost;
              })}
              $
            </span>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Cart;
