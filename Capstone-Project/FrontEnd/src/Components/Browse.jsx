import "../Css/browse.css";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LeftPanel from "./LeftPanel.jsx";
import Navbar from "./Navbar.jsx";
import "../Css/theme.css";
import { useSelector } from "react-redux";
import useNotifications from "../useNotification.js";

function Browse() {
  const backendURL = "http://localhost:3000";
  const [thumbnails, setThumbnails] = useState();
  const [validVideos, setValidVideos] = useState();
  const [Titles, setTitles] = useState();
  const [uploader, setUploader] = useState();
  const [ProfilePic, setProfilePic] = useState();
  const [duration, setDuration] = useState();
  const [VideoID, setVideoID] = useState();
  const [Visibility, setVisibility] = useState();
  const [menuClicked, setMenuClicked] = useState(() => {
    const menu = localStorage.getItem("menuClicked");
    return menu ? JSON.parse(menu) : false;
  });
  const [VideoViews, setVideoViews] = useState();
  const [VideoData, setVideoData] = useState([]);
  const [TagsSelected, setTagsSelected] = useState("All");
  const [publishDate, setPublishDate] = useState();
  const [FilteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  const impDetails = useSelector(
    (state) => state.impDetailsStoreKey.impDetails
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleMenuButtonClick = () => {
      if (window.innerWidth >= 860)
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
      if (window.innerWidth >= 860)
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

  useEffect(() => {
    localStorage.setItem("menuClicked", JSON.stringify(menuClicked));
  }, [menuClicked]);

  const Tags = [
    "All",
    "Gaming",
    "Comedy",
    "Vlog",
    "Artificial Intelligence",
    "Travel",
    "Fashion",
    "Beauty",
    "Food",
  ];

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await fetch(`${backendURL}/videos`);
        const allVideos = await response.json();
        setValidVideos(allVideos);
        setLoading(false);
      } catch (error) {
        ErrorNotify(error);
      }
    };

    getVideos();
  }, []);

  useEffect(() => {
    if (TagsSelected !== "All") {
      const tagsSelectedLower = TagsSelected.toLowerCase();
      const filteredVideos = validVideos.filter((element) =>
        element.Tag.toLowerCase().includes(tagsSelectedLower)
      );
      setFilteredVideos(filteredVideos);
    } else {
      setFilteredVideos(validVideos);
    }
  }, [TagsSelected, validVideos]);

  const { ErrorNotify } = useNotifications(theme);
  const updateViews = async (id) => {
    try {
      const response = await fetch(`${backendURL}/updateview/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await response.json();
    } catch (error) {
      ErrorNotify(error);
    }
  };

  return (
    <>
      <Navbar />
      <LeftPanel />
      <SkeletonTheme
        baseColor={theme ? "#353535" : "#aaaaaa"}
        highlightColor={theme ? "#444" : "#b6b6b6"}
      >
        <div
          className={theme ? "browse" : "browse light-mode"}
          style={loading === true ? { display: "flex" } : { display: "none" }}
        >
          <div
            className={
              menuClicked === true
                ? `browse-data ${theme ? "" : "light-mode"}`
                : `browse-data2 ${theme ? "" : "light-mode"}`
            }
            style={menuClicked === false ? { left: "74px" } : { left: "250px" }}
          >
            <div
              className={
                theme ? "popular-categories" : "popular-categories light-mode"
              }
            >
              {Tags.map((element, index) => {
                return (
                  <div
                    className={
                      TagsSelected === element
                        ? `top-tags ${theme ? "tag-color" : "tag-color-light"}`
                        : `top-tags ${theme ? "" : "tagcolor-newlight"}`
                    }
                    key={index}
                  >
                    <p
                      onClick={() => {
                        setTagsSelected(`${element}`);
                      }}
                    >
                      {element}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="video-section">
              <div
                className="uploaded-videos"
                style={
                  menuClicked === true
                    ? {
                        paddingRight: "50px",
                      }
                    : {
                        paddingRight: "0px",
                      }
                }
              >
                {Array.from({ length: 16 }).map((_, index) => (
                  <>
                    <div className="video-data">
                      <Skeleton
                        key={index}
                        count={1}
                        width={330}
                        height={186}
                        style={{ borderRadius: "10px" }}
                        className="sk-browse-vid"
                      />
                      <div className="channel-basic-data">
                        <Skeleton
                          key={index}
                          count={1}
                          width={40}
                          height={40}
                          style={{ borderRadius: "100%", marginTop: "40px" }}
                          className="sk-browse-profile"
                        />
                        <Skeleton
                          key={index}
                          count={2}
                          width={250}
                          height={15}
                          style={{
                            position: "relative",
                            top: "40px",
                            left: "15px",
                          }}
                          className="sk-browse-title"
                        />
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SkeletonTheme>
      <div
        className={theme ? "browse" : "browse light-mode"}
        style={
          loading === true
            ? { visibility: "hidden", display: "none" }
            : { visibility: "visible", display: "flex" }
        }
      >
        <div
          className={
            menuClicked === true
              ? `browse-data ${theme ? "" : "light-mode"}`
              : `browse-data2 ${theme ? "" : "light-mode"}`
          }
          style={menuClicked === false ? { left: "74px " } : { left: "250px " }}
        >
          <div
            className={
              theme ? "popular-categories" : "popular-categories light-mode"
            }
          >
            {Tags.map((element, index) => {
              return (
                <div
                  className={
                    TagsSelected === element
                      ? `top-tags ${theme ? "tag-color" : "tag-color-light"}`
                      : `top-tags ${theme ? "" : "tagcolor-newlight"}`
                  }
                  key={index}
                >
                  <p
                    onClick={() => {
                      setTagsSelected(`${element}`);
                    }}
                  >
                    {element}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="video-section">
            <div
              className="uploaded-videos"
              style={
                menuClicked === true
                  ? {
                      paddingRight: "50px",
                    }
                  : {
                      paddingRight: "0px",
                    }
              }
            >
              {FilteredVideos &&
                FilteredVideos.map((element, index) => {
                  return (
                    <div
                      className="video-data"
                      key={index}
                      onClick={() => {
                        localStorage.setItem("menuClicked", false);
                        window.location.href = `/video/${element._id}`;
                      }}
                    >
                      <img
                        style={{ width: "330px", borderRadius: "10px" }}
                        src={element.thumbnail}
                        alt="thumbnails"
                        className="browse-thumbnails"
                      />
                      <p className="duration">
                        {Math.floor(element.duration / 60) +
                          ":" +
                          (Math.round(element.duration % 60) < 10
                            ? "0" + Math.round(element.duration % 60)
                            : Math.round(element.duration % 60))}
                      </p>

                      <div
                        className={
                          theme === true
                            ? "channel-basic-data"
                            : "channel-basic-data text-light-mode"
                        }
                      >
                        <div className="channel-pic">
                          <img
                            className="channel-profile"
                            src={element.channelPhoto}
                            alt="channel-profile"
                          />
                        </div>
                        <div className="channel-text-data">
                          <p className="title" style={{ marginTop: "10px" }}>
                            {element.title && element.title.length <= 60
                              ? element.title
                              : `${element.title.slice(0, 55)}..`}
                          </p>
                          <div className="video-uploader">
                            <p
                              className={
                                theme ? "uploader" : "uploader text-light-mode2"
                              }
                              style={{ marginTop: "10px" }}
                            >
                              {element.channelName}
                            </p>
                            <Tooltip
                              TransitionComponent={Zoom}
                              title="Verified"
                              placement="right"
                            >
                              <CheckCircleIcon
                                fontSize="100px"
                                style={{
                                  color: "rgb(138, 138, 138)",
                                  marginTop: "8px",
                                  marginLeft: "4px",
                                }}
                              />
                            </Tooltip>
                          </div>
                          <div
                            className={
                              theme ? "view-time" : "view-time text-light-mode2"
                            }
                          >
                            <p className="views">
                              {element.views >= 1e9
                                ? `${(element.views / 1e9).toFixed(1)}B`
                                : element.views >= 1e6
                                ? `${(element.views / 1e6).toFixed(1)}M`
                                : element.views >= 1e3
                                ? `${(element.views / 1e3).toFixed(1)}K`
                                : element.views}{" "}
                              views
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Browse;
