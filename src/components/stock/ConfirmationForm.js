import React from 'react';
import {useDispatch} from 'react-redux'

import {buyNewStock, adjustUserCash} from '../../redux/actions'

function ConfirmationForm(props) {

    const { cost, position, shares, stockId, user } = props
    const dispatch = useDispatch()

    const reqType = () => {
        if (!position){
            const newStockObj = 
            {
                ticker: stockId.toUpperCase(),
                shares: parseInt(shares)
            }

            return buyNewStock(newStockObj)
        }
    }

    const calculateCash = () => {
        const newBuyingPower = user.cash - parseInt(cost)
        return newBuyingPower
    }

    const confirmHandler = () => {
        dispatch(reqType())
        dispatch(adjustUserCash(calculateCash(), user._id))

    }

    return (
        <div>
            <p>You're order total is: ${cost}</p>
            <button onClick={confirmHandler}>Confirm</button>
            <button>Cancel</button>
        </div>
    );
}

export default ConfirmationForm;