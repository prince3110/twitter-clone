import {useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("id") !== null || undefined){
      navigate("/")
    }
  })

  const [username, setUserName ] = useState("");
  const [pwd, setPwd] = useState("");

  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg('')
  },[username,pwd])

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      username: `${username}`,
      password: `${pwd}`
    }
    await axios.post('http://localhost:8080/api/auth/signin',data)
      .then(
          res => {
            console.log(res);
            console.log(res?.data);
            const id = res?.data?.id;
            const email = res?.data?.email;
            const accessToken = res?.data?.accessToken;
            console.log(accessToken);
            console.log(id);
            console.log(username);
            console.log(email);
            if(accessToken) {
              // localStorage.setItem({"user",JSON.stringify(res.data)});
              localStorage.setItem("id", id);
              localStorage.setItem("username", username);
              localStorage.setItem("email", email);
              localStorage.setItem("accessToken", accessToken);
              setSuccess(true);
              // setAuth(res?.data);
            }
          }
      ).catch(
          err => {
              console.log(err);
              console.log(err.response);
              if(!err?.response){
                setErrMsg("No Server Response");
              }
              else{
                setErrMsg(err.response.data.message);
              }
              console.log(errMsg);
            }
      )
  }

  return (
    <>
    {success ? (
      navigate("/")
    ) : (
      <div className='signin'>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>Username:</label>
          <input 
            type="text" 
            id="username"
            autoComplete='off'
            onChange={(e) => setUserName(e.target.value)}
            value={username} 
            required
          />

          <label htmlFor='password'>Password:</label>
          <input
            type="password"
            id='password'
            onChange={e => setPwd(e.target.value)}
            value={pwd}
            required
          />

          <button>Sign In</button>
        </form>
        <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>

        <p>
          Need an Account?<br />
          <span className='line'>
            <a href='/register'>Sign Up</a>
          </span>
        </p>
      </div>
    )}
  </>
  )
}

export default SignIn