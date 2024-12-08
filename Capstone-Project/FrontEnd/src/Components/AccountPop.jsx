import { useEffect, useState } from "react";
import "../Css/accountPop.css";
import avatar from "../img/avatar.png";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { SiYoutubestudio } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { clearDetails } from "../reducer/impDetails";

function AccountPop() {
  const backendURL = "http://localhost:3000";
  const [profile, setProfile] = useState("");
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });
  // const [channelId, setChannelID] = useState();
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  const [isChannel, setIsChannel] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem("Dark", JSON.stringify(theme));
  }, [theme]);

  const impDetails = useSelector(
    (state) => state.impDetailsStoreKey.impDetails
  );
  const { userId, userPp, userName, userEmail, authToken, channelId } =
    impDetails;

  const handleLogout = () => {
    dispatch(clearDetails());
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <div
        className={
          theme ? "account-pop" : "account-pop account-pop-light light-mode"
        }
        style={
          isBtnClicked === false ? { display: "block" } : { display: "none" }
        }
      >
        <div className="user-section">
          <div className="left-part">
            <img
              src={userPp ?? avatar}
              alt="channelIMG"
              className="channelIMG"
            />
          </div>
          <div className="right-part">
            <p>{userName}</p>

            <p>
              {userEmail?.slice(0, 12)}
              {userEmail?.length > 12 ? "..." : ""}
            </p>
          </div>
        </div>
        <hr className={theme ? "seperate" : "seperate-light"} />
        <div className="about-channel-section">
          <div
            className={theme ? "yourchannel c-sec" : "yourchannel c-sec2"}
            onClick={() => {
              if (channelId) {
                window.location.href = `/channel/${channelId}`;
              } else {
                window.location.href = `/studio`;
              }
            }}
          >
            <AccountBoxOutlinedIcon
              fontSize="medium"
              style={{ color: theme ? "white" : "black" }}
            />
            <p>Your channel</p>
          </div>
          <div
            className={theme ? "yourstudio c-sec" : "yourstudio c-sec2"}
            onClick={() => {
              window.location.href = "/studio";
            }}
          >
            <SiYoutubestudio
              fontSize="21px"
              style={{ color: theme ? "white" : "black" }}
            />
            <p>YouTube Studio</p>
          </div>
          <div
            className={theme ? "apperance c-sec" : "apperance c-sec2"}
            onClick={() => {
              if (isBtnClicked === false) {
                setIsBtnClicked(true);
              } else {
                setIsBtnClicked(false);
              }
            }}
          >
            <DarkModeOutlinedIcon
              fontSize="medium"
              style={{ color: theme ? "white" : "black" }}
            />
            <p>Appearance: {theme ? "Dark" : "Light"}</p>
            <ArrowForwardIosRoundedIcon
              className="open"
              fontSize="small"
              style={{ color: theme ? "#ffffff8a" : "black" }}
            />
          </div>
        </div>
        <hr className={theme ? "seperate" : "seperate-light"} />
        <div className="extra1-section">
          <div className={theme ? "language c-sec" : "language c-sec2"}>
            <TranslateOutlinedIcon
              fontSize="medium"
              style={{ color: theme ? "white" : "black" }}
            />
            <p>Language: English</p>
          </div>
          <div
            className={theme ? "exitout c-sec" : "exitout c-sec2"}
            onClick={handleLogout}
          >
            <LogoutOutlinedIcon
              fontSize="medium"
              style={{ color: theme ? "white" : "black" }}
            />
            <p>Sign Out</p>
          </div>
        </div>
      </div>
      <div
        className={
          theme ? "account-pop" : "account-pop account-pop-light light-mode"
        }
        style={
          isBtnClicked === true
            ? { display: "block", paddingTop: "12px" }
            : { display: "none", paddingTop: "20px" }
        }
      >
        <div className="appearance-title">
          <ArrowBackOutlinedIcon
            className={theme ? "back-arrow" : "back-arroww2"}
            fontSize="medium"
            style={{ color: theme ? "white" : "black" }}
            onClick={() => {
              if (isBtnClicked === true) {
                setIsBtnClicked(false);
              } else {
                setIsBtnClicked(true);
              }
            }}
          />
          <p>Apperance</p>
        </div>
        <hr
          className={theme ? "seperate" : "seperate-light"}
          style={
            isBtnClicked === true ? { marginTop: "6px" } : { marginTop: "15px" }
          }
        />
        <div className="theme-section">
          <p className="caution">Settings applied to this browser only</p>
          <div className="theme-list">
            <div
              className={theme ? "dark-theme" : "dark-theme2"}
              onClick={() => {
                setTheme(true);
                window.location.reload();
              }}
            >
              <DoneOutlinedIcon
                className="dark-arrow"
                fontSize="medium"
                color={theme ? "white" : "black"}
                style={theme === true ? { opacity: 1 } : { opacity: 0 }}
              />
              <p>Dark theme</p>
            </div>
            <div
              className={theme ? "light-theme" : "light-theme2"}
              onClick={() => {
                setTheme(false);
                window.location.reload();
              }}
            >
              <DoneOutlinedIcon
                className="light-arrow"
                fontSize="medium"
                color={theme ? "white" : "black"}
                style={theme === false ? { opacity: 1 } : { opacity: 0 }}
              />
              <p>Light theme</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPop;
