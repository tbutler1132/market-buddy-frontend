import React from 'react';
import {useDispatch} from 'react-redux'
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';

import {buyNewStock, adjustUserCash, sellAllShares, adjustStockHoldings} from '../../redux/actions'

function ConfirmationForm(props) {

    const { cost, userPosition, shares, stockId, user, type } = props
    const dispatch = useDispatch()
    const history = useHistory()

    const calculateNewBuyingPower = () => {
        return type === "Buy" ? user.cash - parseInt(cost) : user.cash + parseInt(cost)
    }

    //Buy New Stock
    const buyStock = () => {
        const newStockObj = 
        {
            ticker: stockId.toUpperCase(),
            shares: parseInt(shares)
        }
        dispatch(buyNewStock(user._id, newStockObj))
    }

    //Sell all shares
    const sellAllHoldings = () => {
        dispatch(sellAllShares(user._id, userPosition._id))
    }

    //Adjust holdings
    const adjustHoldings = () => {

        let newShares = 0

        if (type === "Buy"){
            newShares = userPosition.shares + Number(shares)
        } else {
            newShares = userPosition.shares - Number(shares)
        }

        const updatedStockObj = {
            ticker: stockId.toUpperCase(),
            shares: newShares
        }

        dispatch(adjustStockHoldings(user._id, userPosition._id, updatedStockObj))
    }


    //Confirm Handler
    const confirmHandler = () => {
        if (cost > user.cash || (Number(shares > userPosition?.shares && type === "Sell"))){
            alert('Invalid')
        } else {
            if (type === "Buy" && !userPosition){
                if (cost > user.cash){
                    alert("Not enough cash")
                } else {
                    buyStock()
                }
            }else if (type === "Sell" && Number(shares) === userPosition.shares){
                sellAllHoldings()
            }else{
                adjustHoldings()
            }

            dispatch(adjustUserCash(calculateNewBuyingPower(), user._id))
            history.push('/home')
        }
        
    }

    //Sell Handler

    return (
        <div>
            <p>You're order total is: ${cost}</p>
            <Button variant="outlined" color="primary" onClick={confirmHandler}>Confirm</Button>
            <Button variant="outlined" color="secondary">Cancel</Button>
        </div>
    );
}

export default ConfirmationForm;