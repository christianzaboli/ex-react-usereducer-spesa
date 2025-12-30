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

  function updateProductQuantity(name, newQuantity) {
    if (newQuantity < 1) {
      return;
    }
    setAddedProducts((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  function removeFromCart(name) {
    setAddedProducts((prev) => prev.filter((item) => item.name !== name));
  }

  let sumToPay = addedProducts.reduce((tot, curr) => {
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
                Nome: {p.name}, Prezzo: {p.price}, Quantitá:
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={p.quantity}
                  onChange={(e) =>
                    updateProductQuantity(p.name, Number(e.target.value))
                  }
                  required
                />
                <button onClick={() => removeFromCart(p.name)}>X</button>
              </li>
            );
          })}
        </ul>
        <h4>Totale: {sumToPay.toFixed(2)}</h4>
      </main>
    </>
  );
}

export default App;
