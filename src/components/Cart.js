import React from "react";
import Table from "react-bootstrap/Table";
import PiecesField from "./PiecesField";
function Cart() {
  let cart = [
    {
      id: 678,
      name: "T-shirt",
      price: 122,
      tax: 10,
      pieces: 1,
      image:
        "https://cdn.pixabay.com/photo/2016/12/06/09/30/blank-1886001__340.png",
    },
    {
      id: 3345,
      name: "Head Phones",
      price: 143,
      tax: 10,
      pieces: 1,
      image:
        "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGhlYWRwaG9uZXN8ZW58MHx8MHx8&w=1000&q=80",
    },
  ];

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
                <PiecesField initialQuantity={x.pieces} />
              </td>
              <td>{x.tax} %</td>
              <td>{x.price * x.pieces} $</td>
              <td>{(x.tax / 100) * x.price * x.pieces + x.price} $</td>
            </tr>
          );
        })}
        <tr>
          <td colSpan={2}>
            Total :
            {cart.reduce(
              (x, y) =>
                (x.tax / 100) * x.price * x.pieces +
                x.price +
                (y.tax / 100) * y.price * y.pieces +
                y.price
            )}
            $
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Cart;
