import React, {useEffect} from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';

import { getStockInfo } from '../../redux/actions';
import StockGraph from './StockGraph'
import StockListContainer from './StockListContainer';

function Home(props) {

    const { user } = props
    const dispatch = useDispatch()
    const stockMap = useSelector((state) => state.stocks)
        
    //Fetch real time Stock Data from external API
    useEffect(() => {
        
        //Create an array of all symbols to use for batch request
        const stocks = () => {
            const stocks = []
            const portfolio = user.portfolio.map(stock => stock.ticker)
            user.lists.forEach(list => stocks.push(list.stocks))
            stocks.push(portfolio)
            return stocks.flat()
        }


        //Create the url for batch request
        let url = `http://localhost:7000/stocks/`
        for (let i = 0; i < stocks().length; i++) {
            if (i === stocks().length - 1){
                url = url + stocks()[i]
            } else {
                url = url + stocks()[i] + ","
            }
            
        }

        //Make request to external API for stock data, dispatch to redux store
        axios(url)
        .then(stock => dispatch(getStockInfo(stock.data)))
    }, [dispatch, user.lists, user.portfolio])

    //Calculate the value of the user's portfolio, all holdings + cash
    const portfolioValue = () => {
        let totalValue = 0
        user.portfolio.forEach(stock => {
            totalValue = totalValue + (stockMap[stock.ticker].open * stock.shares)
        })

        return totalValue + user.cash
    }

    //Prepare data to be sent down to graph
    const preparedUserData = () => {
        const data = []
    
        user.historicalPortfolioValue.forEach(point => {
          const date = point['date'].slice(5, 10)
          const obj = {
            name: date,
            value: point['value']
          }
          data.push(obj)
        })

        const current = {
            name: "Today",
            value: portfolioValue()
        }
        data.push(current)

        return data
    }

    if(!stockMap) return <div>Loading ...</div>
    return (
        <div>
            <div className="main-page">
                <div className="graph-buying_power">
                    <h1>Portfolio Value: ${portfolioValue()}</h1>
                    <StockGraph type="value" data={preparedUserData()} user={user}/>
                    <h3>Buying power: ${user.cash}</h3>
                </div>
            </div>
            <div className="fixed-container">
                <StockListContainer user={user}/>
            </div>
        </div>
    );
}

export default Home;