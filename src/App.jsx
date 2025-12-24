import { useState, useReducer } from "react";

const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];
function App() {
  return (
    <>
      <main>
        <ul>
          {products.map((p) => {
            return (
              <li>
                Nome: {p.name} Prezzo: {p.price}$
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}

export default App;
