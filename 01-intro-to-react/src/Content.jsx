import ItemList from "./ItemList";

const Content = (props) => {
  const { items, handleCheck, handleDelete } = props;

  return (
    <>
      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>Your List Items is Empty</p>
      )}
    </>
  );
};
export default Content;
