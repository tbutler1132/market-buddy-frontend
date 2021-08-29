import News from "../home/News";
import { getNews } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import CollectionContainer from "./CollectionContainer";
import TrendingLists from "../TrendingLists";
import Movers from "../Movers";
import CircularProgress from "@material-ui/core/CircularProgress";

function PublicHome(props) {

    const dispatch = useDispatch()
    const news = useSelector((state) => state.news)

    useEffect(() => {
    dispatch(getNews())
    }, [dispatch])



    if(!news) return <div className="loading"><CircularProgress /></div>
    return (
        <div className="main-container">
            <div className="row">
                <div className="col-12">
                    <h1>Welcome to Market Buddy</h1>
                    <img src="https://cdn.robinhood.com/assets/generated_assets/6da8e43c2ce2585fa5f4384a506a5eda.svg" alt="" />
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