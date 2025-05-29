import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "/src/styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://newsummarize.com/api/users/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const token = res.data.token; // 응답에서 토큰 꺼냄
      localStorage.setItem("token", token); // 저장
      login(token); // useAuth() 안에서 필요 시 처리
      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <label>이메일</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>비밀번호</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Log In</button>
        </form>
        <p className="login-guide">
          아직 회원이 아니신가요?{" "}
          <Link to="/join">
            <strong>Sign Up</strong>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
