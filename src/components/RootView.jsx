import styles from "./RootView.module.css";

import { useState, useRef, useEffect } from "react";
import findElementById from "../utility-functions/findElementById";

const RootView = (props) => {
  const [expend, setExpend] = useState(true);
  const [tagVisibility, setTagVisibility] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const nameRef = useRef(" ");
  const { name, data, childs, setTree, id } = props;

  function addChildHandler() {
    setTree((tree) => {
      const parent = findElementById(tree, id);
      delete parent["data"];

      if (parent.childs) {
        parent.childs.push({ id: Date.now(), name: "New Child", data: "data" });
      } else {
        parent["childs"] = [{ id: Date.now(), name: "New Child", data: "data" }];
      }

      return { ...tree };
    });
  }

  function valueChangeHandler(e) {
    // e.preventDefault();
    const dataValue = e.target.value;

    setTree((tree) => {
      const parent = findElementById(tree, id);
      parent.data = dataValue;
      // dataRef.current.blur();
      return { ...tree };
    });
    setInputValue(dataValue);
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
      setInputValue(data);
    }
  }, [expend , data]);

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
          {typeof(data) === "string"? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label htmlFor="data"> Data:</label>
              <input
                id="data"
                value={inputValue}
                onChange={valueChangeHandler}
              ></input>
            </form>
          ) : (
            childs &&
            childs.map((item) => {
              return (
                <RootView key={item.id} {...item} setTree={setTree}></RootView>
              );
            })
          )}
        </>
      )}
    </div>
  );
};

export default RootView;
