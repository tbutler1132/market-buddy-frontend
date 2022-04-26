import { useHistory } from "react-router-dom"
import Button from "@mui/material/Button";
import { toggleDarkMode } from '../app/stylesSlice'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import SearchBar from '../components/SearchBar';

// interface NavProps {
//     user: any
//     logoutHandler: any
// }


function Nav() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { mode } = useSelector((state: any) => state.styles)

    const darkModeHandler = (e: any) => {
        dispatch(toggleDarkMode(mode === "dark" ? "light" : "dark"))
    }


    // const signupHandler = () => {
    //     history.push('/demo')
    // }

    return (
        <div>
            <nav data-mode="dark" className="nav">
                <div className="home-button">
                    <h1 id="list-add" onClick={() => history.push('/home')}>Market Buddy</h1>
                </div>
                <div className="search">
                    <SearchBar />
                </div>
                <div className="logout-button">
                    <Button onClick={darkModeHandler}>Toggle dark mode</Button>
                </div> 
                {/* <div className="logout-button">
                    <Button onClick={signupHandler}>Login</Button>
                </div> */}
            </nav>
        </div>
    );
}

export default Nav;