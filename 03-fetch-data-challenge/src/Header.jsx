const Header = ({ items }) => {
  const renderRow = (obj) => {
    let headers = [];

    const processObject = (obj) => {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "object" && value !== null) {
          processObject(value);
        } else {
          headers.push(key);
        }
      }
    };

    if (obj && obj.length) {
      processObject(obj[0]);
    }
    return headers.map((header) => <th key={Math.random() * 900}>{header}</th>);
  };
  return <tr>{renderRow(items)}</tr>;
};
export default Header;
