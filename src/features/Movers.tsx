import { useGetDailyGainersQuery }from '../app/services/IEXCloud'
import { CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux'
import StockCard from './StockCard'

interface MoversProps {
    type: string
    numberOfCards: number
}

const numberOfCardsDisplayed = (data: any, num: number) => {
    return data.slice(0, num)
}

function Movers({ type, numberOfCards }: MoversProps) {
    const { data, isLoading } = useGetDailyGainersQuery(type)
    const { mode } = useSelector((state: any) => state.styles)

    const renderStockCards = () => {
        const currentCollection = numberOfCardsDisplayed(data, numberOfCards)
        return currentCollection.map((stock: any) => <StockCard mode={mode} type={type} key={stock.symbol} stock={stock}/>)
    }

    if(isLoading) return <CircularProgress />
    return (
        <div data-mode={mode} className="movers-container">
            <h1>Daily {type}</h1>
            <h5>Stocks making the biggest moves today</h5>
            <div className="stock-card-container">
                {renderStockCards()}
            </div>
        </div>
    );
}


export default Movers;