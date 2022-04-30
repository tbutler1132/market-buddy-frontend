import { useGetPositionQuery } from "../app/services/MarketBuddy";
import { useSelector } from 'react-redux';
import TransactionForm from "./TransactionForm";
import { useState } from "react";
import { useGetUserQuery } from "../app/services/MarketBuddy";

function TransactionContainer({ stockId, latestPrice }: {stockId: string, latestPrice: number}) {
    const { auth } = useSelector((state: any) => state)
    const [transactionType, setTransactionType] = useState("Buy")
    const { data: user, isLoading: userLoading } = useGetUserQuery(auth.user)
    const { data: userPosition, isLoading: positionIsLoading } = useGetPositionQuery({id: auth.user, symbol: stockId.toUpperCase()})

    const clickHandler = (type: string) => {
        setTransactionType(type)
    }


    if(positionIsLoading) return null
    return (
        <div className="sidebar-content tsc">
            <div className="card" style={{position: 'relative'}}>
                <div className="_9PELkfdg02DcCLivR8Uqp">
                    <div className="transaction-toggle">
                        <span onClick={() => clickHandler("Buy")} className={`t-toggle ${transactionType === "Buy" ? "css-1migmwn" : null}`}>Buy {stockId.toUpperCase()}</span>
                        {userPosition 
                            ?
                                <span onClick={() => clickHandler("Sell")} className={`t-toggle ${transactionType === "Sell" ? "css-1migmwn" : null}`}>Sell {stockId.toUpperCase()}</span>
                            :
                                null 
                        }
                    </div>
                </div>
                <TransactionForm transactionType={transactionType} symbol={stockId} latestPrice={latestPrice}/>
                <footer>
                    <div className="footer-container">
                        Buying power: ${user.cash.toLocaleString()}
                    </div>
                </footer>
            </div>  
        </div>
    );
}

export default TransactionContainer;