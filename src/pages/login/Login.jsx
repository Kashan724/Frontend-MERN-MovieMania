import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../store/auth.jsx';
import { toast } from "react-toastify";
import './Login.css';
import photo from './photo1.PNG';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const URL = 'http://localhost:4000/api/auth/login';

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("login form", response);

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.token);

        setUser({ email: "", password: "" });
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
        console.log("invalid credential");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt("Please enter your email:");
    if (!email) return;

    try {
      const response = await fetch('http://localhost:4000/api/auth/forgot-password', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("OTP sent to email");
        navigate("/reset-password");
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section-login">
      <div className="login-form-container">
        <div className="login-image">
          <img src={photo} alt=" let's fill the login form " width="500" height="500" />
        </div>
        <div className="login-form">
          <h1 className="main-heading mb-3">Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                id="email"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                required
                autoComplete="off"
                value={user.password}
                onChange={handleInput}
              />
            </div>
            <button type="submit" className="btn btn-submit">Login Now</button>
          </form>
          <button onClick={handleForgotPassword} className="btn btn-forgot-password">Forgot Password?</button>
          <p className="mt-3">Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;

