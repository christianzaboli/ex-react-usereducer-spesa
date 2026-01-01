import { useState, useReducer } from "react";

const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
];

function App() {
  const initialState = [];
  const [state, dispatch] = useReducer(cartReducer, initialState);
  function cartReducer(state, action) {
    switch (action.type) {
      case "ADD_ITEM":
        const isProductAdded = state.some(
          (item) => item.name === action.payload.name
        );
        if (isProductAdded) {
          return state;
        } else {
          return [...state, { ...action.payload, quantity: 1 }];
        }

      case "REMOVE_ITEM":
        return state.filter((p) => p.name !== action.payload);

      case "UPDATE_QUANTITY":
        if (action.payload.number < 1) {
          return state;
        }
        return state.map((item) =>
          item.name === action.payload.name
            ? { ...item, quantity: action.payload.number }
            : item
        );
      default:
        return state;
    }
  }

  let sumToPay = state.reduce((tot, curr) => {
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
                <button
                  onClick={() => dispatch({ type: "ADD_ITEM", payload: p })}
                >
                  +
                </button>
              </li>
            );
          })}
        </ul>
        <h3>Carrello</h3>
        <ul>
          {state?.map((p, i) => {
            return (
              <li key={i}>
                Nome: {p.name}, Prezzo: {p.price}, Quantitá:
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={p.quantity}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_QUANTITY",
                      payload: { number: Number(e.target.value), name: p.name },
                    })
                  }
                  required
                />
                <button
                  onClick={() =>
                    dispatch({ type: "REMOVE_ITEM", payload: p.name })
                  }
                >
                  X
                </button>
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
