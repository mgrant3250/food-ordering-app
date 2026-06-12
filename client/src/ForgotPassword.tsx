import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import { forgotPassword } from "./store/authSlice";
import { toast } from "react-toastify";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");

  const emailRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      emailRef.current?.focus();
      return;
    }

    const result = await dispatch(
      forgotPassword(email.trim().toLowerCase())
    );

    if (forgotPassword.fulfilled.match(result)) {
      if (result.payload.success) {
        toast.success("Password reset link sent to your email");
        setEmail("");
      } else {
        toast.error(
          result.payload.message || "Error sending reset email"
        );
      }
    }
  };

  return (
    <div className="forgot-container">
      <form className="forgot-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>

        {error && <p className="error">{error}</p>}

        <label htmlFor="email">Email:</label>

        <input
          id="email"
          ref={emailRef}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p>
          <a href="/login">Back to login</a>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;