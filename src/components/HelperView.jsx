import RootView from "./RootView";

const HelperView = (props) => {
  const { childs, setTree } = props;
  return (
    <>
      {childs &&
        childs.map((item) => {
          return (
            <RootView key={item.id} {...item} setTree={setTree}></RootView>
          );
        })}
    </>
  );
};

export default HelperView;
