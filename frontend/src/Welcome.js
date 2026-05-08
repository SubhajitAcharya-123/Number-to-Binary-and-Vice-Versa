import './WelcomeCss.css';
import { useNavigate } from "react-router-dom";

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="mainBox">
            <div className="card">

                <h1 className="title">Number ↔ Binary</h1>
                <p className="subtitle">
                    Convert numbers and binary instantly.
                </p>

                <div className="icon">🔢</div>

                <div className="actions">
                    <button className="btn primary" onClick={() => navigate("/register")}>
                        Create Account
                    </button>
                    <button className="btn secondary" onClick={() => navigate("/login")}>
                        Sign In
                    </button>
                </div>

                <p className="footer-text">
                    Simple, fast and reliable conversion tool.
                </p>

            </div>
        </div>
    );
}

export default Welcome;