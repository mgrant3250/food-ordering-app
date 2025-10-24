import {useState} from 'react'
import { Link } from 'react-router-dom'

const Login = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        alert("login successful")
        localStorage.setItem('token', data.token); // store JWT
        localStorage.setItem('user', JSON.stringify({ email: data.email })); // store user info
        onLogin?.(data); // You can store user info or token here
      } else {
        alert("login failed")
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

        {error && <div className="error">{error}</div>}

        <label>Email:</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>

        <p className="demo-info">
          <strong>Demo Login:</strong><br />
          Email: <code>test@example.com</code><br />
          Password: <code>password123</code>
        </p>

        <div className="account-links">
          <Link to="/register">Create Account</Link>
          <a href='#'>Forgot Password?</a>
        </div>
      </form>
    </div>
  );
}

export default Login