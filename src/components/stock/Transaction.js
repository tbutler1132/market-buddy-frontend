import React, {useState, useEffect} from 'react';

import ConfirmationForm from './ConfirmationForm';

function Transaction(props) {

    const { stockPrice, user, stockId, userPosition } = props

    //Toggle whether the transaction is a buy or sell, set the number of shares for transaction, toggle a confirmation form
    const [buyOrSell, toggleBuyOrSell] = useState("Buy")
    const [numberOfShares, setNumberOfShares] = useState(0)
    const [confirmationForm, toggleConfirmationForm] = useState(false)

    useEffect(() => {
        if (numberOfShares <= 0){
            toggleConfirmationForm(false)
        }
    }, [numberOfShares])

    const handleNumberOfShares = (e) => {
        setNumberOfShares(e.target.value)
    }

    //Calculate cost of transaction
    const estimatedCost = () => {
        return (numberOfShares * stockPrice).toFixed(2)
    }

    const confirmationFormClickHandler = () => {
        if (numberOfShares > 0){
            !confirmationForm ? toggleConfirmationForm(true) : toggleConfirmationForm(false)
        } else {
            toggleConfirmationForm(false)
        }
    }


    return (
        <div className="stock-list">
            <button onClick={ () => buyOrSell === "Buy" ? toggleBuyOrSell("Sell") : toggleBuyOrSell("Buy")}>{buyOrSell}</button>
            <hr></hr>
            {buyOrSell === "Buy" ? 
            <p>Shares: <input onChange={handleNumberOfShares} type="number" value={numberOfShares} min="0" max={user.cash / stockPrice}/></p> : 
            <p>Shares: <input onChange={handleNumberOfShares} type="number" value={numberOfShares} min="0" max={userPosition?.shares}/></p>}
            <p>Market Price: ${stockPrice}</p>
            <hr></hr>
            <p>Estimated {buyOrSell === "Buy" ? "Cost" : "Value"}: ${estimatedCost()}</p>
            {numberOfShares > 0 ? <button onClick={confirmationFormClickHandler}>Review order</button> : null}
            {confirmationForm ? <ConfirmationForm type={buyOrSell} shares={numberOfShares} userPosition={userPosition} stockId={stockId} user={user} cost={estimatedCost()} /> : null}
            <hr></hr>
            <p>Buying Power: ${user.cash}</p>
        </div>
    );
}

export default Transaction;