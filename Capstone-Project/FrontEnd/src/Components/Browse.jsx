import "../Css/browse.css";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LeftPanel from "./LeftPanel";
import Navbar from "./Navbar";
import "../Css/theme.css";
import { useSelector } from "react-redux";

function Browse() {
  const backendURL = "http://localhost:3000";
  const [thumbnails, setThumbnails] = useState([
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2FjuxdZyk7w6w-HD.jpg?alt=media&token=040cf978-ca0b-4b3e-a712-bedfc9d56c5f",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2FOP5Tvq-Cp2M-HD.jpg?alt=media&token=94a6596d-91bb-4bc9-99f0-23f523272a4b",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2FaNylwNAkbnM-HD.jpg?alt=media&token=956465ee-63ba-4ca9-a285-1ecf34ce85f0",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2FneZxL0jAxE4-HD.jpg?alt=media&token=2b2c2fc3-8197-49c5-9a3d-5a65291d2cdf",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2FUrIaQbIK2E4-HD.jpg?alt=media&token=0c479e2f-1fd7-4b1b-93ee-a4cd7a6d8b82",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2FllqlYi7wRPg-HD.jpg?alt=media&token=2f6620ee-4b6b-4f5c-9a87-f5ce5f550240",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2F2CT0SkSySEU-HD.jpg?alt=media&token=b324b34a-c039-40f6-a580-aa895ac0909d",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2FbuyX6wWKbGk-HD.jpg?alt=media&token=293635a8-164e-466f-8b72-e10dcd062466",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2F9B_XbkvjdRU-HD.jpg?alt=media&token=f2251543-f503-4ee1-930d-7060c0397656",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2FSez_ebACUWE-HD.jpg?alt=media&token=1946afd2-1116-4516-94a2-0bcfee8168a1",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2FgoxeIC4QZBk-HD.jpg?alt=media&token=ae3781d2-d649-48f5-8207-e63a43b41407",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2F0dyrBYO4rCo-HD.jpg?alt=media&token=f9e8ea6f-22b8-476e-ac5f-276c6b6c1984",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2F3xm9TaKQLFE-HD.jpg?alt=media&token=45d19de9-6796-4c32-ab3e-07cc6eab0da2",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2FIMG-20230908-WA0020.jpg?alt=media&token=cf0abab3-c1a4-4745-baef-f0e574e3936e",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2Fimages%20(11).jpeg?alt=media&token=6ca377a5-b8c9-40e2-a341-862cd517391d",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2F16x9.png?alt=media&token=8120ba23-9241-480f-bf90-92baa147deb4",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2FUntitled%20design%20(1).png?alt=media&token=b50bc44b-9010-4816-a338-c6c56ac7517b",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2FWhatsApp%20Image%202024-01-25%20at%2017.35.39_a02651d2.jpg?alt=media&token=b696da98-da17-4ea9-983b-e1e416834d17",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2F2675523.png?alt=media&token=8ddd8f2f-b624-4265-8dff-6e7ae0744180",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2FScreenshot%20from%202024-02-03%2010-30-47.png?alt=media&token=bbe1770e-1ec0-4524-9c8c-2e947eeaa6fa",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2Fimages%20(13).jpeg?alt=media&token=4f856f8e-0e02-42bc-a932-a273056a6aab",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2FAAAABSQ675kad19sWSP_TMaCbp264Rhn33pWmqHKsjsMTnxLBhnN1Gu3VvpR_W3VF1Sj8ahKDpeBn_7bDDK1LlgPxjgUMeSvlVGCzMU.jpg?alt=media&token=ccff83ed-9429-4209-922c-992f89311cde",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2Fvue_tube_ERD.jpg?alt=media&token=aa0c1d6c-46f0-45b6-a74d-2ea8d0d17db6",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2Fmohan-yadav-114634289-16x9_0.png?alt=media&token=756bf9bb-afa9-4bfc-b958-8e7a60a552c9",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2Ffederico-respini-sYffw0LNr7s-unsplash.jpg?alt=media&token=88848ae4-db89-4304-b16c-276382fb81b1",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2FScreenshot%20(3).jpg?alt=media&token=cae3da52-e07f-48fa-8d34-2c89b2470bc1",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2F4e4ee616-1d60-11ec-8752-7a8d4023984b_1632506768145_1707899754127.jpg?alt=media&token=690dd24d-0f66-46d5-b99f-0edf6cc3f396",
    "https://firebasestorage.googleapis.com/v0/b/mern-df125.appspot.com/o/thumbnail%2Flena-denk-vO_RghTzvxE-unsplash.jpg?alt=media&token=c49a5e1a-11e4-4ab8-8b02-8f5fe645673e",
  ]);
  const [validVideos, setValidVideos] = useState([
    {
      title: "How to Learn React in 30 Minutes",
      ytUrl: "https://youtube.com/watch?v=abcd1234",
      Tag: "Programming",
      thumbnail: "https://via.placeholder.com/320x180.png?text=React+Tutorial",
      channelId: "UC1234567890",
      channelName: "TechTutorials",
      channelPhoto: "https://randomuser.me/api/portraits/men/1.jpg",
      views: 1200000,
      likes: 45000,
      dislikes: 200,
      duration: 1800, // 30 minutes
      description: "A quick tutorial on how to learn React in 30 minutes.",
    },
    {
      title: "Top 10 JavaScript Frameworks in 2024",
      ytUrl: "https://youtube.com/watch?v=wxyz5678",
      Tag: "Programming",
      thumbnail:
        "https://via.placeholder.com/320x180.png?text=JavaScript+Frameworks",
      channelId: "UC6543210987",
      channelName: "DevWorld",
      channelPhoto: "https://randomuser.me/api/portraits/men/2.jpg",
      views: 980000,
      likes: 25000,
      dislikes: 100,
      duration: 1200, // 20 minutes
      description:
        "We dive into the top 10 JavaScript frameworks to watch in 2024.",
    },
    {
      title: "How to Create a Personal Portfolio in HTML/CSS",
      ytUrl: "https://youtube.com/watch?v=ijkl9012",
      Tag: "Web Development",
      thumbnail:
        "https://via.placeholder.com/320x180.png?text=Portfolio+Website",
      channelId: "UC9876543210",
      channelName: "CodeWithMe",
      channelPhoto: "https://randomuser.me/api/portraits/men/3.jpg",
      views: 500000,
      likes: 15000,
      dislikes: 50,
      duration: 1500, // 25 minutes
      description: "Learn how to create your first personal portfolio website.",
    },
    {
      title: "Python for Data Science - Full Course",
      ytUrl: "https://youtube.com/watch?v=mnop3456",
      Tag: "Programming",
      thumbnail:
        "https://via.placeholder.com/320x180.png?text=Python+Data+Science",
      channelId: "UC2345678901",
      channelName: "DataScienceHub",
      channelPhoto: "https://randomuser.me/api/portraits/men/4.jpg",
      views: 2000000,
      likes: 70000,
      dislikes: 300,
      duration: 7200, // 2 hours
      description: "An in-depth Python course for data science enthusiasts.",
    },
    {
      title: "Build a Full-stack App with Node.js and React",
      ytUrl: "https://youtube.com/watch?v=qrst6789",
      Tag: "Web Development",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Full-stack+App",
      channelId: "UC1357924680",
      channelName: "FullStackMaster",
      channelPhoto: "https://randomuser.me/api/portraits/men/5.jpg",
      views: 3500000,
      likes: 120000,
      dislikes: 500,
      duration: 5400, // 1.5 hours
      description:
        "Learn how to build a full-stack app using Node.js and React.",
    },
    {
      title: "Mastering CSS Grid Layout",
      ytUrl: "https://youtube.com/watch?v=uvwx7890",
      Tag: "Web Development",
      thumbnail: "https://via.placeholder.com/320x180.png?text=CSS+Grid+Layout",
      channelId: "UC2468135790",
      channelName: "FrontendMaster",
      channelPhoto: "https://randomuser.me/api/portraits/men/6.jpg",
      views: 1000000,
      likes: 30000,
      dislikes: 100,
      duration: 1800, // 30 minutes
      description: "Learn CSS Grid Layout in this comprehensive tutorial.",
    },
    {
      title: "Introduction to Machine Learning with TensorFlow",
      ytUrl: "https://youtube.com/watch?v=yzab1234",
      Tag: "Machine Learning",
      thumbnail:
        "https://via.placeholder.com/320x180.png?text=Machine+Learning+TensorFlow",
      channelId: "UC9876543210",
      channelName: "MLMaster",
      channelPhoto: "https://randomuser.me/api/portraits/men/7.jpg",
      views: 1500000,
      likes: 40000,
      dislikes: 200,
      duration: 3600, // 1 hour
      description: "A beginner's guide to machine learning with TensorFlow.",
    },
    {
      title: "Guitar Chords for Beginners",
      ytUrl: "https://youtube.com/watch?v=abcd2345",
      Tag: "Music",
      thumbnail: "https://via.placeholder.com/320x180.png?text=Guitar+Chords",
      channelId: "UC6789012345",
      channelName: "GuitarMaster",
      channelPhoto: "https://randomuser.me/api/portraits/men/8.jpg",
      views: 750000,
      likes: 25000,
      dislikes: 150,
      duration: 2400, // 40 minutes
      description: "Learn the basics of guitar chords for beginners.",
    },
    {
      title: "Photoshop for Beginners - Full Tutorial",
      ytUrl: "https://youtube.com/watch?v=cdef5678",
      Tag: "Design",
      thumbnail:
        "https://via.placeholder.com/320x180.png?text=Photoshop+Tutorial",
      channelId: "UC2345678901",
      channelName: "DesignWithMe",
      channelPhoto: "https://randomuser.me/api/portraits/men/9.jpg",
      views: 500000,
      likes: 10000,
      dislikes: 50,
      duration: 5400, // 1.5 hours
      description: "A comprehensive guide to learning Photoshop for beginners.",
    },
    {
      title: "React Native Tutorial for Beginners",
      ytUrl: "https://youtube.com/watch?v=fghi2345",
      Tag: "Comedy",
      thumbnail:
        "https://via.placeholder.com/320x180.png?text=React+Native+Tutorial",
      channelId: "UC2345678901",
      channelName: "MobileDevMaster",
      channelPhoto: "https://randomuser.me/api/portraits/men/10.jpg",
      views: 800000,
      likes: 30000,
      dislikes: 200,
      duration: 3600, // 1 hour
      description:
        "Learn how to build apps with React Native in this tutorial.",
    },
  ]);
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

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    "Artificial Intelligence",
    "Comedy",
    "Gaming",
    "Vlog",
    "Beauty",
    "Travel",
    "Food",
    "Fashion",
  ];

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await fetch(`${backendURL}/getvideos`);
        const {
          thumbnailURLs,
          titles,
          Uploader,
          Profile,
          Duration,
          videoID,
          views,
          uploadDate,
          Visibility,
          videoData,
        } = await response.json();
        setThumbnails(thumbnailURLs);
        setTitles(titles);
        setUploader(Uploader);
        setProfilePic(Profile);
        setDuration(Duration);
        setVideoID(videoID);
        setVideoViews(views);
        setPublishDate(uploadDate);
        setVisibility(Visibility);
        setVideoData(videoData);
      } catch (error) {
        // console.log(error.message);
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3600);
  }, []);

  useEffect(() => {
    if (theme === false && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "white";
    } else if (theme === true && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "0f0f0f";
    }
  }, [theme]);

  //UPDATE VIEWS

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
      // console.log(error.message);
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
            <div
              className="video-section"
              style={{
                marginLeft: menuClicked ? "40px" : "40px",
              }}
            >
              <div className="uploaded-videos">
                {Array.from({ length: 16 }).map((_, index) => (
                  <>
                    <div className="video-data">
                      <Skeleton
                        key={index}
                        count={1}
                        width={330}
                        height={186}
                        style={{ borderRadius: "12px" }}
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
                      // onClick={() => {
                      //   if (user?.success) {
                      //     updateViews(element._id);
                      //     setTimeout(() => {
                      //       window.location.href = `/video/${element._id}`;
                      //     }, 400);
                      //   }
                      //   window.location.href = `/video/${element._id}`;
                      // }}
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
                            {element.title}
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
