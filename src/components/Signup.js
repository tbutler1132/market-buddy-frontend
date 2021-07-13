import React, {useState} from 'react';

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

    return (
        <div className="login">
            <form onSubmit={submitHandler}>
                <label>Email</label>
                <input onChange={userNameHandler} value={username}/>
                <label>Password</label>
                <input onChange={passwordHandler} value={password}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Signup;