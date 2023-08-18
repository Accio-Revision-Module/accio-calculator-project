import { useState } from "react";
import "./App.css";

function UseStateExample() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <>
      <button onClick={decrement}>-</button>
      <div>Count: {count}</div>
      <button onClick={increment}>+</button>
    </>
  );
}

export default UseStateExample;
