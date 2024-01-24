import { useEffect, useState } from "react";

const useAxiosFunction = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState(null);

  const axiosFetch = async (configObject) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObject;

    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);

      const resp = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });
      console.log(resp.data);
      setResponse(resp.data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //cleanup

    return () => {
      controller && controller.abort();
    };

    // eslint-disable-next-line
  }, [controller]);

  return [response, error, loading, axiosFetch];
};

export default useAxiosFunction;
