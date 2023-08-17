import { Link } from "react-router-dom";
import "./register.scss";

function Register(props) {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Register</button>
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
