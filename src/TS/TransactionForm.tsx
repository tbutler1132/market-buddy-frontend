import { useReducer } from "react";
import produce from "immer";
import OrderSummaryModal from "./OrderSummaryModal";
import { useGetPositionQuery } from "../app/services/MarketBuddy";
import { useSelector } from "react-redux";

interface TransactionFormProps {
    latestPrice: number, 
    symbol: string, 
    transactionType: string,
}

function TransactionForm({ latestPrice, symbol, transactionType }: TransactionFormProps) {
    const { auth } = useSelector((state: any) => state)

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

    const { data: userPosition, isLoading: positionIsLoading } = useGetPositionQuery({id: auth.user, symbol: symbol.toUpperCase()})

    const updateForm = (e: any, type: string) => {
        dispatch({
            type: "shares",
            payload: e.target.value
        })
    }

    if(positionIsLoading) return <div>Loading...</div>
    return (
        <div className="transaction-form">
            <form >
                <div className="order-type">
                    <label>Invest In</label>
                    <select>
                        <option>Shares</option>
                    </select>
                </div>
                <div className="order-type">
                    <label>Shares</label>
                    <input min={0} type="number" onChange={(e) => updateForm(e, "shares")}/>
                </div>
                <div className="order-type">
                    <label>Market Price</label>
                    <span>${latestPrice.toLocaleString()}</span>
                </div>
                <div className="order-type">
                    <label>Estimated {transactionType === "Buy" ? "Cost" : "Credit"}</label>
                    <span>${(transactionForm.shares * latestPrice).toLocaleString()}</span>
                </div>
                <OrderSummaryModal 
                positionId={userPosition?._id} 
                cost={transactionType === "Buy" ? -Math.abs(transactionForm.shares * latestPrice) : transactionForm.shares * latestPrice} 
                transactionDetails={transactionForm} 
                symbol={symbol} 
                transactionType={transactionType}/>
            </form>
        </div>
    );
}

export default TransactionForm;