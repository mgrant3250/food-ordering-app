import {useState} from 'react'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (email === 'test@example.com' && password === 'password123') {
      setError('');
      onLogin?.({ email }); 
    } else {
      setError('Invalid email or password.');
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
      </form>
    </div>
  );
}

export default Login