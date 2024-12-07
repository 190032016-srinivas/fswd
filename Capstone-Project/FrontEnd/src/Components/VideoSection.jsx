import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

import Plyr from "plyr";
import Navbar from "./Navbar";
import Share from "./Share";
import "../Css/videoSection.css";
import "plyr/dist/plyr.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import Zoom from "@mui/material/Zoom";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import { LiaDownloadSolid } from "react-icons/lia";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import avatar from "../img/avatar.png";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Signin from "./Signin";
import Signup from "./Signup";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeftPanel from "./LeftPanel";
import Error from "./Error";
import { useSelector } from "react-redux";
import useNotifications from "../useNotification";

function VideoSection() {
  const backendURL = "http://localhost:3000";
  // const { id } = useParams();
  const [videoData, setVideoData] = useState(null);
  // const [channelName, setChannelName] = useState();
  const [plyrInitialized, setPlyrInitialized] = useState(false);
  const [Display, setDisplay] = useState("none");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [isChannel, setisChannel] = useState();
  const [shareClicked, setShareClicked] = useState(false);
  const [usermail, setUserMail] = useState();
  const [channelID, setChannelID] = useState();
  const [isSwitch, setisSwitched] = useState(false);
  const [showEditComment, setShowEditComment] = useState(false);
  const [editCommentValue, setEditComment] = useState("");
  const [editCommentId, setEditCommentId] = useState();

  const [isbtnClicked, setisbtnClicked] = useState(false);
  const videoRef = useRef(null);
  const [TagSelected, setTagSelected] = useState("All");
  const [userVideos, setUserVideos] = useState([]);
  const [checkTrending, setCheckTrending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recommendLoading, setRecommendLoading] = useState(true);
  const [likeLoading, setLikeLoading] = useState(false);
  const [seeDesc, setSeeDesc] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentOpacity, setCommentOpacity] = useState(1);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  //EXTRAS

  const [thumbnails, setThumbnails] = useState();
  const [Titles, setTitles] = useState();
  const [Uploader, setUploader] = useState();
  const [duration, setDuration] = useState();
  const [VideoID, setVideoID] = useState();
  const [Views, SetViews] = useState();
  const [publishdate, setPublishDate] = useState();
  const [VideoLikes, setVideoLikes] = useState();
  const [commentLikes, setCommentLikes] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [createPlaylistClicked, setcreatePlaylistClicked] = useState(false);
  const [privacyClicked, setprivacyClicked] = useState(false);
  const [playlistClicked, setPlaylistClicked] = useState(false);
  const [privacy, setPrivacy] = useState("Public");
  const [playlistName, setPlaylistName] = useState("");
  const [UserPlaylist, setUserPlaylist] = useState([]);
  const [playlistID, setplaylistID] = useState([]);
  const [isHeart, setIsHeart] = useState([]);
  const [rec, setRecommend] = useState(false);
  const User = useSelector((state) => state.impDetailsStoreKey.impDetails);
  const { user } = User;
  //Get Channel Data
  const [youtuberName, setyoutuberName] = useState();
  const [youtuberProfile, setyoutuberProfile] = useState();
  const [youtubeChannelID, setyoutubeChannelID] = useState();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [Subscribers, setSubscribers] = useState();

  //Signup user Profile Pic
  const [userProfile, setUserProfile] = useState();

  //TOAST FUNCTIONS

  const playlistNotify = () =>
    toast.success("Video added to the playlist!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  const watchLaterNotify = () =>
    toast.success("Video saved to watch later!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  const LikedNotify = () =>
    toast.success("Video liked!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

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

  const CommentDeleteNotify = () =>
    toast.success("Comment deleted!", {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  const impDetails = useSelector(
    (state) => state.impDetailsStoreKey.impDetails
  );
  const {
    userId,
    userPp,
    userName,
    userEmail,
    authToken,
    channelId,
    channelName,
  } = impDetails;

  const videoId = useParams().videoId;
  console.log("videoid=", videoId);
  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };
  const getComments = async () => {
    try {
      if (videoId) {
        setCommentLoading(true);
        const response = await fetch(`${backendURL}/comments/${videoId}`);
        const comments = await response.json();
        comments.reverse();
        setComments(comments);
      }
    } catch (error) {
      console.log("error in fetching channel id ", error);
    } finally {
      setComment("");
      setCommentLoading(false);
    }
  };
  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        if (videoId) {
          const response = await fetch(`${backendURL}/videos/${videoId}`);
          const videoData = await response.json();
          setVideoData(videoData);
        }
      } catch (error) {
        console.log("error in fetching channel id ", error);
      }
    };

    getVideoDetails();

    getComments();
  }, [videoId]);
  const { SuccessNotify, ErrorNotify } = useNotifications(theme);
  async function uploadComment() {
    try {
      let body = {
        videoId: videoId,
        comment,
        channelName,
        channelId,
        channelPp: userPp,
      };
      const response = await fetch(`${backendURL}/comments/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        SuccessNotify("Comment Added.");
        getComments();
      } else {
        ErrorNotify("Could not add comment");
      }
    } catch (error) {
      ErrorNotify(error.message);
    }
  }
  async function DeleteComment(id) {
    try {
      const response = await fetch(`${backendURL}/comments/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        SuccessNotify("Comment deleted");
        getComments();
      } else {
        ErrorNotify("Could not delete comment");
      }
    } catch (error) {}
  }
  async function EditComment() {
    try {
      let body = {
        commentId: editCommentId,
        newComment: editCommentValue,
      };
      const response = await fetch(`${backendURL}/comments/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        SuccessNotify("Comment updated");
        getComments();
        setShowEditComment(false);
      } else {
        ErrorNotify("Could not edit comment");
      }
    } catch (error) {
      ErrorNotify("Could not edit comment");
    }
  }
  useEffect(() => {
    const getAllVideos = async () => {
      try {
        const response = await fetch(`${backendURL}/videos`);
        const allVideos = await response.json();
        setAllVideos(allVideos);
      } catch (error) {
        console.log("error in fetching videos=", error);
      }
    };
    getAllVideos();
  }, []);
  return (
    <>
      {showEditComment && (
        <div className="modal-overlay">
          <div className={theme ? "modal-container" : "modal-container-light"}>
            <h3>Edit comment</h3>

            <textarea
              type="text"
              value={editCommentValue}
              onChange={(e) => {
                setEditComment(e.target.value);
              }}
              className={theme ? "modal-input" : "modal-input-light"}
            />

            <div className="button-container">
              <>
                <button
                  onClick={() => {
                    setShowEditComment(false);
                  }}
                  className={
                    theme
                      ? "delete-comment-btn"
                      : "delete-comment-btn-light text-dark-mode"
                  }
                >
                  Cancel
                </button>
                <button
                  onClick={EditComment}
                  className={
                    theme
                      ? "delete-comment-btn"
                      : "delete-comment-btn-light text-dark-mode"
                  }
                >
                  Edit
                </button>
              </>
            </div>
          </div>
        </div>
      )}
      <Navbar />
      <div className="my-panelbar">
        <LeftPanel />
      </div>
      <div
        className={
          theme ? "main-video-section" : "main-video-section light-mode"
        }
      >
        <div className="left-video-section2">
          <div className="videoframe">
            <YouTube
              className="play-video"
              videoId={videoData?.ytUrl}
              opts={opts}
            />
          </div>

          <p className={theme ? "vid-title" : "vid-title text-light-mode"}>
            {videoData?.title}
          </p>
          <div className="some-channel-data">
            <div
              className={
                theme
                  ? "channel-left-data"
                  : "channel-left-data text-light-mode"
              }
            >
              <img
                src={videoData?.channelPhoto}
                alt="channelDP"
                className="channelDP"
                loading="lazy"
                onClick={() => {
                  if (channelID !== undefined) {
                    window.location.href = `/channel/${channelID}`;
                  }
                }}
              />
              <div className="channel-data2">
                <div className="creator">
                  <p
                    style={{ fontSize: "17px", cursor: "pointer" }}
                    onClick={() => {
                      if (channelID !== undefined) {
                        window.location.href = `/channel/${channelID}`;
                      }
                    }}
                  >
                    {videoData?.channelName}
                  </p>

                  <CheckCircleIcon
                    fontSize="100px"
                    style={{
                      color: "rgb(138, 138, 138)",
                      marginLeft: "4px",
                    }}
                  />
                </div>
                <p
                  className={
                    theme ? "channel-subs" : "channel-subs text-light-mode2"
                  }
                >
                  {/* {Subscribers} subscribers */}
                  7566 subscribers
                </p>
              </div>
              <button
                className={theme ? "subscribe" : `subscribe-light`}
                style={{ cursor: "pointer" }}
              >
                Subscribe
              </button>
            </div>
            <div className="channel-right-data c-right1">
              <div
                className="like-dislike"
                style={{ opacity: 1, cursor: "pointer", pointerEvents: "auto" }}
              >
                <div
                  className={
                    theme
                      ? "like-data"
                      : "like-data like-data-light text-light-mode"
                  }
                >
                  <ThumbUpAltOutlinedIcon
                    fontSize="medium"
                    style={{ color: theme ? "white" : "black" }}
                    className="like-icon"
                  />

                  <p className="like-count">{VideoLikes}</p>
                </div>
                <div className={theme ? "vl" : "vl-light"}></div>

                <div
                  className={
                    theme
                      ? "dislike-data"
                      : "dislike-data dislike-data-light text-light-mode"
                  }
                >
                  <ThumbDownOutlinedIcon
                    fontSize="medium"
                    style={{ color: theme ? "white" : "black" }}
                    className="dislike-icon"
                  />
                </div>
              </div>

              <div
                className={
                  theme ? "share" : "share share-light text-light-mode"
                }
                // onClick={() => {
                //   if (shareClicked === false) {
                //     setShareClicked(true);
                //     document.body.classList.add("bg-css");
                //   } else {
                //     setShareClicked(false);
                //     document.body.classList.remove("bg-css");
                //   }
                // }}
              >
                <ReplyIcon
                  fontSize="medium"
                  style={{
                    color: theme ? "white" : "black",
                    transform: "rotateY(180deg)",
                  }}
                  className="sharee-icon"
                />
                <p className="share-txt">Share</p>
              </div>

              <div
                className={
                  theme
                    ? "download-btn"
                    : "download-btn download-btn-light text-light-mode"
                }
              >
                <h3>
                  <LiaDownloadSolid
                    fontSize={24}
                    className="download-icon"
                    color={theme ? "white" : "black"}
                  />
                </h3>
                <p className="download-txt">Download</p>
              </div>

              <div
                className={
                  theme
                    ? "save-later"
                    : "save-later save-later-light text-light-mode"
                }
              >
                <BookmarkAddOutlinedIcon
                  fontSize="medium"
                  style={{ color: theme ? "white" : "black" }}
                  className="save-video-icon"
                />

                <p>Save</p>
              </div>

              <div
                className={
                  theme
                    ? "add-playlist"
                    : "add-playlist add-playlist-light text-light-mode"
                }
              >
                <PlaylistAddIcon
                  fontSize="medium"
                  style={{ color: theme ? "white" : "black" }}
                  className="playlist-iconn"
                />

                <p>Playlist</p>
              </div>
            </div>
            <div className="channel-right-data c-right2">
              <div className="first-c-data">
                <div
                  className="like-dislike"
                  style={{
                    opacity: 1,
                    cursor: "pointer",
                    pointerEvents: "auto",
                  }}
                >
                  <div
                    className={
                      theme
                        ? "like-data"
                        : "like-data like-data-light text-light-mode"
                    }
                  >
                    <ThumbUpAltOutlinedIcon
                      fontSize="medium"
                      style={{ color: theme ? "white" : "black" }}
                      className="like-icon"
                    />

                    <p className="like-count">{videoData?.likes}</p>
                  </div>
                  <div className={theme ? "vl" : "vl-light"}></div>

                  <div
                    className={
                      theme
                        ? "dislike-data"
                        : "dislike-data dislike-data-light text-light-mode"
                    }
                  >
                    <ThumbDownOutlinedIcon
                      fontSize="medium"
                      style={{ color: theme ? "white" : "black" }}
                      className="dislike-icon"
                    />
                  </div>
                </div>

                <div
                  className={
                    theme ? "share" : "share share-light text-light-mode"
                  }
                  // onClick={() => {
                  //   if (shareClicked === false) {
                  //     setShareClicked(true);
                  //     document.body.classList.add("bg-css");
                  //   } else {
                  //     setShareClicked(false);
                  //     document.body.classList.remove("bg-css");
                  //   }
                  // }}
                >
                  <ReplyIcon
                    fontSize="medium"
                    style={{
                      color: theme ? "white" : "black",
                      transform: "rotateY(180deg)",
                    }}
                    className="sharee-icon"
                  />
                  <p className="share-txt">Share</p>
                </div>

                <div
                  className={
                    theme
                      ? "download-btn"
                      : "download-btn download-btn-light text-light-mode"
                  }
                >
                  <h3>
                    <LiaDownloadSolid fontSize={24} className="download-icon" />
                  </h3>
                  <p className="download-txt">Download</p>
                </div>

                <div
                  className={
                    theme
                      ? "save-later"
                      : " save-later save-later-light text-light-mode"
                  }
                >
                  <BookmarkAddOutlinedIcon
                    fontSize="medium"
                    style={{ color: theme ? "white" : "black" }}
                    className="save-video-icon"
                  />
                  <p>Save</p>
                </div>
              </div>
              <div className="firstt-c-data">
                <div
                  className="like-dislike"
                  style={{
                    opacity: 1,
                    cursor: "pointer",
                    pointerEvents: "auto",
                  }}
                >
                  <div
                    className={
                      theme
                        ? "like-data"
                        : "like-data like-data-light text-light-mode"
                    }
                  >
                    <ThumbUpAltOutlinedIcon
                      fontSize="medium"
                      style={{ color: theme ? "white" : "black" }}
                      className="like-icon"
                    />

                    <p className="like-count">{videoData?.likes}</p>
                  </div>

                  <div className={theme ? "vl" : "vl-light"}></div>

                  <div
                    className={
                      theme
                        ? "dislike-data"
                        : "dislike-data dislike-data-light text-light-mode"
                    }
                  >
                    <ThumbDownOutlinedIcon
                      fontSize="medium"
                      style={{ color: theme ? "white" : "black" }}
                      className="dislike-icon"
                    />
                  </div>
                </div>

                <div
                  className={
                    theme ? "share" : "share share-light text-light-mode"
                  }
                >
                  <ReplyIcon
                    fontSize="medium"
                    style={{
                      color: theme ? "white" : "black",
                      transform: "rotateY(180deg)",
                    }}
                    className="sharee-icon"
                  />
                  <p className="share-txt">Share</p>
                </div>

                <div
                  className={
                    theme
                      ? "download-btn"
                      : "download-btn download-btn-light text-light-mode"
                  }
                >
                  <h3>
                    <LiaDownloadSolid fontSize={24} className="download-icon" />
                  </h3>
                  <p className="download-txt">Download</p>
                </div>
              </div>
              <div className="second-c-data">
                <div
                  className={
                    theme
                      ? "add-playlist"
                      : "add-playlist add-playlist-light text-light-mode"
                  }
                >
                  <PlaylistAddIcon
                    fontSize="medium"
                    style={{ color: theme ? "white" : "black" }}
                  />

                  <p>Playlist</p>
                </div>
              </div>
              <div className="third-c-data">
                <div
                  className={
                    theme
                      ? "save-later"
                      : "save-later save-later-light text-light-mode"
                  }
                >
                  <BookmarkAddOutlinedIcon
                    fontSize="medium"
                    style={{ color: theme ? "white" : "black" }}
                    className="save-video-icon"
                  />

                  <p>{isSaved === true ? "Saved" : "Save"}</p>
                </div>

                <div
                  className={
                    theme
                      ? "add-playlist"
                      : "add-playlist add-playlist-light text-light-mode"
                  }
                >
                  <PlaylistAddIcon
                    fontSize="medium"
                    style={{ color: theme ? "white" : "black" }}
                  />

                  <p>Playlist</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              theme
                ? "description-section2"
                : "description-section2-light text-light-mode feature-light3"
            }
          >
            <div className="views-date" style={{ fontSize: "15.5px" }}>
              <p>
                {videoData?.views >= 1e9
                  ? `${(videoData?.views / 1e9).toFixed(1)}B`
                  : videoData?.views >= 1e6
                  ? `${(videoData?.views / 1e6).toFixed(1)}M`
                  : videoData?.views >= 1e3
                  ? `${(videoData?.views / 1e3).toFixed(1)}K`
                  : videoData?.views}{" "}
                views
              </p>
            </div>
            <div className="desc-data">
              <p style={{ marginTop: "20px" }} className="videos-desc">
                {videoData?.description}
              </p>
            </div>
          </div>
          <div className="comments-section second-one">
            <div
              className={
                theme ? "total-comments" : "total-comments text-light-mode"
              }
            >
              <p>{comments ? "Comments" : "Comment"}</p>
            </div>
            {commentLoading === false ? (
              <div className="my-comment-area">
                <img
                  src={userPp ?? avatar}
                  alt="channelDP"
                  className="channelDP"
                  loading="lazy"
                />
                <input
                  className={
                    theme ? "comment-input" : "comment-input text-light-mode"
                  }
                  type="text"
                  name="myComment"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </div>
            ) : (
              <div
                className="my-comment-area"
                style={{
                  width: "-webkit-fill-available",
                  justifyContent: "center",
                }}
              >
                <div
                  className="spin22"
                  style={{ position: "relative", top: "20px" }}
                >
                  <div className={theme ? "loader2" : "loader2-light"}></div>
                </div>
              </div>
            )}
            {commentLoading === false ? (
              <div
                className="comment-btns"
                style={{ display: comment.length > 0 ? "block" : "none" }}
              >
                <button
                  className={
                    theme ? "cancel-comment" : "cancel-comment text-light-mode"
                  }
                  onClick={() => {
                    setComment("");
                  }}
                >
                  Cancel
                </button>
                <button
                  className={theme ? "upload-comment" : "upload-comment-light"}
                  onClick={() => {
                    if (channelId) {
                      setCommentLoading(true);
                      //clear the loader and the comment after success else error notfy also succ ntfy
                      uploadComment();
                    } else {
                      ErrorNotify("Please create a channel first.");
                    }
                  }}
                >
                  Comment
                </button>
              </div>
            ) : (
              ""
            )}

            <div className="video-comments">
              {comments?.map((element, index) => {
                return (
                  <>
                    <div
                      className="comment-data"
                      key={index}
                      style={{
                        transition: "all 0.15s ease",
                        opacity: commentOpacity,
                      }}
                    >
                      <div className="comment-left-data">
                        <img
                          src={element.channelPp}
                          style={{ cursor: "pointer" }}
                          alt="cdp"
                          className="commentDP"
                          loading="lazy"
                          onClick={() => {
                            window.location.href = `/channel/${element.channelId}`;
                          }}
                        />
                      </div>
                      <div
                        className={
                          theme
                            ? "comment-right-data"
                            : "comment-right-data text-light-mode"
                        }
                      >
                        <div className="comment-row1">
                          <p
                            onClick={() => {
                              window.location.href = `/channel/${element.channelId}`;
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            {element.channelName}
                          </p>
                        </div>
                        <p className="main-comment">{element.comment}</p>
                        <div className="comment-interaction">
                          <ThumbUpIcon
                            fontSize="small"
                            style={{
                              color: theme ? "white" : "black",
                              cursor: "pointer",
                            }}
                            // onClick={() => {
                            //   if (user?.email) {
                            //     LikeComment(element._id);
                            //   } else {
                            //     setisbtnClicked(true);
                            //     document.body.classList.add("bg-css");
                            //   }
                            // }}
                            className="comment-like"
                          />

                          <FavoriteBorderOutlinedIcon
                            fontSize="small"
                            style={{
                              color: theme ? "white" : "black",
                              marginLeft: "20px",
                              cursor: "pointer",
                            }}
                            className="heart-comment"
                            // onClick={() => {
                            //   if (user?.email === usermail) {
                            //     HeartComment(element._id);
                            //   }
                            // }}
                          />

                          {element.channelId === channelId && (
                            <button
                              className={
                                theme
                                  ? "delete-comment-btn"
                                  : "delete-comment-btn-light text-dark-mode"
                              }
                              style={{ marginLeft: "17px" }}
                              onClick={() => {
                                setShowEditComment(true);
                                setEditCommentId(element._id);
                                setEditComment(element.comment);
                              }}
                            >
                              Edit
                            </button>
                          )}
                          {element.channelId === channelId && (
                            <button
                              className={
                                theme
                                  ? "delete-comment-btn"
                                  : "delete-comment-btn-light text-dark-mode"
                              }
                              style={{ marginLeft: "17px" }}
                              onClick={() => DeleteComment(element._id)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="recommended-section">
          <div className="recommend-tags" style={{ paddingBottom: "10px" }}>
            <div
              className={`top-tags tag-one ${
                theme ? "tag-color" : "tag-color-light"
              }`}
            >
              <p>All</p>
            </div>
            <div
              className={`top-tags tag-two ${theme ? "" : "tagcolor-newlight"}`}
              style={{ marginLeft: "10px" }}
            >
              <p>Recommended</p>
            </div>
          </div>
          <div
            className="video-section2"
            style={{ display: "flex", gap: "10px" }}
          >
            {allVideos.length &&
              allVideos.map((element, index) => {
                return (
                  <div
                    className="video-data12"
                    style={
                      element._id === videoId
                        ? { display: "none" }
                        : { display: "flex" }
                    }
                    key={index}
                    onClick={() => {
                      window.location.href = `/video/${element._id}`;
                    }}
                  >
                    <div className="video-left-side">
                      <img
                        src={element.thumbnail}
                        alt=""
                        className="recommend-thumbnails"
                        loading="lazy"
                      />
                      {/* <p className="duration duration2">
                        {Math.floor(element.duration / 60) +
                          ":" +
                          (Math.round(element.duration % 60) < 10
                            ? "0" + Math.round(element.duration % 60)
                            : Math.round(element.duration % 60))}
                      </p> */}
                    </div>
                    <div className="video-right-side">
                      <p
                        className={
                          theme
                            ? "recommend-vid-title"
                            : "recommend-vid-title text-light-mode"
                        }
                      >
                        {element.title}
                      </p>
                      <div
                        className={
                          theme
                            ? "recommend-uploader"
                            : "recommend-uploader text-light-mode2"
                        }
                      >
                        <p
                          className={
                            theme
                              ? "recommend-vid-uploader uploader"
                              : "recommend-vid-uploader uploader nohover"
                          }
                        >
                          {element.channelName}
                        </p>

                        <CheckCircleIcon
                          fontSize="100px"
                          style={{
                            color: "rgb(138, 138, 138)",
                            marginLeft: "4px",
                          }}
                        />
                      </div>
                      <div className="view-time">
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
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoSection;
