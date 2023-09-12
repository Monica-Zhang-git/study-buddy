import "./login.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Login Form Validation
const schema = yup.object({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

function Login(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [error, setError] = useState(null);

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
      setError(error.response.data);
    }
  };

  // Function to clear the error state
  const clearError = () => {
    setError(null);
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
            <input {...register("email")} type="email" placeholder="Email" onChange={clearError}/>
            {errors.email && <p className="error">{errors.email?.message}</p>}
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              onChange={clearError}
            />
            {errors.password && (
              <p className="error">{errors.password?.message}</p>
            )}
            {error && <p className="error">{error}</p>}
            <input type="submit" className="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
