import Form from "./components/Form";
import ProgressBar from "./components/ProgressBar";
import { FormProvider } from "./context/FormContext";

const App = () => {
  return (
    <FormProvider>
      <ProgressBar />
      <Form />
    </FormProvider>
  );
};
export default App;
