const Login = () => {
  return (
    <div className="login">
      <div className="card">
        <h1 className="title">Wellcome Clover</h1>
        <form action="">
          <input type="text" name="username" id="username" className="inp" />
          <input
            type="password"
            name="password"
            id="password"
            className="inp"
          />
          <button type="submit" className="btn">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
