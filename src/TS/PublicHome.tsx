import Movers from "./Movers";
import News from "./News";
import TrendingLists from "./TrendingLists";
import CollectionContainer from "./CollectionContainer";
import GraphImage from '../assets/images/green_dot_graph.svg'

function PublicHome() {


    return (
        <div className="main-container">
            <div className="row">
                <div className="col-12">
                    <h1>Welcome to Market Buddy</h1>
                    <img src={GraphImage} alt="" />
                    <Movers type="Gainers" numberOfCards={3}/>
                    <Movers type="Losers" numberOfCards={3}/>
                    <TrendingLists />
                    <News /> 
                </div>
                <div className="col-5">
                    <CollectionContainer />
                </div>
            </div>
        </div>
    );
}

export default PublicHome;