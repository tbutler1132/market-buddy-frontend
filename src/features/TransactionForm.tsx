import { useReducer } from "react";
import produce from "immer";
import OrderSummaryModal from "./OrderSummaryModal";
import { useGetPositionQuery, useGetUserQuery } from "../app/services/MarketBuddy";
import { useSelector } from "react-redux";
import { useGetLatestPriceQuery } from "../app/services/IEXCloud"
import Button from '@mui/material/Button'

interface TransactionFormProps {
    symbol: string, 
    transactionType: string,
}

function TransactionForm({  symbol, transactionType }: TransactionFormProps) {
    const { auth } = useSelector((state: any) => state)
    const { data: userPosition, isLoading: positionIsLoading } = useGetPositionQuery({id: auth.user, symbol: symbol.toUpperCase()})
    const { data: price, isLoading: priceLoading } = useGetLatestPriceQuery(symbol)
    const { data: user, isLoading: userLoading } = useGetUserQuery(auth.user)

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

    const sellAll = (e: any) => {
        dispatch({
            type: "shares",
            payload: userPosition.shares
        })
    }

    if(positionIsLoading || priceLoading || userLoading) return <div>Loading...</div>
    return (
        <>
        <div className="transaction-form">
            <form>
                <div className="order-type">
                    <label>Invest In</label>
                    <select>
                        <option>Shares</option>
                    </select>
                </div>
                <div className="order-type">
                    <label>Shares</label>
                    <input required min={0} type="number" onChange={(e) => updateForm(e, "shares")}/>
                </div>
                {transactionType === "Sell"
                    ?
                        <div className="order-type">
                            <label>You own:</label>
                            <span>{userPosition.shares}</span>
                        </div>
                    :
                        null
                }
                <div className="order-type">
                    <label>Market Price</label>
                    <span>${price.toLocaleString()}</span>
                </div>
                <div className="order-type">
                    <label>Estimated {transactionType === "Buy" ? "Cost" : "Credit"}</label>
                    <span>${(transactionForm.shares * price).toLocaleString()}</span>
                </div>
                <OrderSummaryModal 
                positionId={userPosition?._id} 
                cost={transactionType === "Buy" ? -Math.abs(transactionForm.shares * price) : transactionForm.shares * price} 
                transactionDetails={transactionForm} 
                symbol={symbol} 
                transactionType={transactionType}/>
            </form>
        </div>
        <footer>
            <div className="footer-container">
                {transactionType === "Buy"
                    ?
                        <>
                        Buying power: ${user.cash.toLocaleString()}
                        </>
                    :
                        <Button onClick={sellAll}>Sell All</Button>
                }
            </div>
        </footer>
        </>
    );
}

export default TransactionForm;