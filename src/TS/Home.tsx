// import React, {useEffect} from 'react';
// import axios from 'axios'
// import { useDispatch, useSelector } from 'react-redux';
// import CircularProgress from '@material-ui/core/CircularProgress'

import StockListContainer from './StockListContainer';

function Home({ user }: {user: any}) {
    

    //REDUX: useDispatch to update the state with external API data, useSelector to retrieve state
    // const dispatch = useDispatch()
    // const stockMap = useSelector((state) => state.stocks)
    // const news = useSelector((state) => state.news)
        
    //Fetch Stock Data from external API
    // useEffect(() => {
        
    //     if (user.portfolio.length || user.lists.length){
    //     //Create an array of all symbols to use for batch request: This includes the user portfolio as well as "watch lists"
    //     const stocks = () => {
    //         const stocks = []
    //         const portfolio = user.portfolio.map(stock => stock.ticker)
    //         user.lists.forEach(list => stocks.push(list.stocks))
    //         stocks.push(portfolio)
    //         return stocks.flat()
    //     }

    //     //Create the url for batch request
    //     let url = `${BASE_API}/stocks/`
        
    //     for (let i = 0; i < stocks().length; i++) {
    //         if (i === stocks().length - 1){
    //             url = url + stocks()[i]
    //             // newsUrl = newsUrl + stocks()[i]
    //         } else {
    //             url = url + stocks()[i] + ","
    //             // newsUrl = newsUrl + stocks()[i] + ","
    //         }
            
    //     }
        
        
    //     //Make request to external API for stock data, dispatch to redux store
    //     //<<---Move axios to Redux actions, just for consistency and simplicity--->
    //     axios(url)
    //     .then(stock => dispatch(getStockInfo(stock.data)))
    // }

    // dispatch(getNews())
    // }, [dispatch, user.lists, user.portfolio])

    // //Calculate the value of the user's portfolio, all holdings + cash
    // const portfolioValue = () => {
    //     let totalValue = 0
    //     user.portfolio.forEach(stock => {
    //         totalValue = totalValue + (stockMap[stock.ticker]?.latestPrice * stock.shares)
    //     })

    //     return totalValue + user.cash
    // }

    // //Prepare data to be sent down to graph
    // const preparedUserData = () => {
    //     const data = []
    
    //     user.historicalPortfolioValue.forEach(point => {
    //       const date = point['date'].slice(5, 10)
    //       const obj = {
    //         name: date,
    //         value: point['value']
    //       }
    //       data.push(obj)
    //     })

    //     const current = {
    //         name: "Today",
    //         value: portfolioValue()
    //     }

    //     const firstDay = {
    //         name: "Start",
    //         value: 0
    //     }

    //     data.push(current)
    //     data.unshift(firstDay)

    //     return data
    // }

    if(!user){
        return(
            <div>Hey</div>
        )
    }

    // if(!stockMap && user?.portfolio.length) return <div><CircularProgress /></div>
    return (
        <div className="main-container">
            <div className="row">
                {/* <div className="col-12"> */}
                    {/* {portfolioValue() ? <h1>${portfolioValue().toFixed(2)}</h1> : null}
                    <StockGraph type="value" data={preparedUserData()} user={user}/>
                    <div className="css-1">
                        <h3>Buying power: ${user.cash}</h3>
                    </div>
                     <News />
                    </div>*/}
                <div className="col-5">
                    <StockListContainer />
                </div> 
            </div>
        </div>
    );
}

export default Home;