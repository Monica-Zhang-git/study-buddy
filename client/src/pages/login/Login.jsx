import "./login.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  
  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    try {
      await login(user);
      navigate("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Study Buddy</h1>
          <p>
            Discover the Perfect Study Partner with Study Buddy – Elevate Your
            Learning, Together!
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} type="email" placeholder="Email" />
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            <input type="submit" className="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
