import { useHistory } from "react-router-dom"
import Button from "@mui/material/Button";
import { toggleDarkMode } from '../app/stylesSlice'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Popover from '@mui/material/Popover';
import { useState } from "react";
import Typography from '@mui/material/Typography';

import SearchBar from '../components/SearchBar';

// interface NavProps {
//     user: any
//     logoutHandler: any
// }


function Nav() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { mode } = useSelector((state: any) => state.styles)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handlePopoverOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget);
    };
  
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);

    const darkModeHandler = (e: any) => {
        let toggleMode = mode === "dark" ? "light" : "dark"
        dispatch(toggleDarkMode(toggleMode))
        localStorage.setItem("mode", toggleMode)
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
                        <Button
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose} 
                        onClick={darkModeHandler}>Toggle dark mode</Button>
                        <Popover
                        id="mouse-over-popover"
                        classes={{ paper: "MuiPopover-paper" }}
                        sx={{
                        pointerEvents: 'none',
                        }}
                        open={open}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                        >
                            <Typography sx={{ p: 1 }}>I remember your preferred mode, try refreshing!</Typography>
                        </Popover>
                    </div> 
                {/* <div className="logout-button">
                    <Button onClick={signupHandler}>Login</Button>
                </div> */}
            </nav>
        </div>
    );
}

export default Nav;