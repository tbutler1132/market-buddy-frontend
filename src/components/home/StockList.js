import React, {useEffect, useState} from 'react';
import axios from 'axios'

function PortfolioList(props) {

    const [portfolioStocks, setPortfolioStocks] = useState(false)
    
    const { stocks, title } = props

    //Get stock info from API
    useEffect(() => {

        //Create url of users stocks
        let url = `http://localhost:7000/stocks/`
        for (let i = 0; i < stocks.length; i++) {
            if (i === stocks.length - 1){
                url = url + stocks[i]
            } else {
                url = url + stocks[i] + ","
            }
            
        }
  
        ///API request
        axios(url)
        .then(stock => setPortfolioStocks(stock.data))

    }, [stocks])

    //Render user's portfolio info
    const renderStocks = () => {
        return portfolioStocks.map(stock => <h4 key={stock.symbol}>{`${stock.symbol}: $${stock.uClose}`}</h4>)
    }


    if (!portfolioStocks) return <div>Loading..</div>
    return (
        <div>
            {title ? <h3>{title}</h3> : <h3>stocks</h3>}
            <hr></hr>
            {renderStocks()}
        </div>
    );
}

export default PortfolioList;