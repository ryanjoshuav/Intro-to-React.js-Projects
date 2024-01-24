import Header from "./Header";
import Row from "./Row";

const Table = ({ items }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <Header items={items} />
        </thead>
        <tbody>
          {items.map((item) => (
            <Row key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
