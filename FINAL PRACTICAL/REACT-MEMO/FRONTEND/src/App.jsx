import { useState } from "react";
import MemoizedItemList from "./MemoizedItemList";

export default function App() {
  const [counter, setCounter] = useState(0);
  const [items] = useState(() =>
    Array.from({ length: 1000 }, (_, index) => `Item ${index + 1}`)
  );

  return (
    <main style={{ fontFamily: "Arial, sans-serif", padding: "1rem" }}>
      <h1>React.memo Re-render Demo</h1>
      <p>Counter (unrelated parent state): {counter}</p>
      <button onClick={() => setCounter((value) => value + 1)}>
        Increase Counter
      </button>
      <p>
        Open the browser console and click the button. The list component
        should not re-render.
      </p>
      <MemoizedItemList items={items} />
    </main>
  );
}
