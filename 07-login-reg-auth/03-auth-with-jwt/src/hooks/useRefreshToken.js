import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const resp = await axios.get("/refresh", {
      withCredentials: true, // to allow sending cookies with the request
    });

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(resp.data.accessToken);
      return {
        ...prev,
        roles: resp.data.roles,
        accessToken: resp.data.accessToken,
      };
    });

    return resp.data.accessToken;
  };
  return refresh;
};
export default useRefreshToken;
