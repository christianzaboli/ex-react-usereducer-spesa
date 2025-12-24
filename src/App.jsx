import { useState, useReducer } from "react";

const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];
function App() {
  const [addedProducts, setAddedProducts] = useState([]);
  function addToCart(i) {
    const cartItem = { ...products[i], quantity: 1 };
    if (
      addedProducts.length > 0 &&
      addedProducts.some((e) => e.name === cartItem.name)
    ) {
      return;
    } else {
      setAddedProducts([...addedProducts, cartItem]);
      console.log(addedProducts.includes(cartItem));
    }
  }
  return (
    <>
      <main>
        <h3>Lista prodotti</h3>
        <ul>
          {products.map((p, i) => {
            return (
              <li key={i}>
                Nome: {p.name} Prezzo: {p.price}$
                <button onClick={() => addToCart(i)}>+</button>
              </li>
            );
          })}
        </ul>
        <h3>Carrello</h3>
        <ul>
          {addedProducts?.map((p, i) => {
            return (
              <li key={i}>
                Nome: {p.name}, Prezzo: {p.price}, Quantitá: {p.quantity}
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}

export default App;
