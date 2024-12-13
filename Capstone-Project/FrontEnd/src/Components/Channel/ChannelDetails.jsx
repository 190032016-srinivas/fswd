import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import LeftPanel from "../LeftPanel";
import WestIcon from "@mui/icons-material/West";

import "../../Css/channel.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChannelHome from "./ChannelHome";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ChannelVideos from "./ChannelVideos";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Zoom from "@mui/material/Zoom";
import Signup from "../Signup";
import Signin from "../Signin";
import ChannelAbout from "./ChannelAbout";
import ChannelPlaylists from "./ChannelPlaylists";
import FeaturedChannels from "./FeaturedChannels";
import { RiUserSettingsLine } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import useNotifications from "../../useNotification";
import Error from "../Error";
import Content from "../Studio/Content";
function OtherChannel() {
  const backendURL = "http://localhost:3000";
  const { channelId } = useParams();
  const [Email, setEmail] = useState();
  const [channelName, setChannelname] = useState();
  const [channelOwnerId, setChannelOwnerId] = useState();
  const [ChannelProfile, setChannelProfile] = useState();
  const [myVideos, setMyVideos] = useState([]);
  const [isEditChannel, setisEditChannel] = useState(false);
  const [isSwitch, setisSwitched] = useState(false);
  const [previewChannelName, setPreviewChannelName] = useState("");
  const [previewChannelId, setPreviewChannelId] = useState("");
  const [previewChannelThumbnail, setPreviewChannelThumbnail] = useState(null);
  const [Section, setSection] = useState("Home");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [Subscribers, setSubscribers] = useState();
  const [Top, setTop] = useState("155px");
  const [coverIMG, setCoverIMG] = useState("");
  const [loading, setLoading] = useState(true);
  const [noChannel, setNoChannel] = useState(false);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });
  const impDetails = useSelector(
    (state) => state.impDetailsStoreKey.impDetails
  );
  const { userId, userPp, userName, userEmail, authToken } = impDetails;
  const { SuccessNotify, ErrorNotify } = useNotifications(theme);
  //TOAST FUNCTIONS
  const SubscribeNotify = () =>
    toast.success("Channel subscribed!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  //USE EFFECTS

  useEffect(() => {
    const getChannelData = async () => {
      try {
        setNoChannel(false);
        if (channelId) {
          const response = await fetch(`${backendURL}/getChannel/${channelId}`);
          const channelDetails = await response.json();
          if (response.ok) {
            setChannelname(channelDetails.name);
            setChannelProfile(channelDetails.profilePic);
            setSubscribers(channelDetails.subscribers);
            setChannelOwnerId(channelDetails.ownerId);
            setPreviewChannelName(channelDetails.name);
            setPreviewChannelThumbnail(channelDetails.profilePic);
            setPreviewChannelId(channelDetails._id);
          } else {
            setNoChannel(true);
          }
        }
      } catch (error) {
        ErrorNotify(error.message);
        setNoChannel(true);
      } finally {
        setLoading(false);
      }
    };

    getChannelData();
  }, [channelId]);

  document.title =
    channelName && channelName !== undefined
      ? `${channelName} - YouTube`
      : "YouTube";

  useEffect(() => {
    const getUserVideos = async () => {
      try {
        if (channelId) {
          const response = await fetch(
            `${backendURL}/videos/channel/${channelId}`
          );
          const myvideos = await response.json();
          setMyVideos(myvideos);
        }
      } catch (error) {
        ErrorNotify(error.message);
      }
    };
    getUserVideos();
  }, [channelId]);
  useEffect(() => {
    if (theme === false && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "white";
    } else if (theme === true && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "0f0f0f";
    }
  }, [theme]);

  const getUsername = (email) => {
    return email.split("@")[0];
  };

  const username = channelName;
  const [menuClicked, setMenuClicked] = useState(() => {
    const menu = localStorage.getItem("menuClicked");
    return menu ? JSON.parse(menu) : false;
  });
  useEffect(() => {
    localStorage.setItem("menuClicked", JSON.stringify(menuClicked));
  }, [menuClicked]);
  useEffect(() => {
    const handleMenuButtonClick = () => {
      setMenuClicked((prevMenuClicked) => !prevMenuClicked);
    };

    const menuButton = document.querySelector(".menu");
    if (menuButton) {
      menuButton.addEventListener("click", handleMenuButtonClick);
    }

    return () => {
      if (menuButton) {
        menuButton.removeEventListener("click", handleMenuButtonClick);
      }
    };
  }, []);
  useEffect(() => {
    const handleMenuButtonClick = () => {
      setMenuClicked((prevMenuClicked) => !prevMenuClicked);
    };

    const menuButton = document.querySelector(".close-sidepanel");
    if (menuButton) {
      menuButton.addEventListener("click", handleMenuButtonClick);
    }

    return () => {
      if (menuButton) {
        menuButton.removeEventListener("click", handleMenuButtonClick);
      }
    };
  }, []);
  useEffect(() => {
    const handleMenuButtonClick = () => {
      setMenuClicked((prevMenuClicked) => !prevMenuClicked);
    };

    const menuButton = document.querySelector(".menu-light");
    if (menuButton) {
      menuButton.addEventListener("click", handleMenuButtonClick);
    }

    return () => {
      if (menuButton) {
        menuButton.removeEventListener("click", handleMenuButtonClick);
      }
    };
  }, []);

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        setPreviewChannelThumbnail(reader.result);
      };
      console.log("src generated=", reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  async function EditChannel() {
    try {
      if (!previewChannelId) {
        window.location.reload();
        return;
      }
      let body = {
        previewChannelName,
        previewChannelThumbnail,
      };
      const response = await fetch(
        `${backendURL}/channel/${previewChannelId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        SuccessNotify("Channel Edited.");
      } else {
        ErrorNotify("Could not edit channel");
      }
    } catch (error) {
      ErrorNotify(error.message);
    } finally {
      setisEditChannel(false);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1200);
    }
  }
  return (
    <>
      {noChannel && <Error />}
      {!noChannel && (
        <>
          <Navbar />
          <LeftPanel />
          <div
            className={
              menuClicked === true
                ? "channel-main-content-nocover"
                : "channel-main-content-nocover2"
            }
            style={{ top: "2%" }}
          >
            <SkeletonTheme
              baseColor={theme ? "#353535" : "#aaaaaa"}
              highlightColor={theme ? "#444" : "#b6b6b6"}
            >
              <div
                className="channel-top-content"
                style={
                  loading === true ? { display: "flex" } : { display: "none" }
                }
              >
                <div className="channel-left-content">
                  <Skeleton
                    count={1}
                    width={130}
                    height={130}
                    style={{ borderRadius: "100%" }}
                    className="sk-channel-profile"
                  />
                  <div className="channel-topleft-data">
                    <div className="channel-left">
                      <div className="channel-name-verified">
                        <Skeleton
                          count={1}
                          width={200}
                          height={20}
                          style={{ borderRadius: "4px" }}
                          className="sk-channel-main-name"
                        />
                      </div>
                      <div className="channel-extra">
                        <Skeleton
                          count={1}
                          width={220}
                          height={15}
                          style={{ borderRadius: "4px" }}
                          className="sk-channel-liner"
                        />
                      </div>
                      <div className="more-about">
                        <Skeleton
                          count={1}
                          width={200}
                          height={14}
                          style={{ borderRadius: "4px" }}
                          className="sk-channel-more"
                        />
                      </div>
                    </div>
                    {userId ? (
                      <div className="channel-right-content channel-dualbtns">
                        <Skeleton
                          count={1}
                          width={160}
                          height={38}
                          style={{ borderRadius: "20px" }}
                          className="sk-channel-customize"
                        />
                        <Skeleton
                          count={1}
                          width={160}
                          height={38}
                          style={{
                            borderRadius: "20px",
                            position: "relative",
                            left: "25px",
                          }}
                          className="sk-channel-manage"
                        />
                      </div>
                    ) : (
                      <div className="channel-right-content">
                        <Skeleton
                          count={1}
                          width={125}
                          height={38}
                          style={{ borderRadius: "20px" }}
                          className="sk-channel-subscribe"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SkeletonTheme>
            <div
              className="channel-top-content"
              style={
                loading === true
                  ? { visibility: "hidden", display: "none" }
                  : { visibility: "visible", display: "flex" }
              }
            >
              <div
                className={
                  theme
                    ? "channel-left-content"
                    : "channel-left-content text-light-mode"
                }
              >
                <img
                  src={ChannelProfile}
                  alt="channelDP"
                  className="channel_profile"
                />
                <div className="channel-topleft-data">
                  <div className="channel-left">
                    <div className="channel-name-verified">
                      <p className="channelname">
                        {channelName && channelName}
                      </p>
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="Verified"
                        placement="right"
                      >
                        <CheckCircleIcon
                          fontSize="small"
                          style={{
                            color: "rgb(138, 138, 138)",
                            marginLeft: "6px",
                          }}
                        />
                      </Tooltip>
                    </div>
                    <div
                      className={
                        theme
                          ? "channel-extra"
                          : "channel-extra text-light-mode2"
                      }
                    >
                      <p className="channeluser">@{username && username}</p>
                      <p className="my-subs">
                        {Subscribers && Subscribers} subscribers
                      </p>
                      {myVideos && myVideos.message !== "USER DOESN'T EXIST" ? (
                        <p className="my-videoscount">
                          {myVideos && myVideos.length} videos
                        </p>
                      ) : (
                        <p className="my-videoscount">0 videos</p>
                      )}
                    </div>
                    <div
                      className={
                        theme ? "more-about" : "more-about text-light-mode2"
                      }
                    >
                      <p className="more-text">More about this channel</p>
                      <ArrowForwardIosIcon
                        fontSize="15px"
                        style={{ color: "#aaa", marginLeft: "7px" }}
                      />
                    </div>
                  </div>
                  {userId && userId != channelOwnerId && (
                    <div className="channel-right-content">
                      <button
                        className={
                          theme
                            ? "subscribethis-channel"
                            : "subscribethis-channel-light text-dark-mode"
                        }
                        style={
                          isSubscribed === true
                            ? { display: "none" }
                            : { display: "block" }
                        }
                        onClick={() => {
                          setIsSubscribed(!isSubscribed);
                        }}
                      >
                        Subscribe
                      </button>
                      <button
                        className={
                          theme
                            ? "subscribethis-channel2"
                            : "subscribethis-channel2-light"
                        }
                        style={
                          isSubscribed === true
                            ? { display: "block" }
                            : { display: "none" }
                        }
                        onClick={() => {
                          setIsSubscribed(!isSubscribed);
                        }}
                      >
                        Subscribed
                      </button>
                    </div>
                  )}
                  {userId == channelOwnerId && (
                    <div className="channel-right-content channel-dualbtns">
                      <button
                        className={
                          theme
                            ? "customize-channel"
                            : "customize-channel btn-light-mode"
                        }
                        onClick={() => {
                          setisEditChannel(true);
                        }}
                      >
                        Edit channel
                      </button>

                      <div
                        className="setting-btn"
                        onClick={() => {
                          setisEditChannel(true);
                        }}
                      >
                        <RiUserSettingsLine
                          fontSize="28px"
                          color={theme ? "white" : "black"}
                          className={
                            theme
                              ? "channel-settings"
                              : "channel-settings channel-settings-light"
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {!isEditChannel && (
              <>
                <div className="channel-mid-content">
                  <div className="different-sections">
                    {Section === "Home" ? (
                      <p
                        className={theme ? "channel-home1" : "channel-home2"}
                        onClick={() => {
                          setSection("Home");
                        }}
                      >
                        HOME
                      </p>
                    ) : (
                      <p
                        className={
                          theme
                            ? "channel-home"
                            : "channel-home text-light-mode2"
                        }
                        onClick={() => {
                          setSection("Home");
                        }}
                      >
                        HOME
                      </p>
                    )}
                    {userId == channelOwnerId && (
                      <p
                        className={
                          theme
                            ? Section === "Manage"
                              ? "channel-videos1"
                              : "channel-videos"
                            : Section === "Manage"
                            ? "channel-videos2"
                            : "channel-videos text-light-mode2"
                        }
                        style={{ display: "block" }}
                        onClick={() => {
                          setSection("Manage");
                        }}
                      >
                        MANAGE
                      </p>
                    )}
                    {Section === "Playlists" ? (
                      <p
                        className={
                          theme ? "channel-playlists1" : "channel-playlists2"
                        }
                        onClick={() => {
                          setSection("Playlists");
                        }}
                      >
                        PLAYLISTS
                      </p>
                    ) : (
                      <p
                        className={
                          theme
                            ? "channel-playlists"
                            : "channel-playlists text-light-mode2"
                        }
                        onClick={() => {
                          setSection("Playlists");
                        }}
                      >
                        PLAYLISTS
                      </p>
                    )}
                  </div>
                </div>
                <br />
                <hr
                  className={
                    theme
                      ? "seperate seperate-new"
                      : "seperate seperate-new seperate-light"
                  }
                />
                {Section === "Home" && (
                  <ChannelVideos channelVideos={myVideos} />
                )}
                {Section === "Manage" && <Content channelVideos={myVideos} />}
                {Section === "Playlists" && (
                  <p
                    className={
                      theme ? "no-results" : "no-results text-light-mode"
                    }
                    style={{ color: "white", fontSize: "16px" }}
                  >
                    This channel doesn&apos;t have any playlists.
                  </p>
                )}
              </>
            )}
            {isEditChannel && (
              <div>
                <div
                  className="back-menu-edit"
                  onClick={() => setisEditChannel(false)}
                >
                  <WestIcon fontSize="medium" style={{ color: "#aaa" }} />
                </div>

                <div
                  className="main-video-details-section"
                  style={{
                    opacity: 1,
                    pointerEvents: "auto",
                    transition: "all .12s ease",
                    cursor: "auto",
                    width: "100%",
                  }}
                >
                  <div className="current-editvideodata">
                    <p
                      className={
                        theme
                          ? "current-tophead"
                          : "current-tophead text-light-mode"
                      }
                    >
                      Video details
                    </p>
                    <div className="thissection-btns">
                      <button
                        className={"video-editbtnss"}
                        onClick={() => {
                          if (
                            previewChannelName === "" ||
                            previewChannelThumbnail === ""
                          ) {
                            ErrorNotify("Input fields can't be empty!");
                          } else {
                            EditChannel();
                          }
                        }}
                      >
                        SAVE
                      </button>
                    </div>
                  </div>
                  <div className="current-editvideo-data">
                    <div className="video-details-left">
                      <div className="current-video-editable-section">
                        <div className="currentvideo-title">
                          <input
                            type="text"
                            name="video-title"
                            className={
                              theme
                                ? "currentvideo-title-inp"
                                : "currentvideo-title-inp text-light-mode new-light-border"
                            }
                            value={previewChannelName}
                            required
                            onChange={(e) => {
                              setPreviewChannelName(e.target.value);
                            }}
                            placeholder="Add a name that describes your channel"
                            maxLength={100}
                          />
                          <p className="title-sample-txt">
                            Channel Name (required)
                          </p>
                        </div>

                        <div
                          className="currentvideo-thumbnailedit"
                          style={{ marginBottom: "100px" }}
                        >
                          <p className={theme ? "" : "text-light-mode"}>
                            Profile Picture
                          </p>
                          <p className={theme ? "" : "text-light-mode2"}>
                            It’s recommended to use a picture that’s at least 98
                            x 98 pixels and 4MB or less.
                          </p>
                          <div className="mythumbnails-sectionn">
                            <div className="currentthumbnail-data choosed-one">
                              <label htmlFor="thumbnail-upload">
                                <img
                                  src={previewChannelThumbnail}
                                  alt="thumbnail"
                                  className="currnt-tbimg2"
                                  style={{
                                    border: `2.2px solid ${
                                      theme ? "white" : "#606060"
                                    }`,
                                    borderRadius: "3px",
                                    opacity: "1",
                                  }}
                                />
                              </label>
                            </div>

                            <input
                              type="file"
                              accept="image/*"
                              id="thumbnail-upload"
                              style={{ display: "none" }}
                              onChange={handleThumbnailUpload}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default OtherChannel;
