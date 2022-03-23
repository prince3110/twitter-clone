import { useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("id") !== null || undefined){
          navigate("/")
        }
    })

    const [username, setUserName] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password,matchPwd])

    useEffect(() => {
        setErrMsg('')
    },[username,email,password,matchPwd])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username: `${username}`,
            email: `${email}`,
            password: `${password}`
        };
        await axios.post("http://localhost:8080/api/auth/signup",data)
        .then(
            res => {
                console.log(res);
                setSuccess(true);
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        )
    }

    return (
        <>
            {success ? (
                navigate("/signin")
            ) : (
                <div className="register">
                    <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            autoComplete="off"
                            onChange={(e) => setUserName(e.target.value)}
                            value={username}
                        />


                        {/* <label htmlFor="lastname">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            autoComplete="off"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                        /> */}

                        <label htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.
                        </p>
                        

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button disabled={!validPwd ? true : false}>Sign Up</button>
                    </form>

                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/signin">Sign In</a>
                        </span>
                    </p>
                </div>
            )}
        </>
    )
}

export default Register
