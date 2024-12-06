import { useState } from "react";
import "../Css/navbar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { saveUserDetails } from "../reducer/impDetails";
import useNotifications from "../useNotification";
function Signin(prop) {
  const backendURL = "http://localhost:3000";
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  const { SuccessNotify, ErrorNotify } = useNotifications(theme);

  const handleInputs = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitData = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      ErrorNotify("Please fill all the fields");
      return;
    }
    try {
      const response = await fetch(`${backendURL}/user/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { authToken, existingUser, channelPp, message } =
        await response.json();
      if (response.ok) {
        document.body.classList.remove("bg-class");
        document.body.classList.remove("bg-css");
        prop.close(false);
        SuccessNotify(message);
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("userId", existingUser._id);
        if (channelPp) localStorage.setItem("userPp", channelPp);
        dispatch(
          saveUserDetails({
            authToken,
            channelPp,
            userDetails: existingUser,
          })
        );
      } else {
        ErrorNotify(message);
      }
    } catch (error) {
      ErrorNotify(error.message);
    }
  };

  return (
    <>
      <div className="above-data" style={{ display: "block" }}>
        <p className="signup-head">Login to Your Account</p>
        <p className="signup-desc">
          Stay Connected-Stay Entertained, Step into the World of YouTube, Join
          the YouTube Community
        </p>
      </div>
      <div className="signup-form" style={{ display: "flex" }}>
        <form onSubmit={SubmitData}>
          <input
            type="email"
            name="email"
            className={
              theme ? "email" : "email email-light light-mode text-light-mode"
            }
            placeholder="Email Address"
            onChange={handleInputs}
            required
          />
          <input
            type="password"
            name="password"
            className={
              theme
                ? "password"
                : "password email-light light-mode text-light-mode"
            }
            placeholder="Passcode"
            onChange={handleInputs}
            required
          />

          <button
            className={theme ? "signup-btn" : "signup-btn signin-btn-light"}
            type="submit"
          >
            Login to Your Account
          </button>
        </form>
      </div>
    </>
  );
}

export default Signin;
