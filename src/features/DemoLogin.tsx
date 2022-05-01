import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setCredentials } from '../app/authSlice';
import { useDemoMutation } from "../app/services/MarketBuddy";

function DemoLogin() {

    const history = useHistory()
    const [startDemo] = useDemoMutation()
    const dispatch = useDispatch()

    const submitHandler = async (e: any) => {
        e.preventDefault()
        try {
            const user = await startDemo("_").unwrap()
            console.log("User", user)
            localStorage.setItem("token", user.token)
            dispatch(setCredentials(user))
            history.push("/home")
        } catch (error) {
            console.log("Oh no there was an error")
        }
    }

    return (
        <div className="login">
            <h1>Demo</h1>
            <form className="login-form" onSubmit={submitHandler}>
                <Button variant="contained" color="success" type="submit">Begin</Button>
            </form>
        </div>
    );
}

export default DemoLogin;