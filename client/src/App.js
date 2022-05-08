import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const axiosJWT = axios.create();

  const refreshToken = async () => {
    try {
      const res = await axios.post("/refresh", { token: user.refreshToken });
      setUser({
        ...user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      });
    } catch (err) {
      console.log(err);
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodeToken = jwt_decode(user.accessToken);

      if (decodeToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "barier " + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", { username, password });
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    setSuccess(false);
    setError(false);
    try {
      await axiosJWT.delete("/users/" + id, {
        headers: { authorization: "barier " + user.accessToken },
      });
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="App bg-gray-100 min-h-screen">
      <div className="login">
        {user ? (
          <div className="text-center">
            <div className="title">
              <p>
                Wellcome to{" "}
                <span className="merah">{user.isAdmin ? "admin" : "user"}</span>{" "}
                dashboard <span className="merah">{user.username}</span>
              </p>
            </div>
            <button className="btn-del" onClick={() => handleDelete(1)}>
              Del User 1
            </button>
            <button className="btn-del mb-5" onClick={() => handleDelete(2)}>
              Del USer 2
            </button>

            {error && (
              <span className="error">
                You are not allowed to delete this user!
              </span>
            )}
            {success && (
              <span className="success">
                User has been deleted successfully...
              </span>
            )}
          </div>
        ) : (
          <div className="card">
            <h1 className="title">Wellcome Clover</h1>
            <form action="" onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                id="username"
                className="inp"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                name="password"
                id="password"
                className="inp"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="btn">
                Log in
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
