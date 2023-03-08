import React from "react";
import "./App.css";
import FormComponent from "./components/Form";

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
export const CartContext = React.createContext(cart);

function App() {
  return (
    <CartContext.Provider value={cart}>
      <div className="App">
        <FormComponent />
      </div>
    </CartContext.Provider>
  );
}

export default App;
