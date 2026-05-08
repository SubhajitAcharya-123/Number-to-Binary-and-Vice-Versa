
import "./cssForLogin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [msgColor, setMsgColor] = useState("");
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/welcome");
    };
    const handleLogin = async () => {
        try {
            if (!name || !password) {
                setMessage("All fields are required");
                setMsgColor("red");
                return;
            } else {
                setMessage("");
            }
            let response = await fetch("http://localhost:8080/log", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sendUserName: name,
                    sendPassword: password
                })
            });
            let data;
            try {
                data = await response.json();
            } catch {
                data = { message: "Server error" };
            }
            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", name);
                navigate("/numbertobinary")
            } else {
                setMessage(data.message || "Login failed");
                setMsgColor("red");
            }
        } catch (e) {
            console.log(e);
            setMessage("Something went wrong");
            setMsgColor("red");
        }
    };
    return (
    <div className="mainBox">
        <div className="card">

            <div className="back-arrow" onClick={goBack}>←</div>

            <h1 className="title">Sign In</h1>
            <p className="subtitle">Access your account</p>

            <div className="form">
                <label>User Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
            </div>

            <div className="form">
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                />
                <p className="msg" style={{ color: msgColor }}>{message}</p>
            </div>

            <button className="btn primary" onClick={handleLogin}>
                Sign In
            </button>

            <p className="switch">
                Don’t have an account? <span onClick={() => navigate("/register")}>Register</span>
            </p>

        </div>
    </div>
);
}
export default Login;