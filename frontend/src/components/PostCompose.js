import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";


function PostCompose() {

  const [username, setUserName] = useState(localStorage.getItem("username"));
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [postContent, setPostContent] = useState("");
  const [postContentCount, setPostContentCount] = useState(0);
  const [disablePostButton, setDisablePostButton] = useState(true);

  function handleContentChange(e) {
    setPostContent(e.target.value);
    setPostContentCount(e.target.value.length);
    if(postContentCount === 0 || postContentCount > 200) {
      setDisablePostButton(true);
    }
    else{
      setDisablePostButton(false);
    }
  }

  const handleCreatePost = async (e) => {
    const data = {
        userId: `${userId}`,
        content: `${postContent}`
    };
    await axios.post("http://localhost:8080/api/auth/post",data)
    .then(
        res => {
            console.log(res);
            setPostContent("");
        }
    )
    .catch(
        err => {
            console.log(err);
        }
    )
  }
  
  return (
    <div>
      {/* <h1>PostCompose component</h1> */}
      <div className="border rounded-3 border-success p-3 shadow">
        <Form className="d-flex flex-column">
          <Form.Group className="mb-3">
            <Form.Label>
              <div className="d-flex align-items-center mb-1">
                <div className="fs-4 fw-bold">{username}</div>
              </div>
            </Form.Label>
            <Form.Control
              as="textarea"
              row={4}
              placeholder="What is happening?"
              value={postContent}
              onChange={handleContentChange}
              style={{ resize: "none", height: "10rem", width: "15rem" }}
            />
          </Form.Group>
          <div className="d-flex justify-content-end align-items-center">
            <span>Characters: {postContentCount}/200</span>
            <Button
              onClick={handleCreatePost}
              variant="success"
              disabled={disablePostButton}
              className="col-2 mx-3"
            >
              Post
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default PostCompose;