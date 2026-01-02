import {useState, useRef, useCallback, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './store/authSlice';
import "./Login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state) => state.auth);

   useEffect(() => {
    if (token) {
    toast.success("Login Successful", { autoClose: 3000, closeOnClick: true });
    const timer = setTimeout(() => navigate("/"), 200);
    return () => clearTimeout(timer);
    }
  }, [token, navigate]);

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      toast.error("Please enter both email and password")
      emailRef.current.focus();
      return;
    }else if(!email){
      toast.error("Please enter email")
      emailRef.current.focus();
      return
    }else if(!password){
      toast.error("Please enter password");
      passwordRef.current.focus();
      return
    }

    dispatch(loginUser({ email, password }));
  };

   const handleChange = useCallback((e, callback) => {
    callback(e.target.value.trim());
  }, []);

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
          <Link to="/forgot-password" aria-label="Reset your password">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login