import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Mail, Lock, User, CheckCircle2, Phone, Eye, EyeOff } from "lucide-react";
import AuthService from "../services/auth.service";
import "./Auth.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setMessage("");
    setSuccessful(false);

    try {
      await AuthService.register(username, email, password, fullName, phoneNumber);
      setMessage("Registration successful! You can now sign in.");
      setSuccessful(true);
      // clear fields
      setUsername(""); setEmail(""); setPassword(""); setConfirmPassword(""); setFullName(""); setPhoneNumber("");
    } catch (error) {
      const resMessage = error.response?.data?.message || "Registration Failed";
      setMessage(resMessage);
      setSuccessful(false);
    }
  };

  const handleGoogleLogin = () => {
    const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
    window.location.href = `${baseUrl}/oauth2/authorization/google`;
  };

  // Basic validation checks
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  return (
    <div className="auth-wrapper">
      <div className="auth-left auth-left-reg">
        <div className="auth-logo-area">
          <ShoppingBag size={28} />
          <span>SanjuStore</span>
        </div>
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3514/3514491.png"
            alt="Shopping Context"
            className="auth-illustration"
            style={{ width: '250px', marginBottom: '2rem' }}
          />
          <h2>Join SanjuStore Today!</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Create your account and start shopping</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-header-actions">
          <span>Already have an account?</span>
          <Link to="/login">Sign in</Link>
        </div>

        <div className="auth-form-card">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Fill in your details to get started</p>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <div className="input-with-icon">
                <User />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-with-icon">
                <User />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-with-icon">
                <Mail />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

            <div className="form-group">
              <div className="input-with-icon" style={{ position: 'relative' }}>
                <Lock />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group" style={{ display: 'flex', gap: '0.5rem' }}>
                <select className="form-control" style={{ width: '80px', paddingLeft: '10px' }}>
                  <option>🇺🇸 +1</option>
                  <option>🇬🇧 +44</option>
                  <option>🇮🇳 +91</option>
                </select>
                <div className="input-with-icon" style={{ flex: 1 }}>
                  <Phone />
                  <input type="text" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
              </div>
            </div>

            <div className="checklist">
              <div className={`checklist-item ${hasMinLength ? 'valid' : ''}`}>
                <CheckCircle2 size={14} /> At least 8 characters
              </div>
              <div className={`checklist-item ${hasUppercase ? 'valid' : ''}`}>
                <CheckCircle2 size={14} /> One uppercase letter
              </div>
              <div className={`checklist-item ${hasNumber ? 'valid' : ''}`}>
                <CheckCircle2 size={14} /> One number
              </div>
            </div>

            <div className="auth-options" style={{ marginTop: '1rem' }}>
              <label style={{ fontSize: '0.85rem' }}>
                <input type="checkbox" required /> I agree to the <Link to="#">Terms of Service & Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" className="btn-primary" style={{ backgroundColor: '#f97316' }}>Create Account</button>

            {message && (
              <div style={{ marginTop: '1rem', color: successful ? 'var(--success-color)' : 'var(--danger-color)', textAlign: 'center' }}>
                {message}
              </div>
            )}
          </form>

          <div className="divider">or continue with</div>

          <div className="social-buttons" style={{ flexDirection: 'row' }}>
            <button type="button" className="btn-outline" style={{ flex: 1 }} onClick={handleGoogleLogin}>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" />
            </button>
            <button type="button" className="btn-outline" style={{ flex: 1 }}>
              <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" width="20" style={{ filter: 'var(--text-primary) === "#f8fafc" ? "invert(1)" : "none"' }} />
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--success-color)' }}>
            <CheckCircle2 size={14} style={{ position: 'relative', top: '2px', marginRight: '4px' }} />
            Your data is safe and secure with us
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
