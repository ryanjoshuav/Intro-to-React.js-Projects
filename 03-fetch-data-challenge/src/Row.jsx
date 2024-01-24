import Cell from "./Cell";

const Row = ({ item }) => {
  const renderRow = (obj) => {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return renderRow(value);
      } else {
        return <Cell key={key} cellData={value} />;
      }
    });
  };

  return <tr>{renderRow(item)}</tr>;
};
export default Row;
