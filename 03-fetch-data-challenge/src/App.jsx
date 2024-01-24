import { useEffect, useState } from "react";
import Form from "./Form";
import List from "./List";
import Table from "./Table";

function App() {
  const API_URL = "https://jsonplaceholder.typicode.com/";
  const [reqType, setReqType] = useState("users");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      console.log(reqType);
      try {
        const resp = await fetch(`${API_URL}${reqType}`);
        if (!resp.ok) throw Error("Did not receive expected data");
        const data = await resp.json();
        setItems(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchItems();
  }, [reqType]);

  return (
    <div className="App">
      <Form reqType={reqType} setReqType={setReqType} />
      {/* <List items={items} /> */}
      <Table items={items} />
    </div>
  );
}

export default App;
