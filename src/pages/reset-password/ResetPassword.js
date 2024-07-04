import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './ResetPassword.css';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://deployment-mern-moviemania.vercel.app/api/auth/reset-password', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Password has been reset successfully");
        navigate("/login");
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section-reset-password">
      <div className="reset-password-form-container">
        <h1 className="main-heading mb-3">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              id="email"
              required
              autoComplete="off"
              value={formData.email}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              id="otp"
              required
              autoComplete="off"
              value={formData.otp}
              onChange={handleInput}
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              id="newPassword"
              required
              autoComplete="off"
              value={formData.newPassword}
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="btn btn-submit">Reset Password</button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
