import Posts from "./components/Posts";
import Jokes from "./components/jokes";

const App = () => {
  return (
    <main className="App">
      <h1>useAxios Hooks</h1>
      <Jokes />
      <Posts />
    </main>
  );
};
export default App;
