import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ResetPassword.css";

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("resetToken"); 

        if (!token) {
            setMessage("Reset token not found. Please request a new one.");
            return;
        }

        try {
            const res = await axios.post("https://construction-material-recommendation-system-backend.vercel.app/reset-password", { token, new_password: newPassword });
            setMessage(res.data.message);
            localStorage.removeItem("resetToken"); 
        } catch (err) {
            setMessage(err.response.data.message || "Something went wrong");
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-wrapper">
                <h2 className="reset-password-title">Reset Password</h2>
                <form onSubmit={handleSubmit} className="reset-password-form">
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <button type="submit" className="submit-btn">Reset Password</button>
                </form>
                {message && <p className="message">{message}</p>}
                <p className="login-link">
                    Remembered your password? <Link to="/login" className="login-link-btn">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default ResetPassword;
