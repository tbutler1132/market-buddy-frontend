import Movers from "./Movers";
import News from "./News";
import TrendingLists from "./TrendingLists";
import CollectionContainer from "./CollectionContainer";
import GraphImage from '../assets/images/green_dot_graph.svg'
import { useGetMostActiveStocksQuery } from '../app/services/IEXCloud'
import { LinearProgress } from "@mui/material";
import { useSelector } from 'react-redux'


function PublicHome() {
    const { data, isLoading } = useGetMostActiveStocksQuery("_")
    const { mode } = useSelector((state: any) => state.styles)

    if(isLoading) return <div style={{marginTop: "15px"}}><LinearProgress /></div>
    return (
        <div className="main-container">
            <div className="row">
                <div data-mode={mode} className="col-12">
                    <h1>Welcome to Market Buddy</h1>
                    <img src={GraphImage} alt=""/>
                    <Movers type="Gainers" numberOfCards={3}/>
                    <Movers type="Losers" numberOfCards={3}/>
                    <TrendingLists />
                    <News /> 
                </div>
                <div className="col-5">
                    <CollectionContainer header="Most Active Stocks" data={data}/>
                </div>
            </div>
        </div>
    );
}

export default PublicHome;