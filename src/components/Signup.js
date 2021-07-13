import React, {useState} from 'react';
import {Button} from '@material-ui/core'

function Signup(props) {
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
        props.signupHandler({
            username: username,
            password: password
        })
    }

    const clickHandler = () => {
        props.toggle(false)
    }


    return (
        <div className="login">
            <h1>Signup</h1>
            <form class="login-form" onSubmit={submitHandler}>
                <label>Username</label>
                <input onChange={userNameHandler} value={username}/>
                <label>Password</label>
                <input onChange={passwordHandler} value={password}/>
                <Button type="submit">Submit</Button>
                <Button variant="contained" color="secondary" onClick={clickHandler}>Signin</Button>
            </form>
        </div>
    );
}

export default Signup;