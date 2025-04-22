import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import "/src/styles/login.css";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/main");
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>로그인</h2>
                <form onSubmit={handleSubmit}>
                    <label>이메일</label>
                    <input type="email" placeholder="Email" />

                    <label>비밀번호</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                        />
                    </div>

                    <button type="submit">Log In</button>
                </form>
                <p className="login-guide">
                    아직 회원이 아니신가요?{"\u00A0"} <Link to="/join"><strong>Sign Up</strong></Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
