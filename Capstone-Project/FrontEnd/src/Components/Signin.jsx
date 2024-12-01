import { useEffect, useState } from "react";
import "../Css/navbar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reset from "./Reset";
import { LoadingButton } from "@mui/lab";
function Signin(prop) {
  // const backendURL = "https://youtube-clone-mern-backend.vercel.app"
  const backendURL = "http://localhost:3000";
  const [data, setData] = useState({});

  const [closePopup, setClosePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  //TOASTS

  const Notify = (message) =>
    toast.success(message, {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  const InvalidNotify = () =>
    toast.error("Invalid Credentials!", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  const ErrorNotify = () =>
    toast.error("Input fields can't be empty.", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  const NoUserNotify = () =>
    toast.error("User doesn't exists.", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  const handleInputs = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitData = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      ErrorNotify();
      return;
    }
    try {
      const response = await fetch(`${backendURL}/user/login`, {
        method: "POST",
        body: JSON.stringify(data),
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        Notify("Login successfull!");
        // setTimeout(() => {
        //   window.location.reload();
        //   document.body.classList.remove("bg-class");
        // }, 2000);
        document.body.classList.remove("bg-class");
        document.body.classList.remove("bg-css");

        prop.close(false);
        const { authToken, existingUser } = await response.json();
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("userId", existingUser._id);
      } else {
        InvalidNotify();
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="above-data"
        style={{ display: closePopup ? "none" : "block" }}
      >
        <p className="signup-head">Login to Your Account</p>
        <p className="signup-desc">
          Stay Connected-Stay Entertained, Step into the World of YouTube, Join
          the YouTube Community
        </p>
      </div>
      <div
        className="signup-form"
        style={{ display: closePopup ? "none" : "flex" }}
      >
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
            loading={isLoading}
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
