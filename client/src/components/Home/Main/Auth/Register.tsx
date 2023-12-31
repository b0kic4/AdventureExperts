import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { toast } from "react-toastify";
import "./styles.css";
interface RegisterProps {
  onClose: () => void; // Define the onClose prop as a function that takes no arguments and returns void
}
const Register: React.FC<RegisterProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleInputRegistrationChange = (name: any, value: any) => {
    switch (name) {
      case "name":
        setName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleRegisterSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      const response = await axios.post("http://localhost:8081/register", {
        name: name,
        username: username,
        email: email,
        password: password,
      });

      console.log("Registration successful", response.data);
      toast.success("Registration successful");
      onClose();
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        toast.error("Username or email is already taken");
      } else {
        console.error("Error", error.message);
      }
    }
  };

  return (
    <div className="registration-form active">
      <button className="close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <form>
        <label>
          Full Name:
          <input
            type="name"
            value={name}
            onChange={(e) =>
              handleInputRegistrationChange("name", e.target.value)
            }
          />
        </label>{" "}
        <label>
          Username:
          <input
            type="name"
            value={username}
            onChange={(e) =>
              handleInputRegistrationChange("username", e.target.value)
            }
          />
        </label>{" "}
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) =>
              handleInputRegistrationChange("email", e.target.value)
            }
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) =>
              handleInputRegistrationChange("password", e.target.value)
            }
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              handleInputRegistrationChange("confirmPassword", e.target.value)
            }
          />
        </label>
        <button
          className="submit-button"
          onClick={handleRegisterSubmit}
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
