import './cssForRegister.css';
//import login from './Login.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Register() {
    const [mobileNo, setMobileNo] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [msgColor, setMsgColor] = useState("");

    const navigate = useNavigate();
    const goBack = () => {
        navigate("/welcome");
    };
    const register = async () => {
        try {

            if (!mobileNo || !name || !password || !confirmPassword) {
                setMessage("All fields are required!!");
                setMsgColor("red");
                return;
            }
            else {
                setMessage("");
            }

            if (password === confirmPassword) {
                setMessage("Passwords match");
                setMsgColor("green");
            } else {
                setMessage("Passwords do not match");
                setMsgColor("red");
                return;
            }

            let response = await fetch("http://localhost:8080/reg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    sendMobileNo: mobileNo,
                    sendName: name,
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
                setMessage(data.message);
                setMsgColor("green");
            } else {
                setMessage(data.message);
                setMsgColor("red");
            }
        } catch (e) {
            console.log("Error" + e);
        }
    };
    return (
    <div className="mainBox">
        <div className="card">

            <div className="back-arrow" onClick={goBack}>←</div>

            <h1 className="title">Create Account</h1>
            <p className="subtitle">Get started with your account</p>

            <div className="form">
                <label>Mobile Number</label>
                <input
                    type="text"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    placeholder="Enter mobile number"
                />
            </div>

            <div className="form">
                <label>Name</label>
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
            </div>

            <div className="form">
                <label>Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                />
                <p className="msg" style={{ color: msgColor }}>{message}</p>
            </div>

            <button className="btn primary" onClick={register}>
                Create Account
            </button>

            <p className="switch">
                Already have an account? 
                <span onClick={() => navigate("/login")}> Sign In</span>
            </p>

        </div>
    </div>
);
}
export default Register;