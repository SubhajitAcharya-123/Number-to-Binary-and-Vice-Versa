import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./cssForNumbertobinary.css";
function Numbertobinary() {
    const [numberValue, setNumberValue] = useState("");
    const [binaryValue, setBinaryValue] = useState("");
    const [ansBinaryValue, setAnsBinaryValue] = useState("");
    const [ansNumberForBToN, setAnsNumberForBToN] = useState("");
    const [message, setMessage] = useState("");
    const [msgColor, setMsgColor] = useState("");
    const [message2, setMessage2] = useState("");
    const [msg2Color, setMsg2Color] = useState("");
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/welcome");
    };
    const numberToBinary = async () => {
        try {
            if (!numberValue || numberValue.trim() === "") {
                setMessage("Please enter the Number value!!!");
                setMsgColor("red");
                return;
            } else {
                setMessage("");
            }
            if (isNaN(numberValue)) {
                setMessage("Enter a valid number!");
                setMsgColor("red");
                return;
            }
            let response = await fetch("http://localhost:8080/nToB", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    sendNumber: numberValue
                })
            });
            let data;
            try {
                data = await response.json();
            } catch {
                data = { message: "Server error" };
            }
            if (response.status === 401) {
                alert("Session expired. Please login again.");
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
            if (response.ok) {
                setAnsBinaryValue(data.message);
            } else {
                setMessage(data.message);
                setMsgColor("red");
            }

        } catch (e) {
            console.log(e);
        }
    };
    const BinaryToNumber = async () => {
        try {
            if (!binaryValue || binaryValue.trim() === "") {
                setMessage2("Please enter the Binary value!!!");
                setMsg2Color("red");
                return;
            } else {
                setMessage2("");
            }
            if (!/^[01]+$/.test(binaryValue)) {
                setMessage2("Enter a valid binary (only 0 and 1)!");
                setMsg2Color("red");
                return;
            }
            let response = await fetch("http://localhost:8080/bToN", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    sendBinary: binaryValue
                })
            });
            let data;
            try {
                data = await response.json();
            } catch {
                data = { message: "Server error" };
            }
            if (response.status === 401) {
                alert("Session expired. Please login again.");
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
            if (response.ok) {
                setAnsNumberForBToN(data.message);
            } else {
                setMessage2(data.message);
                setMsg2Color("red");
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="main">
            <div className="back-arrow" onClick={goBack}>←</div>

            <div className="wrapper">

                <div className="box">
                    <h2>Number ➡️ Binary</h2>

                    <div className="field">
                        <label>Enter Number</label>
                        <input
                            type="text"
                            value={numberValue}
                            onChange={(e) => setNumberValue(e.target.value)}
                        />
                        <p className="msg" style={{ color: msgColor }}>{message}</p>
                    </div>

                    <div className="field">
                        <label>Binary</label>
                        <div className="answerBox">{ansBinaryValue}</div>
                    </div>

                    <button className="convert-btn" onClick={numberToBinary}>
                        Convert
                    </button>
                </div>

                <div className="box">
                    <h2>Binary ➡️ Number</h2>

                    <div className="field">
                        <label>Enter Binary</label>
                        <input
                            type="text"
                            value={binaryValue}
                            onChange={(e) => setBinaryValue(e.target.value)}
                        />
                        <p className="msg" style={{ color: msg2Color }}>{message2}</p>
                    </div>

                    <div className="field">
                        <label>Number</label>
                        <div className="answerBox">{ansNumberForBToN}</div>
                    </div>

                    <button className="convert-btn" onClick={BinaryToNumber}>
                        Convert
                    </button>
                </div>

            </div>
        </div>
    );
}
export default Numbertobinary;