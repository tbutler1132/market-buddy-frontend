import { useHistory } from "react-router-dom"

import SearchBar from '../components/SearchBar';

// interface NavProps {
//     user: any
//     logoutHandler: any
// }


function Nav() {
    const history = useHistory()


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
                {/* <div className="logout-button">
                    <Button onClick={signupHandler}>Login</Button>
                </div> */}
            </nav>
        </div>
    );
}

export default Nav;