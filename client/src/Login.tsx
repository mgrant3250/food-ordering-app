import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch} from "./store/store";
import { loginUser } from "./store/authSlice";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector(
  (state: RootState) => state.auth
);

  useEffect(() => {
    if (token) {
      toast.success("Login Successful", {
        autoClose: 3000,
        closeOnClick: true,
      });

      const timer = setTimeout(() => navigate("/"), 200);

      return () => clearTimeout(timer);
    }
  }, [token, navigate]);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!email && !password) {
      toast.error("Please enter both email and password");
      emailRef.current?.focus();
      return;
    }

    if (!email) {
      toast.error("Please enter email");
      emailRef.current?.focus();
      return;
    }

    if (!password) {
      toast.error("Please enter password");
      passwordRef.current?.focus();
      return;
    }

    await dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      setter: React.Dispatch<React.SetStateAction<string>>
    ) => {
      setter(e.target.value.trim());
    },
    []
  );

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && (
          <div
            className="error"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}

        <label htmlFor="email">Email:</label>

        <input
          id="email"
          ref={emailRef}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => handleChange(e, setEmail)}
          aria-required="true"
          aria-invalid={!!error}
        />

        <label htmlFor="password">Password:</label>

        <div className="password-wrapper">
          <input
            id="password"
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
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            className="password-toggle-login"
          >
            {showPassword ? "hide" : "show"}
          </button>
        </div>

        <button
          type="submit"
          className="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="demo-info">
          <strong>Demo Login:</strong>
          <br />
          Email: <code>test@example.com</code>
          <br />
          Password: <code>password123</code>
        </p>

        <div className="account-links">
          <Link
            to="/register"
            aria-label="Create a new account"
          >
            Create Account
          </Link>

          <Link
            to="/forgot-password"
            aria-label="Reset your password"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;