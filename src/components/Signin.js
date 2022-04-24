import React, {useState} from 'react';
import {Button} from '@material-ui/core'
import { useLoginMutation } from '../app/services/MarketBuddy';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../app/authSlice';
import { useHistory } from 'react-router-dom';

function Signin(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login] = useLoginMutation()
    const dispatch = useDispatch()
    const history = useHistory()

    const userNameHandler = (e) => {
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        // props.signinHandler({
        //     username: username,
        //     password: password
        // })

        try {
            const user = await login({username, password}).unwrap()
            localStorage.setItem("token", user.token)
            dispatch(setCredentials(user))
            history.push("/home")
        } catch (error) {
            console.log("Oh no there was an error")
        }
    }

    const clickHandler = () => {
        props.toggle(true)
    }

    return (
        <div className="login">
            <h1>Signin</h1>
            <form className="login-form" onSubmit={submitHandler}>
                <label>Username</label>
                <input className="login" onChange={userNameHandler} value={username}/>
                <label>Password</label>
                <input className="login" type="password" onChange={passwordHandler} value={password}/>
                <Button variant="contained" type="submit">Submit</Button>
                <Button color="secondary" onClick={clickHandler}>Signup</Button>
            </form>
        </div>
    );
}

export default Signin;