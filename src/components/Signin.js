import React, {useState} from 'react';
import {Button} from '@material-ui/core'

function Signin(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const userNameHandler = (e) => {
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        props.signinHandler({
            username: username,
            password: password
        })
    }

    const clickHandler = () => {
        props.toggle(true)
    }

    return (
        <div className="login">
            <h1>Signin</h1>
            <form class="login-form" onSubmit={submitHandler}>
                <label>Username</label>
                <input onChange={userNameHandler} value={username}/>
                <label>Password</label>
                <input onChange={passwordHandler} value={password}/>
                <Button type="submit">Submit</Button>
                <Button variant="contained" color="secondary" onClick={clickHandler}>Signup</Button>
            </form>
        </div>
    );
}

export default Signin;