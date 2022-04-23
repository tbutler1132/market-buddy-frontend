import News from "../home/News";
import { getNews } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { useEffect, useState } from 'react';
import CollectionContainer from "./CollectionContainer";
import TrendingLists from "../TrendingLists";
import Movers from "../Movers";
import { BASE_API } from "../../App";
import { CircularProgress } from "@material-ui/core";
import GraphImage from '../../assets/images/green_dot_graph.svg'

function PublicHome(props) {

    const dispatch = useDispatch()
    const news = useSelector((state) => state.news)
    const [NASDAQPrices, setNASDAQPrices] = useState(false)

    useEffect(() => {

    
    axios(`${BASE_API}/stocks/historical/NDAQ`)
    .then(data => {

        setNASDAQPrices(data.data)})
    

    
    dispatch(getNews())
    }, [dispatch])


    return (
        <div className="main-container">
            <div className="row">
                <div className="col-12">
                    <h1>Welcome to Market Buddy</h1>
                    <img src={GraphImage} alt="" />
                    <Movers type="Gainers"/>
                    <Movers type="Losers"/>
                    <TrendingLists />
                    <News news={news}/>
                </div>
                <div className="col-5">
                    <CollectionContainer />
                </div>
            </div>
        </div>
    );
}

export default PublicHome;