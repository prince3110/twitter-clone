import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { RiSendPlane2Fill } from 'react-icons/ri';
import CommentItem from './CommentItem';
import { useNavigate } from 'react-router-dom';
import { BsFillPersonFill } from "react-icons/bs";

function MyPostItem(props) {

    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [commentContent, setCommentContent] = useState("")
    const [sendButtonDisable, setSendButtonDisable] = useState(true)
    const [deleteButtonDisable, setDeleteButtonDisable] = useState(false)
    const [comments,setComments] = useState(props.comments)
    // const [post,setPost] = useState(props.post)
    const userId = props.userId
    const postId = props.id

    useEffect(() => {
        axios.get(`http://localhost:8080/api/auth/user/${userId}`)
          .then(res => {
            console.log(res)
            setUsername(res.data.payload.username)
          })
          .catch(err =>{
            console.log(err)
          })
      },[])

      function handleCommentContentChange(e) {
        setCommentContent(e.target.value);
        if(commentContent === "") {
          setSendButtonDisable(true);
        }
        else{
          setSendButtonDisable(false);
        }
      }

      const deletePost = (e) => {
          axios.delete(`http://localhost:8080/api/auth/post/${postId}`)
          .then(
              res => {
                  console.log(res);
                  setDeleteButtonDisable(true);
              }
          )
          .catch(
              err => {
                  console.log(err);
              }
          )
      }
    
      const sendComment = async (e) => {
        const data = {
            userId: `${localStorage.getItem("id")}`,
            postId: `${props.id}`,
            content: `${commentContent}`
        };
        await axios.post("http://localhost:8080/api/auth/comment",data)
        .then(
            res => {
                console.log(res);
                setCommentContent("");
                setSendButtonDisable(true);
                // setPost(null);
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
      {!deleteButtonDisable ? (
        <div>
          <div>
              <BsFillPersonFill />{username}
          </div>
          <div style={
              {
                  border: "2px solid grey",
                  borderRadius: "10px",
                  // height: "200px",
                  width: "50%",
                  marginBottom: "50px",
                  paddingBottom: "40px"
              }
          }>
              <p>{props.content}</p>
              <Button 
                  onClick={deletePost}
                  disabled={deleteButtonDisable}
              >Delete Post</Button>
              <div className="border rounded-3 border-success p-3 shadow">
                <Form>
                  <Form.Group>
                    <Form.Control
                      type='text'
                      placeholder='Write a comment...'
                      value={commentContent}
                      onChange={handleCommentContentChange}                  
                    />
                  </Form.Group>
                </Form>
                <div className='ms-auto'>
                  <Button
                    disabled={sendButtonDisable}
                    onClick={sendComment}
                  ><RiSendPlane2Fill />
                  </Button>
                </div>
              </div>

              <div>
                <div>
                    <h3>All Comments</h3>
                </div>
                {comments !== null ? (
                  <ul>
                    {comments.map(comment => {
                      return(
                          <CommentItem
                          key={comment.id}
                          userId={comment.userId}
                          content={comment.content}
                        />
                      );
                    })
                    }
                  </ul>
                ) : (
                  <span></span>
                )}
              </div>
          </div>
        </div>   
      ) : (<span></span>)}
    </div>
  )
}

export default MyPostItem
