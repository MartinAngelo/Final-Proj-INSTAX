import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import clsx from "clsx";
import firebase from "../utils/firebase";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Button,
  InputAdornment,
  Divider,
  List,
  IconButton,
  CardActions,
} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import DeleteIcon from "@material-ui/icons/Delete";
import ReplyIcon from "@material-ui/icons/Reply";
import UploadForm from "../components/UploadForm";
import ImageGrid from "../components/ImageGrid";
import Modal from "../components/Modal";

const drawerWidth = 240;
const db = firebase.firestore();

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  divider: {
    marginTop: 1,
    marginBottom: 1,
  },
  cardField: {
    marginLeft: 40,
    marginRight: 40,
  },
  input: {
    display: "none",
  },
}));
export default function Home() {
  const currentUser = firebase.auth().currentUser;
  const classes = useStyles();
  const [userPosts, setPosts] = useState({
    posts: null,
  });
  const [avatar, setAvatar] = useState({
    src: null,
  });
  const [post, setPost] = useState({
    postContent: "",
  });
  const handleChange = (prop) => (e) => {
    setPost({ ...post, [prop]: e.target.value });
  };
  const createPost = (e) => {
    const currentUser = firebase.auth().currentUser;

    db.collection("users")
      .doc(currentUser.uid)
      .collection("posts")
      .add({
        postContent: post.postContent,
        date_posted: new Date().toISOString(),
      })
      .then(() => {});
    if (image.fileImage != null) {
      handleUpload();
    }
    post.postContent = "";
  };

  const deletePost = (id) => {
    const currentUser = firebase.auth().currentUser;
    db.collection("users")
      .doc(currentUser.uid)
      .collection("posts")
      .doc(id)
      .delete();
  };
  const [image, setImage] = useState({
    fileImage: null,
    progress: 0,
    downloadURL: null,
    displayURL: null,
  });
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage({
        fileImage: e.target.files[0],
        displayURL: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const handleUpload = () => {
    let file = image.fileImage;
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var uploadTask = storageRef
      .child("images/posts/" + currentUser.uid)
      .put(file);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImage({ progress });
      },
      (error) => {
        throw error;
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          setImage({
            downloadURL: url,
          });
        });
      }
    );
  };
  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    let abortController = new AbortController();
    const fetchData = () => {
      db.collection("users")
        .doc(currentUser.uid)
        .collection("posts")
        .orderBy("date_posted")
        .onSnapshot((snapshot) => {
          let posts = [];
          snapshot.forEach((doc) => {
            posts.unshift({ ...doc.data(), id: doc.id });
          });
          setPosts({ posts: posts });
        });
     
    };
    const fetchAvatar = () => {
      var storageRef = firebase.storage().ref();
      storageRef
        .child("images/" + currentUser.uid)
        .getDownloadURL()
        .then((url) => {
          setAvatar({
            src: url,
          });
        });
    };
    fetchAvatar();
    fetchData();
    return () => {
      abortController.abort();
    };
  }, []);

  const [selectedImg, setSelectedImg] = useState(null);

  const [state, setState] = useState ({
    user: null
  })

  useEffect (() => {
    var signedUser = firebase.auth().currentUser;

    if (signedUser) {
      setState({ user: signedUser })
    } else {
      setState (null)
    }
  }, [])

  return (
    <div>
      <Nav />
      <main>
        <div
          className={clsx(classes.content, {
            [classes.contentShift]: true,
          })}
        >
          <Card variant="outlined" id="cardField">
            <CardContent>
              <TextField
                variant="standard"
                placeholder="What's happening?"
                className={classes.postTalk}
                fullWidth
                multiline
                inputProps={{
                  maxLength: 140,
                }}
                onChange={handleChange("postContent")}
                value={post.postContent}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Avatar 
                      src={avatar.src || ".././images/profile.jpg"} />
                    </InputAdornment>
                  ),
                }}
              />
            </CardContent>
            <Grid id="submitButton">
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                className={classes.input}
                onChange={handleImageChange}
              />
              <label htmlFor="contained-button-file">
                <IconButton component="span">
                <UploadForm />
                </IconButton>
              </label>
              <Button
                id="submitBtn"
                variant="contained"
                color="primary"
                size="small"
                onClick={createPost}
                disableElevation
              >
                Post
              </Button>
            </Grid>
          </Card>
          <List>
            {userPosts.posts &&
              userPosts.posts.map((posts) => {
                return (
                  <Card
                    variant="outlined"
                    id="cardField"
                    elevation={1}
                    key={posts.id}
                  >
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item>
                        <Avatar 
                        src={avatar.src || ".././images/profile.jpg"}
                        />
                      </Grid>
                      <Grid item xs zeroMinWidth>
                        <div id="Post">
                          <Typography id="post" variant="subtitle1">
                            {state.user ? state.user.email : "null"}
                          </Typography>
                        </div>
                      </Grid>
                      <Grid item>
                        <ImageGrid setSelectedImg={setSelectedImg} />
                        { selectedImg && (
                        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
                        )}
                      </Grid>
                    </Grid>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid item xs zeroMinWidth>
                        <Typography>{posts.postContent}</Typography>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <CardActions disableSpacing>
                      <IconButton>
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton>
                        <InsertCommentIcon />
                      </IconButton>
                      <IconButton>
                        <ReplyIcon />
                      </IconButton>
                      <IconButton
                        className={classes.button}
                        onClick={() => deletePost(posts.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                );
              })}
          </List>
        </div>
      </main>
    </div>
  );
}
