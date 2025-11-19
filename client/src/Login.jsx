import {useState, useRef, useCallback} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { fetchLogin } from './api/auth';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      setError('Please enter both email and password.');
      emailRef.current.focus();
      return;
    }else if(!email){
      setError('Please enter in an email')
      emailRef.current.focus();
      return
    }else if(!password){
      setError('Please enter in a password')
      passwordRef.current.focus();
      return
    }

    setLoading(true);

    try {
      const data = await fetchLogin(email, password);;

      if (data.ok && data.success) {
        setError('');
        toast.success("Login Successful");
        const userData = {email: data.email, role: data.role}
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData)); 
        onLogin?.(data);
        navigate("/") 
      } else {
        console.error("Login Failed");
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Error connecting to the server.');
    }
    setLoading(false);
  };

  const handleChange = useCallback((e, callback) => {
    callback(e.target.value.trim());
    setError(prev => prev ? '' : prev)
  }, [])

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <div className="error" role="alert" aria-live="assertive">{error}</div>}

        <label htmlFor='email'>Email:</label>
        <input
          id='email'
          ref={emailRef}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => handleChange(e, setEmail)}
          aria-required="true"
          aria-invalid={!!error}
        />

        <label htmlFor='password'>Password:</label>
        <div className='password-wrapper'>
        <input
          id='password'
          ref={passwordRef}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={(e) => handleChange(e, setPassword)}
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

        <button type="submit" className='submit' disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
          </button>

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