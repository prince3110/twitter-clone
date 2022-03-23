import axios from 'axios';
import React, { useEffect, useState } from 'react'

function CommentItem(props) {
    const [username, setUsername] = useState("")
    const {userId,content} = props

    useEffect(() => {
        const data = {
          userId: `${props.userId}`
        };
        axios.post("http://localhost:8080/api/auth/user/profile",data)
          .then(res => {
            console.log(res)
            setUsername(res.data.payload.username)
          })
          .catch(err =>{
            console.log(err)
          })
    },[])

  return (
    <div>
        {content !== "" ? (
            <div>
                <div style={
                    {
                        border: "2px solid blue",
                        width: "50%"
                    }
                }>
                User:{username}
                </div>
                <div style={
                    {
                        border: "2px solid blue",
                        // height: "200px",
                        width: "40%",
                        marginBottom: "30px",
                        paddingBottom: "30px"
                    }
                }>            
                    <p>{props.content}</p>
                </div>
            </div>
        ) : (
            <span></span>
        )}
    </div>
    // <div>
    //     <div style={
    //         {
    //             border: "2px solid blue",
    //             width: "50%"
    //         }
    //     }>
    //     User:{username}
    //     </div>
    //     <div style={
    //         {
    //             border: "2px solid blue",
    //             // height: "200px",
    //             width: "40%",
    //             marginBottom: "30px",
    //             paddingBottom: "30px"
    //         }
    //     }>            
    //         <p>{props.content}</p>
    //     </div>
    // </div>
  )
}

export default CommentItem