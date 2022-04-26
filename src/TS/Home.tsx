import News from './News';
import { useSelector } from 'react-redux';
import CollectionContainer from './CollectionContainer';

import StockGraph from './StockGraph';
import { useGetCurrentPortfolioValueQuery, useGetHistoricalPortfolioValueQuery, useGetUserQuery, useGetPortfolioDataQuery } from '../app/services/MarketBuddy';

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

function Home() {
    const { auth } = useSelector((state: any) => state)

    const { data, isLoading } = useGetCurrentPortfolioValueQuery(auth.user)   
    const { data: historicalPortfolioValue, isLoading: historicalPortfolioValueIsLoading } = useGetHistoricalPortfolioValueQuery(auth.user)
    const { data: currentUser, isLoading: currentUserIsLoading } = useGetUserQuery(auth.user)
    const { data: portfolioData, isLoading: portfolioDataIsLoading } = useGetPortfolioDataQuery(auth.user)
            
        
    if(isLoading || historicalPortfolioValueIsLoading || currentUserIsLoading || portfolioDataIsLoading) return null
    return (
        <div className="main-container">
            <div className="row">
                <div className="col-12">
                    <h1>${data.value}</h1>
                    <StockGraph width={500} height={400} type="value" data={formatChartData(historicalPortfolioValue.historicalPortfolioValue, data)} />
                    <div className="css-1">
                        <h3>Buying power: ${currentUser.cash.toLocaleString()}</h3>
                    </div>
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