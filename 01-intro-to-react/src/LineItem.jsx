import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({ item, handleCheck, handleDelete }) => {
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={item.checked}
        id={item.id}
        onChange={() => handleCheck(item.id)}
      />
      <label
        style={item.checked ? { textDecoration: "line-through" } : null}
        htmlFor={item.id}
      >
        {item.item}
      </label>
      <FaTrashAlt
        onClick={() => handleDelete(item.id)}
        role="button"
        tabIndex={0}
      />
    </li>
  );
};
export default LineItem;
