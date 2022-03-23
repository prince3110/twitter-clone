import React, {useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem';

function MyProfile() {
  const [posts,setPosts] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const data = {
      userId: `${userId}`
    };
    axios.post("http://localhost:8080/api/auth/user/profile",data)
      .then(res => {
        console.log(res)
        setUsername(res.data.payload.username)
        setEmail(res.data.payload.email)
      })
      .catch(err =>{
        console.log(err)
      })
  },[])
  
  useEffect(() => {
    const data = {
      userId: `${userId}`
    };
    axios.post("http://localhost:8080/api/auth/myposts",data)
      .then(res => {
        console.log(res)
        setPosts(res.data.payload)
      })
      .catch(err =>{
        console.log(err)
      })
  },[])
  return (
    <div>
      <div>
        <h1>{username} profile</h1>
        <h3>{email}</h3>
        <br />
      </div>
      {posts !== null ?(
        <ul>
          {posts.map(post => {
            return(
              <PostItem
                key={post.id}
                userId={post.userId}
                content={post.content}
                id={post.id}
                comments={post.comments}
              />
            );
          })
          }
        </ul>
      ) : (
        <span></span>
      )}

    </div>
  )
}

export default MyProfile
