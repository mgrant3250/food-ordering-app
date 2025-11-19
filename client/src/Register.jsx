import { useState, useCallback, useRef, useEffect } from 'react';
import { fetchRegister } from './api/auth';
import { InputField } from './components/InputForm';
import { validateEmail, validatePassword, validateConfirmPassword } from './utils/validation';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    const confirmError = validateConfirmPassword(password, confirmPassword)

  if (emailError) {
    setError(emailError);
    emailRef.current.focus();
    return;
  }

  if (passwordError) {
    setError(passwordError);
    passwordRef.current.focus();
    return;
  }

  if (confirmError) {
    setError(confirmError);
    confirmPasswordRef.current.focus();
    return;
  }

    setLoading(true);

    try {
      const data = await fetchRegister(email, password);

      if (data.ok) {
        setSuccess('Account created successfully!');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const togglePassword = () => {
    setShowPassword(prev => !prev)
  }

  const toggleConfirm = () => {
    setShow(prev => !prev)
  }

  const handleChange = useCallback((e, callback, trim = false) => {
      const value = trim ? e.target.value.trim() : e.target.value;
      callback(value);
      setError(prev => prev ? '' : prev)
    }, [])

  const handleKeyDown = (e, nextRef) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    nextRef.current.focus();
  }
};

const handleBlur = (e) => {
  if (!e.target.checkValidity()) {
    e.target.reportValidity();
  }
};

  useEffect(() => {
  if (success) {
    const timer = setTimeout(() => setSuccess(''), 3000);
    return () => clearTimeout(timer);
  }
}, [success]);

useEffect(() => {
  if (error) {
    const timer = setTimeout(() => setError(''), 3000);
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
          label="Email"
          type="email"
          value={email}
          onChange={(e) => handleChange(e, setEmail)}
          refProp={emailRef}
          showToggle={false}
          onKeyDown={(e) => handleKeyDown(e, passwordRef)}
          onBlur={(e) => handleBlur(e)}
          required
          placeholder="you@example.com"
          aria-required="true"
          aria-invalid={!!error}
        />    

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => handleChange(e, setPassword)}
          refProp={passwordRef}
          showToggle={true}
          showValue={showPassword}
          onToggle={togglePassword}
          className="password-toggle"
          onKeyDown={(e) => handleKeyDown(e, confirmPasswordRef)}
          placeholder="••••••••"
          aria-required="true"
          aria-invalid={!!error}
        />

        <InputField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => handleChange(e, setConfirmPassword)}
          refProp={confirmPasswordRef}
          showToggle={true}
          showValue={show}
          onToggle={toggleConfirm}
          className="password-toggle"
          placeholder="••••••••"
          aria-required="true"
          aria-invalid={!!error}
        />

        <button 
        type="submit" 
        className='submit' 
        disabled={loading}>
          {loading ? "Registering..." : "Register"}
          </button>
      </form>
    </div>
  );
};

export default Register;