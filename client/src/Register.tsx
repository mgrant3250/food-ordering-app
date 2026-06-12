import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
  type FocusEvent,
} from "react";

import { fetchRegister } from "./api/auth";
import { InputField } from "./components/InputForm";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "./utils/validation";

import "./Register.css";

/* -------------------- Types -------------------- */

type RegisterResponse = {
  success: boolean;
  message?: string;
};

type InputRef = React.RefObject<HTMLInputElement | null>;

/* -------------------- Component -------------------- */

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmError = validateConfirmPassword(password, confirmPassword);

    if (emailError) {
      setError(emailError);
      emailRef.current?.focus();
      return;
    }

    if (passwordError) {
      setError(passwordError);
      passwordRef.current?.focus();
      return;
    }

    if (confirmError) {
      setError(confirmError);
      confirmPasswordRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      const data: RegisterResponse = await fetchRegister(email, password);

      if (data.success) {
        setSuccess("Account created successfully!");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirm = () => setShow((prev) => !prev);

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      callback: (value: string) => void,
      trim = false
    ) => {
      const value = trim ? e.target.value.trim() : e.target.value;
      callback(value);
      setError((prev) => (prev ? "" : prev));
    },
    []
  );

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    nextRef: React.RefObject<HTMLInputElement | null>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.checkValidity()) {
      e.target.reportValidity();
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(e, setEmail)
          }
          ref={emailRef}
          showToggle={false}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e, passwordRef)
          }
          onBlur={handleBlur}
          required
          placeholder="you@example.com"
          aria-required="true"
          aria-invalid={!!error}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(e, setPassword)
          }
          ref={passwordRef}
          showToggle={true}
          showValue={showPassword}
          onToggle={togglePassword}
          className="password-toggles"
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e, confirmPasswordRef)
          }
          placeholder="••••••••"
          aria-required="true"
          aria-invalid={!!error}
        />

        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(e, setConfirmPassword)
          }
          ref={confirmPasswordRef}
          showToggle={true}
          showValue={show}
          onToggle={toggleConfirm}
          className="password-toggles"
          placeholder="••••••••"
          aria-required="true"
          aria-invalid={!!error}
        />

        <button type="submit" className="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;