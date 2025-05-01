import { useState } from "react";
import "./LoginRegister.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { email, password };

    try {
      const response = await fetch("https://material-recommendation-backend.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);

      if (response.ok) {
        navigate('/home');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtext">Login to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              placeholder="Enter your email"
            />
          </div>
          <div className="input-field">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              placeholder="Enter your password"
            />
          </div>
          <div className="options-row">
            <label className="remember-label">
              <input 
                type="checkbox" 
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
          </div>
          <button type="submit" className="login-btn">Login</button>
          <div className="register-link">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
