import React, {useState} from 'react';
import {useDispatch} from 'react-redux'

import {adjustStockHoldings, buyNewStock} from '../../redux/actions'

function ConfirmationForm(props) {

    const { cost, position, shares, stockId } = props
    const dispatch = useDispatch()

    const reqType = () => {
        if (!position){
            const newStockObj = 
            {
                ticker: stockId,
                shares: parseInt(shares)
            }

            return buyNewStock(newStockObj)
        }
    }

    return (
        <div>
            <p>You're order total is: ${cost}</p>
            <button onClick={() => dispatch(reqType())}>Confirm</button>
            <button>Cancel</button>
        </div>
    );
}

export default ConfirmationForm;