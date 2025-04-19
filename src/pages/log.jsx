import React, { useState } from "react";
import "/src/styles/log.css";

function Log() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="login-page">
        <div className="login-box">
            <h2>로그인</h2>
            <form>
            <label>Email</label>
            <input type="email" placeholder="이메일" />

            <label>Password</label>
            <div className="password-wrapper">
                <input
                    type = {showPassword ? "text" : "Password"}
                    placeholder = "비밀번호"
                />
            </div>
            <button type="submit">Log In</button>
            </form>
            <p>
            아직 회원이 아니신가요? <a href="/signup"><strong>Sign Up</strong></a>
            </p>
        </div>
        </div>
    );
}

export default Log;