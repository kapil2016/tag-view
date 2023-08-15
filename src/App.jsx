import RootView from "./components/RootView";
import removeIdProperty from "./utility-functions/removeIdProperty";
import { useState } from "react";

export default function App() {
  const [tree, setTree] = useState({
    id: Date.now(),
    name: "root",
    data: "root",
  });
  
  const [showData, setShowData] = useState(false);

  function exportDataHandler() {
    setShowData(true);
  }

  return (
    <main>
      <RootView {...tree} setTree={setTree}></RootView>
      <button
        style={{ margin: "2rem", padding: "0.5rem" }}
        onClick={exportDataHandler}
      >
        Export
      </button>
      {showData && <p>{JSON.stringify(removeIdProperty(tree))}</p>}
    </main>
  );
}
