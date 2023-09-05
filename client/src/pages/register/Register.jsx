import { Link } from "react-router-dom";
import "./register.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";

// Register form validation
const schema = yup
  .object({
    userName: yup.string().max(20).required("Username is required"),
    email: yup
      .string()
      .email("Email must be valid")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number"
      ),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

function Register(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const user = {
      userName: data.userName,
      email: data.email,
      password: data.password,
    };
    try {
      await makeRequest.post("/auth/register", user);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Input user name */}
            <input
              {...register("userName")}
              type="text"
              placeholder="Username"
            />
            {errors.userName && <p>{errors.userName?.message}</p>}

            {/* Input email address */}
            <input {...register("email")} type="email" placeholder="Email" />
            {errors.email && <p>{errors.email?.message}</p>}

            {/* Input password and validate the password */}
            <input
              {...register("password")}
              type="password"
              placeholder="Input Password"
            />
            {errors.password && <p>{errors.password?.message}</p>}

            {/* Input password again and validate the password */}
            <input
              {...register("passwordConfirmation")}
              type="password"
              placeholder="Confirm Password"
            />
            {errors.passwordConfirmation && (
              <p>{errors.passwordConfirmation?.message}</p>
            )}

            <input type="submit" className="submit" />
          </form>
        </div>
        <div className="right">
          <h1>Study Buddy</h1>
          <p>
            Discover the Perfect Study Partner with Study Buddy – Elevate Your
            Learning, Together!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
