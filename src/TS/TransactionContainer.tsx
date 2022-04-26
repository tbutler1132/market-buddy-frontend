import { useGetPortfolioDataQuery } from "../app/services/MarketBuddy";
import { useSelector } from 'react-redux';
import OrderSummaryModal from "./OrderSummaryModal";

const findInPortfolio = (symbol: string, portfolioData: any) => {
    return portfolioData.find((holding: any) => holding.symbol === symbol.toUpperCase())
}

function TransactionContainer({ stockId }: {stockId: string}) {
    const { auth } = useSelector((state: any) => state)

    const { data: portfolioData, isLoading: portfolioDataIsLoading } = useGetPortfolioDataQuery(auth.user)

    console.log("Transaction", findInPortfolio(stockId, portfolioData))

    if(portfolioDataIsLoading) return null
    return (
        <div className="sidebar-content">
            <div className="card" style={{position: 'relative'}}>
                <form>
                    <div className="_9PELkfdg02DcCLivR8Uqp">
                        <div className="transaction-toggle">
                            <span>Buy {stockId.toUpperCase()}</span>
                            <span>Sell {stockId.toUpperCase()}</span>
                        </div>
                    </div>
                    <footer>
                    </footer>
                    <OrderSummaryModal />
                </form>
            </div>  
        </div>
    );
}

export default TransactionContainer;