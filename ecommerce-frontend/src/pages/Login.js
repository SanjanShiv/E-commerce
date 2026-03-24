import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthService from "../services/auth.service";
import "./Auth.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await AuthService.login(username, password);
      window.location.href = "/";
    } catch (error) {
      const resMessage = error.response?.data?.message || error.message || "Invalid Credentials";
      setMessage(resMessage);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <div className="auth-logo-area">
          <ShoppingBag size={28} />
          <span>SanjuStore</span>
        </div>
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3514/3514491.png"
            alt="Shopping"
            className="auth-illustration"
            style={{ width: '250px', marginBottom: '2rem' }}
          />
          <h2>Welcome Back!</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to your account to continue shopping</p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-header-actions">
          <span>New here?</span>
          <Link to="/register">Create Account</Link>
        </div>

        <div className="auth-form-card">
          <h1 className="auth-title">Sign In</h1>
          <p className="auth-subtitle">Enter your credentials to access your account</p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <div className="input-with-icon">
                <Mail />
                <input
                  type="text"
                  placeholder="Email address or Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-with-icon" style={{ position: 'relative' }}>
                <Lock />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="auth-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="#">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn-primary">Sign In</button>

            {message && (
              <div style={{ marginTop: '1rem', color: 'var(--danger-color)', textAlign: 'center' }}>
                {message}
              </div>
            )}
          </form>

          <div className="divider">or continue with</div>

          <div className="social-buttons">
            <button type="button" className="btn-outline" onClick={handleGoogleLogin}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" />
              Continue with Google
            </button>
            <button type="button" className="btn-outline">
              <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" width="20" style={{ filter: 'var(--text-primary) === "#f8fafc" ? "invert(1)" : "none"' }} />
              Continue with Apple
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 'bold', textDecoration: 'none' }}>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
