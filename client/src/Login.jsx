import {useState} from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setError('');
        toast.success("Login Successful");
        const userData = {email: data.email, role: data.role}
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData)); 
        onLogin?.(data); 
      } else {
        toast.error("Login Failed");
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Error connecting to the server.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <div className="error" role="alert" aria-live="assertive">{error}</div>}

        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-required="true"
          aria-invalid={!!error}
        />

        <label htmlFor='password'>Password:</label>
        <div className='password-wrapper'>
        <input
          id='password'
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-required="true"
          aria-invalid={!!error}
        />

        <button
          type="button"
          onClick={togglePassword}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="password-toggle"
        >
          {showPassword ? "hide" : "show"}
        </button>
        </div>

        <button type="submit" className='submit'>Log In</button>

        <p className="demo-info">
          <strong>Demo Login:</strong><br />
          Email: <code>test@example.com</code><br />
          Password: <code>password123</code>
        </p>

        <div className="account-links">
          <Link to="/register" aria-label='Create a new acount'>Create Account</Link>
          <a href='#' aria-label='Reset your password'>Forgot Password?</a>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login