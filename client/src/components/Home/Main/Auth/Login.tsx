import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoggedIn, setUser } from "../../../../app/userSlice";

// import { RootState } from "../../../../app/rootReducer";
interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [loginEmailOrUsername, setLoginEmailOrUsername] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const dispatch = useDispatch();
  //   const thisuser = useSelector((state: RootState) => state.user);

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
      const { user, token } = response.data;

      dispatch(setLoggedIn());
      dispatch(
        setUser({
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          token: token,
        })
      );

      localStorage.setItem("token", token);
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
  //   useEffect(() => {
  //     console.log("User after changes:", thisuser);
  //   }, [thisuser]);
  return (
    <div className="registration-form active">
      <button className="close-button" onClick={onClose}>
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
        <button
          className="submit-button"
          onClick={handleLoginSubmit}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
