import News from './News';
import { useSelector } from 'react-redux';
import CollectionContainer from './CollectionContainer';
import Movers from './Movers';
import TrendingLists from './TrendingLists';
import { useState } from 'react';
import StockGraph from './StockGraph';
import { useGetCurrentPortfolioValueQuery, useGetHistoricalPortfolioValueQuery, useGetUserQuery, useGetPortfolioDataQuery } from '../app/services/MarketBuddy';
import ChartNav from './ChartNav';

// interface chartData {
//     date: string,
//     value: number
// }

const formatChartData = (data: any, currentData: any) => {

    let arr: { name: any; value: any; }[] = []

    data.forEach((point: any) => {
        arr.push({
            name: point.date,
            value: point.value
        })
    })

    arr.push({name: currentData.date, value: currentData.value})

    return arr
}

const chartRanges = ["ytd", "5d", "1m", "3m", "1y", "5y"]

function Home() {
    const [timeRange, setTimeRange] = useState("ytd")
    const { auth } = useSelector((state: any) => state)
    const { data, isLoading } = useGetCurrentPortfolioValueQuery(auth.user)   
    const { data: historicalPortfolioValue, isLoading: historicalPortfolioValueIsLoading } = useGetHistoricalPortfolioValueQuery(auth.user)
    const { data: currentUser, isLoading: currentUserIsLoading } = useGetUserQuery(auth.user)
    const { data: portfolioData, isLoading: portfolioDataIsLoading } = useGetPortfolioDataQuery(auth.user)
        
    const timeRangeClickHandler = (range: any) => {
        setTimeRange(range)
    }
        
    if(isLoading || historicalPortfolioValueIsLoading || currentUserIsLoading || portfolioDataIsLoading) return null
    return (
        <div className="main-container">
            <div className="row">
                <div className="col-12">
                    <h1>${data.value.toLocaleString()}</h1>
                    <StockGraph width={500} height={400} type="value" data={formatChartData(historicalPortfolioValue.historicalPortfolioValue, data)} />
                    <ChartNav chartRanges={chartRanges} setTimeRange={timeRangeClickHandler} timeRange={timeRange}/>
                    <div className="css-1">
                        <h3>Buying power: ${Number(currentUser.cash.toFixed(2)).toLocaleString()}</h3>
                    </div>
                    <Movers type="Gainers" numberOfCards={3}/>
                    <Movers type="Losers" numberOfCards={3}/>
                    <TrendingLists />
                     <News />
                    </div>
                <div className="col-5">
                    <CollectionContainer header="Your Portfolio" data={portfolioData}/>
                </div> 
            </div>
        </div>
    );
}

export default Home;