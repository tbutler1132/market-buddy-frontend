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
        
        const stocks = () => {
            const stocks = []
            const portfolio = user.portfolio.map(stock => stock.ticker)
            user.lists.forEach(list => stocks.push(list.stocks))
            stocks.push(portfolio)
            return stocks.flat()
        }


        let url = `http://localhost:7000/stocks/`
        for (let i = 0; i < stocks().length; i++) {
            if (i === stocks().length - 1){
                url = url + stocks()[i]
            } else {
                url = url + stocks()[i] + ","
            }
            
        }

        axios(url)
        .then(stock => dispatch(getStockInfo(stock.data)))
    }, [dispatch, user.lists, user.portfolio])


    const portfolioValue = () => {
        let totalValue = 0

        user.portfolio.forEach(stock => {
            totalValue = totalValue + (stockMap[stock.ticker].open * stock.shares)
        })

        return totalValue + user.cash
    }

    if(!stockMap) return <div>Loading ...</div>
    return (
        <div>
            <div className="main-page">
                <div className="graph-buying_power">
                    <h1>Portfolio Value: ${portfolioValue()}</h1>
                    <StockGraph />
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