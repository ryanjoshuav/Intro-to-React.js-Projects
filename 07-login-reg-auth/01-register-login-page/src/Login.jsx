import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "./context/AuthProvider";
import axios from "./api/axios";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //* Authenticate via the api here
    // try {
    //   const resp = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
    //     headers: { "Content-Type": "application/json" },
    //     withCredentials: true,
    //   });
    //   console.log(JSON.stringify(resp?.data));
    //   const accessToken = resp?.data?.accessToken;
    //   const roles = resp?.data?.roles;
    //   setAuth({ user, pwd, roles, accessToken });
    //   setUser("");
    //   setPwd("");
    //   setSuccess(true);
    // } catch (error) {
    //   if (!error?.resp) {
    //     setErrMsg("No Server Response");
    //   } else if (error.resp?.status === 400) {
    //     setErrMsg("Missing Username or Password");
    //   } else if (error.resp?.status === 401) {
    //     setErrMsg("Unauthorized");
    //   } else {
    //     setErrMsg("Login Failed");
    //   }
    //   errRef.current.focus();
    // }
    console.log(`user: ${user} \npw: ${pwd}`);
    setUser("");
    setPwd("");
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />

            <button>Sign in</button>
          </form>
          <p>
            Need an Account? <br />
            <span className="line">
              {/* put router link to register here */}
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};
export default Login;
