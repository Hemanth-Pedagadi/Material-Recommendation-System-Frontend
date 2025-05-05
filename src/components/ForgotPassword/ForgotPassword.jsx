import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [showResetButton, setShowResetButton] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://construction-material-recommendation-system-backend.vercel.app/forgot-password", { email });
            setMessage(res.data.message + ". Token: " + res.data.token);
            localStorage.setItem("resetToken", res.data.token);
            setShowResetButton(true);
        } catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-wrapper">
                <h2>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            className="input-field"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button className="submit-btn" type="submit">Send Reset Link</button>
                </form>
                {message && <p className="message">{message}</p>}
                {showResetButton && (
                    <div className="reset-link-container">
                        <Link to="/reset-password">
                            <button className="reset-btn">Reset Password</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
