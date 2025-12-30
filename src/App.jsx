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
    const product = products[i];

    setAddedProducts((prev) =>
      prev.some((item) => item.name === product.name)
        ? prev.map((item) =>
            item.name === product.name
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }]
    );
  }

  function removeFromCart(name) {
    setAddedProducts((prev) => prev.filter((item) => item.name !== name));
  }

  let sumPay = addedProducts.reduce((tot, curr) => {
    return tot + curr.price * curr.quantity;
  }, 0);
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
                <button onClick={() => removeFromCart(p.name)}>X</button>
              </li>
            );
          })}
        </ul>
        <h4>Totale: {sumPay.toFixed(2)}</h4>
      </main>
    </>
  );
}

export default App;
