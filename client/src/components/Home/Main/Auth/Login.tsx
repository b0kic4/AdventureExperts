import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../app/userSlice";
interface LoginProps {
  onClose: () => void;
}
const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [loginEmailOrUsername, setLoginEmailOrUsername] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const dispatch = useDispatch();
  const handleInputLoginChange = (name: any, value: any) => {
    switch (name) {
      case "loginEmailorUsername":
        setLoginEmailOrUsername(value);
        break;
      case "loginPw":
        setLoginPw(value);
        break;
      default:
        break;
    }
  };

  const handleLoginSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/login", {
        emailOrUsername: loginEmailOrUsername,
        password: loginPw,
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful");
      onClose();
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials");
      } else if (error.response && error.response.status === 404) {
        toast.error("Username or email not found");
      } else {
        console.error("Error during login:", error.message);
      }
    }
  };

  return (
    <div className="registration-form active">
      <button
        style={{
          background: "transparent",
          color: "black",
          fontSize: "32px",
        }}
        className="close-button"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <form>
        <label>
          Email or Username:
          <input
            type="text"
            value={loginEmailOrUsername}
            onChange={(e) =>
              handleInputLoginChange("loginEmailorUsername", e.target.value)
            }
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={loginPw}
            onChange={(e) => handleInputLoginChange("loginPw", e.target.value)}
          />
        </label>
        <button onClick={handleLoginSubmit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
