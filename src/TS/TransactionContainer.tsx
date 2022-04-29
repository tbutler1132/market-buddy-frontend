import { useGetPositionQuery } from "../app/services/MarketBuddy";
import { useSelector } from 'react-redux';
import TransactionForm from "./TransactionForm";

function TransactionContainer({ stockId, latestPrice }: {stockId: string, latestPrice: number}) {
    const { auth } = useSelector((state: any) => state)

    const { data: userPosition, isLoading: positionIsLoading } = useGetPositionQuery({id: auth.user, symbol: stockId.toUpperCase()})

    if(positionIsLoading) return null
    return (
        <div className="sidebar-content">
            <div className="card" style={{position: 'relative'}}>
                <div className="_9PELkfdg02DcCLivR8Uqp">
                    <div className="transaction-toggle">
                        <span>Buy {stockId.toUpperCase()}</span>
                        <span>Sell {stockId.toUpperCase()}</span>
                    </div>
                </div>
                <TransactionForm position={userPosition} symbol={stockId} latestPrice={latestPrice}/>
                <footer>
                </footer>
            </div>  
        </div>
    );
}

export default TransactionContainer;