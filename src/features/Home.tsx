import News from './News';
import { useSelector } from 'react-redux';
import CollectionContainer from './CollectionContainer';
import Movers from './Movers';
import TrendingLists from './TrendingLists';
import { useState } from 'react';
import StockGraph from './StockGraph';
import { 
    useGetCurrentPortfolioValueQuery, 
    useLazyGetHistoricalPortfolioValueQuery, 
    useGetUserQuery, 
    useGetPortfolioDataQuery 
} from '../app/services/MarketBuddy';
import ChartNav from './ChartNav';
import { useEffect } from 'react';

const graphColor = (data: any) => {
    if (data[data.length - 1]?.value >= data[0]?.value){
      return "#228B22"
    } else {
      return '#C70039'
    }
}

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

const chartRanges = ["ytd", "1m", "3m", "6m"]

function Home() {
    const [timeRange, setTimeRange] = useState("1m")
    const { auth } = useSelector((state: any) => state)
    const { data, isLoading } = useGetCurrentPortfolioValueQuery(auth.user)   
    const [getHistoricalData, results] = useLazyGetHistoricalPortfolioValueQuery()
    const { data: currentUser, isLoading: currentUserIsLoading } = useGetUserQuery(auth.user)
    const { data: portfolioData, isLoading: portfolioDataIsLoading } = useGetPortfolioDataQuery(auth.user)
    const { mode } = useSelector((state: any) => state.styles)

    useEffect(() => {
        getHistoricalData({id: auth.user, range: "1m"})
    }, [auth, getHistoricalData])
        
    const timeRangeClickHandler = (range: any) => {
        setTimeRange(range)
        getHistoricalData({id: auth.user, range: range})
    }
        
    if(isLoading || results.isLoading || currentUserIsLoading || portfolioDataIsLoading || results.isUninitialized) return null
    return (
        <div className="main-container">
            <div className="row">
                <div data-mode={mode} className="col-12">
                    <h1>Warren's Portfolio</h1>
                    <h2>${data.value.toLocaleString()}</h2>
                    <StockGraph color={graphColor(results.data)} width={500} height={400} type="value" data={formatChartData(results.data, data)} />
                    <ChartNav chartRanges={chartRanges} setTimeRange={timeRangeClickHandler} timeRange={timeRange}/>
                    <div className="css-2">
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