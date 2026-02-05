import { useReducer, useRef, useMemo } from "react";
import "./app.css";
const products = [
  { name: "Mela", price: 0.5 },
  { name: "Pane", price: 1.2 },
  { name: "Latte", price: 1.0 },
  { name: "Pasta", price: 0.7 },
  { name: "Tiramisu", price: 3.0 },
  { name: "Sugo", price: 1.79 },
  { name: "Marmellata", price: 2.0 },
];

function App() {
  const topRef = useRef();
  const initialState = [];
  const [state, dispatch] = useReducer(cartReducer, initialState);
  function cartReducer(state, action) {
    switch (action.type) {
      case "ADD_ITEM":
        const productAdded = state.find(
          (item) => item.name === action.payload.name,
        );
        if (productAdded) {
          action.payload.quantity = productAdded.quantity + 1;
        } else {
          return [...state, { ...action.payload, quantity: 1 }];
        }

      case "UPDATE_QUANTITY":
        if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
          return state;
        }
        return state.map((item) =>
          item.name === action.payload.name
            ? { ...item, quantity: action.payload.quantity }
            : item,
        );

      case "REMOVE_ITEM":
        return state.filter((p) => p.name !== action.payload);

      case "CLEAR_ITEM":
        return [];

      default:
        return state;
    }
  }

  const sumToPay = useMemo(() => {
    return state.reduce((tot, curr) => tot + curr.price * curr.quantity, 0);
  }, [state]);

  return (
    <>
      <main>
        <h3 className="title" ref={topRef}>
          Lista prodotti
        </h3>
        <ul>
          {products.map((p, i) => {
            return (
              <li key={i} className="products">
                Nome: <em>{p.name}</em>
                <br />
                Prezzo: <strong>{p.price}€</strong>
                <button
                  onClick={() => dispatch({ type: "ADD_ITEM", payload: p })}
                >
                  Aggiungi
                </button>
              </li>
            );
          })}
        </ul>
        {sumToPay > 0 && (
          <>
            <hr />
            <h3 className="title carrello">Carrello</h3>
            <ul>
              {state?.map((p, i) => {
                return (
                  <li key={i}>
                    Nome: <em>{p.name}</em> <br />
                    Prezzo: <strong>{p.price}€</strong>, Quantitá:
                    <input
                      className="quantity"
                      type="number"
                      min={1}
                      step={1}
                      value={p.quantity}
                      onChange={(e) =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: {
                            name: p.name,
                            quantity: parseInt(e.target.value),
                          },
                        })
                      }
                      required
                    />
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_ITEM", payload: p.name })
                      }
                    >
                      Rimuovi
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              className="svuota"
              onClick={() => dispatch({ type: "CLEAR_ITEM" })}
            >
              Svuota il carrello
            </button>
          </>
        )}
        <h4 className={`title`}>
          Totale:{" "}
          <em
            className={
              sumToPay > 10 ? (sumToPay > 25 ? "red" : "yellow") : "green"
            }
          >
            {sumToPay.toFixed(2)}€
          </em>
        </h4>
        <button
          className="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Torna su
        </button>
      </main>
    </>
  );
}

export default App;
