import { useState, useReducer } from "react";
import produce from "immer";
import OrderSummaryModal from "./OrderSummaryModal";


function TransactionForm({ latestPrice, symbol, position }: {latestPrice: number, symbol: string, position: any}) {
    const [transactionForm, dispatch] = useReducer(
        produce((draft, action) => {
            switch (action.type) {
                case "shares":
                    draft['shares'] = action.payload
                    break
                default:
                    break
            }
        }),
        {
            shares: ""
        }
    )

    const updateForm = (e: any, type: string) => {
        dispatch({
            type: "shares",
            payload: e.target.value
        })
    }

    return (
        <form >
            <div className="order-type">
                <label>Order Type</label>
            </div>
            <div className="order-type">
                <label>Invest In</label>
                <select>
                    <option>Shares</option>
                </select>
            </div>
            <div className="order-type">
                <label>Shares</label>
                <input type="number" onChange={(e) => updateForm(e, "shares")}/>
            </div>
            <div className="order-type">
                <label>Market Price</label>
                <span>${latestPrice.toLocaleString()}</span>
            </div>
            <div className="order-type">
                <label>Estimated Cost</label>
                <span>${(transactionForm.shares * latestPrice * 1.01).toLocaleString()}</span>
            </div>
            <OrderSummaryModal position={position} cost={transactionForm.shares * latestPrice} transactionDetails={transactionForm} symbol={symbol} transactionType="Buy"/>
        </form>
    );
}

export default TransactionForm;