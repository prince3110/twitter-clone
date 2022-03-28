import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from './PostItem';


function AllPosts() {
    const [posts,setPosts] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:8080/api/auth/posts")
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
            <h3>All Posts</h3>
        </div>
        <ul>
            {posts.map(post => {
                return(
                    <PostItem
                    key={post.id}
                    userId={post.userId}
                    content={post.content}
                    id={post.id}
                    comments={post.comments}
                    setPosts={setPosts}
                    />
                );
            })
        }
        </ul>
      </div>
    )
}

export default AllPosts
