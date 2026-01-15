import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "./api/auth";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await resetPassword(token, password)

    if (data.success) {
      toast.success("Password reset successful. You can now log in.");
    } else {
      toast.error(data.message || "Failed to reset password");
    }
  };

  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        <label>New Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
