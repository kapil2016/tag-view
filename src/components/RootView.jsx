import styles from "./RootView.module.css";
import HelperView from "./HelperView";
import { useState, useRef, useEffect } from "react";
import findElementById from "../utility-functions/findElementById";

const RootView = (props) => {
  const [expend, setExpend] = useState(true);
  const [tagVisibility, setTagVisibility] = useState(true);
  const dataRef = useRef(" ");
  const nameRef = useRef(" ");
  const { name, data, childs, setTree, id } = props;

  function addChildHandler() {
    setTree((tree) => {
      const parent = findElementById(tree, id);
      delete parent["data"];

      if (parent.childs) {
        parent.childs.push({ id: Date.now(), name: "New Child", data: " " });
      } else {
        parent["childs"] = [{ id: Date.now(), name: "New Child", data: " " }];
      }

      return { ...tree };
    });
  }

  function dataChangeHandler(e) {
    e.preventDefault();
    const dataValue = dataRef.current.value;

    setTree((tree) => {
      const parent = findElementById(tree, id);
      parent.data = dataValue;
      dataRef.current.blur();
      return { ...tree };
    });
  }

  function nameChangeHandler(e) {
    e.preventDefault();
    const nameValue = nameRef.current.value;

    setTree((tree) => {
      const parent = findElementById(tree, id);
      parent.name = nameValue;
      return { ...tree };
    });
    
    setTagVisibility(true);
  }

  function tagVisibilityHandler() {
    setTagVisibility(false);
  }

  useEffect(() => {
    if (data && expend) {
      dataRef.current.value = data;
    }
  }, [expend]);


  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          <button
            onClick={() => {
              setExpend((pre) => !pre);
            }}
          >{`${expend ? "V" : ">"}`}</button>
          {tagVisibility && (
            <p className={styles.tag} onClick={tagVisibilityHandler}>
              {name}
            </p>
          )}
          {!tagVisibility && (
            <form onSubmit={nameChangeHandler}>
              <label htmlFor="name"> Name:</label>
              <input id="name" ref={nameRef}></input>
            </form>
          )}
        </div>
        <div className={styles.addChildButtonContainer}>
          <button onClick={addChildHandler}>Add Child</button>
        </div>
      </div>
      {expend && (
        <>
          {data ? (
            <form onSubmit={dataChangeHandler}>
              <label htmlFor="data"> Data:</label>
              <input id="data" ref={dataRef}></input>
            </form>
          ) : (
            <HelperView childs={childs} setTree={setTree}></HelperView>
          )}
        </>
      )}
    </div>
  );
};

export default RootView;
