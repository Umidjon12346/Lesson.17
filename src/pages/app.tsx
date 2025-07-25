import  { useReducer } from "react";


const initialState = { count: 0 };

function reducer(
  state: typeof initialState,
  action: {type:"increment" |"decrement"}
) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const Counter  = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Count: {state.count}</h1>
      <button onClick={() => dispatch({ type: "decrement" })}>
         Decrement
      </button>
      <button
        onClick={() => dispatch({ type: "increment" })}
        style={{ marginLeft: "10px" }}
      >
        Increment
      </button>
    </div>
  );
};

export default Counter;
