import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import "/src/styles/login.css";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // 기본 submit 동작(새로고침) 방지
        navigate("/main");  // 메인 페이지로 이동
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h2>로그인</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input type="email" placeholder="이메일" />

                    <label>Password</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="비밀번호"
                        />
                    </div>

                    <button type="submit">Log In</button>
                </form>
                <p>
                    아직 회원이 아니신가요? <Link to="/join"><strong>Sign Up</strong></Link>
                </p>
            </div>
        </div>
    );
}

export default Login;