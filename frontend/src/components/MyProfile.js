import React, {useState, useEffect } from 'react';
import axios from 'axios';
import MyPostItem from './MyPostItem';

function MyProfile() {
  const [posts,setPosts] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/auth/user/${userId}`)
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
    axios.get(`http://localhost:8080/api/auth/user/${userId}/post`)
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
        <h2>{username} profile</h2>
        <h4>{email}</h4>
        <br />
      </div>
      {posts !== null ?(
        <ul>
          {posts.map(post => {
            return(
              <MyPostItem
                key={post.id}
                userId={post.userId}
                content={post.content}
                id={post.id}
                comments={post.comments}
                post={post}
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
