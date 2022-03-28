import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFillPersonFill } from "react-icons/bs";

function CommentItem(props) {
    const [username, setUsername] = useState("")
    const userId = props.userId
    const content = props.content

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

  return (
    <div>
        {content !== "" ? (
            <div>
                <div>
                <BsFillPersonFill />{username}
                </div>
                <div style={
                    {
                        border: "2px solid blue",
                        borderRadius: "10px",
                        // height: "200px",
                        width: "50%",
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