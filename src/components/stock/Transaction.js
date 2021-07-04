import React, {useState} from 'react';

import ConfirmationForm from './ConfirmationForm';

function Transaction(props) {

    const { stockPrice, user, stockId, userPosition } = props

    const [buyOrSell, toggleBuyOrSell] = useState("Buy")
    const [numberOfShares, setNumberOfShares] = useState(0)
    const [confirmationForm, toggleConfirmationForm] = useState(false)

    const handleNumberOfShares = (e) => {
        setNumberOfShares(e.target.value)
    }

    const estimatedCost = () => {
        return (numberOfShares * stockPrice).toFixed(2)
    }

    return (
        <div className="stock-list">
            <button onClick={ () => buyOrSell === "Buy" ? toggleBuyOrSell("Sell") : toggleBuyOrSell("Buy")}>{buyOrSell}</button>
            <hr></hr>
            <p>Shares: <input onChange={handleNumberOfShares} type="number" value={numberOfShares} min="0"/></p>
            <p>Market Price: ${stockPrice}</p>
            <hr></hr>
            <p>Estimated Cost: ${estimatedCost()}</p>
            <button onClick={() => !confirmationForm ? toggleConfirmationForm(true) : toggleConfirmationForm(false)}>Review order</button>
            {confirmationForm ? <ConfirmationForm shares={numberOfShares} userPosition={userPosition} stockId={stockId} user={user} cost={estimatedCost()} /> : null}
            <hr></hr>
            <p>Buying Power: ${user.cash}</p>
        </div>
    );
}

export default Transaction;