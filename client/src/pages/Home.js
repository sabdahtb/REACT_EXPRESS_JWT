import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="login">
      <div className="text-center">
        <div className="title">Wellcome Clover</div>
        <Link to={"/login"}>
          <p className="logout">Log Out</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
