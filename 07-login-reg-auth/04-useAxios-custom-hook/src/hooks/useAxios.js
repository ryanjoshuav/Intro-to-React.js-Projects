import { useEffect } from "react";
import { useState } from "react";

const useAxios = (configObject) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObject;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  const refetch = () => setReload((prev) => prev + 1);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const resp = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });
        console.log(resp.data);
        setResponse(resp.data);
        setError("");
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    //cleanup
    return () => {
      controller.abort();
    };

    // eslint-disable-next-line
  }, [reload]);

  return [response, error, loading, refetch];
};

export default useAxios;
