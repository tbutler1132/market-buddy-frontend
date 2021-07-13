import React, {useState, useEffect} from 'react';
import { Button, TextField } from '@material-ui/core';

import ConfirmationForm from './ConfirmationForm';
import FormDialog from './ModalTest';

function Transaction(props) {

    const { stockPrice, user, stockId, userPosition, lists } = props

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
        <div className="sidebar-content">
            <div className="card" style={{position: 'relative'}}>
                <Button color={buyOrSell === "Buy" ? "primary" : "default"} onClick={ () => toggleBuyOrSell("Buy")}>Buy</Button>
                <Button color={buyOrSell === "Sell" ? "primary" : "default"} onClick={ () => toggleBuyOrSell("Sell")}>Sell</Button>
                <hr></hr>
                {buyOrSell === "Buy" ? 
                <>
                <p>Shares:</p> 
                <TextField onChange={handleNumberOfShares} type="number" value={numberOfShares} inputProps={{ min: 0, max: user.cash / stockPrice }} min="0" max={user.cash / stockPrice}/> 
                </>: 
                <><p>Shares:</p> <TextField onChange={handleNumberOfShares} type="number" value={numberOfShares} inputProps={{ min: 0, max: userPosition?.shares }} min="0" max={userPosition?.shares}/></>}
                <p>Market Price: ${stockPrice}</p>
                <hr></hr>
                <p>Estimated {buyOrSell === "Buy" ? "Cost" : "Value"}: ${estimatedCost()}</p>
                {numberOfShares > 0 ? <Button variant="contained" color="primary" onClick={confirmationFormClickHandler}>Review order</Button> : null}
                {confirmationForm ? <ConfirmationForm type={buyOrSell} shares={numberOfShares} userPosition={userPosition} stockId={stockId} user={user} cost={estimatedCost()} /> : null}
                <hr></hr>
                <p>Buying Power: ${user.cash}</p>
                <FormDialog lists={lists} user={user} stockSymbol={stockId}/>
            </div>
        </div>
    );
}

export default Transaction;